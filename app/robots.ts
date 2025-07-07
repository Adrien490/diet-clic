import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/admin/", "/*.pdf", "/private/", "/tmp/"],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/api/", "/admin/", "/private/"],
			},
		],
		sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
		host: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
	};
}
