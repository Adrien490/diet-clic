"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Constants
const SECTIONS = {
	HOME: "home",
	ABOUT: "about",
	SERVICES: "services",
} as const;

const VIEWPORT_THRESHOLD = 0.4;

type Section = (typeof SECTIONS)[keyof typeof SECTIONS] | "";

export function useActiveNavbarItem() {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState<Section>(SECTIONS.HOME);

	useEffect(() => {
		// Only track sections on home page
		if (pathname !== "/") {
			setActiveSection("");
			return;
		}

		const updateActiveSection = () => {
			const aboutElement = document.getElementById(SECTIONS.ABOUT);
			const servicesElement = document.getElementById(SECTIONS.SERVICES);

			if (!aboutElement || !servicesElement) return;

			const viewport = window.innerHeight;
			const threshold = viewport * VIEWPORT_THRESHOLD;

			const aboutRect = aboutElement.getBoundingClientRect();
			const servicesRect = servicesElement.getBoundingClientRect();

			// Check if currently in services section
			const isInServices =
				servicesRect.top <= threshold && servicesRect.bottom >= threshold;

			// Check if currently in about section
			const isInAbout =
				aboutRect.top <= threshold && aboutRect.bottom >= threshold;

			// Determine active section
			if (isInServices) {
				setActiveSection(SECTIONS.SERVICES);
			} else if (isInAbout) {
				setActiveSection(SECTIONS.ABOUT);
			} else if (aboutRect.top > threshold) {
				setActiveSection(SECTIONS.HOME);
			} else {
				setActiveSection("");
			}
		};

		// Throttled scroll handler
		let isScrolling = false;
		const handleScroll = () => {
			if (!isScrolling) {
				requestAnimationFrame(() => {
					updateActiveSection();
					isScrolling = false;
				});
				isScrolling = true;
			}
		};

		// Setup scroll listener
		window.addEventListener("scroll", handleScroll, { passive: true });

		// Initial check
		updateActiveSection();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [pathname]);

	// Check if menu item is active
	const isMenuItemActive = (href: string): boolean => {
		if (href === "/") {
			return pathname === "/" && activeSection === SECTIONS.HOME;
		}

		if (href.startsWith("/#")) {
			const sectionId = href.substring(2);
			return pathname === "/" && activeSection === sectionId;
		}

		return pathname === href;
	};

	return {
		isMenuItemActive,
		activeSection,
		pathname,
	};
}
