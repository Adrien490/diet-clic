import { getSidebarNav } from "@/shared/utils/get-sidebar-nav";

// Mock des icônes
jest.mock("lucide-react", () => ({
	BarChart3: () => "BarChart3",
	FileText: () => "FileText",
	LayoutDashboard: () => "LayoutDashboard",
	MessageCircle: () => "MessageCircle",
	Settings: () => "Settings",
	Users: () => "Users",
}));

describe("getSidebarNav", () => {
	it("should return navigation configuration array", () => {
		const nav = getSidebarNav();

		expect(Array.isArray(nav)).toBe(true);
		expect(nav.length).toBeGreaterThan(0);
	});

	it("should return dashboard as first item", () => {
		const nav = getSidebarNav();

		expect(nav[0]).toEqual({
			title: "Dashboard",
			url: "/dashboard",
			icon: expect.any(Function),
		});
	});

	it("should include gestion section with correct items", () => {
		const nav = getSidebarNav();
		const gestionSection = nav.find((item) => item.title === "Gestion");

		expect(gestionSection).toBeDefined();
		expect(gestionSection?.isSection).toBe(true);
		expect(gestionSection?.items).toHaveLength(2);

		const contactsItem = gestionSection?.items?.[0];
		expect(contactsItem).toEqual({
			title: "Demandes de contact",
			url: "/dashboard/contacts",
			icon: expect.any(Function),
		});

		const patientsItem = gestionSection?.items?.[1];
		expect(patientsItem).toEqual({
			title: "Gestion des patients",
			url: "/dashboard/patients",
			icon: expect.any(Function),
		});
	});

	it("should include contenu section with correct items", () => {
		const nav = getSidebarNav();
		const contenuSection = nav.find((item) => item.title === "Contenu");

		expect(contenuSection).toBeDefined();
		expect(contenuSection?.isSection).toBe(true);
		expect(contenuSection?.items).toHaveLength(2);

		const contentItem = contenuSection?.items?.[0];
		expect(contentItem).toEqual({
			title: "Gestion du contenu",
			url: "/dashboard/content",
			icon: expect.any(Function),
		});

		const analyticsItem = contenuSection?.items?.[1];
		expect(analyticsItem).toEqual({
			title: "Statistiques",
			url: "/dashboard/analytics",
			icon: expect.any(Function),
		});
	});

	it("should include parametres section with nested items", () => {
		const nav = getSidebarNav();
		const parametresSection = nav.find((item) => item.title === "Paramètres");

		expect(parametresSection).toBeDefined();
		expect(parametresSection?.isSection).toBe(true);
		expect(parametresSection?.items).toHaveLength(1);

		const settingsItem = parametresSection?.items?.[0];
		expect(settingsItem).toEqual({
			title: "Paramètres",
			url: "/dashboard/settings",
			icon: expect.any(Function),
			items: [
				{
					title: "Mon profil",
					url: "/dashboard/settings/profile",
				},
			],
		});
	});

	it("should return all sections in correct order", () => {
		const nav = getSidebarNav();

		expect(nav[0].title).toBe("Dashboard");
		expect(nav[1].title).toBe("Gestion");
		expect(nav[2].title).toBe("Contenu");
		expect(nav[3].title).toBe("Paramètres");
	});

	it("should have correct number of top-level items", () => {
		const nav = getSidebarNav();

		expect(nav).toHaveLength(4);
	});

	it("should have sections marked with isSection flag", () => {
		const nav = getSidebarNav();
		const sections = nav.filter((item) => item.isSection);

		expect(sections).toHaveLength(3);
		expect(sections.map((s) => s.title)).toEqual([
			"Gestion",
			"Contenu",
			"Paramètres",
		]);
	});

	it("should have dashboard item without isSection flag", () => {
		const nav = getSidebarNav();
		const dashboardItem = nav[0];

		expect(dashboardItem.isSection).toBeUndefined();
		expect(dashboardItem.url).toBe("/dashboard");
	});

	it("should have all required icons", () => {
		const nav = getSidebarNav();

		// Dashboard icon
		expect(nav[0].icon).toBeDefined();

		// Section items icons
		nav.forEach((item) => {
			if (item.items) {
				item.items.forEach((subItem) => {
					if (subItem.icon) {
						expect(subItem.icon).toBeDefined();
					}
				});
			}
		});
	});

	it("should have correct URL structure", () => {
		const nav = getSidebarNav();

		// All URLs should start with /dashboard
		const getAllUrls = (items: any[]): string[] => {
			const urls: string[] = [];
			items.forEach((item) => {
				if (item.url) urls.push(item.url);
				if (item.items) urls.push(...getAllUrls(item.items));
			});
			return urls;
		};

		const allUrls = getAllUrls(nav);
		allUrls.forEach((url) => {
			expect(url).toMatch(/^\/dashboard/);
		});
	});
});
