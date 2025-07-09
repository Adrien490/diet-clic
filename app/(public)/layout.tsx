import { Navbar } from "@/app/(public)/components/navbar";
import { Footer } from "react-day-picker";

export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<main role="main" className="min-h-screen bg-background">
				{children}
			</main>
			<Footer />
		</>
	);
}
