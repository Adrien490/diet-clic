import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Tooltip Components", () => {
	const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
		<TooltipProvider>{children}</TooltipProvider>
	);

	describe("Tooltip", () => {
		it("should render tooltip trigger", () => {
			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger>Hover me</TooltipTrigger>
						<TooltipContent>
							<p>Tooltip content</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			expect(screen.getByText("Hover me")).toBeInTheDocument();
		});

		it("should show tooltip on hover", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger>Hover me</TooltipTrigger>
						<TooltipContent>
							<p>Tooltip content</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			const trigger = screen.getByText("Hover me");

			// Hover over trigger
			await user.hover(trigger);

			// Tooltip should be visible
			expect(screen.getByText("Tooltip content")).toBeInTheDocument();
		});

		it("should hide tooltip on unhover", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger>Hover me</TooltipTrigger>
						<TooltipContent>
							<p>Tooltip content</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			const trigger = screen.getByText("Hover me");

			// Hover to show tooltip
			await user.hover(trigger);
			expect(screen.getByText("Tooltip content")).toBeInTheDocument();

			// Unhover to hide tooltip
			await user.unhover(trigger);
			expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
		});

		it("should show tooltip on focus", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger asChild>
							<button>Focus me</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Tooltip content</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			const trigger = screen.getByRole("button", { name: "Focus me" });

			// Focus trigger
			await user.tab();
			expect(trigger).toHaveFocus();

			// Tooltip should be visible
			expect(screen.getByText("Tooltip content")).toBeInTheDocument();
		});

		it("should apply custom className", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger>Hover me</TooltipTrigger>
						<TooltipContent className="custom-tooltip">
							<p>Tooltip content</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			await user.hover(screen.getByText("Hover me"));

			const tooltip = screen
				.getByText("Tooltip content")
				.closest('[data-slot="tooltip-content"]');
			expect(tooltip).toHaveClass("custom-tooltip");
		});

		it("should support different sides", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger>Hover me</TooltipTrigger>
						<TooltipContent side="top">
							<p>Top tooltip</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			await user.hover(screen.getByText("Hover me"));

			const tooltip = screen
				.getByText("Top tooltip")
				.closest('[data-slot="tooltip-content"]');
			expect(tooltip).toHaveAttribute("data-side", "top");
		});

		it("should support align options", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger>Hover me</TooltipTrigger>
						<TooltipContent align="start">
							<p>Aligned tooltip</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			await user.hover(screen.getByText("Hover me"));

			const tooltip = screen
				.getByText("Aligned tooltip")
				.closest('[data-slot="tooltip-content"]');
			expect(tooltip).toHaveAttribute("data-align", "start");
		});

		it("should handle custom delay", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip delayDuration={100}>
						<TooltipTrigger>Hover me</TooltipTrigger>
						<TooltipContent>
							<p>Delayed tooltip</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			const trigger = screen.getByText("Hover me");
			await user.hover(trigger);

			// Should eventually show (timing is handled by Radix)
			expect(screen.getByText("Delayed tooltip")).toBeInTheDocument();
		});

		it("should render with arrow", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger>Hover me</TooltipTrigger>
						<TooltipContent sideOffset={5}>
							<p>Tooltip with arrow</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			await user.hover(screen.getByText("Hover me"));

			const tooltip = screen
				.getByText("Tooltip with arrow")
				.closest('[data-slot="tooltip-content"]');
			expect(tooltip).toBeInTheDocument();
		});

		it("should support controlled open state", () => {
			render(
				<TooltipWrapper>
					<Tooltip open={true}>
						<TooltipTrigger>Always visible</TooltipTrigger>
						<TooltipContent>
							<p>Always shown tooltip</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			// Tooltip should be visible without hover
			expect(screen.getByText("Always shown tooltip")).toBeInTheDocument();
		});

		it("should handle keyboard navigation", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger asChild>
							<button>Press Escape</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Press Esc to close</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			const trigger = screen.getByRole("button");

			// Focus to show tooltip
			trigger.focus();
			expect(screen.getByText("Press Esc to close")).toBeInTheDocument();

			// Press Escape to hide
			await user.keyboard("{Escape}");
			expect(screen.queryByText("Press Esc to close")).not.toBeInTheDocument();
		});

		it("should render complex content", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger>Rich content</TooltipTrigger>
						<TooltipContent className="max-w-xs">
							<div>
								<h4 className="font-semibold">Title</h4>
								<p className="text-sm">Description with multiple lines</p>
								<button className="mt-2 text-xs">Action</button>
							</div>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			await user.hover(screen.getByText("Rich content"));

			expect(screen.getByText("Title")).toBeInTheDocument();
			expect(
				screen.getByText("Description with multiple lines")
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Action" })
			).toBeInTheDocument();
		});

		it("should work with disabled triggers", () => {
			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger asChild>
							<button disabled>Disabled button</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>This button is disabled</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			const button = screen.getByRole("button", { name: "Disabled button" });
			expect(button).toBeDisabled();
		});

		it("should support ARIA attributes", async () => {
			const user = userEvent.setup();

			render(
				<TooltipWrapper>
					<Tooltip>
						<TooltipTrigger aria-describedby="tooltip-1">
							Accessible trigger
						</TooltipTrigger>
						<TooltipContent id="tooltip-1">
							<p>Accessible tooltip</p>
						</TooltipContent>
					</Tooltip>
				</TooltipWrapper>
			);

			const trigger = screen.getByText("Accessible trigger");
			expect(trigger).toHaveAttribute("aria-describedby", "tooltip-1");

			await user.hover(trigger);

			const tooltip = screen
				.getByText("Accessible tooltip")
				.closest('[data-slot="tooltip-content"]');
			expect(tooltip).toHaveAttribute("id", "tooltip-1");
		});
	});
});



