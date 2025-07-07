"use client";

import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { contact } from "../actions/contact";
import { contactSchema, type ContactFormData } from "../schemas/contact-schema";

interface UseContactFormProps {
	onSuccess?: (data: ContactFormData) => void;
}

export function useContactForm({ onSuccess }: UseContactFormProps) {
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			contact,
			createToastCallbacks<ContactFormData, typeof contactSchema>({
				onSuccess: (data) => {
					if (onSuccess && data.data) {
						onSuccess(data.data);
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
