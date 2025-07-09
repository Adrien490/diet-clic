import {
	BarChart3,
	FileText,
	LayoutDashboard,
	MessageCircle,
	Settings,
	Users,
} from "lucide-react";

export function getSidebarNav() {
	return [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboard,
		},
		{
			title: "Gestion",
			isSection: true,
			items: [
				{
					title: "Demandes de contact",
					url: "/dashboard/contacts",
					icon: MessageCircle,
				},
				{
					title: "Gestion des patients",
					url: "/dashboard/patients",
					icon: Users,
				},
			],
		},
		{
			title: "Contenu",
			isSection: true,
			items: [
				{
					title: "Gestion du contenu",
					url: "/dashboard/content",
					icon: FileText,
				},
				{
					title: "Statistiques",
					url: "/dashboard/analytics",
					icon: BarChart3,
				},
			],
		},
		{
			title: "Paramètres",
			isSection: true,
			items: [
				{
					title: "Paramètres",
					url: "/dashboard/settings",
					icon: Settings,
					items: [
						{
							title: "Mon profil",
							url: "/dashboard/settings/profile",
						},
					],
				},
			],
		},
	];
}
