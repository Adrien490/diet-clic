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
import { useIsScrolled } from "@/shared/hooks/use-is-scrolled";
import { cn } from "@/shared/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

export function Navbar() {
	const isScrolled = useIsScrolled(140);

	return (
		<header role="banner" className="sticky top-0 z-50 w-full">
			<nav
				role="navigation"
				aria-label="Navigation principale"
				className={cn(
					"bg-transparent transition-all duration-300 ease-in-out",
					isScrolled && "shadow-md bg-background/10 backdrop-blur-md"
				)}
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
					<div className="flex h-16 items-center justify-between">
						{/* Logo avec amélioration accessibilité */}
						<Link
							href="/"
							className="group flex items-center space-x-3 rounded-lg p-2 -m-2 transition-all duration-200 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							aria-label="Retour à l'accueil - Manon Diététicienne"
						>
							<div
								className={cn(
									"flex h-9 w-9 items-center justify-center rounded-full bg-primary transition-all duration-300",
									isScrolled && "h-8 w-8"
								)}
							>
								<span className="text-sm font-bold text-primary-foreground">
									M
								</span>
							</div>
							<div className="hidden sm:block">
								<div className="text-base font-semibold text-foreground transition-colors">
									Manon
								</div>
								<div className="text-xs text-muted-foreground">
									Diététicienne Nutritionniste
								</div>
							</div>
						</Link>

						{/* Navigation desktop avec indicateur de page active */}
						<nav className="hidden md:block" aria-label="Menu principal">
							<ul className="flex items-center space-x-1">
								{navbarItems.map((item) => {
									return (
										<li key={item.href}>
											<Link
												href={item.href}
												className={cn(
													"relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
													"hover:bg-accent hover:text-accent-foreground",
													"focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
													"text-foreground/80"
												)}
											>
												{item.label}
											</Link>
										</li>
									);
								})}
							</ul>
						</nav>

						{/* Bouton CTA desktop */}
						<div className="hidden md:block">
							<Button
								asChild
								className="shadow-sm transition-shadow duration-200"
							>
								<Link href="/contact">Prendre rendez-vous</Link>
							</Button>
						</div>

						{/* Menu mobile amélioré */}
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="md:hidden hover:bg-accent focus-visible:bg-accent"
									aria-label="Ouvrir le menu de navigation"
								>
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-80 p-0">
								<SheetHeader className="border-b p-6">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
												<span className="text-sm font-bold text-primary-foreground">
													M
												</span>
											</div>
											<div>
												<div className="font-semibold text-foreground">
													Manon
												</div>
												<div className="text-xs text-muted-foreground">
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
											return (
												<li key={item.href}>
													<SheetClose asChild>
														<Link
															href={item.href}
															className={cn(
																"flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 w-full text-left",
																"hover:bg-accent hover:text-accent-foreground",
																"focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
																"text-foreground"
															)}
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
											<Link href="/contact">Prendre rendez-vous</Link>
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
