"use client";

import { FormErrors, useAppForm } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/button";
import { ActionStatus } from "@/shared/types/server-action";
import { useSearchParams } from "next/navigation";
import { useSignInEmail } from "./use-sign-in-email";

export function SignInEmailForm() {
	const searchParams = useSearchParams();
	const callbackURL = searchParams.get("callbackURL") || "/dashboard";

	const { dispatch, isPending, state } = useSignInEmail();

	// TanStack Form setup
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
			callbackURL: callbackURL || "/dashboard",
		},
	});

	return (
		<form
			action={dispatch}
			className="space-y-6"
			onSubmit={() => form.handleSubmit()}
		>
			{/* Erreurs globales du formulaire */}
			<form.Subscribe selector={(state) => state.errors}>
				{(errors) => <FormErrors errors={errors} />}
			</form.Subscribe>

			{/* Erreur d'authentification */}
			{state?.status !== ActionStatus.SUCCESS && state?.message && (
				<div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
					{state.message}
				</div>
			)}

			{/* Champs cachés */}
			<input type="hidden" name="callbackURL" value={callbackURL} />

			<div className="space-y-4">
				<form.AppField
					name="email"
					validators={{
						onChange: ({ value }) => {
							if (!value) return "L'email est requis";
							if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
								return "Format d'email invalide";
							}
							return undefined;
						},
					}}
				>
					{(field) => (
						<field.InputField
							label="Email"
							disabled={isPending}
							placeholder="Ex: contact@example.com"
							type="email"
							required
						/>
					)}
				</form.AppField>

				<form.AppField
					name="password"
					validators={{
						onChange: ({ value }) => {
							if (!value) return "Le mot de passe est requis";
							return undefined;
						},
					}}
				>
					{(field) => (
						<field.InputField
							label="Mot de passe"
							disabled={isPending}
							placeholder="Votre mot de passe"
							type="password"
							required
						/>
					)}
				</form.AppField>
			</div>

			<form.Subscribe selector={(state) => [state.canSubmit]}>
				{([canSubmit]) => (
					<Button
						disabled={!canSubmit || isPending}
						className="w-full"
						type="submit"
					>
						Se connecter
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
