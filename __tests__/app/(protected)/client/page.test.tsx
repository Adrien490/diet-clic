import ClientPage from "@/app/(protected)/client/page";
import { render, screen, waitFor } from "@testing-library/react";

// Mock de Next.js auth
jest.mock("@/domains/auth/lib/auth", () => ({
	auth: {
		api: {
			getSession: jest.fn(),
		},
	},
}));

// Mock de Next.js headers
jest.mock("next/headers", () => ({
	headers: jest.fn(() => Promise.resolve(new Headers())),
}));

// Mock des composants
jest.mock("@/shared/components/page-container", () => ({
	PageContainer: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="page-container">{children}</div>
	),
}));

jest.mock("@/shared/components/ui/badge", () => ({
	Badge: ({ children }: { children: React.ReactNode }) => (
		<span data-testid="badge">{children}</span>
	),
}));

jest.mock("@/shared/components/ui/card", () => ({
	Card: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="card">{children}</div>
	),
	CardContent: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="card-content">{children}</div>
	),
	CardDescription: ({ children }: { children: React.ReactNode }) => (
		<p data-testid="card-description">{children}</p>
	),
	CardHeader: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="card-header">{children}</div>
	),
	CardTitle: ({ children }: { children: React.ReactNode }) => (
		<h3 data-testid="card-title">{children}</h3>
	),
}));

jest.mock("@/shared/components/user-avatar/user-avatar", () => ({
	UserAvatar: ({ size, userPromise }: any) => (
		<div data-testid="user-avatar" data-size={size}>
			User Avatar
		</div>
	),
}));

// Mock des icônes Lucide
jest.mock("lucide-react", () => ({
	Calendar: () => <div data-testid="calendar-icon">Calendar</div>,
	FileText: () => <div data-testid="file-text-icon">FileText</div>,
	Heart: () => <div data-testid="heart-icon">Heart</div>,
	MessageCircle: () => (
		<div data-testid="message-circle-icon">MessageCircle</div>
	),
	Target: () => <div data-testid="target-icon">Target</div>,
}));

const { auth } = require("@/domains/auth/lib/auth");

describe("Client Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render with user session", async () => {
		const mockUser = {
			id: "1",
			name: "John Doe",
			email: "john@example.com",
		};

		auth.api.getSession.mockResolvedValue({
			user: mockUser,
		});

		render(await ClientPage());

		await waitFor(() => {
			expect(screen.getByTestId("page-container")).toBeInTheDocument();
		});
	});

	it("should display welcome message with user name", async () => {
		const mockUser = {
			id: "1",
			name: "John Doe",
			email: "john@example.com",
		};

		auth.api.getSession.mockResolvedValue({
			user: mockUser,
		});

		render(await ClientPage());

		await waitFor(() => {
			expect(screen.getByText("Bonjour John Doe !")).toBeInTheDocument();
		});
	});

	it("should display default welcome message when no user name", async () => {
		auth.api.getSession.mockResolvedValue({
			user: { id: "1", email: "john@example.com" },
		});

		render(await ClientPage());

		await waitFor(() => {
			expect(screen.getByText("Bonjour Utilisateur !")).toBeInTheDocument();
		});
	});

	it("should render user avatar with correct props", async () => {
		const mockUser = {
			id: "1",
			name: "John Doe",
			email: "john@example.com",
		};

		auth.api.getSession.mockResolvedValue({
			user: mockUser,
		});

		render(await ClientPage());

		await waitFor(() => {
			const avatar = screen.getByTestId("user-avatar");
			expect(avatar).toBeInTheDocument();
			expect(avatar).toHaveAttribute("data-size", "lg");
		});
	});

	it("should render dashboard cards", async () => {
		auth.api.getSession.mockResolvedValue({
			user: { id: "1", name: "John Doe" },
		});

		render(await ClientPage());

		await waitFor(() => {
			const cards = screen.getAllByTestId("card");
			expect(cards.length).toBeGreaterThan(0);
		});
	});

	it("should handle no session gracefully", async () => {
		auth.api.getSession.mockResolvedValue(null);

		render(await ClientPage());

		await waitFor(() => {
			expect(screen.getByText("Bonjour Utilisateur !")).toBeInTheDocument();
		});
	});

	it("should render without errors", async () => {
		auth.api.getSession.mockResolvedValue({
			user: { id: "1", name: "Test User" },
		});

		expect(async () => render(await ClientPage())).not.toThrow();
	});
});



