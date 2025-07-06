import { ContactForm } from "./contact-form";

export function ContactSection() {
	return (
		<section
			id="contact"
			className="py-20 px-4"
			aria-labelledby="contact-title"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					{/* Header de la section */}
					<div className="text-center mb-16">
						<h2
							id="contact-title"
							className="text-3xl md:text-4xl font-bold text-foreground mb-4"
						>
							Prenons contact
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Prêt·e à commencer votre parcours nutritionnel ? Remplissez ce
							formulaire et je vous recontacterai dans les plus brefs délais.
						</p>
					</div>

					{/* Formulaire dans une card */}
					<div className="bg-background border border-border/50 rounded-xl p-8 shadow-sm">
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	);
}
