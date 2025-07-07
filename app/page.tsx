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
		"consultation diététique",
		"rééquilibrage alimentaire",
		"nutrition cardiologie",
		"perte de poids",
		"nutrition thérapeutique",
		"diététique Loire-Atlantique",
		"rendez-vous nutritionniste",
	],
	alternates: {
		canonical: "https://manon-dietetique.fr",
	},
	openGraph: {
		title: "Diététicienne Nutritionniste à Nantes - Manon Chaillou",
		description:
			"Consultation personnalisée avec Manon Chaillou, diététicienne nutritionniste diplômée à Nantes. Spécialisée en rééquilibrage alimentaire et nutrition cardiologie.",
		url: "https://manon-dietetique.fr",
		images: [
			{
				url: "/manon.png",
				width: 1200,
				height: 630,
				alt: "Manon Chaillou - Diététicienne Nutritionniste à Nantes",
			},
		],
	},
	twitter: {
		title: "Diététicienne Nutritionniste à Nantes - Manon Chaillou",
		description:
			"Consultation personnalisée avec Manon Chaillou, diététicienne nutritionniste diplômée à Nantes. Spécialisée en rééquilibrage alimentaire et nutrition cardiologie.",
		images: ["/manon.png"],
	},
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
