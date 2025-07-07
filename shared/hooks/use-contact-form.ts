"use client";

import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { contact } from "../actions/contact";
import {
	contactSchema,
	type ContactFormResponse,
} from "../schemas/contact-schema";

interface UseContactFormProps {
	onSuccess?: (message: string) => void;
}

export function useContactForm({ onSuccess }: UseContactFormProps) {
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			contact,
			createToastCallbacks<ContactFormResponse, typeof contactSchema>({
				onSuccess: (data) => {
					if (onSuccess && data.message) {
						onSuccess(data.message);
					} else {
						toast.success(data.message);
					}
				},
			})
		),
		undefined
	);

	return {
		state,
		dispatch,
		isPending,
	};
}
