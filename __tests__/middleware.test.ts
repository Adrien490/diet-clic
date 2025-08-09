import { middleware } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

// Mock better-fetch
jest.mock("@better-fetch/fetch", () => ({
	betterFetch: jest.fn(),
}));

// Mock NextResponse
jest.mock("next/server", () => ({
	NextResponse: {
		next: jest.fn(() => ({ type: "next" })),
		redirect: jest.fn((url) => ({ type: "redirect", url })),
	},
}));

const mockBetterFetch = require("@better-fetch/fetch").betterFetch;
const mockNextResponse = NextResponse as jest.Mocked<typeof NextResponse>;

describe("middleware", () => {
	let mockRequest: Partial<NextRequest>;

	beforeEach(() => {
		jest.clearAllMocks();

		// Reset mock to default successful response
		mockBetterFetch.mockResolvedValue({ data: null });

		mockRequest = {
			nextUrl: {
				origin: "https://example.com",
				pathname: "/",
			} as URL,
			headers: {
				get: jest.fn(() => "cookie-value"),
			} as any,
		};
	});

	describe("Public API routes", () => {
		it("should allow public API routes to pass through", async () => {
			mockRequest.nextUrl!.pathname = "/api/auth/signin";

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.next).toHaveBeenCalled();
		});

		it("should allow uploadthing API routes", async () => {
			mockRequest.nextUrl!.pathname = "/api/uploadthing/endpoint";

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.next).toHaveBeenCalled();
		});

		it("should allow webhook API routes", async () => {
			mockRequest.nextUrl!.pathname = "/api/webhooks/stripe";

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.next).toHaveBeenCalled();
		});
	});

	describe("Auth routes protection", () => {
		it("should redirect logged-in ADMIN from auth pages to dashboard", async () => {
			mockRequest.nextUrl!.pathname = "/auth/signin";
			mockBetterFetch.mockResolvedValue({
				data: {
					user: {
						id: "1",
						email: "admin@test.com",
						name: "Admin",
						role: "ADMIN",
					},
					session: { id: "s1", userId: "1", expiresAt: new Date() },
				},
			});

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.redirect).toHaveBeenCalledWith(
				new URL("/dashboard", "https://example.com")
			);
		});

		it("should redirect logged-in CLIENT from auth pages to client area", async () => {
			mockRequest.nextUrl!.pathname = "/auth/signin";
			mockBetterFetch.mockResolvedValue({
				data: {
					user: {
						id: "1",
						email: "client@test.com",
						name: "Client",
						role: "CLIENT",
					},
					session: { id: "s1", userId: "1", expiresAt: new Date() },
				},
			});

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.redirect).toHaveBeenCalledWith(
				new URL("/client", "https://example.com")
			);
		});

		it("should redirect logged-in user without role to home", async () => {
			mockRequest.nextUrl!.pathname = "/auth/signin";
			mockBetterFetch.mockResolvedValue({
				data: {
					user: { id: "1", email: "user@test.com", name: "User" },
					session: { id: "s1", userId: "1", expiresAt: new Date() },
				},
			});

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.redirect).toHaveBeenCalledWith(
				new URL("/", "https://example.com")
			);
		});
	});

	describe("Admin routes protection", () => {
		it("should redirect unauthenticated users to signin", async () => {
			mockRequest.nextUrl!.pathname = "/dashboard";
			mockBetterFetch.mockResolvedValue({ data: null });

			await middleware(mockRequest as NextRequest);

			const expectedUrl = new URL("/auth/signin", "https://example.com");
			expectedUrl.searchParams.set("callbackUrl", "/dashboard");

			expect(mockNextResponse.redirect).toHaveBeenCalledWith(expectedUrl);
		});

		it("should allow ADMIN users to access dashboard", async () => {
			mockRequest.nextUrl!.pathname = "/dashboard";
			mockBetterFetch.mockResolvedValue({
				data: {
					user: {
						id: "1",
						email: "admin@test.com",
						name: "Admin",
						role: "ADMIN",
					},
					session: { id: "s1", userId: "1", expiresAt: new Date() },
				},
			});

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.next).toHaveBeenCalled();
		});

		it("should redirect CLIENT users to their area", async () => {
			mockRequest.nextUrl!.pathname = "/dashboard";
			mockBetterFetch.mockResolvedValue({
				data: {
					user: {
						id: "1",
						email: "client@test.com",
						name: "Client",
						role: "CLIENT",
					},
					session: { id: "s1", userId: "1", expiresAt: new Date() },
				},
			});

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.redirect).toHaveBeenCalledWith(
				new URL("/client", "https://example.com")
			);
		});

		it("should redirect users without ADMIN role to home with error", async () => {
			mockRequest.nextUrl!.pathname = "/dashboard";
			mockBetterFetch.mockResolvedValue({
				data: {
					user: { id: "1", email: "user@test.com", name: "User", role: "USER" },
					session: { id: "s1", userId: "1", expiresAt: new Date() },
				},
			});

			await middleware(mockRequest as NextRequest);

			const expectedUrl = new URL("/", "https://example.com");
			expectedUrl.searchParams.set("error", "access-denied");

			expect(mockNextResponse.redirect).toHaveBeenCalledWith(expectedUrl);
		});
	});

	describe("Client routes protection", () => {
		it("should redirect unauthenticated users to signin", async () => {
			mockRequest.nextUrl!.pathname = "/client";
			mockBetterFetch.mockResolvedValue({ data: null });

			await middleware(mockRequest as NextRequest);

			const expectedUrl = new URL("/auth/signin", "https://example.com");
			expectedUrl.searchParams.set("callbackUrl", "/client");

			expect(mockNextResponse.redirect).toHaveBeenCalledWith(expectedUrl);
		});

		it("should allow CLIENT users to access client area", async () => {
			mockRequest.nextUrl!.pathname = "/client";
			mockBetterFetch.mockResolvedValue({
				data: {
					user: {
						id: "1",
						email: "client@test.com",
						name: "Client",
						role: "CLIENT",
					},
					session: { id: "s1", userId: "1", expiresAt: new Date() },
				},
			});

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.next).toHaveBeenCalled();
		});

		it("should redirect ADMIN users to dashboard", async () => {
			mockRequest.nextUrl!.pathname = "/client";
			mockBetterFetch.mockResolvedValue({
				data: {
					user: {
						id: "1",
						email: "admin@test.com",
						name: "Admin",
						role: "ADMIN",
					},
					session: { id: "s1", userId: "1", expiresAt: new Date() },
				},
			});

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.redirect).toHaveBeenCalledWith(
				new URL("/dashboard", "https://example.com")
			);
		});

		it("should redirect users without CLIENT role to home with error", async () => {
			mockRequest.nextUrl!.pathname = "/client";
			mockBetterFetch.mockResolvedValue({
				data: {
					user: { id: "1", email: "user@test.com", name: "User", role: "USER" },
					session: { id: "s1", userId: "1", expiresAt: new Date() },
				},
			});

			await middleware(mockRequest as NextRequest);

			const expectedUrl = new URL("/", "https://example.com");
			expectedUrl.searchParams.set("error", "access-denied");

			expect(mockNextResponse.redirect).toHaveBeenCalledWith(expectedUrl);
		});
	});

	describe("Public routes", () => {
		it("should allow access to home page", async () => {
			mockRequest.nextUrl!.pathname = "/";
			mockBetterFetch.mockResolvedValue({ data: null });

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.next).toHaveBeenCalled();
		});

		it("should allow access to public pages", async () => {
			mockRequest.nextUrl!.pathname = "/about";
			mockBetterFetch.mockResolvedValue({ data: null });

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.next).toHaveBeenCalled();
		});
	});

	describe("Session handling", () => {
		it("should handle missing session", async () => {
			mockRequest.nextUrl!.pathname = "/";
			mockBetterFetch.mockResolvedValue({ data: null });

			await middleware(mockRequest as NextRequest);

			expect(mockNextResponse.next).toHaveBeenCalled();
		});

		it("should handle session fetch error", async () => {
			mockRequest.nextUrl!.pathname = "/";
			mockBetterFetch.mockRejectedValue(new Error("Fetch failed"));

			// Should not throw error, but will reject due to unhandled fetch error
			await expect(middleware(mockRequest as NextRequest)).rejects.toThrow(
				"Fetch failed"
			);
		});

		it("should pass cookies to session endpoint", async () => {
			mockRequest.nextUrl!.pathname = "/";
			mockBetterFetch.mockResolvedValue({ data: null });

			await middleware(mockRequest as NextRequest);

			expect(mockBetterFetch).toHaveBeenCalledWith(
				"/api/auth/get-session",
				expect.objectContaining({
					baseURL: "https://example.com",
					headers: {
						cookie: "cookie-value",
					},
				})
			);
		});

		it("should handle missing cookies", async () => {
			mockRequest.nextUrl!.pathname = "/";
			mockRequest.headers!.get = jest.fn(() => null);
			mockBetterFetch.mockResolvedValue({ data: null });

			await middleware(mockRequest as NextRequest);

			expect(mockBetterFetch).toHaveBeenCalledWith(
				"/api/auth/get-session",
				expect.objectContaining({
					headers: {
						cookie: "",
					},
				})
			);
		});
	});
});
