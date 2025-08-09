import { PageContainer } from "@/shared/components/page-container";
import { PageHeader } from "@/shared/components/page-header";

export default function AdminPage() {
	return (
		<PageContainer>
			<PageHeader
				title="Dashboard"
				description="Bienvenue sur votre tableau de bord"
			/>
			<div>Admin</div>
		</PageContainer>
	);
}
