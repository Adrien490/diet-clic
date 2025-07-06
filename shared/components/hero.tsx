"use client";

import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
	return (
		<section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
					<div className="flex flex-col justify-center space-y-6">
						<div className="space-y-4">
							<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
								Manon Chaillou
							</h1>
							<p className="text-xl text-muted-foreground sm:text-2xl lg:text-3xl">
								Diététicienne Nutritionniste
							</p>
						</div>
						<p className="text-lg text-muted-foreground sm:text-xl">
							Votre partenaire pour une alimentation équilibrée. Consultations
							personnalisées pour tous vos objectifs nutritionnels.
						</p>
						<div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
							<Button asChild size="lg" className="text-base">
								<Link href="/contact">Prendre rendez-vous</Link>
							</Button>
							<Button asChild variant="outline" size="lg" className="text-base">
								<a href="#about">En savoir plus</a>
							</Button>
						</div>
					</div>
					<div className="flex justify-center lg:justify-end">
						<div className="relative">
							<div className="relative h-72 w-72 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-2xl sm:h-80 sm:w-80 lg:h-[420px] lg:w-[340px]">
								<Image
									src="/manon.png"
									alt="Manon Chaillou, diététicienne nutritionniste"
									fill
									className="object-cover object-center"
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
