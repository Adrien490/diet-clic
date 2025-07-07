import { GraduationCap, Heart, Search } from "lucide-react";

export interface AboutStep {
	id: number;
	icon: React.ReactNode;
	title: string;
	description: string[];
}

export const ABOUT_STEPS: AboutStep[] = [
	{
		id: 1,
		icon: <GraduationCap className="h-6 w-6" />,
		title: "Mon parcours",
		description: [
			"J'ai obtenu un Bachelor Universitaire de Technologie (BUT) en Génie Biologique – parcours Diététique et Nutrition à l'IUT de Nancy, une formation reconnue pour sa qualité.",
			"Ce diplôme, validé par l'État, me permet d'exercer le métier de diététicienne nutritionniste, un titre protégé. J'ai également complété mon cursus avec un Diplôme Universitaire en Éducation Thérapeutique du Patient (ETP).",
			"Mon expérience professionnelle s'est construite en milieu hospitalier : en cardiologie à Lunéville, dans un centre spécialisé dans l'obésité aux Trois-Épis, en gériatrie et en pédiatrie au CHU de Nantes, ainsi que lors d'interventions à domicile.",
			"Aujourd'hui, j'exerce également en libéral pour accompagner les personnes dans leur quotidien, au plus près de leurs besoins, pour des changements durables et concrets.",
		],
	},
	{
		id: 2,
		icon: <Heart className="h-6 w-6" />,
		title: "Mes valeurs",
		description: [
			"Mon accompagnement repose sur des valeurs humaines fortes : la bienveillance, l'écoute, l'adaptation.",
			"Je propose une approche sans restriction, sans calculs, sans rien d'imposé ou de drastique (hors cas de prescription médicale).",
			"L'alimentation ne doit pas être un problème. Elle ne doit pas devenir une charge mentale. Elle peut et doit rester un plaisir, accessible, serein.",
			"Je veille à proposer des conseils simples, concrets, applicables, qui tiennent compte de votre réalité. Des outils qui s'inscrivent dans la durée, et qui peuvent évoluer avec vous.",
		],
	},
	{
		id: 3,
		icon: <Search className="h-6 w-6" />,
		title: "Mon approche",
		description: [
			"Mon approche est individuelle, scientifique, et personnalisée. Elle repose sur une démarche rigoureuse, nourrie par les dernières recommandations officielles : pas de régime à la mode, ni de croyances alimentaires.",
			"Je travaille aussi avec une approche comportementale, fondée sur la relation de confiance. Nous prenons le temps d'explorer ensemble votre vécu alimentaire, vos habitudes, votre histoire personnelle. Car votre rapport à l'alimentation est unique.",
			"Le suivi est totalement personnalisé. Je pars de vous, de vos habitudes, de vos contraintes, de vos valeurs. Ensemble, nous construisons un chemin vers une alimentation plus apaisée.",
		],
	},
];
