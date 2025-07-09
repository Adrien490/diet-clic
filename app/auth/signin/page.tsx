import { SignInEmailForm } from "@/domains/auth/features/sign-in-email/sign-in-email-form";
import { SignInSocialForm } from "@/domains/auth/features/sign-in-social/sign-in-social-form";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function SignInPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4 relative">
			{/* Bouton de retour */}
			<Link
				href="/"
				className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors z-10"
			>
				<ArrowLeft className="w-4 h-4" />
				Retour au site
			</Link>

			<div className="w-full max-w-md mx-auto space-y-8">
				{/* Header */}
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold text-foreground">Connexion</h1>
					<p className="text-muted-foreground">
						Accédez à votre espace professionnel
					</p>
				</div>

				{/* Carte de connexion */}
				<Card className="shadow-lg">
					<CardContent className="space-y-6">
						{/* Connexion sociale */}
						<div>
							<Suspense
								fallback={
									<div className="h-20 animate-pulse bg-muted rounded" />
								}
							>
								<SignInSocialForm />
							</Suspense>
						</div>

						{/* Séparateur */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-border" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-card px-4 text-muted-foreground font-medium">
									Ou continuer avec
								</span>
							</div>
						</div>

						{/* Connexion email */}
						<div>
							<Suspense
								fallback={
									<div className="h-32 animate-pulse bg-muted rounded" />
								}
							>
								<SignInEmailForm />
							</Suspense>
						</div>
					</CardContent>

					<CardFooter className="flex-col space-y-4">
						{/* Lien mot de passe oublié */}
						<div className="text-center">
							<Link
								href="/auth/forgot-password"
								className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
							>
								Mot de passe oublié ?
							</Link>
						</div>

						{/* Lien inscription */}
						<div className="text-center text-sm text-muted-foreground">
							<span>Vous êtes un patient ? </span>
							<Link
								href="/auth/signup"
								className="text-primary hover:text-primary/80 transition-colors font-semibold"
							>
								Créer un compte
							</Link>
						</div>
					</CardFooter>
				</Card>

				{/* Footer légal */}
				<div className="text-center text-xs text-muted-foreground">
					<p className="leading-relaxed">
						En vous connectant, vous acceptez nos{" "}
						<Link
							href="/legal"
							className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
						>
							conditions d&apos;utilisation
						</Link>{" "}
						et notre{" "}
						<Link
							href="/privacy"
							className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
						>
							politique de confidentialité
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
