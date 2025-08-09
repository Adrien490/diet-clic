import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { render, screen } from "@testing-library/react";

describe("Avatar Components", () => {
	describe("Avatar", () => {
		it("should render avatar component", () => {
			render(
				<Avatar>
					<AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			const avatar = document.querySelector('[data-slot="avatar"]');
			expect(avatar).toBeInTheDocument();
			expect(avatar).toHaveClass(
				"relative",
				"flex",
				"size-8",
				"shrink-0",
				"overflow-hidden",
				"rounded-full"
			);
		});

		it("should apply custom className", () => {
			render(
				<Avatar className="size-12">
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			const avatar = document.querySelector('[data-slot="avatar"]');
			expect(avatar).toHaveClass("size-12");
		});

		it("should render with custom attributes", () => {
			render(
				<Avatar data-testid="custom-avatar" role="img">
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			const avatar = screen.getByTestId("custom-avatar");
			expect(avatar).toBeInTheDocument();
			expect(avatar).toHaveAttribute("role", "img");
		});
	});

	describe("AvatarImage", () => {
		it("should render avatar image", () => {
			render(
				<Avatar>
					<AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			const avatarImage = document.querySelector('[data-slot="avatar-image"]');
			expect(avatarImage).toBeInTheDocument();
			expect(avatarImage).toHaveAttribute(
				"src",
				"https://example.com/avatar.jpg"
			);
			expect(avatarImage).toHaveAttribute("alt", "User avatar");
		});

		it("should have correct default classes", () => {
			render(
				<Avatar>
					<AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			const avatarImage = document.querySelector('[data-slot="avatar-image"]');
			expect(avatarImage).toHaveClass("aspect-square", "size-full");
		});

		it("should apply custom className", () => {
			render(
				<Avatar>
					<AvatarImage
						src="https://example.com/avatar.jpg"
						alt="User avatar"
						className="custom-image"
					/>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			const avatarImage = document.querySelector('[data-slot="avatar-image"]');
			expect(avatarImage).toHaveClass("custom-image");
		});

		it("should handle loading states", () => {
			render(
				<Avatar>
					<AvatarImage
						src="https://example.com/avatar.jpg"
						alt="User avatar"
						onLoad={() => {}}
						onError={() => {}}
					/>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			const avatarImage = document.querySelector('[data-slot="avatar-image"]');
			expect(avatarImage).toBeInTheDocument();
		});
	});

	describe("AvatarFallback", () => {
		it("should render avatar fallback", () => {
			render(
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			const avatarFallback = document.querySelector(
				'[data-slot="avatar-fallback"]'
			);
			expect(avatarFallback).toBeInTheDocument();
			expect(avatarFallback).toHaveTextContent("JD");
		});

		it("should have correct default classes", () => {
			render(
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			const avatarFallback = document.querySelector(
				'[data-slot="avatar-fallback"]'
			);
			expect(avatarFallback).toHaveClass(
				"bg-muted",
				"flex",
				"size-full",
				"items-center",
				"justify-center",
				"rounded-full"
			);
		});

		it("should apply custom className", () => {
			render(
				<Avatar>
					<AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
				</Avatar>
			);

			const avatarFallback = document.querySelector(
				'[data-slot="avatar-fallback"]'
			);
			expect(avatarFallback).toHaveClass("bg-primary", "text-white");
		});

		it("should render with different content types", () => {
			const { rerender } = render(
				<Avatar>
					<AvatarFallback>AB</AvatarFallback>
				</Avatar>
			);

			expect(screen.getByText("AB")).toBeInTheDocument();

			rerender(
				<Avatar>
					<AvatarFallback>👤</AvatarFallback>
				</Avatar>
			);

			expect(screen.getByText("👤")).toBeInTheDocument();
		});

		it("should handle long text gracefully", () => {
			render(
				<Avatar>
					<AvatarFallback>John Doe</AvatarFallback>
				</Avatar>
			);

			const avatarFallback = document.querySelector(
				'[data-slot="avatar-fallback"]'
			);
			expect(avatarFallback).toHaveTextContent("John Doe");
		});
	});

	describe("Avatar Integration", () => {
		it("should show fallback when image fails to load", () => {
			render(
				<Avatar>
					<AvatarImage src="invalid-url" alt="User avatar" />
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			// Both image and fallback should be present in DOM
			expect(
				document.querySelector('[data-slot="avatar-image"]')
			).toBeInTheDocument();
			expect(
				document.querySelector('[data-slot="avatar-fallback"]')
			).toBeInTheDocument();
		});

		it("should work with image only", () => {
			render(
				<Avatar>
					<AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
				</Avatar>
			);

			expect(
				document.querySelector('[data-slot="avatar-image"]')
			).toBeInTheDocument();
			expect(
				document.querySelector('[data-slot="avatar-fallback"]')
			).not.toBeInTheDocument();
		});

		it("should work with fallback only", () => {
			render(
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			);

			expect(
				document.querySelector('[data-slot="avatar-fallback"]')
			).toBeInTheDocument();
			expect(
				document.querySelector('[data-slot="avatar-image"]')
			).not.toBeInTheDocument();
		});

		it("should handle multiple avatar sizes", () => {
			const { rerender } = render(
				<Avatar className="size-6">
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
			);

			expect(document.querySelector('[data-slot="avatar"]')).toHaveClass(
				"size-6"
			);

			rerender(
				<Avatar className="size-16">
					<AvatarFallback>L</AvatarFallback>
				</Avatar>
			);

			expect(document.querySelector('[data-slot="avatar"]')).toHaveClass(
				"size-16"
			);
		});
	});
});
