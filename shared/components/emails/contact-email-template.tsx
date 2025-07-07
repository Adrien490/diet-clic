import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface ContactEmailTemplateProps {
	fullName: string;
	email: string;
	subject: string;
	message: string;
	attachments?: { url: string; name: string }[];
}

export function ContactEmailTemplate({
	fullName,
	email,
	subject,
	message,
	attachments = [],
}: ContactEmailTemplateProps) {
	return (
		<Html lang="fr">
			<Head />
			<Preview>Nouvelle demande de contact de {fullName}</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* En-tête */}
					<Section style={header}>
						<Heading style={title}>✉️ Nouvelle demande de contact</Heading>
						<Text style={subtitle}>
							Reçu via le formulaire de contact du site web
						</Text>
					</Section>

					{/* Informations du contact */}
					<Section style={section}>
						<div style={card}>
							<Heading style={cardTitle}>👤 Informations du contact</Heading>
							<div style={infoGrid}>
								<div style={infoItem}>
									<Text style={infoLabel}>Nom complet</Text>
									<Text style={infoValue}>{fullName}</Text>
								</div>
								<div style={infoItem}>
									<Text style={infoLabel}>Email</Text>
									<Link href={`mailto:${email}`} style={emailLink}>
										{email}
									</Link>
								</div>
								<div style={infoItem}>
									<Text style={infoLabel}>Motif</Text>
									<Text style={infoValue}>{subject}</Text>
								</div>
							</div>
						</div>
					</Section>

					{/* Message */}
					<Section style={section}>
						<div style={card}>
							<Heading style={cardTitle}>💬 Message</Heading>
							<div style={messageBox}>
								<Text style={messageText}>{message}</Text>
							</div>
						</div>
					</Section>

					{/* Fichiers attachés */}
					{attachments.length > 0 && (
						<Section style={section}>
							<div style={card}>
								<Heading style={cardTitle}>
									📎 Fichier{attachments.length > 1 ? "s" : ""} attaché
									{attachments.length > 1 ? "s" : ""}
								</Heading>
								<div style={attachmentBox}>
									{attachments.map((attachment, index) => (
										<Link
											key={index}
											href={attachment.url}
											target="_blank"
											style={attachmentLink}
										>
											{attachment.name}
										</Link>
									))}
								</div>
							</div>
						</Section>
					)}

					{/* Action */}
					<Section style={section}>
						<div style={actionBox}>
							<Text style={actionText}>
								💡 Vous pouvez répondre directement à cet email pour contacter{" "}
								{fullName}
							</Text>
						</div>
					</Section>

					<Hr style={separator} />

					{/* Footer */}
					<Section style={footer}>
						<Text style={footerText}>
							Email envoyé automatiquement depuis Manon Diététique
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

// Styles modernes et simplifiés
const main = {
	backgroundColor: "#f8fafc",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
	padding: "20px 0",
};

const container = {
	maxWidth: "600px",
	margin: "0 auto",
	backgroundColor: "#ffffff",
	borderRadius: "12px",
	overflow: "hidden",
	boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const header = {
	background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	padding: "32px 24px",
	textAlign: "center" as const,
};

const title = {
	color: "#ffffff",
	fontSize: "28px",
	fontWeight: "700",
	margin: "0 0 8px 0",
	textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const subtitle = {
	color: "rgba(255, 255, 255, 0.9)",
	fontSize: "16px",
	margin: "0",
	opacity: 0.9,
};

const section = {
	padding: "0 24px 24px 24px",
};

const card = {
	backgroundColor: "#ffffff",
	borderRadius: "8px",
	padding: "0",
	marginBottom: "16px",
};

const cardTitle = {
	color: "#1f2937",
	fontSize: "20px",
	fontWeight: "600",
	margin: "0 0 16px 0",
	borderBottom: "2px solid #e5e7eb",
	paddingBottom: "8px",
};

const infoGrid = {
	display: "grid",
	gap: "16px",
};

const infoItem = {
	borderBottom: "1px solid #f3f4f6",
	paddingBottom: "12px",
};

const infoLabel = {
	color: "#6b7280",
	fontSize: "14px",
	fontWeight: "500",
	margin: "0 0 4px 0",
	textTransform: "uppercase" as const,
	letterSpacing: "0.05em",
};

const infoValue = {
	color: "#111827",
	fontSize: "16px",
	fontWeight: "500",
	margin: "0",
};

const emailLink = {
	color: "#2563eb",
	textDecoration: "none",
	fontSize: "16px",
	fontWeight: "500",
	borderBottom: "1px solid transparent",
};

const messageBox = {
	backgroundColor: "#f8fafc",
	padding: "20px",
	borderRadius: "8px",
	border: "1px solid #e5e7eb",
	marginTop: "8px",
};

const messageText = {
	color: "#374151",
	fontSize: "16px",
	lineHeight: "1.6",
	whiteSpace: "pre-wrap" as const,
	margin: "0",
};

const attachmentBox = {
	backgroundColor: "#f0f9ff",
	padding: "16px",
	borderRadius: "8px",
	border: "1px solid #bae6fd",
	marginTop: "8px",
	textAlign: "center" as const,
};

const attachmentLink = {
	color: "#0369a1",
	textDecoration: "none",
	fontSize: "16px",
	fontWeight: "500",
	display: "block",
	marginBottom: "4px",
};

const actionBox = {
	backgroundColor: "#fef3c7",
	padding: "16px",
	borderRadius: "8px",
	border: "1px solid #f59e0b",
	textAlign: "center" as const,
};

const actionText = {
	color: "#92400e",
	fontSize: "15px",
	fontWeight: "500",
	margin: "0",
};

const separator = {
	borderTop: "1px solid #e5e7eb",
	margin: "24px",
};

const footer = {
	textAlign: "center" as const,
	padding: "16px 24px 24px 24px",
};

const footerText = {
	color: "#9ca3af",
	fontSize: "13px",
	margin: "0",
};
