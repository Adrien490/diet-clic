import { Separator } from "@/shared/components/ui/separator";
import { render, screen } from "@testing-library/react";

describe("Separator", () => {
	it("should render separator element", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toBeInTheDocument();
	});

	it("should apply default horizontal orientation", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "horizontal");
	});

	it("should apply vertical orientation", () => {
		render(<Separator orientation="vertical" data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "vertical");
	});

	it("should apply default styling", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveClass("bg-border", "shrink-0");
	});

	it("should apply custom className", () => {
		render(<Separator className="custom-separator" data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveClass("custom-separator");
	});

	it("should have correct ARIA attributes", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "horizontal");
	});

	it("should have correct ARIA attributes for vertical", () => {
		render(<Separator orientation="vertical" data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "vertical");
	});

	it("should have data-slot attribute", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-slot", "separator");
	});

	it("should render as div element by default", () => {
		render(<Separator data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator.tagName.toLowerCase()).toBe("div");
	});

	it("should handle decorative role", () => {
		render(<Separator decorative data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("role", "none");
	});

	it("should handle non-decorative role", () => {
		render(<Separator decorative={false} data-testid="separator" />);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("role", "separator");
	});

	it("should combine orientation classes with custom classes", () => {
		render(
			<Separator 
				orientation="vertical" 
				className="bg-primary" 
				data-testid="separator" 
			/>
		);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveClass("bg-primary");
		expect(separator).toHaveAttribute("data-orientation", "vertical");
	});

	it("should pass through additional props", () => {
		render(
			<Separator 
				id="my-separator" 
				style={{ opacity: 0.5 }} 
				data-testid="separator" 
			/>
		);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("id", "my-separator");
		expect(separator).toHaveStyle({ opacity: "0.5" });
	});

	it("should work in flexbox layout", () => {
		render(
			<div className="flex">
				<div>Content 1</div>
				<Separator orientation="vertical" data-testid="separator" />
				<div>Content 2</div>
			</div>
		);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveClass("shrink-0");
	});

	it("should work in vertical layout", () => {
		render(
			<div className="flex flex-col">
				<div>Content 1</div>
				<Separator data-testid="separator" />
				<div>Content 2</div>
			</div>
		);

		const separator = screen.getByTestId("separator");
		expect(separator).toHaveAttribute("data-orientation", "horizontal");
	});
});
