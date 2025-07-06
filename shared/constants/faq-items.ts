export interface FAQItem {
	id: string;
	question: string;
	answer: string[];
}

export const FAQ_ITEMS: FAQItem[] = [
	{
		id: "item-1",
		question: "Combien coûte une consultation et quelle est sa durée ?",
		answer: [
			"Une première consultation dure environ 1h à 1h15 et coûte 60€. Les consultations de suivi durent 45 minutes et coûtent 45€.",
			"Ce temps nous permet d'établir un bilan complet de vos habitudes alimentaires, de vos objectifs et de construire ensemble un plan personnalisé.",
		],
	},
	{
		id: "item-2",
		question: "Les consultations sont-elles remboursées ?",
		answer: [
			"Les consultations diététiques ne sont pas remboursées par la Sécurité sociale. Cependant, de nombreuses mutuelles proposent une prise en charge partielle ou totale.",
			"Je vous remets systématiquement une facture que vous pouvez transmettre à votre mutuelle. N'hésitez pas à vous renseigner auprès de votre assurance complémentaire.",
		],
	},
	{
		id: "item-3",
		question: "Proposez-vous des téléconsultations ?",
		answer: [
			"Oui, je propose des consultations à distance via visioconférence. Cette option est particulièrement adaptée pour les suivis ou si vous avez des difficultés de déplacement.",
			"La première consultation se fait de préférence en présentiel pour un bilan plus complet, mais nous pouvons nous adapter selon vos besoins et contraintes.",
		],
	},
	{
		id: "item-4",
		question: "Comment me préparer pour ma première consultation ?",
		answer: [
			"Pour optimiser notre première rencontre, je vous recommande de tenir un carnet alimentaire sur 3 à 7 jours avant la consultation. Notez tout ce que vous mangez et buvez, avec les quantités approximatives.",
			"Apportez également vos dernières analyses biologiques si vous en avez, ainsi que la liste de vos traitements médicaux en cours.",
		],
	},
	{
		id: "item-5",
		question: "Proposez-vous des régimes restrictifs ?",
		answer: [
			"Non, je ne propose pas de régimes restrictifs. Mon approche se base sur un rééquilibrage alimentaire progressif et durable, sans privation excessive ni interdits alimentaires.",
			"L'objectif est de vous aider à retrouver une relation saine avec l'alimentation, en intégrant vos goûts, votre mode de vie et vos objectifs de santé.",
		],
	},
	{
		id: "item-6",
		question: "Combien de temps faut-il pour voir des résultats ?",
		answer: [
			"Les premiers changements se ressentent généralement après 2 à 4 semaines : amélioration de la digestion, de l'énergie et du sommeil. Les résultats sur le poids, s'il y a lieu, sont progressifs et durables.",
			"Chaque personne est unique, et les résultats dépendent de nombreux facteurs. L'important est de construire ensemble des habitudes pérennes pour votre santé.",
		],
	},
	{
		id: "item-7",
		question: "Recevez-vous des enfants et adolescents ?",
		answer: [
			"Oui, je reçois des enfants et adolescents, toujours accompagnés d'un parent ou tuteur. L'approche est adaptée à leur âge et privilégie l'éducation nutritionnelle ludique.",
			"Pour les plus jeunes, l'accent est mis sur la découverte des aliments et le plaisir de manger, sans notion de restriction. L'implication de toute la famille est souvent bénéfique.",
		],
	},
	{
		id: "item-8",
		question: "À quelle fréquence dois-je venir en consultation ?",
		answer: [
			"Après la première consultation, je recommande généralement un suivi toutes les 3 à 4 semaines au début, puis l'espacement peut se faire progressivement selon vos besoins et votre autonomie.",
			"La fréquence dépend de vos objectifs, de votre motivation et de votre situation. Nous adaptons ensemble le rythme qui vous convient le mieux.",
		],
	},
];
