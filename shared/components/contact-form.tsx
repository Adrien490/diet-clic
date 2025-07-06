"use client";

import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { toast } from "sonner";
import { useContactForm } from "../hooks/use-contact-form";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export function ContactForm() {
	const { state, dispatch } = useContactForm({
		onSuccess: (data) => {
			toast.success(data.message);
		},
	});

	const form = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			subject: "",
			message: "",
			attachment: null as File | null, // Fichier uploadé
		},
		transform: useTransform(
			(baseForm) => mergeForm(baseForm, (state as unknown) ?? {}),
			[state]
		),
	});

	console.log(state);

	return (
		<form
			action={dispatch}
			className="space-y-6"
			onSubmit={form.handleSubmit}
			aria-labelledby="contact-form-title"
			noValidate
		>
			{/* Grille 2 colonnes */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Colonne de gauche : Champs de base */}
				<div className="space-y-6">
					<fieldset className="space-y-4 border-0 p-0 m-0">
						<legend className="sr-only">Informations de contact</legend>

						<form.Field
							name="fullName"
							validators={{
								onChange: ({ value }) => {
									if (!value?.trim()) {
										return "Le nom et prénom sont requis";
									}
									if (value.trim().length < 2) {
										return "Le nom et prénom doivent contenir au moins 2 caractères";
									}
									return undefined;
								},
								onBlur: ({ value }) => {
									if (value && !/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) {
										return "Le nom et prénom ne doivent contenir que des lettres";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name} className="text-sm font-medium">
										Nom et prénom{" "}
										<span className="text-red-500" aria-label="champ requis">
											*
										</span>
									</Label>
									<Input
										id={field.name}
										name={field.name}
										type="text"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										placeholder="Votre nom et prénom"
										className={cn(
											"max-w-full",
											!field.state.meta.isValid
												? "border-red-500 focus:border-red-500"
												: ""
										)}
										aria-invalid={!field.state.meta.isValid}
										aria-describedby={
											!field.state.meta.isValid
												? `${field.name}-error`
												: field.state.value.length > 0
													? `${field.name}-help`
													: undefined
										}
										aria-required="true"
										autoComplete="name"
										required
									/>
									{!field.state.meta.isValid &&
										field.state.meta.errors.length > 0 && (
											<p
												id={`${field.name}-error`}
												className="text-sm text-red-600"
												role="alert"
												aria-live="polite"
											>
												{field.state.meta.errors.join(", ")}
											</p>
										)}
								</div>
							)}
						</form.Field>

						<form.Field
							name="email"
							validators={{
								onChange: ({ value }) => {
									if (!value?.trim()) {
										return "L'email est requis";
									}
									return undefined;
								},
								onBlur: ({ value }) => {
									if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
										return "Format d'email invalide (exemple: nom@domaine.com)";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name} className="text-sm font-medium">
										Adresse email{" "}
										<span className="text-red-500" aria-label="champ requis">
											*
										</span>
									</Label>
									<Input
										id={field.name}
										name={field.name}
										type="email"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
										placeholder="votre.email@exemple.com"
										className={cn(
											"max-w-full",
											!field.state.meta.isValid
												? "border-red-500 focus:border-red-500"
												: ""
										)}
										aria-invalid={!field.state.meta.isValid}
										aria-describedby={
											!field.state.meta.isValid
												? `${field.name}-error`
												: `${field.name}-help`
										}
										aria-required="true"
										autoComplete="email"
										inputMode="email"
										required
									/>
									{!field.state.meta.isValid &&
									field.state.meta.errors.length > 0 ? (
										<p
											id={`${field.name}-error`}
											className="text-sm text-red-600"
											role="alert"
											aria-live="polite"
										>
											{field.state.meta.errors.join(", ")}
										</p>
									) : (
										<p
											id={`${field.name}-help`}
											className="text-sm text-gray-600"
										>
											Nous utiliserons cet email pour vous recontacter
										</p>
									)}
								</div>
							)}
						</form.Field>

						<form.Field
							name="subject"
							validators={{
								onChange: ({ value }) => {
									if (!value?.trim()) {
										return "Veuillez sélectionner le motif de votre demande";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name} className="text-sm font-medium">
										Motif{" "}
										<span className="text-red-500" aria-label="champ requis">
											*
										</span>
									</Label>
									<Select
										name={field.name}
										value={field.state.value}
										onValueChange={(value) => field.handleChange(value)}
									>
										<SelectTrigger
											className={cn(
												"w-full max-w-full",
												!field.state.meta.isValid
													? "border-red-500 focus:border-red-500"
													: ""
											)}
											aria-invalid={!field.state.meta.isValid}
											aria-describedby={
												!field.state.meta.isValid
													? `${field.name}-error`
													: `${field.name}-help`
											}
											aria-required="true"
										>
											<SelectValue placeholder="Sélectionnez le motif de votre demande" />
										</SelectTrigger>

										<SelectContent className="w-full">
											<SelectItem value="premiere-consultation">
												Première consultation diététique
											</SelectItem>
											<SelectItem value="consultation-suivi">
												Consultation de suivi diététique
											</SelectItem>
											<SelectItem value="prestation-groupe">
												Prestation de groupe
											</SelectItem>
											<SelectItem value="autre">Autre</SelectItem>
										</SelectContent>
									</Select>
									{!field.state.meta.isValid &&
									field.state.meta.errors.length > 0 ? (
										<p
											id={`${field.name}-error`}
											className="text-sm text-red-600"
											role="alert"
											aria-live="polite"
										>
											{field.state.meta.errors.join(", ")}
										</p>
									) : (
										<p
											id={`${field.name}-help`}
											className="text-sm text-gray-600"
										>
											Cela nous aide à mieux vous orienter
										</p>
									)}
								</div>
							)}
						</form.Field>

						<form.Field name="attachment">
							{(field) => (
								<div className="space-y-2">
									<Label className="text-sm font-medium">
										Pièce jointe{" "}
										<span className="text-gray-500">(optionnel)</span>
									</Label>
									<div className="space-y-3">
										<input
											type="file"
											id="file-upload"
											accept="image/*,.pdf,.doc,.docx,.txt"
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (file) {
													field.handleChange(file);
													toast.success("Fichier ajouté avec succès");
												}
											}}
											className="hidden"
										/>
										<Button
											type="button"
											variant="outline"
											onClick={() =>
												document.getElementById("file-upload")?.click()
											}
											className="w-full h-10 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground border border-border rounded-md px-4 py-2 font-medium transition-colors duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
										>
											Ajouter un fichier
										</Button>
										{field.state.value && (
											<div className="space-y-2">
												<p className="text-sm text-gray-600">
													Fichier attaché:
												</p>
												<div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
													<span className="text-gray-700 truncate">
														{field.state.value.name}
													</span>
													<button
														type="button"
														onClick={() => {
															field.handleChange(null);
														}}
														className="text-red-600 hover:text-red-800 ml-2"
													>
														Supprimer
													</button>
												</div>
											</div>
										)}
									</div>
									<p className="text-sm text-gray-600">
										Formats acceptés : Images et documents (max 4MB par fichier)
									</p>
								</div>
							)}
						</form.Field>
					</fieldset>
				</div>

				{/* Colonne de droite : Message */}
				<div className="space-y-6">
					<form.Field
						name="message"
						validators={{
							onChange: ({ value }) => {
								if (!value?.trim()) {
									return "Le message est requis";
								}
								if (value.trim().length < 10) {
									return "Le message doit contenir au moins 10 caractères";
								}
								if (value.trim().length > 1000) {
									return "Le message ne peut pas dépasser 1000 caractères";
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<div className="space-y-2 h-full">
								<Label htmlFor={field.name} className="text-sm font-medium">
									Message{" "}
									<span className="text-red-500" aria-label="champ requis">
										*
									</span>
								</Label>
								<Textarea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									placeholder="Décrivez votre demande, vos objectifs nutritionnels, ou toute question que vous souhaitez aborder. Plus vous êtes précis, mieux nous pourrons vous accompagner."
									rows={16}
									className={cn(
										"resize-none w-full max-w-full min-w-0 break-words overflow-hidden box-border",
										!field.state.meta.isValid
											? "border-red-500 focus:border-red-500"
											: ""
									)}
									aria-invalid={!field.state.meta.isValid}
									aria-describedby={
										!field.state.meta.isValid
											? `${field.name}-error`
											: `${field.name}-help`
									}
									aria-required="true"
									maxLength={1000}
									required
								/>
								{!field.state.meta.isValid &&
								field.state.meta.errors.length > 0 ? (
									<p
										id={`${field.name}-error`}
										className="text-sm text-red-600"
										role="alert"
										aria-live="polite"
									>
										{field.state.meta.errors.join(", ")}
									</p>
								) : (
									<p
										id={`${field.name}-help`}
										className="text-sm text-gray-600"
										aria-live="polite"
									>
										{field.state.value.length}/1000 caractères
									</p>
								)}
							</div>
						)}
					</form.Field>
				</div>
			</div>

			{/* Section en bas pour les erreurs et le bouton */}
			<div className="space-y-4 border-t pt-6">
				<div className="text-sm text-gray-600">
					<p>
						<span className="text-red-500" aria-hidden="true">
							*
						</span>
						<span className="ml-1">Champs obligatoires</span>
					</p>
				</div>

				<form.Subscribe selector={(state) => [state.errorMap]}>
					{([errorMap]) =>
						errorMap.onSubmit ? (
							<div
								className="p-3 bg-red-50 border border-red-200 rounded-md"
								role="alert"
								aria-live="assertive"
							>
								<p className="text-sm text-red-600">
									Erreur lors de l&apos;envoi : {errorMap.onSubmit}
								</p>
							</div>
						) : null
					}
				</form.Subscribe>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							disabled={!canSubmit || isSubmitting}
							aria-disabled={!canSubmit || isSubmitting}
							aria-describedby={!canSubmit ? "submit-help" : undefined}
						>
							Envoyer ma demande
						</Button>
					)}
				</form.Subscribe>

				{!form.state.canSubmit &&
					form.state.isTouched &&
					!form.state.isSubmitting && (
						<p id="submit-help" className="text-sm text-gray-600">
							Veuillez corriger les erreurs ci-dessus avant d&apos;envoyer le
							formulaire
						</p>
					)}
			</div>
		</form>
	);
}
