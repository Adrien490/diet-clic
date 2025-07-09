import { auth } from "@/domains/auth/lib/auth";
import { PageContainer } from "@/shared/components/page-container";
import { Badge } from "@/shared/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { UserAvatar } from "@/shared/components/user-avatar/user-avatar";
import { Calendar, FileText, Heart, MessageCircle, Target } from "lucide-react";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function ClientPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<PageContainer>
			{/* En-tête personnalisé avec avatar */}
			<div className="flex items-center gap-4 mb-8">
				<Suspense
					fallback={
						<div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
					}
				>
					<UserAvatar
						size="lg"
						userPromise={Promise.resolve(session?.user ?? null)}
					/>
				</Suspense>
				<div>
					<h1 className="text-2xl font-bold">
						Bonjour {session?.user?.name || "Utilisateur"} !
					</h1>
					<p className="text-muted-foreground">
						Bienvenue dans votre espace de suivi nutritionnel
					</p>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{/* Prochains rendez-vous */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Prochains rendez-vous
						</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">2</div>
						<p className="text-xs text-muted-foreground">
							Votre prochain RDV le 15 janvier 2025
						</p>
					</CardContent>
				</Card>

				{/* Messages */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Messages</CardTitle>
						<MessageCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">3</div>
						<p className="text-xs text-muted-foreground">
							1 nouveau message de Manon
						</p>
					</CardContent>
				</Card>

				{/* Objectifs */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Objectifs</CardTitle>
						<Target className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">75%</div>
						<p className="text-xs text-muted-foreground">
							Progression vers vos objectifs
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2 mt-6">
				{/* Suivi récent */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Heart className="h-5 w-5" />
							Suivi récent
						</CardTitle>
						<CardDescription>
							Vos dernières activités et progrès
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm">Poids enregistré</span>
							<Badge variant="secondary">Aujourd&apos;hui</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Plan alimentaire suivi</span>
							<Badge variant="secondary">Hier</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Consultation avec Manon</span>
							<Badge variant="secondary">Il y a 3 jours</Badge>
						</div>
					</CardContent>
				</Card>

				{/* Ressources */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" />
							Vos ressources
						</CardTitle>
						<CardDescription>
							Documents et conseils personnalisés
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm">Plan alimentaire personnalisé</span>
							<Badge variant="outline">PDF</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Recettes recommandées</span>
							<Badge variant="outline">PDF</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Conseils de Manon</span>
							<Badge variant="outline">PDF</Badge>
						</div>
					</CardContent>
				</Card>
			</div>
		</PageContainer>
	);
}
