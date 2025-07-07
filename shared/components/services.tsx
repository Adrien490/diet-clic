import { PRESTATIONS } from "@/shared/constants/prestations";
import { Brain, Calculator, ChefHat, Trophy } from "lucide-react";
import { ServiceItem } from "./service-item";

const PRESTATIONS_GROUPE = [
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
];

export function Services() {
	return (
		<section
			id="services"
			className="py-20 bg-background"
			aria-labelledby="services-title"
			role="region"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				{/* Titre principal caché mais accessible */}
				<h2 id="services-title" className="sr-only">
					Nos services de diététique
				</h2>

				{/* Section prise en charge diététique */}
				<div className="mb-20">
					<div className="text-left mb-8">
						<h3
							id="services-individual-title"
							className="text-2xl md:text-3xl font-bold text-foreground mb-4"
						>
							Prise en charge diététique
						</h3>
						<p className="text-lg text-foreground/80 max-w-2xl">
							Accompagnement personnalisé pour vos besoins nutritionnels
						</p>
					</div>

					{/* Grille de prestations individuelles */}
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
						role="list"
						aria-labelledby="services-individual-title"
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
						<h3
							id="services-group-title"
							className="text-2xl md:text-3xl font-bold text-foreground mb-4"
						>
							Prestations de groupe
						</h3>
						<p className="text-lg text-foreground/80 max-w-2xl">
							Des ateliers collectifs pour apprendre et partager autour de
							l&apos;alimentation
						</p>
					</div>

					{/* Grille des prestations de groupe */}
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
						role="list"
						aria-labelledby="services-group-title"
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
