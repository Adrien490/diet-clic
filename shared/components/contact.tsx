import { ContactForm } from "./contact-form";

export function Contact() {
	return (
		<section
			id="contact"
			className="py-16 lg:py-24 bg-background"
			aria-label="Contact et prise de rendez-vous avec Manon Chaillou, diététicienne nutritionniste à Nantes"
			role="region"
			aria-labelledby="contact-title"
			aria-describedby="contact-description"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				<div className="text-left mb-12">
					<h2
						id="contact-title"
						className="text-3xl lg:text-4xl font-bold text-foreground mb-6"
					>
						Contactez-moi
					</h2>
					<p
						id="contact-description"
						className="text-lg text-muted-foreground max-w-3xl"
					>
						Prenez rendez-vous pour une consultation diététique personnalisée ou
						posez-moi vos questions. Je vous réponds dans les plus brefs délais
						pour vous accompagner dans votre parcours nutritionnel à Nantes ou
						en téléconsultation.
					</p>
				</div>

				{/* Formulaire de contact */}
				<div className="bg-muted/20 p-6 rounded-lg border border-border/30">
					<h3 className="text-xl font-semibold text-foreground mb-6">
						Formulaire de contact
					</h3>
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
