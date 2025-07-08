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
			"J'ai obtenu un Bachelor Universitaire de Technologie (BUT) en Génie Biologique – parcours Diététique et Nutrition à l'IUT de Nancy, une formation qualitative reconnue par l'État permettant d'exercer en tant que diététicienne nutritionniste (titre protégé).",
			"Je suis également titulaire d'un Diplôme Universitaire en Éducation Thérapeutique du Patient, qui enrichit ma pratique d'une approche éducative et collaborative.",
			"J'ai d'abord exercé en milieu hospitalier (cardiologie, obésité, gériatrie, pédiatrie, interventions à domicile).",
			"Et aujourd'hui, je travaille aussi en libéral, pour accompagner chacun au plus près de son quotidien, avec des changements concrets et durables.",
		],
	},
	{
		id: 2,
		icon: <Heart className="h-6 w-6" />,
		title: "Mes valeurs",
		description: [
			"Mon accompagnement repose sur des valeurs humaines fortes : la bienveillance, l'écoute, l'adaptation. Je propose une approche sans restriction, sans calculs, sans rien d'imposé ou de drastique (hors cas de prescription médicale).",
			"Je veille à proposer des conseils simples, concrets, applicables, qui tiennent compte de votre réalité : des outils qui s'inscrivent dans la durée, et qui peuvent évoluer avec vous.",
			"« L'alimentation ne doit pas être un problème. Elle peut et doit rester un plaisir, accessible, serein »",
		],
	},
	{
		id: 3,
		icon: <Search className="h-6 w-6" />,
		title: "Mon approche",
		description: [
			"Mon approche est individuelle, scientifique, et personnalisée. Elle repose sur une démarche rigoureuse, nourrie par les dernières recommandations officielles et par des sources fiables : pas de régime à la mode ni de croyances alimentaires.",
			"Je travaille aussi avec une approche comportementale, fondée sur la relation de confiance. Nous prenons le temps d'explorer ensemble votre vécu alimentaire, vos habitudes, votre histoire personnelle. Car votre rapport à l'alimentation est unique.",
			"Enfin, le suivi est totalement personnalisé. Je pars de vous, de vos habitudes, de vos contraintes, de vos valeurs. Ensemble, nous construisons un chemin vers une alimentation plus adaptée.",
		],
	},
];
