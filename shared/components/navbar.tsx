"use client";

import { Button } from "@/shared/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shared/components/ui/sheet";
import { navbarItems } from "@/shared/constants/navbar-items";
import { useActiveNavbarItem } from "@/shared/hooks/use-active-navbar-item";
import { useIsScrolled } from "@/shared/hooks/use-is-scrolled";
import { cn } from "@/shared/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "../hooks/use-mobile";

export function Navbar() {
	const isMobile = useIsMobile();
	const threshold = isMobile ? 25 : 100;
	const isScrolled = useIsScrolled(threshold);
	const { isMenuItemActive } = useActiveNavbarItem();

	return (
		<header role="banner" className="sticky top-0 z-50 w-full">
			{/* Skip link pour l'accessibilité */}
			<Link
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
			>
				Aller au contenu principal
			</Link>

			<nav
				role="navigation"
				aria-label="Navigation principale"
				className={cn(
					"bg-transparent transition-all duration-300 ease-in-out relative z-30",
					isScrolled && "shadow-md bg-background backdrop-blur-md"
				)}
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="flex h-16 items-center justify-between">
						{/* Logo avec amélioration accessibilité */}
						<Link
							href="/"
							className="group flex items-center space-x-3 rounded-lg p-2 -m-2 transition-all duration-200 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative z-30"
							aria-label="Retour à l'accueil - Manon Chaillou, Diététicienne Nutritionniste"
						>
							<div
								className={cn(
									"flex h-9 w-9 items-center justify-center rounded-full bg-primary transition-all duration-300",
									isScrolled && "h-8 w-8"
								)}
								aria-hidden="true"
							>
								<span className="text-sm font-bold text-primary-foreground">
									M
								</span>
							</div>
							<div className="hidden sm:block">
								<div className="text-base font-semibold text-foreground transition-colors">
									Manon Chaillou
								</div>
								<div className="text-xs text-foreground/70">
									Diététicienne Nutritionniste
								</div>
							</div>
						</Link>

						{/* Navigation desktop */}
						<nav
							className="hidden md:block relative z-30"
							aria-label="Menu principal"
						>
							<ul className="flex items-center space-x-1">
								{navbarItems.map((item) => {
									const isActive = isMenuItemActive(item.href);
									return (
										<li key={item.href}>
											<Link
												href={item.href}
												className={cn(
													"relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
													isActive
														? "text-primary bg-accent/50 font-semibold border border-primary/20"
														: "text-foreground/90"
												)}
												aria-current={isActive ? "page" : undefined}
											>
												{item.label}
											</Link>
										</li>
									);
								})}
							</ul>
						</nav>

						{/* Bouton CTA desktop */}
						<div className="hidden md:block relative z-30">
							<Button
								asChild
								className="shadow-sm transition-shadow duration-200"
							>
								<Link
									href="/contact"
									aria-label="Prendre rendez-vous avec Manon Chaillou, diététicienne nutritionniste"
								>
									Prendre rendez-vous
								</Link>
							</Button>
						</div>

						{/* Menu mobile */}
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="md:hidden hover:bg-accent focus-visible:bg-accent relative z-30"
									aria-label="Ouvrir le menu de navigation"
									aria-expanded="false"
								>
									<Menu className="h-5 w-5" aria-hidden="true" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-80 p-0">
								<SheetHeader className="border-b p-6">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<div
												className="flex h-8 w-8 items-center justify-center rounded-full bg-primary"
												aria-hidden="true"
											>
												<span className="text-sm font-bold text-primary-foreground">
													M
												</span>
											</div>
											<div>
												<div className="font-semibold text-foreground">
													Manon
												</div>
												<div className="text-xs text-foreground/70">
													Diététicienne
												</div>
											</div>
										</div>
									</div>
									<SheetTitle className="sr-only">
										Menu de navigation
									</SheetTitle>
								</SheetHeader>

								<nav className="flex-1 p-6" aria-label="Menu mobile">
									<ul className="space-y-2">
										{navbarItems.map((item) => {
											const isActive = isMenuItemActive(item.href);
											return (
												<li key={item.href}>
													<SheetClose asChild>
														<Link
															href={item.href}
															className={cn(
																"flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 w-full text-left hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
																isActive
																	? "text-primary bg-accent/50 font-semibold border border-primary/20"
																	: "text-foreground"
															)}
															aria-current={isActive ? "page" : undefined}
														>
															{item.label}
														</Link>
													</SheetClose>
												</li>
											);
										})}
									</ul>
								</nav>

								<div className="border-t p-6">
									<SheetClose asChild>
										<Button asChild className="w-full">
											<Link
												href="/contact"
												aria-label="Prendre rendez-vous avec Manon Chaillou, diététicienne nutritionniste"
											>
												Prendre rendez-vous
											</Link>
										</Button>
									</SheetClose>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		</header>
	);
}
