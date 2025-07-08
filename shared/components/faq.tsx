import { FAQ_ITEMS, type FAQItem } from "../constants/faq-items";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
	return (
		<section
			id="faq"
			itemScope
			itemType="https://schema.org/FAQPage"
			className="py-16 lg:py-24 bg-muted/50"
			aria-label="Questions fréquentes sur la diététique et nutrition"
			role="region"
			aria-labelledby="faq-title"
			aria-describedby="faq-description"
			data-voice-queries="questions diététique nantes,faq nutritionniste,consultation diététique questions"
			data-content-type="faq-healthcare"
			data-ai-category="healthcare-nutrition-faq"
		>
			<p className="sr-only">
				Questions fréquentes sur les consultations de diététique avec Manon
				Chaillou à Nantes. Informations sur les tarifs, déroulement des
				consultations, spécialisations nutritionnelles.
			</p>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				<div className="text-left mb-12">
					<h2
						id="faq-title"
						className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
					>
						Questions fréquentes - Diététique
					</h2>
					<p
						id="faq-description"
						className="text-lg text-foreground/80 max-w-2xl"
					>
						Retrouvez ici les réponses aux questions les plus courantes
						concernant mes consultations diététiques, les tarifs, les
						spécialisations et le déroulement des rendez-vous à Nantes ou en
						téléconsultation.
					</p>
				</div>

				<div className="max-w-4xl">
					<Accordion
						type="single"
						collapsible
						className="w-full"
						defaultValue="item-1"
					>
						{FAQ_ITEMS.map((item: FAQItem, index: number) => (
							<AccordionItem
								key={item.id}
								value={item.id}
								itemScope
								itemType="https://schema.org/Question"
							>
								<AccordionTrigger
									className="text-left justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
									aria-describedby={`faq-${item.id}-description`}
								>
									<span itemProp="name">{item.question}</span>
								</AccordionTrigger>
								<AccordionContent
									className="flex flex-col gap-4 text-left"
									itemScope
									itemType="https://schema.org/Answer"
									itemProp="acceptedAnswer"
								>
									<div id={`faq-${item.id}-description`} className="sr-only">
										Réponse à la question {index + 1} : {item.question}
									</div>
									<div itemProp="text">
										{item.answer.map(
											(paragraph: string, paragraphIndex: number) => (
												<p
													key={paragraphIndex}
													className="text-foreground/90 mb-4 last:mb-0"
												>
													{paragraph}
												</p>
											)
										)}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
