import { GridLoader } from "@/shared/components/loaders/grid-loader";
import { render, screen } from "@testing-library/react";

// Mock de framer-motion
jest.mock("framer-motion", () => ({
	motion: {
		div: ({
			children,
			animate,
			transition,
			className,
			style,
			...props
		}: any) => (
			<div
				data-testid="motion-div"
				data-animate={JSON.stringify(animate)}
				data-transition={JSON.stringify(transition)}
				className={className}
				style={style}
				{...props}
			>
				{children}
			</div>
		),
	},
}));

describe("GridLoader", () => {
	it("should render grid loader with default props", () => {
		render(<GridLoader />);

		expect(screen.getByTestId("motion-div")).toBeInTheDocument();
		expect(screen.getAllByTestId("motion-div")).toHaveLength(9); // 3x3 grid default
	});

	it("should render correct grid size", () => {
		render(<GridLoader size={4} />);

		expect(screen.getAllByTestId("motion-div")).toHaveLength(16); // 4x4 grid
	});

	it("should apply small size variant", () => {
		render(<GridLoader variant="sm" />);

		const gridItems = screen.getAllByTestId("motion-div");
		gridItems.forEach((item) => {
			expect(item).toHaveClass("w-2", "h-2");
		});
	});

	it("should apply medium size variant", () => {
		render(<GridLoader variant="md" />);

		const gridItems = screen.getAllByTestId("motion-div");
		gridItems.forEach((item) => {
			expect(item).toHaveClass("w-3", "h-3");
		});
	});

	it("should apply large size variant", () => {
		render(<GridLoader variant="lg" />);

		const gridItems = screen.getAllByTestId("motion-div");
		gridItems.forEach((item) => {
			expect(item).toHaveClass("w-4", "h-4");
		});
	});

	it("should apply primary color", () => {
		render(<GridLoader color="primary" />);

		const gridItems = screen.getAllByTestId("motion-div");
		gridItems.forEach((item) => {
			expect(item).toHaveClass("bg-primary");
		});
	});

	it("should apply custom className", () => {
		render(<GridLoader className="custom-grid" />);

		const container = screen.getAllByTestId("motion-div")[0];
		expect(container.parentElement).toHaveClass("custom-grid");
	});

	it("should have correct animation timing", () => {
		render(<GridLoader />);

		const gridItems = screen.getAllByTestId("motion-div");

		gridItems.forEach((item, index) => {
			const transition = JSON.parse(
				item.getAttribute("data-transition") || "{}"
			);
			expect(transition.duration).toBe(1.5);
			expect(transition.repeat).toBe(Infinity);
			expect(transition.delay).toBe(index * 0.1);
		});
	});

	it("should handle 2x2 grid", () => {
		render(<GridLoader size={2} />);

		expect(screen.getAllByTestId("motion-div")).toHaveLength(9);
	});

	it("should handle large grid", () => {
		render(<GridLoader size={5} />);

		expect(screen.getAllByTestId("motion-div")).toHaveLength(25);
	});

	it("should combine all props", () => {
		render(
			<GridLoader
				size={2}
				variant="lg"
				color="secondary"
				className="test-grid"
			/>
		);

		expect(screen.getAllByTestId("motion-div")).toHaveLength(9);

		const gridItems = screen.getAllByTestId("motion-div");
		gridItems.forEach((item) => {
			expect(item).toHaveClass("bg-secondary");
		});
	});
});
