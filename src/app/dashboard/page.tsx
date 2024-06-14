import { redirect } from "next/navigation"
import { WidgetItem } from "@/components"
import { auth } from "@/auth"

export default async function DashboardPage(): Promise<React.ReactElement> {
	const session = await auth()

	if (!session) {
		redirect("/api/auth/signin")
	}

	return (
		<div className="grid gap-6 md:grid-cols-1">
			<WidgetItem title="Conected user Server-side">
				<div className="flex flex-col">
					<span>{session.user?.name}</span>
					<span>{session.user?.image}</span>
					<span>{session.user?.email}</span>
				</div>
			</WidgetItem>
		</div>
	)
}
