export interface FAQItem {
	id: string;
	question: string;
	answer: string[];
}

export const FAQ_ITEMS: FAQItem[] = [
	{
		id: "item-1",
		question:
			"Quelle est la différence entre une diététicienne et une nutritionniste ?",
		answer: [
			"Le titre de diététicien(ne) nutritionniste est un titre protégé et reconnu par l'État, accessible après un diplôme spécifique (BTS ou BUT en diététique).",
			"Le terme « nutritionniste » n'est pas réglementé : tout professionnel de santé peut l'utiliser.",
			"Je suis diététicienne-nutritionniste diplômée, avec un numéro RPPS et une formation reconnue.",
		],
	},
	{
		id: "item-2",
		question:
			"Quelle est la différence entre un(e) diététicien(ne) et un médecin nutritionniste ?",
		answer: [
			"Un médecin nutritionniste est un médecin ayant suivi une formation complémentaire en nutrition (DIU ou DU).",
			"Il peut poser un diagnostic médical et prescrire un traitement, ce qui n'est pas le rôle d'un diététicien.",
			"En revanche, le diététicien est le professionnel de référence en éducation nutritionnelle et accompagnement alimentaire.",
			"Les deux professions sont complémentaires.",
		],
	},
	{
		id: "item-3",
		question: "Combien de temps dure une consultation de diététique ?",
		answer: [
			"Une première consultation dure généralement entre 60 et 90 minutes pour faire le point complet sur votre situation.",
			"Les consultations de suivi durent environ 45 minutes à 1 heure selon vos besoins.",
			"Ce temps permet d'aborder tous les aspects de votre alimentation et de vos objectifs de manière approfondie.",
			"Nous prenons le temps nécessaire pour un accompagnement de qualité, sans précipitation.",
		],
	},
	{
		id: "item-4",
		question: "Les consultations sont-elles remboursées par la mutuelle ?",
		answer: [
			"La Sécurité Sociale ne rembourse pas les consultations de diététique, mais de nombreuses mutuelles proposent des forfaits annuels.",
			"La plupart des complémentaires santé remboursent entre 3 et 8 consultations par an, de 20€ à 60€ par séance.",
			"Contactez votre mutuelle pour connaître votre forfait « médecines douces » ou « prévention santé ».",
			"Je vous fournis une facture détaillée pour faciliter vos démarches de remboursement.",
		],
	},
	{
		id: "item-6",
		question: "Proposez-vous des téléconsultations ?",
		answer: [
			"Oui, je propose des consultations à distance, et également à domicile dans certaines zones.",
			"Cela permet de s'adapter à votre emploi du temps, vos contraintes ou votre confort.",
			"Le contenu et la qualité du suivi restent identiques à une consultation en présentiel, et un compte-rendu vous est systématiquement envoyé par mail.",
			"Vous choisissez ce qui vous convient le mieux.",
		],
	},
	{
		id: "item-7",
		question: "Ai-je besoin d'une prescription médicale pour consulter ?",
		answer: [
			"Non, il est tout à fait possible de consulter une diététicienne sans ordonnance.",
			"Certaines mutuelles peuvent cependant en demander une pour le remboursement éventuel.",
			"N'hésitez pas à vérifier auprès de votre complémentaire santé.",
		],
	},
	{
		id: "item-8",
		question: "Comment prendre rendez-vous rapidement ?",
		answer: [
			"Vous pouvez me contacter par téléphone au 07 81 51 53 10 ou par email.",
			"Je vous réponds généralement sous 24h pour convenir d'un rendez-vous.",
			"Les créneaux sont disponibles du lundi au vendredi de 9h à 18h, et le samedi matin de 9h à 13h.",
			"En cas d'urgence ou de besoin particulier, n'hésitez pas à me le préciser lors de votre prise de contact.",
		],
	},
	{
		id: "item-9",
		question: "Combien de séances sont nécessaires ?",
		answer: [
			"Tout dépend de votre objectif, de votre parcours et de votre rythme.",
			"Certaines personnes souhaitent une seule consultation, d'autres un suivi régulier.",
			"Nous choisissons ensemble ce qui vous conviendra le mieux.",
		],
	},
	{
		id: "item-10",
		question:
			"Est-ce que je vais devoir peser mes aliments ou compter les calories ?",
		answer: [
			"Non.",
			"Je propose une approche bienveillante et comportementale, sans calculs imposés ni régimes restrictifs.",
			"L'objectif est de simplifier votre rapport à l'alimentation, pas de l'alourdir.",
			"Pas de contraintes inutiles, sauf en cas de prescription médicale.",
		],
	},
	{
		id: "item-11",
		question:
			"Mon suivi est-il adapté à mon profil particulier ? (sport, végétarisme, troubles digestifs, etc.)",
		answer: [
			"Oui, chaque accompagnement est personnalisé selon vos besoins, vos préférences, votre état de santé et votre mode de vie.",
			"Je m'adapte à votre situation, quel que soit votre profil.",
			"Mon approche est scientifique, humaine et individualisée.",
		],
	},
	{
		id: "item-12",
		question: "Intervenez-vous en établissement ou en entreprise ?",
		answer: [
			"Oui, je propose des interventions de groupe en établissements de santé, structures médico-sociales, écoles ou entreprises.",
			"Éducation nutritionnelle, ateliers, conférences ou accompagnement de projet : tout est adaptable.",
			"Contactez-moi pour en discuter.",
		],
	},
];
