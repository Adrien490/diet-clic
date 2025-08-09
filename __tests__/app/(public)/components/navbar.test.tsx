import { Navbar } from "@/app/(public)/components/navbar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock des hooks
jest.mock("@/shared/hooks/use-mobile", () => ({
	useIsMobile: jest.fn(() => false),
}));

jest.mock("@/shared/hooks/use-is-scrolled", () => ({
	useIsScrolled: jest.fn(() => false),
}));

jest.mock("@/shared/hooks/use-active-navbar-item", () => ({
	useActiveNavbarItem: jest.fn(() => ({
		isMenuItemActive: jest.fn(() => false),
		activeSection: "home",
	})),
}));

// Mock de Next.js Link
jest.mock("next/link", () => {
	return ({ children, href, ...props }: any) => (
		<a href={href} {...props}>
			{children}
		</a>
	);
});

// Mock des icônes
jest.mock("lucide-react", () => ({
	Menu: () => <div data-testid="menu-icon">Menu</div>,
	X: () => <div data-testid="x-icon">X</div>,
}));

// Mock des constants
jest.mock("@/shared/constants/navbar-items", () => ({
	navbarItems: [
		{ href: "#services", label: "Services" },
		{ href: "#about", label: "À propos" },
		{ href: "#contact", label: "Contact" },
	],
}));

describe("Navbar", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render navbar", () => {
		render(<Navbar />);

		const nav = screen.getByRole("navigation");
		expect(nav).toBeInTheDocument();
	});

	it("should render brand link", () => {
		render(<Navbar />);

		const brandLink = screen.getByRole("link", { name: /Manon Chaillou/i });
		expect(brandLink).toBeInTheDocument();
		expect(brandLink).toHaveAttribute("href", "/");
	});

	it("should render navigation items on desktop", () => {
		render(<Navbar />);

		expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "À propos" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
	});

	it("should not show mobile menu by default", () => {
		render(<Navbar />);

		expect(screen.queryByTestId("x-icon")).not.toBeInTheDocument();
	});

	it("should handle mobile view", () => {
		const { useMobile } = require("@/shared/hooks/use-mobile");
		useMobile.mockReturnValue(true);

		render(<Navbar />);

		expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
	});

	it("should toggle mobile menu", async () => {
		const { useMobile } = require("@/shared/hooks/use-mobile");
		useMobile.mockReturnValue(true);

		const user = userEvent.setup();
		render(<Navbar />);

		const menuButton = screen.getByRole("button", { name: /Toggle menu/i });
		await user.click(menuButton);

		expect(screen.getByTestId("x-icon")).toBeInTheDocument();
	});

	it("should apply scrolled styles", () => {
		const { useIsScrolled } = require("@/shared/hooks/use-is-scrolled");
		useIsScrolled.mockReturnValue(true);

		render(<Navbar />);

		const nav = screen.getByRole("navigation");
		expect(nav).toHaveClass(
			"bg-background/80",
			"backdrop-blur-md",
			"border-border"
		);
	});

	it("should highlight active navigation item", () => {
		const {
			useActiveNavbarItem,
		} = require("@/shared/hooks/use-active-navbar-item");
		useActiveNavbarItem.mockReturnValue("#services");

		render(<Navbar />);

		const servicesLink = screen.getByRole("link", { name: "Services" });
		expect(servicesLink).toHaveClass("text-primary");
	});

	it("should have proper semantic structure", () => {
		render(<Navbar />);

		const nav = screen.getByRole("navigation");
		expect(nav).toHaveAttribute("aria-label", "Navigation principale");
	});

	it("should handle keyboard navigation", async () => {
		const user = userEvent.setup();
		render(<Navbar />);

		const firstLink = screen.getByRole("link", { name: /Manon Chaillou/i });
		firstLink.focus();

		expect(firstLink).toHaveFocus();

		await user.tab();
		const servicesLink = screen.getByRole("link", { name: "Services" });
		expect(servicesLink).toHaveFocus();
	});

	it("should close mobile menu when clicking nav item", async () => {
		const { useMobile } = require("@/shared/hooks/use-mobile");
		useMobile.mockReturnValue(true);

		const user = userEvent.setup();
		render(<Navbar />);

		// Open menu
		const menuButton = screen.getByRole("button", { name: /Toggle menu/i });
		await user.click(menuButton);
		expect(screen.getByTestId("x-icon")).toBeInTheDocument();

		// Click nav item
		const servicesLink = screen.getByRole("link", { name: "Services" });
		await user.click(servicesLink);

		// Menu should close
		expect(screen.queryByTestId("x-icon")).not.toBeInTheDocument();
		expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
	});

	it("should have sticky positioning", () => {
		render(<Navbar />);

		const nav = screen.getByRole("navigation");
		expect(nav).toHaveClass("sticky", "top-0", "z-50");
	});

	it("should handle all navigation states", () => {
		const {
			useMobile,
			useIsScrolled,
			useActiveNavbarItem,
		} = require("@/shared/hooks/use-mobile");

		// Mobile + scrolled + active item
		useMobile.mockReturnValue(true);
		require("@/shared/hooks/use-is-scrolled").useIsScrolled.mockReturnValue(
			true
		);
		require("@/shared/hooks/use-active-navbar-item").useActiveNavbarItem.mockReturnValue(
			"#about"
		);

		render(<Navbar />);

		const nav = screen.getByRole("navigation");
		expect(nav).toHaveClass("bg-background/80");
		expect(screen.getByTestId("menu-icon")).toBeInTheDocument();

		const aboutLink = screen.getByRole("link", { name: "À propos" });
		expect(aboutLink).toHaveClass("text-primary");
	});

	it("should render contact button", () => {
		render(<Navbar />);

		const contactButton = screen.getByRole("link", {
			name: /Prendre rendez-vous/i,
		});
		expect(contactButton).toBeInTheDocument();
		expect(contactButton).toHaveAttribute("href", "#contact");
	});

	it("should have proper contrast and accessibility", () => {
		render(<Navbar />);

		const nav = screen.getByRole("navigation");
		expect(nav).toHaveClass("border-b");

		// Check that all links are accessible
		const links = screen.getAllByRole("link");
		links.forEach((link) => {
			expect(link).toBeInTheDocument();
		});
	});
});
