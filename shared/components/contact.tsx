import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Contact() {
	return (
		<section
			id="contact"
			className="py-16 lg:py-24 bg-background"
			aria-label="Contact et prise de rendez-vous avec Manon Chaillou, diététicienne nutritionniste à Nantes"
			role="region"
			data-voice-queries="prendre rendez-vous diététicienne nantes,contacter nutritionniste,cabinet diététique nantes"
			data-business-hours="rendez-vous"
			data-contact-methods="téléphone,email,formulaire"
			itemScope
			itemType="https://schema.org/LocalBusiness"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				<div className="text-left mb-12">
					<h2
						id="contact-title"
						className="text-3xl lg:text-4xl font-bold text-foreground mb-6"
					>
						Contact - Prendre rendez-vous à Nantes
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

				{/* Informations de contact compactes */}
				<div className="bg-muted/20 p-6 rounded-lg border border-border/30 mb-8">
					<h3 className="text-xl font-semibold text-foreground mb-6">
						Coordonnées de contact
					</h3>

					<div
						itemScope
						itemType="https://schema.org/ContactPoint"
						className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
					>
						{/* Téléphone */}
						<div className="flex items-center gap-2">
							<Phone
								className="w-4 h-4 text-primary flex-shrink-0"
								aria-hidden="true"
							/>
							<div className="min-w-0">
								<p className="text-sm font-medium text-foreground">Téléphone</p>
								<Link
									href="tel:+33781515310"
									itemProp="telephone"
									className="text-sm text-muted-foreground hover:text-primary transition-colors"
									aria-label="Appeler Manon Chaillou pour prendre rendez-vous"
								>
									07 81 51 53 10
								</Link>
							</div>
						</div>

						{/* Email */}
						<div className="flex items-center gap-2 min-w-0 overflow-hidden">
							<Mail
								className="w-4 h-4 text-primary flex-shrink-0"
								aria-hidden="true"
							/>
							<div className="min-w-0 flex-1 overflow-hidden">
								<p className="text-sm font-medium text-foreground">Email</p>
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											href={`mailto:${process.env.ADMIN_EMAIL}`}
											itemProp="email"
											className="text-sm text-muted-foreground hover:text-primary transition-colors block truncate max-w-full"
											aria-label="Envoyer un email à Manon Chaillou"
											aria-describedby="email-tooltip"
										>
											{process.env.ADMIN_EMAIL}
										</Link>
									</TooltipTrigger>
									<TooltipContent id="email-tooltip" role="tooltip">
										<p>{process.env.ADMIN_EMAIL}</p>
									</TooltipContent>
								</Tooltip>
							</div>
						</div>

						{/* Zone d'intervention */}
						<div className="flex items-center gap-2">
							<MapPin
								className="w-4 h-4 text-primary flex-shrink-0"
								aria-hidden="true"
							/>
							<div
								className="min-w-0"
								itemProp="areaServed"
								itemScope
								itemType="https://schema.org/City"
							>
								<p className="text-sm font-medium text-foreground">
									Zone d&apos;intervention
								</p>
								<div className="text-sm text-muted-foreground">
									<span itemProp="name">Nantes</span> et environs
								</div>
							</div>
						</div>
					</div>

					{/* Note sur les consultations */}
					<div className="mt-4 p-3 bg-primary/10 rounded-lg">
						<p className="text-sm text-foreground/80">
							💡 <strong>Consultations :</strong> À domicile sur Nantes et
							environs, ou en téléconsultation selon vos préférences
						</p>
					</div>
				</div>

				{/* Formulaire de contact - Pleine largeur */}
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
