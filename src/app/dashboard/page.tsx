import { WidgetItem } from "@/components"

export default function DashboardPage(): React.ReactElement {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<WidgetItem
				title="Global Activities"
				amount="23,988"
				compared="Compared to last week $13,988"
				percentage="2"
			/>
		</div>
	)
}
