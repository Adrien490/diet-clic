import { navbarItems } from "@/shared/constants/navbar-items";
import { cn } from "@/shared/utils";
import { Heart } from "lucide-react";
import Link from "next/link";

const legalLinks = [
	{ label: "Mentions légales", href: "/legal" },
	{ label: "Confidentialité", href: "/privacy" },
];

const officialSources = [
	{ label: "ANSES", href: "https://www.anses.fr", external: true },

	{
		label: "Mangerbouger.fr",
		href: "https://www.mangerbouger.fr",
		external: true,
	},
	{
		label: "AFDN",
		href: "https://www.afdn.org",
		external: true,
	},
];

export function Footer() {
	return (
		<footer className="relative" role="contentinfo">
			{/* Grille de fond subtile */}
			<div className={cn("absolute inset-0 opacity-50")} aria-hidden="true" />

			{/* Dégradé radial pour effet de focus */}
			<div
				className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
				aria-hidden="true"
			/>

			<div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
				{/* Navigation principale */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{/* Logo */}
					<div>
						<Link
							href="/"
							className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md p-1 -m-1"
							aria-label="Manon Diététique - Retour à l'accueil"
						>
							<Heart className="h-6 w-6 text-primary" aria-hidden="true" />
							<span className="text-lg font-bold text-foreground">
								Manon Diététique
							</span>
						</Link>

						<p className="text-sm text-foreground/70">
							Votre équilibre nutritionnel sur mesure
						</p>
					</div>

					{/* Navigation */}
					<nav aria-labelledby="footer-nav-title">
						<h3
							id="footer-nav-title"
							className="font-medium text-foreground mb-3 text-sm"
						>
							Navigation
						</h3>
						<ul className="space-y-2" role="list">
							{navbarItems.map((item, index) => (
								<li key={index} role="listitem">
									<Link
										href={item.href}
										className="text-sm text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Informations légales */}
					<nav aria-labelledby="footer-legal-title">
						<h3
							id="footer-legal-title"
							className="font-medium text-foreground mb-3 text-sm"
						>
							Informations légales
						</h3>
						<ul className="space-y-2" role="list">
							{legalLinks.map((link, index) => (
								<li key={index} role="listitem">
									<Link
										href={link.href}
										className="text-sm text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Sources officielles */}
					<nav aria-labelledby="footer-sources-title">
						<h3
							id="footer-sources-title"
							className="font-medium text-foreground mb-3 text-sm"
						>
							Sources officielles
						</h3>
						<ul className="space-y-2" role="list">
							{officialSources.map((source, index) => (
								<li key={index} role="listitem">
									<Link
										href={source.href}
										className="text-sm text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
										target={source.external ? "_blank" : undefined}
										rel={source.external ? "noopener noreferrer" : undefined}
										aria-label={
											source.external
												? `${source.label} (lien externe)`
												: source.label
										}
									>
										{source.label}
										{source.external && (
											<span className="text-xs" aria-hidden="true">
												↗
											</span>
										)}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				{/* Copyright */}
				<div className="pt-6 border-t border-border/30">
					<p className="text-sm text-foreground/70 text-center">
						© 2025 Manon Diététique. Tous droits réservés.
					</p>
				</div>
			</div>
		</footer>
	);
}
