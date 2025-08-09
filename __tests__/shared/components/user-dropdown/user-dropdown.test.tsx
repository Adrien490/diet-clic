import { UserDropdown } from "@/shared/components/user-dropdown/user-dropdown";
import { render, screen } from "@testing-library/react";

// Mock React.use hook
jest.mock("react", () => ({
	...jest.requireActual("react"),
	use: jest.fn(),
}));

// Mock des dépendances
jest.mock("@/domains/auth/features/logout/logout-button", () => {
	return {
		LogoutButton: ({ children }: { children: React.ReactNode }) => (
			<div data-testid="logout-button">{children}</div>
		),
	};
});

jest.mock("next/image", () => {
	return function Image({ src, alt, ...props }: any) {
		return <img src={src} alt={alt} {...props} data-testid="user-image" />;
	};
});

describe("UserDropdown", () => {
	const mockUser = {
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "ADMIN",
		image: "https://example.com/avatar.jpg",
	};

	beforeEach(() => {
		const { use } = require("react");
		use.mockClear();
	});

	it("should render user information when user exists", async () => {
		const { use } = require("react");
		use.mockReturnValue(mockUser);

		const userPromise = Promise.resolve(mockUser);

		render(<UserDropdown userPromise={userPromise} />);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("ADMIN")).toBeInTheDocument();
	});

	it("should render user image when available", async () => {
		const { use } = require("react");
		use.mockReturnValue(mockUser);

		const userPromise = Promise.resolve(mockUser);

		render(<UserDropdown userPromise={userPromise} />);

		const image = screen.getByTestId("user-image");
		expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");
		expect(image).toHaveAttribute("alt", "John Doe");
	});

	it("should render default icon when no image", async () => {
		const userWithoutImage = { ...mockUser, image: null };
		const { use } = require("react");
		use.mockReturnValue(userWithoutImage);

		const userPromise = Promise.resolve(userWithoutImage);

		render(<UserDropdown userPromise={userPromise} />);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.queryByTestId("user-image")).not.toBeInTheDocument();
	});

	it("should render nothing when user is null", async () => {
		const { use } = require("react");
		use.mockReturnValue(null);

		const userPromise = Promise.resolve(null);

		const { container } = render(<UserDropdown userPromise={userPromise} />);

		expect(container.firstChild).toBeNull();
	});

	it("should render logout button", async () => {
		const { use } = require("react");
		use.mockReturnValue(mockUser);

		const userPromise = Promise.resolve(mockUser);

		render(<UserDropdown userPromise={userPromise} />);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByTestId("logout-button")).toBeInTheDocument();
		expect(screen.getByText("Déconnexion")).toBeInTheDocument();
	});

	it("should truncate long names and roles", async () => {
		const userWithLongName = {
			...mockUser,
			name: "Very Long User Name That Should Be Truncated",
			role: "SUPER_ADMINISTRATOR_WITH_LONG_TITLE",
		};
		const { use } = require("react");
		use.mockReturnValue(userWithLongName);

		const userPromise = Promise.resolve(userWithLongName);

		render(<UserDropdown userPromise={userPromise} />);

		const nameElement = screen.getByText(
			"Very Long User Name That Should Be Truncated"
		);
		const roleElement = screen.getByText("SUPER_ADMINISTRATOR_WITH_LONG_TITLE");

		expect(nameElement).toHaveClass("truncate");
		expect(roleElement).toHaveClass("truncate");
	});
});
