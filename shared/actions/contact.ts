"use server";

import { render } from "@react-email/render";
import { ContactEmailTemplate } from "../components/email-template";
import { ContactFormData, contactSchema } from "../schemas/contact-schema";
import {
	ActionStatus,
	ServerAction,
	createErrorResponse,
	createSuccessResponse,
	createValidationErrorResponse,
} from "../types/server-action";
import { sendEmail } from "./send-email";

const ADMIN_EMAIL = "adrien.poirier49@gmail.com"; // Email de test Resend

export const contact: ServerAction<
	ContactFormData,
	typeof contactSchema
> = async (_, formData) => {
	try {
		// 1. Récupération des données du formulaire
		const attachmentUrl = formData.get("attachment") as string;
		const rawData = {
			fullName: formData.get("fullName") as string,
			email: formData.get("email") as string,
			subject: formData.get("subject") as string,
			message: formData.get("message") as string,
			attachment:
				attachmentUrl && attachmentUrl.trim() !== ""
					? attachmentUrl
					: undefined,
		};

		console.log("rawData", rawData);

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

		// 3. Envoi de l'email de notification avec le template React
		try {
			if (!ADMIN_EMAIL) {
				return createErrorResponse(
					ActionStatus.ERROR,
					"Erreur lors de l'envoi de votre message. Veuillez réessayer."
				);
			}

			const emailHtml = await render(ContactEmailTemplate(validatedData));

			const email = await sendEmail({
				to: ADMIN_EMAIL,
				subject: `Nouvelle demande de contact - ${validatedData.subject}`,
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
