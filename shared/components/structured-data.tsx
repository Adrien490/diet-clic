import Script from "next/script";

export function StructuredData() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "HealthAndBeautyBusiness",
		"@id": "https://manon-dietetique.fr",
		name: "Manon Chaillou - Diététicienne Nutritionniste",
		description:
			"Diététicienne nutritionniste diplômée à Nantes, spécialisée en rééquilibrage alimentaire, nutrition cardiologie, accompagnement obésité et nutrition clinique.",
		url: "https://manon-dietetique.fr",
		telephone: "+33-XX-XX-XX-XX-XX", // À remplacer par le vrai numéro
		email: "contact@manon-dietetique.fr", // À remplacer par le vrai email
		address: {
			"@type": "PostalAddress",
			streetAddress: "Adresse du cabinet", // À remplacer
			addressLocality: "Nantes",
			addressRegion: "Loire-Atlantique",
			postalCode: "44000", // À ajuster
			addressCountry: "FR",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 47.2184, // Coordonnées de Nantes
			longitude: -1.5536,
		},
		openingHours: [
			"Mo-Fr 09:00-18:00", // À ajuster selon les horaires réels
		],
		priceRange: "€€",
		paymentAccepted: "Cash, Credit Card",
		currenciesAccepted: "EUR",
		founder: {
			"@type": "Person",
			name: "Manon Chaillou",
			jobTitle: "Diététicienne Nutritionniste",
			hasOccupation: {
				"@type": "Occupation",
				name: "Diététicienne Nutritionniste",
				occupationLocation: {
					"@type": "City",
					name: "Nantes",
				},
			},
		},
		areaServed: {
			"@type": "City",
			name: "Nantes",
			containedIn: {
				"@type": "AdministrativeArea",
				name: "Loire-Atlantique",
			},
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Services de Diététique et Nutrition",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Consultation Diététique Individuelle",
						description:
							"Consultation personnalisée pour rééquilibrage alimentaire et nutrition thérapeutique",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Nutrition Cardiologie",
						description:
							"Accompagnement nutritionnel spécialisé pour les pathologies cardiovasculaires",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Accompagnement Obésité",
						description:
							"Prise en charge nutritionnelle pour l'accompagnement de l'obésité",
					},
				},
			],
		},
		image: {
			"@type": "ImageObject",
			url: "https://manon-dietetique.fr/manon.png",
			height: 630,
			width: 1200,
		},
		logo: {
			"@type": "ImageObject",
			url: "https://manon-dietetique.fr/manon.png",
			height: 630,
			width: 1200,
		},
		sameAs: [
			// Ajouter les réseaux sociaux si disponibles
			// "https://www.facebook.com/...",
			// "https://www.instagram.com/...",
			// "https://www.linkedin.com/in/...",
		],
	};

	return (
		<Script
			id="structured-data"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}
