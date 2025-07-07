import Image from "next/image";
import { ABOUT_STEPS, type AboutStep } from "../constants/about-steps";

export function About() {
	return (
		<section
			id="about"
			className="py-16 lg:py-24 bg-background min-h-screen"
			aria-label="À propos de Manon Chaillou, diététicienne nutritionniste à Nantes"
			role="region"
			aria-labelledby="about-title"
			aria-describedby="about-description"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-left mb-12">
					{/* Titre, description et photo alignés */}
					<div className="flex flex-col sm:flex-row sm:items-start sm:gap-6 mb-8">
						<div className="flex-1">
							<h2
								id="about-title"
								className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
							>
								À propos
							</h2>
							<p
								id="about-description"
								className="text-lg text-muted-foreground max-w-2xl"
							>
								Forte de mon expérience hospitalière en cardiologie, nutrition
								de l&apos;obésité, gériatrie et pédiatrie au CHU de Nantes,
								j&apos;exerce également en libéral pour un accompagnement
								personnalisé et bienveillant.
							</p>
						</div>

						{/* Photo optimisée SEO */}
						<div className="flex-shrink-0 mt-4 sm:mt-0">
							<div className="relative h-32 w-32 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg sm:h-36 sm:w-36">
								<Image
									src="/manon.png"
									alt="Manon Chaillou, diététicienne nutritionniste diplômée à Nantes - Portrait professionnel"
									fill
									className="object-cover object-center"
									priority
									quality={90}
									sizes="(max-width: 640px) 128px, 144px"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Timeline responsive */}
				<div className="relative">
					{/* Ligne horizontale pour desktop */}
					<div
						className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-border/30 rounded-full"
						aria-hidden="true"
					/>

					{/* Étapes du parcours professionnel */}
					<div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12">
						{ABOUT_STEPS.map((step: AboutStep) => (
							<article
								key={step.id}
								className="flex flex-col items-start lg:w-1/3 relative text-left focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg p-2 -m-2"
								aria-labelledby={`about-${step.id}-title`}
								tabIndex={0}
							>
								<div className="relative z-10 mb-6 flex-shrink-0">
									<div className="w-16 h-16 rounded-full border-4 border-background bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
										<span aria-hidden="true">{step.icon}</span>
									</div>
								</div>

								<div>
									<h3
										id={`about-${step.id}-title`}
										className="text-xl font-semibold text-foreground mb-4 text-left"
									>
										{step.title}
									</h3>
									<div className="text-sm text-foreground/90 leading-relaxed text-left space-y-3">
										{step.description.map(
											(paragraph: string, paragraphIndex: number) => (
												<p key={paragraphIndex}>{paragraph}</p>
											)
										)}
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
