import { PRESTATIONS } from "@/shared/constants/prestations";
import { Brain, Calculator, ChefHat, Trophy } from "lucide-react";
import { ServiceItem } from "./service-item";

const PRESTATIONS_GROUPE = [
	{
		title: "Sensations alimentaires et équilibre",
		description:
			"Apprenez à reconnaître vos signaux de faim et de satiété pour retrouver une relation apaisée avec l'alimentation et votre corps.",
		icon: <Brain className="w-8 h-8" />,
	},
	{
		title: "Gestion budget menus-courses",
		description:
			"Optimisez votre budget alimentaire grâce à des techniques de planification de menus et de courses intelligentes.",
		icon: <Calculator className="w-8 h-8" />,
	},
	{
		title: "Atelier cuisine",
		description:
			"Découvrez des recettes équilibrées et des techniques culinaires pour préparer des repas savoureux et nutritifs.",
		icon: <ChefHat className="w-8 h-8" />,
	},
	{
		title: "Alimentation et performance sportive",
		description:
			"Adaptez votre alimentation à vos objectifs sportifs pour optimiser vos performances et votre récupération.",
		icon: <Trophy className="w-8 h-8" />,
	},
];

export function Services() {
	return (
		<section id="services" className="py-20 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				{/* Section prise en charge diététique */}
				<div className="mb-20">
					<div className="text-left mb-8">
						<h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
							Prise en charge diététique
						</h3>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Accompagnement personnalisé pour vos besoins nutritionnels
						</p>
					</div>

					{/* Grille de prestations individuelles */}
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
						role="list"
					>
						{PRESTATIONS.map((prestation, index) => (
							<div key={prestation.title} role="listitem">
								<ServiceItem {...prestation} index={index} />
							</div>
						))}
					</div>
				</div>

				{/* Section prestations de groupe */}
				<div>
					<div className="text-left mb-8">
						<h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
							Prestations de groupe
						</h3>
						<p className="text-lg text-muted-foreground max-w-2xl">
							Des ateliers collectifs pour apprendre et partager autour de
							l&apos;alimentation
						</p>
					</div>

					{/* Grille des prestations de groupe */}
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
						role="list"
					>
						{PRESTATIONS_GROUPE.map((prestation, index) => (
							<div key={prestation.title} role="listitem">
								<ServiceItem {...prestation} index={index} />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
