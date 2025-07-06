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
		question: "Proposez-vous des téléconsultations ?",
		answer: [
			"Oui, je propose des consultations à distance, et également à domicile dans certaines zones.",
			"Cela permet de s'adapter à votre emploi du temps, vos contraintes ou votre confort.",
			"Le contenu et la qualité du suivi restent identiques à une consultation en présentiel, et un compte-rendu vous est systématiquement envoyé par mail.",
			"Vous choisissez ce qui vous convient le mieux.",
		],
	},
	{
		id: "item-4",
		question: "Ai-je besoin d'une prescription médicale pour consulter ?",
		answer: [
			"Non, il est tout à fait possible de consulter une diététicienne sans ordonnance.",
			"Certaines mutuelles peuvent cependant en demander une pour le remboursement éventuel.",
			"N'hésitez pas à vérifier auprès de votre complémentaire santé.",
		],
	},
	{
		id: "item-5",
		question: "Est-ce que les consultations sont remboursées ?",
		answer: [
			"Les consultations diététiques ne sont pas remboursées par la Sécurité Sociale.",
			"Cependant, de nombreuses mutuelles prennent en charge plusieurs séances par an, partiellement ou en totalité.",
			"Une facture vous sera remise pour vos démarches.",
		],
	},
	{
		id: "item-6",
		question: "Combien de séances sont nécessaires ?",
		answer: [
			"Tout dépend de votre objectif, de votre parcours et de votre rythme.",
			"Certaines personnes souhaitent une seule consultation, d'autres un suivi régulier.",
			"Nous choisissons ensemble ce qui vous conviendra le mieux.",
		],
	},
	{
		id: "item-7",
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
		id: "item-8",
		question:
			"Mon suivi est-il adapté à mon profil particulier ? (sport, végétarisme, troubles digestifs, etc.)",
		answer: [
			"Oui, chaque accompagnement est personnalisé selon vos besoins, vos préférences, votre état de santé et votre mode de vie.",
			"Je m'adapte à votre situation, quel que soit votre profil.",
			"Mon approche est scientifique, humaine et individualisée.",
		],
	},
	{
		id: "item-9",
		question: "Intervenez-vous en établissement ou en entreprise ?",
		answer: [
			"Oui, je propose des interventions de groupe en établissements de santé, structures médico-sociales, écoles ou entreprises.",
			"Éducation nutritionnelle, ateliers, conférences ou accompagnement de projet : tout est adaptable.",
			"Contactez-moi pour en discuter.",
		],
	},
];
