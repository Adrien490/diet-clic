import { revalidateTag } from "next/cache";
import { z } from "zod";
import { contactSchema } from "../schemas/contact-schema";
import {
	ActionStatus,
	ServerAction,
	createErrorResponse,
	createSuccessResponse,
	createValidationErrorResponse,
} from "../types/server-action";

export const submitContactForm: ServerAction<
	z.infer<typeof contactSchema>,
	typeof contactSchema
> = async (_, formData) => {
	try {
		// 1. Récupération des données du formulaire
		const attachmentUrls = formData.getAll("attachment") as string[];
		const rawData = {
			fullName: formData.get("fullName") as string,
			email: formData.get("email") as string,
			subject: formData.get("subject") as string,
			message: formData.get("message") as string,
			attachment: attachmentUrls.filter((url) => url && url.trim() !== ""),
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

		// 3. Traitement des pièces jointes uploadées
		// Les fichiers sont déjà uploadés via UploadThing et nous avons les URLs
		const attachmentInfo = validatedData.attachment?.map((url) => ({
			url,
			filename: url.split("/").pop() || "fichier",
		}));

		// 4. Création de l'objet de données final
		const contactData: z.infer<typeof contactSchema> = {
			fullName: validatedData.fullName,
			email: validatedData.email,
			subject: validatedData.subject,
			message: validatedData.message,
			attachment: validatedData.attachment,
		};

		// 5. Ici vous pouvez ajouter votre logique métier :
		// - Sauvegarder en base de données
		// - Envoyer un email de notification
		// - Intégrer avec un CRM
		// - Etc.

		console.log("Nouvelle demande de contact:", contactData);
		if (attachmentInfo && attachmentInfo.length > 0) {
			console.log("Fichiers attachés:", attachmentInfo);
		}

		// Exemple d'insertion en base (à adapter selon votre stack) :
		/*
		const contact = await db.contactRequest.create({
			data: {
				fullName: validatedData.fullName,
				email: validatedData.email,
				subject: validatedData.subject,
				message: validatedData.message,
				attachmentUrls: validatedData.attachment,
				status: 'pending',
				createdAt: new Date(),
			},
		});
		*/

		// Exemple d'envoi d'email de notification :
		/*
		await sendEmailNotification({
			to: 'contact@manon-dietetique.fr',
			subject: `Nouvelle demande: ${validatedData.subject}`,
			html: `
				<h2>Nouvelle demande de contact</h2>
				<p><strong>Nom:</strong> ${validatedData.fullName}</p>
				<p><strong>Email:</strong> ${validatedData.email}</p>
				<p><strong>Motif:</strong> ${validatedData.subject}</p>
				<p><strong>Message:</strong></p>
				<p>${validatedData.message}</p>
				${attachmentInfo && attachmentInfo.length > 0 ? `
					<p><strong>Fichiers attachés:</strong></p>
					<ul>
						${attachmentInfo.map(file => `<li><a href="${file.url}">${file.filename}</a></li>`).join('')}
					</ul>
				` : ''}
			`,
		});
		*/

		// 6. Invalidation du cache si nécessaire
		revalidateTag("contact-requests");

		return createSuccessResponse(
			contactData,
			"Votre message a été envoyé avec succès. Nous vous recontacterons dans les plus brefs délais."
		);
	} catch (error) {
		console.error("[SUBMIT_CONTACT_FORM]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer."
		);
	}
};

// Action alternative pour traiter uniquement l'envoi d'email (plus simple)
export const sendContactEmail: ServerAction<
	null,
	typeof contactSchema
> = async (_, formData) => {
	try {
		const attachmentUrls = formData.getAll("attachment") as string[];
		const rawData = {
			fullName: formData.get("fullName") as string,
			email: formData.get("email") as string,
			subject: formData.get("subject") as string,
			message: formData.get("message") as string,
			attachment: attachmentUrls.filter((url) => url && url.trim() !== ""),
		};

		const validation = contactSchema.safeParse(rawData);
		if (!validation.success) {
			return createValidationErrorResponse(
				validation.error.flatten().fieldErrors,
				"Validation échouée. Veuillez vérifier votre saisie.",
				rawData
			);
		}

		const validatedData = validation.data;

		// Envoi d'email simple (exemple avec nodemailer, resend, etc.)
		// await sendEmail({
		//   to: 'contact@manon-dietetique.fr',
		//   replyTo: validatedData.email,
		//   subject: `Contact - ${validatedData.subject}`,
		//   html: `
		//     <h2>Nouvelle demande de contact</h2>
		//     <p><strong>Nom:</strong> ${validatedData.fullName}</p>
		//     <p><strong>Email:</strong> ${validatedData.email}</p>
		//     <p><strong>Motif:</strong> ${validatedData.subject}</p>
		//     <p><strong>Message:</strong></p>
		//     <p>${validatedData.message}</p>
		//     ${validatedData.attachment && validatedData.attachment.length > 0 ? `
		//       <p><strong>Fichiers attachés:</strong></p>
		//       <ul>
		//         ${validatedData.attachment.map(url => `<li><a href="${url}">${url.split('/').pop()}</a></li>`).join('')}
		//       </ul>
		//     ` : ''}
		//   `,
		// });

		console.log("Email de contact envoyé:", {
			from: validatedData.email,
			fullName: validatedData.fullName,
			subject: validatedData.subject,
			attachments: validatedData.attachment?.length || 0,
		});

		return createSuccessResponse(
			null,
			"Votre message a été envoyé avec succès !"
		);
	} catch (error) {
		console.error("[SEND_CONTACT_EMAIL]", error);
		return createErrorResponse(
			ActionStatus.ERROR,
			"Erreur lors de l'envoi de l'email"
		);
	}
};
