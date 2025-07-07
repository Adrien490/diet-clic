"use client";

import { createToastCallbacks, withCallbacks } from "@/shared/utils";
import { useActionState } from "react";
import { toast } from "sonner";
import { contact } from "../actions/contact";
import { contactSchema, type ContactFormData } from "../schemas/contact-schema";

export function useContactForm() {
	const [state, dispatch, isPending] = useActionState(
		withCallbacks(
			contact,
			createToastCallbacks<ContactFormData, typeof contactSchema>({
				onSuccess: (data) => {
					toast.success(data.message);
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
