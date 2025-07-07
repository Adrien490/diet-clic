import { PRESTATIONS } from "@/shared/constants/prestations";
import { User, Users } from "lucide-react";
import { PRESTATIONS_GROUPE } from "../constants/prestations-groupe";
import { ServiceItem } from "./service-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Services() {
	return (
		<section
			id="services"
			className="py-16 lg:py-24 bg-muted/50"
			aria-label="Prestations et services de diététique à Nantes"
			role="region"
			aria-labelledby="services-title"
			aria-describedby="services-description"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				<div className="text-left mb-16">
					<h2
						id="services-title"
						className="text-3xl lg:text-4xl font-bold text-foreground mb-6"
					>
						Consultations diététique et nutrition à Nantes
					</h2>
					<p
						id="services-description"
						className="text-lg text-foreground/80 max-w-3xl"
					>
						Consultations personnalisées et accompagnement nutritionnel adapté à
						vos besoins. Que ce soit pour un rééquilibrage alimentaire, une
						perte de poids ou un suivi thérapeutique, je vous propose un
						accompagnement bienveillant et professionnel à Nantes ou en
						téléconsultation.
					</p>
				</div>

				<Tabs defaultValue="individuelles" className="w-full">
					<TabsList className="grid w-full grid-cols-2 bg-background/70 backdrop-blur-sm border border-border/50 rounded-xl p-2 h-auto gap-2 shadow-sm">
						<TabsTrigger
							value="individuelles"
							className="flex items-center gap-3 px-6 py-4 text-base font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						>
							<User className="w-5 h-5" aria-hidden="true" />
							<span className="hidden sm:inline">Prestations</span>
							<span className="font-semibold">individuelles</span>
						</TabsTrigger>
						<TabsTrigger
							value="groupe"
							className="flex items-center gap-3 px-6 py-4 text-base font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						>
							<Users className="w-5 h-5" aria-hidden="true" />
							<span className="hidden sm:inline">Prestations de</span>
							<span className="font-semibold">groupe</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="individuelles"
						className="mt-12 focus:outline-none"
					>
						<div className="text-left mb-8">
							<h3
								id="services-individual-title"
								className="text-2xl md:text-3xl font-bold text-foreground mb-4"
							>
								Consultations individuelles de diététique
							</h3>
							<p className="text-lg text-foreground/80 max-w-2xl">
								Accompagnement personnalisé et sur mesure pour atteindre vos
								objectifs nutritionnels dans le respect de vos habitudes
								alimentaires et de votre mode de vie.
							</p>
						</div>

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
					</TabsContent>

					<TabsContent value="groupe" className="mt-12 focus:outline-none">
						<div className="text-left mb-8">
							<h3
								id="services-group-title"
								className="text-2xl md:text-3xl font-bold text-foreground mb-4"
							>
								Ateliers collectifs de nutrition à Nantes
							</h3>
							<p className="text-lg text-foreground/80 max-w-2xl">
								Participez à des ateliers collectifs pour apprendre, échanger et
								partager autour de l&apos;alimentation dans une ambiance
								conviviale et éducative.
							</p>
						</div>

						<div
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
							role="list"
							aria-labelledby="services-group-title"
						>
							{PRESTATIONS_GROUPE.map((prestation, index) => (
								<div key={prestation.title} role="listitem">
									<ServiceItem
										{...prestation}
										index={index + PRESTATIONS.length}
									/>
								</div>
							))}
						</div>
					</TabsContent>
				</Tabs>

				{/* Section d'information supplémentaire avec mots-clés longue traîne */}
				<aside className="mt-16 text-center">
					<div className="bg-background/50 p-8 rounded-lg border border-border/50">
						<h3 className="text-xl font-semibold text-foreground mb-4">
							Pourquoi consulter une diététicienne nutritionniste à Nantes ?
						</h3>
						<div className="grid md:grid-cols-2 gap-6 text-left">
							<div>
								<h4 className="font-medium text-foreground mb-2">
									Expertise professionnelle
								</h4>
								<p className="text-sm text-foreground/80">
									Diplômée en diététique et nutrition, je vous accompagne avec
									une approche scientifique et personnalisée pour votre
									équilibre alimentaire et votre bien-être.
								</p>
							</div>
							<div>
								<h4 className="font-medium text-foreground mb-2">
									Suivi personnalisé
								</h4>
								<p className="text-sm text-foreground/80">
									Chaque consultation est adaptée à vos besoins spécifiques, vos
									objectifs et votre mode de vie pour un accompagnement
									nutritionnel durable et efficace.
								</p>
							</div>
							<div>
								<h4 className="font-medium text-foreground mb-2">
									Approche bienveillante
								</h4>
								<p className="text-sm text-foreground/80">
									Sans régime restrictif ni contrainte, je privilégie une
									démarche respectueuse de votre relation à l&apos;alimentation
									pour retrouver le plaisir de manger.
								</p>
							</div>
							<div>
								<h4 className="font-medium text-foreground mb-2">
									Localisation pratique
								</h4>
								<p className="text-sm text-foreground/80">
									Cabinet situé à Nantes (Loire-Atlantique) avec possibilité de
									consultations à domicile et téléconsultations pour
									s&apos;adapter à vos contraintes.
								</p>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</section>
	);
}
