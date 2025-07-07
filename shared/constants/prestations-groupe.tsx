import { Brain, Calculator, ChefHat, Trophy } from "lucide-react";

export const PRESTATIONS_GROUPE = [
	{
		title: "Sensations alimentaires et équilibre",
		description:
			"Apprenez à reconnaître vos signaux de faim et de satiété pour retrouver une relation apaisée avec l'alimentation et votre corps.",
		icon: <Brain className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Gestion budget menus-courses",
		description:
			"Optimisez votre budget alimentaire grâce à des techniques de planification de menus et de courses intelligentes.",
		icon: <Calculator className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Atelier cuisine",
		description:
			"Découvrez des recettes équilibrées et des techniques culinaires pour préparer des repas savoureux et nutritifs.",
		icon: <ChefHat className="w-8 h-8" aria-hidden="true" />,
	},
	{
		title: "Alimentation et performance sportive",
		description:
			"Adaptez votre alimentation à vos objectifs sportifs pour optimiser vos performances et votre récupération.",
		icon: <Trophy className="w-8 h-8" aria-hidden="true" />,
	},
] as const;
