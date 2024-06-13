import { Sidebar } from "@/components"
import { TopMenu } from "@/components"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Sidebar />

			<div className="mb-6 ml-auto min-h-screen lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
				<TopMenu />

				<div className="m-2 rounded-lg bg-white px-6 py-6 text-black">{children}</div>
			</div>
		</>
	)
}
