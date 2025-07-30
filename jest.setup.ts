import "@testing-library/jest-dom";
import { ImageProps } from "next/image";

// Polyfill for TextDecoder/TextEncoder
import { TextDecoder, TextEncoder } from "util";
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
global.TextEncoder = TextEncoder as typeof global.TextEncoder;

// Mock next/navigation
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
		};
	},
	useSearchParams() {
		return new URLSearchParams();
	},
	usePathname() {
		return "";
	},
}));

// Mock next/image
jest.mock("next/image", () => ({
	__esModule: true,
	default: function Image(props: ImageProps) {
		return props;
	},
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
process.env.EMAIL = "test@example.com";
process.env.RESEND_API_KEY = "test_resend_api_key";

// Suppress console errors during tests
const originalError = console.error;
beforeAll(() => {
	console.error = (...args: unknown[]) => {
		if (
			typeof args[0] === "string" &&
			args[0].includes("Warning: ReactDOM.render")
		) {
			return;
		}
		originalError.call(console, ...args);
	};
});

afterAll(() => {
	console.error = originalError;
});
