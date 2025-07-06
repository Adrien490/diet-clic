import { z } from "zod";

export const contactSchema = z.object({
	fullName: z
		.string()
		.min(1, "Le nom et prénom sont requis")
		.min(2, "Le nom et prénom doivent contenir au moins 2 caractères")
		.regex(
			/^[a-zA-ZÀ-ÿ\s-']+$/,
			"Le nom et prénom ne doivent contenir que des lettres"
		),

	email: z
		.string()
		.min(1, "L'email est requis")
		.email("Format d'email invalide (exemple: nom@domaine.com)"),

	subject: z.string().min(1, "Veuillez sélectionner le motif de votre demande"),

	message: z
		.string()
		.min(1, "Le message est requis")
		.min(10, "Le message doit contenir au moins 10 caractères")
		.max(1000, "Le message ne peut pas dépasser 1000 caractères"),

	attachment: z.string().url("URL de fichier invalide").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Schéma pour les valeurs du select subject
export const subjectOptions = [
	"premiere-consultation",
	"consultation-suivi",
	"prestation-groupe",
	"autre",
] as const;

export const subjectLabels = {
	"premiere-consultation": "Première consultation diététique",
	"consultation-suivi": "Consultation de suivi diététique",
	"prestation-groupe": "Prestation de groupe",
	autre: "Autre",
} as const;
