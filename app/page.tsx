import { About } from "@/shared/components/about";
import { FAQ } from "@/shared/components/faq";
import { Hero } from "@/shared/components/hero";
import { Services } from "@/shared/components/services";

export default function Home() {
	return (
		<>
			<Hero />
			<About />
			<Services />
			<FAQ />
		</>
	);
}
