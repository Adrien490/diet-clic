import { About } from "@/shared/components/about";
import { Contact } from "@/shared/components/contact";
import { FAQ } from "@/shared/components/faq";
import { Hero } from "@/shared/components/hero";
import { Services } from "@/shared/components/services";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Diététicienne Nutritionniste à Nantes - Manon Chaillou",
	description:
		"Manon Chaillou, diététicienne nutritionniste diplômée à Nantes. Consultation personnalisée, rééquilibrage alimentaire, nutrition cardiologie. Prise de rendez-vous en ligne.",
	keywords: [
		"diététicienne Nantes",
		"nutritionniste Nantes",
		"consultation diététique Nantes",
		"rééquilibrage alimentaire Nantes",
		"nutrition cardiologie Nantes",
		"accompagnement obésité Nantes",
		"perte de poids Nantes",
		"nutrition thérapeutique",
		"diététique Loire-Atlantique",
		"rendez-vous nutritionniste Nantes",
		"consultation nutritionnelle personnalisée",
		"diététicienne diplômée Nantes",
		"cabinet diététique Nantes",
		"nutrition clinique Nantes",
		"suivi nutritionnel Nantes",
		"régime alimentaire personnalisé",
		"consultation diététique en ligne",
		"prise en charge nutritionnelle",
	],
};

export default function Home() {
	return (
		<>
			<Hero />
			<About />
			<Services />
			<Contact />
			<FAQ />
		</>
	);
}
