import { auth } from "@/domains/auth/lib/auth";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Separator } from "@/shared/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { UserAvatar } from "@/shared/components/user-avatar/user-avatar";
import { ChevronDown, ExternalLink, User } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

interface ClientLayoutProps {
	children: React.ReactNode;
}

export default async function ClientLayout({ children }: ClientLayoutProps) {
	return (
		<SidebarProvider>
			<Sidebar collapsible="icon">
				<SidebarHeader className="border-b border-border/30">
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton
										size="lg"
										className="max-w-[240px] data-[state=open]:bg-sidebar-accent"
									>
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 transition-all duration-300 shrink-0">
											<User className="h-4 w-4 text-white" />
										</div>
										<div className="grid flex-1 text-left text-sm leading-tight min-w-0">
											<span className="truncate font-semibold">Mon Espace</span>
											<span className="truncate text-xs text-muted-foreground">
												Espace Personnel
											</span>
										</div>
										<ChevronDown className="ml-auto size-4 shrink-0 opacity-50" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
									side="bottom"
									align="start"
									sideOffset={4}
								>
									<DropdownMenuItem asChild>
										<Link
											href="/"
											className="flex items-center gap-2 px-2 py-1.5"
										>
											<ExternalLink className="size-4" />
											<span>Retour au site</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>

				<SidebarContent className="pt-2">
					{/* Navigation client - simplifiée pour le moment */}
					<div className="px-3 py-2">
						<p className="text-xs text-muted-foreground mb-2">Navigation</p>
						<div className="space-y-1">
							<Link
								href="/client"
								className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
							>
								<User className="h-4 w-4" />
								Tableau de bord
							</Link>
						</div>
					</div>
				</SidebarContent>

				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem></SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>

				<SidebarRail className="bg-muted/10" />
			</Sidebar>

			<SidebarInset>
				<header className="flex px-2 lg:px-4 h-16 shrink-0 items-center gap-2 bg-background justify-between">
					<div className="flex items-center gap-2 px-3">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
					<div className="flex items-center gap-2 px-3">
						<Suspense
							fallback={
								<div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
							}
						>
							<UserAvatar
								userPromise={auth.api
									.getSession({ headers: await headers() })
									.then((session) => session?.user ?? null)}
							/>
						</Suspense>
					</div>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
