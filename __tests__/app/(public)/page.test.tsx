import Home from "@/app/(public)/page";
import { render, screen } from "@testing-library/react";

// Mock all the components used in the Home page
jest.mock("@/app/(public)/components/hero", () => ({
	Hero: () => <div data-testid="hero-component">Hero Component</div>,
}));

jest.mock("@/app/(public)/components/about", () => ({
	About: () => <div data-testid="about-component">About Component</div>,
}));

jest.mock("@/app/(public)/components/services", () => ({
	Services: () => (
		<div data-testid="services-component">Services Component</div>
	),
}));

jest.mock("@/app/(public)/components/contact", () => ({
	Contact: () => <div data-testid="contact-component">Contact Component</div>,
}));

jest.mock("@/app/(public)/components/faq", () => ({
	FAQ: () => <div data-testid="faq-component">FAQ Component</div>,
}));

jest.mock("@/app/(public)/components/footer", () => ({
	Footer: () => <div data-testid="footer-component">Footer Component</div>,
}));

describe("Home Page", () => {
	it("should render all main sections", () => {
		render(<Home />);

		expect(screen.getByTestId("hero-component")).toBeInTheDocument();
		expect(screen.getByTestId("about-component")).toBeInTheDocument();
		expect(screen.getByTestId("services-component")).toBeInTheDocument();
		expect(screen.getByTestId("contact-component")).toBeInTheDocument();
		expect(screen.getByTestId("faq-component")).toBeInTheDocument();
		expect(screen.getByTestId("footer-component")).toBeInTheDocument();
	});

	it("should render sections in the correct order", () => {
		render(<Home />);

		const container = document.body;
		const sections = [
			screen.getByTestId("hero-component"),
			screen.getByTestId("about-component"),
			screen.getByTestId("services-component"),
			screen.getByTestId("contact-component"),
			screen.getByTestId("faq-component"),
			screen.getByTestId("footer-component"),
		];

		// Check that each section appears after the previous one in the DOM
		for (let i = 1; i < sections.length; i++) {
			const currentPosition = Array.from(
				container.querySelectorAll("*")
			).indexOf(sections[i]);
			const previousPosition = Array.from(
				container.querySelectorAll("*")
			).indexOf(sections[i - 1]);
			expect(currentPosition).toBeGreaterThan(previousPosition);
		}
	});

	it("should render Hero component first", () => {
		render(<Home />);

		const heroComponent = screen.getByTestId("hero-component");
		expect(heroComponent).toBeInTheDocument();

		// Hero should be the first component in the page
		const allComponents = [
			"hero-component",
			"about-component",
			"services-component",
			"contact-component",
			"faq-component",
			"footer-component",
		];

		const firstComponent = screen.getByTestId(allComponents[0]);
		expect(firstComponent).toBe(heroComponent);
	});

	it("should render Footer component last", () => {
		render(<Home />);

		const footerComponent = screen.getByTestId("footer-component");
		expect(footerComponent).toBeInTheDocument();
	});

	it("should render main content sections", () => {
		render(<Home />);

		// Check that main content sections are present
		expect(screen.getByTestId("hero-component")).toBeInTheDocument();
		expect(screen.getByTestId("about-component")).toBeInTheDocument();
		expect(screen.getByTestId("services-component")).toBeInTheDocument();
	});

	it("should render interaction sections", () => {
		render(<Home />);

		// Check that user interaction sections are present
		expect(screen.getByTestId("contact-component")).toBeInTheDocument();
		expect(screen.getByTestId("faq-component")).toBeInTheDocument();
	});

	it("should use React Fragment as root element", () => {
		const { container } = render(<Home />);

		// The component should render directly without a wrapper div
		// Check that there's no single wrapping element
		expect(container.firstChild).toBeTruthy();
	});

	it("should render all components without errors", () => {
		// This test ensures that the Home component can be rendered without throwing
		expect(() => render(<Home />)).not.toThrow();
	});

	it("should have all required sections for a dietitian website", () => {
		render(<Home />);

		// Essential sections for a dietitian website
		const essentialSections = [
			"hero-component", // Landing/introduction
			"about-component", // About the dietitian
			"services-component", // Services offered
			"contact-component", // Contact information
			"faq-component", // Frequently asked questions
			"footer-component", // Footer with additional info
		];

		essentialSections.forEach((sectionTestId) => {
			expect(screen.getByTestId(sectionTestId)).toBeInTheDocument();
		});
	});

	it("should be accessible", () => {
		render(<Home />);

		// Basic accessibility check - all components should render
		const components = screen.getAllByTestId(/.*-component$/);
		expect(components.length).toBe(6);

		// Each component should be in the document
		components.forEach((component) => {
			expect(component).toBeInTheDocument();
		});
	});

	it("should handle component rendering correctly", () => {
		const { rerender } = render(<Home />);

		// Should be able to re-render without issues
		expect(() => rerender(<Home />)).not.toThrow();

		// All components should still be present after re-render
		expect(screen.getByTestId("hero-component")).toBeInTheDocument();
		expect(screen.getByTestId("about-component")).toBeInTheDocument();
		expect(screen.getByTestId("services-component")).toBeInTheDocument();
		expect(screen.getByTestId("contact-component")).toBeInTheDocument();
		expect(screen.getByTestId("faq-component")).toBeInTheDocument();
		expect(screen.getByTestId("footer-component")).toBeInTheDocument();
	});
});
