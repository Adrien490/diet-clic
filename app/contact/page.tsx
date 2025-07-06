import { ContactForm } from "@/shared/components/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact - Manon Diététique",
	description:
		"Prenez rendez-vous ou posez votre question nutritionnelle. Consultation diététique personnalisée pour retrouver l'équilibre alimentaire.",
};

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section
				role="region"
				aria-label="Contactez-moi"
				className="py-16 lg:py-24"
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="mb-12">
						<h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
							Contactez-moi
						</h1>
						<p className="text-lg text-muted-foreground max-w-3xl">
							Prenez rendez-vous pour une consultation diététique personnalisée
							ou posez-moi vos questions. Je vous réponds rapidement pour
							commencer ensemble votre parcours vers une alimentation
							équilibrée.
						</p>
					</div>

					<ContactForm />
				</div>
			</section>
		</div>
	);
}
