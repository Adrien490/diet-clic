import Home from "@/app/(public)/page";
import { render, screen } from "@testing-library/react";

// Mock des composants enfants
jest.mock("@/app/(public)/components/hero", () => ({
	Hero: () => <div data-testid="hero">Hero Component</div>,
}));

jest.mock("@/app/(public)/components/about", () => ({
	About: () => <div data-testid="about">About Component</div>,
}));

jest.mock("@/app/(public)/components/services", () => ({
	Services: () => <div data-testid="services">Services Component</div>,
}));

jest.mock("@/app/(public)/components/contact", () => ({
	Contact: () => <div data-testid="contact">Contact Component</div>,
}));

jest.mock("@/app/(public)/components/faq", () => ({
	FAQ: () => <div data-testid="faq">FAQ Component</div>,
}));

jest.mock("@/app/(public)/components/footer", () => ({
	Footer: () => <div data-testid="footer">Footer Component</div>,
}));

describe("Home Page", () => {
	it("should render all main sections", () => {
		render(<Home />);

		expect(screen.getByTestId("hero")).toBeInTheDocument();
		expect(screen.getByTestId("about")).toBeInTheDocument();
		expect(screen.getByTestId("services")).toBeInTheDocument();
		expect(screen.getByTestId("contact")).toBeInTheDocument();
		expect(screen.getByTestId("faq")).toBeInTheDocument();
		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});

	it("should render sections in correct order", () => {
		render(<Home />);

		const sections = [
			screen.getByTestId("hero"),
			screen.getByTestId("about"),
			screen.getByTestId("services"),
			screen.getByTestId("contact"),
			screen.getByTestId("faq"),
			screen.getByTestId("footer"),
		];

		sections.forEach((section, index) => {
			if (index > 0) {
				// Vérifier que chaque section vient après la précédente dans le DOM
				expect(section.compareDocumentPosition(sections[index - 1])).toBe(
					Node.DOCUMENT_POSITION_PRECEDING
				);
			}
		});
	});

	it("should render without errors", () => {
		expect(() => render(<Home />)).not.toThrow();
	});
});
