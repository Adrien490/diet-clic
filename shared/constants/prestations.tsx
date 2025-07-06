import { Scale, Heart, Users, Stethoscope } from "lucide-react";

export const PRESTATIONS = [
	{
		title: "Équilibre alimentaire et poids",
		description:
			"Accompagnement personnalisé pour retrouver un équilibre alimentaire durable et atteindre vos objectifs de poids en toute bienveillance.",
		icon: <Scale className="w-8 h-8" />,
	},
	{
		title: "Alimentation de la femme",
		description:
			"Suivi nutritionnel adapté aux différentes étapes de la vie féminine : grossesse, allaitement, ménopause et cycles hormonaux.",
		icon: <Heart className="w-8 h-8" />,
	},
	{
		title: "Alimentation et dénutrition",
		description:
			"Prise en charge nutritionnelle spécialisée pour prévenir et traiter la dénutrition chez les personnes âgées ou fragilisées.",
		icon: <Users className="w-8 h-8" />,
	},
	{
		title: "Alimentation et pathologie",
		description:
			"Accompagnement nutritionnel thérapeutique pour les pathologies chroniques : diabète, maladies cardiovasculaires, troubles digestifs.",
		icon: <Stethoscope className="w-8 h-8" />,
	},
];
