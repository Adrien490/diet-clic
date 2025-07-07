"use client";

import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export function Hero() {
	return (
		<section
			id="main-content"
			aria-labelledby="hero-title"
			className="flex items-center justify-center w-full flex-col px-4 min-h-screen"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-20">
				<div className="text-center space-y-8">
					{/* Titre principal */}
					<h1
						id="hero-title"
						className="text-center bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-4xl md:text-6xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
					>
						Manon Chaillou
						<br />
						Diététicienne Nutritionniste
					</h1>

					{/* Description */}
					<p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-center relative z-20">
						Votre partenaire pour une alimentation équilibrée. Consultations
						personnalisées pour tous vos objectifs nutritionnels.
					</p>

					{/* Boutons */}
					<div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center relative z-20">
						<Button
							asChild
							size="lg"
							className="text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						>
							<Link
								href="/contact"
								aria-label="Prendre rendez-vous avec Manon Chaillou, diététicienne nutritionniste"
							>
								Prendre rendez-vous
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						>
							<Link
								href="#about"
								aria-label="En savoir plus sur les services de Manon Chaillou, diététicienne nutritionniste"
							>
								En savoir plus
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
