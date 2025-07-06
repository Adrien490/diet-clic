import { ABOUT_STEPS, type AboutStep } from "../constants/about-steps";

export function About() {
	return (
		<section
			id="about"
			className="py-16 lg:py-24 bg-background min-h-screen"
			aria-label="À propos de moi"
			role="region"
			aria-labelledby="about-title"
			aria-describedby="about-description"
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-left mb-12">
					<h2
						id="about-title"
						className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
					>
						À propos de moi
					</h2>
					<p
						id="about-description"
						className="text-lg text-muted-foreground max-w-2xl"
					>
						Manon Chaillou, diététicienne nutritionniste diplômée
					</p>
				</div>

				{/* Timeline responsive */}
				<div className="relative">
					{/* Ligne horizontale pour desktop */}
					<div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-border/30 rounded-full" />

					{/* Ligne verticale pour mobile */}
					<div className="lg:hidden absolute left-8 top-0 bottom-0 w-1 bg-border/30 rounded-full" />

					{/* Étapes du parcours */}
					<div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-12 lg:space-y-0">
						{ABOUT_STEPS.map((step: AboutStep, index: number) => (
							<article
								key={step.id}
								className="flex flex-col lg:items-start lg:w-1/3 relative"
								aria-labelledby={`about-${step.id}-title`}
							>
								{/* Layout mobile : horizontal */}
								<div className="flex items-start lg:flex-col lg:items-start">
									{/* Bulle décorative */}
									<div className="relative z-10 lg:mb-8 flex-shrink-0">
										<div className="w-16 h-16 rounded-full border-4 border-background bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
											{step.icon}
										</div>
									</div>

									{/* Contenu */}
									<div
										className={`ml-6 lg:ml-0 lg:px-4 ${
											index === 0 ? "lg:pl-0" : index === 2 ? "lg:pr-0" : ""
										}`}
									>
										<h3
											id={`about-${step.id}-title`}
											className="text-xl font-semibold text-foreground mb-4 text-left"
										>
											{step.title}
										</h3>
										<div className="text-sm text-muted-foreground leading-relaxed text-left space-y-3">
											{step.description.map(
												(paragraph: string, paragraphIndex: number) => (
													<p key={paragraphIndex}>{paragraph}</p>
												)
											)}
										</div>
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
