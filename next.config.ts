import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Compression gzip/brotli
	compress: true,

	// Optimisations d'images
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 31536000, // 1 an
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	// Optimisations CSS et JS
	experimental: {
		// Optimisation des polices
		optimizePackageImports: ["lucide-react"],
	},

	// Headers pour le SEO et la sécurité
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
			{
				source: "/sitemap.xml",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=43200",
					},
				],
			},
			{
				source: "/robots.txt",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=43200",
					},
				],
			},
			{
				source: "/:path*\\.(jpg|jpeg|png|webp|avif|gif|ico|svg)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},

	// Optimisations diverses
	output: "standalone",

	// Redirections pour SEO
	async redirects() {
		return [
			{
				source: "/home",
				destination: "/",
				permanent: true,
			},
			{
				source: "/accueil",
				destination: "/",
				permanent: true,
			},
			{
				source: "/contact",
				destination: "/#contact",
				permanent: true,
			},
		];
	},

	// Rewrites pour le SEO
	async rewrites() {
		return [
			{
				source: "/a-propos",
				destination: "/#about",
			},
			{
				source: "/prestations",
				destination: "/#services",
			},
			{
				source: "/questions-frequentes",
				destination: "/#faq",
			},
		];
	},
};

export default nextConfig;
