import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./create-toast-callbacks";
export * from "./with-callbacks";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
