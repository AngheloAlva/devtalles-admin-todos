import { NewTodo } from "@/todos/components/NewTodo"
import { TodosGrid } from "@/todos/components"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
	title: "TODOs list",
	description: "List of all the TODOs",
}

export default async function ServerTodosPages(): Promise<React.ReactElement> {
	const session = await auth()

	if (!session) redirect("/api/auth/signin")

	const id = session?.user.id
	const todos = await prisma.todo.findMany({
		orderBy: { description: "asc" },
		where: { id },
	})

	return (
		<div>
			<h1>Server Actions</h1>
			<div className="mx-5 mb-5 w-full px-3">
				<NewTodo />
			</div>
			<TodosGrid todos={todos} />
		</div>
	)
}
