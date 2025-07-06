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
			className="py-16 lg:py-24 bg-muted/50"
			aria-label="Questions fréquentes"
			role="region"
			aria-labelledby="faq-title"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
				<div className="text-left mb-12">
					<h2
						id="faq-title"
						className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
					>
						Questions les plus fréquentes
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl">
						Retrouvez ici les réponses aux questions les plus courantes
						concernant mes consultations diététiques.
					</p>
				</div>

				<div className="max-w-4xl">
					<Accordion
						type="single"
						collapsible
						className="w-full"
						defaultValue="item-1"
					>
						{FAQ_ITEMS.map((item: FAQItem) => (
							<AccordionItem key={item.id} value={item.id}>
								<AccordionTrigger className="text-left justify-start">
									{item.question}
								</AccordionTrigger>
								<AccordionContent className="flex flex-col gap-4 text-left">
									{item.answer.map((paragraph: string, index: number) => (
										<p key={index}>{paragraph}</p>
									))}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
