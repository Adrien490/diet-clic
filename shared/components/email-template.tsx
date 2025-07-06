import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";

interface ContactEmailTemplateProps {
	fullName: string;
	email: string;
	subject: string;
	message: string;
	attachment?: string;
}

export function ContactEmailTemplate({
	fullName,
	email,
	subject,
	message,
	attachment,
}: ContactEmailTemplateProps) {
	return (
		<Html lang="fr">
			<Head />
			<Preview>Nouvelle demande de contact de {fullName}</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* En-tête */}
					<Section style={header}>
						<Heading style={headerTitle}>Nouvelle demande de contact</Heading>
						<Text style={headerSubtitle}>
							Reçu via le formulaire de contact du site web
						</Text>
					</Section>

					{/* Informations du contact */}
					<Section>
						<Heading style={sectionTitle}>Informations du contact</Heading>
						<Section style={infoSection}>
							<Row>
								<Column style={infoLabel}>
									<Text style={infoLabelText}>Nom :</Text>
								</Column>
								<Column style={infoValue}>
									<Text style={infoValueText}>{fullName}</Text>
								</Column>
							</Row>
							<Row>
								<Column style={infoLabel}>
									<Text style={infoLabelText}>Email :</Text>
								</Column>
								<Column style={infoValue}>
									<Link href={`mailto:${email}`} style={emailLink}>
										{email}
									</Link>
								</Column>
							</Row>
							<Row>
								<Column style={infoLabel}>
									<Text style={infoLabelText}>Motif :</Text>
								</Column>
								<Column style={infoValue}>
									<Text style={infoValueText}>{subject}</Text>
								</Column>
							</Row>
						</Section>
					</Section>

					{/* Message */}
					<Section>
						<Heading style={sectionTitle}>Message</Heading>
						<Section style={messageBox}>
							<Text style={messageText}>{message}</Text>
						</Section>
					</Section>

					{/* Fichiers attachés */}
					{attachment && (
						<Section>
							<Heading style={sectionTitle}>Fichier attaché</Heading>
							<Section style={attachmentSection}>
								<div style={attachmentItem}>
									<Link
										href={attachment}
										target="_blank"
										style={attachmentLink}
									>
										📎 {attachment.split("/").pop() || "fichier"}
									</Link>
								</div>
							</Section>
						</Section>
					)}

					{/* Conseil */}
					<Section style={tipSection}>
						<Text style={tipText}>
							💡 <strong>Conseil :</strong> Vous pouvez répondre directement à
							cet email pour contacter {fullName}.
						</Text>
					</Section>

					<Hr style={separator} />

					{/* Footer */}
					<Section style={footer}>
						<Text style={footerText}>
							Email envoyé automatiquement depuis le site web Manon Diététique
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

// Styles
const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
	maxWidth: "600px",
	margin: "0 auto",
	padding: "20px",
};

const header = {
	backgroundColor: "#f8f9fa",
	padding: "20px",
	borderRadius: "8px",
	marginBottom: "20px",
};

const headerTitle = {
	color: "#2563eb",
	fontSize: "24px",
	fontWeight: "bold",
	margin: "0 0 10px 0",
};

const headerSubtitle = {
	color: "#6b7280",
	fontSize: "14px",
	margin: "0",
};

const sectionTitle = {
	color: "#374151",
	fontSize: "18px",
	fontWeight: "bold",
	marginBottom: "15px",
	borderBottom: "2px solid #e5e7eb",
	paddingBottom: "8px",
};

const infoSection = {
	marginBottom: "20px",
};

const infoLabel = {
	width: "100px",
	backgroundColor: "#f9fafb",
	padding: "8px 12px",
	borderRight: "1px solid #e5e7eb",
	verticalAlign: "top",
};

const infoLabelText = {
	fontWeight: "bold",
	color: "#374151",
	margin: "0",
};

const infoValue = {
	backgroundColor: "#ffffff",
	padding: "8px 12px",
	verticalAlign: "top",
};

const infoValueText = {
	color: "#111827",
	margin: "0",
};

const emailLink = {
	color: "#2563eb",
	textDecoration: "none",
};

const messageBox = {
	backgroundColor: "#f8f9fa",
	padding: "20px",
	borderRadius: "8px",
	border: "1px solid #e5e7eb",
	marginBottom: "20px",
};

const messageText = {
	color: "#374151",
	lineHeight: "1.6",
	whiteSpace: "pre-wrap" as const,
	margin: "0",
};

const attachmentSection = {
	marginBottom: "20px",
};

const attachmentItem = {
	backgroundColor: "#f8f9fa",
	padding: "10px 15px",
	marginBottom: "8px",
	borderRadius: "6px",
	border: "1px solid #e5e7eb",
};

const attachmentLink = {
	color: "#2563eb",
	textDecoration: "none",
	fontWeight: "500",
};

const tipSection = {
	backgroundColor: "#f8f9fa",
	padding: "15px",
	borderRadius: "8px",
	marginBottom: "20px",
	borderLeft: "4px solid #2563eb",
};

const tipText = {
	color: "#6b7280",
	fontSize: "14px",
	margin: "0",
};

const separator = {
	borderTop: "1px solid #e5e7eb",
	margin: "20px 0",
};

const footer = {
	textAlign: "center" as const,
	padding: "15px",
};

const footerText = {
	color: "#9ca3af",
	fontSize: "12px",
	margin: "0",
};
