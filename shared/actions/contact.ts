"use server";

import { render } from "@react-email/render";
import z from "zod";
import { ContactEmailTemplate } from "../components/emails/contact-email-template";
import { subjectOptions } from "../constants/contact-form-subject-options";
import { contactSchema } from "../schemas/contact-schema";
import {
	ActionStatus,
	ServerAction,
	createErrorResponse,
	createSuccessResponse,
	createValidationErrorResponse,
} from "../types/server-action";
import { sendEmail } from "./send-email";

const EMAIL = "adrien.poirier49@gmail.com"; // Email de test Resend

export const contact: ServerAction<
	z.infer<typeof contactSchema>,
	typeof contactSchema
> = async (_, formData) => {
	try {
		// Récupération des attachments avec url et name
		const attachments: { url: string; name: string }[] = [];
		let index = 0;

		// Récupérer tous les attachments indexés
		while (true) {
			const url = formData.get(`attachments[${index}].url`) as string;
			const name = formData.get(`attachments[${index}].name`) as string;

			if (!url || !name) break;

			attachments.push({ url, name });
			index++;
		}

		const rawData = {
			fullName: formData.get("fullName") as string,
			email: formData.get("email") as string,
			subject: formData.get("subject") as string,
			message: formData.get("message") as string,
			attachments: attachments,
		};

		// 2. Validation des données avec Zod
		const validation = contactSchema.safeParse(rawData);
		if (!validation.success) {
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Validation échouée. Veuillez vérifier votre saisie.",
				rawData
			);
		}

		const validatedData = validation.data;
		const subject =
			subjectOptions[validatedData.subject as keyof typeof subjectOptions];

		// 3. Envoi de l'email de notification avec le template React
		try {
			if (!EMAIL) {
				return createErrorResponse(
					ActionStatus.ERROR,
					"Erreur lors de l'envoi de votre message. Veuillez réessayer."
				);
			}

			const emailHtml = await render(ContactEmailTemplate(validatedData));

			const email = await sendEmail({
				to: EMAIL,
				subject: `${validatedData.fullName} - ${subject}`,
				html: emailHtml,
				replyTo: validatedData.email,
			});

			if (!email) {
				return createErrorResponse(
					ActionStatus.ERROR,
					"Erreur lors de l'envoi de votre message. Veuillez réessayer."
				);
			}

			return createSuccessResponse(
				validatedData,
				"Votre message a été envoyé avec succès. Nous vous recontacterons dans les plus brefs délais."
			);
		} catch (emailError) {
			console.error("Erreur lors de l'envoi de l'email:", emailError);
			return createErrorResponse(
				ActionStatus.ERROR,
				"Erreur lors de l'envoi de votre message. Veuillez réessayer."
			);
		}
	} catch (error) {
		console.error("[SUBMIT_CONTACT_FORM]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer."
		);
	}
};
