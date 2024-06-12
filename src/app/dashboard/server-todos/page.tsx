import prisma from "@/lib/prisma"
import { TodosGrid } from "@/todos/components"
import { NewTodo } from "@/todos/components/NewTodo"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
	title: "TODOs list",
	description: "List of all the TODOs",
}

export default async function ServerTodosPages(): Promise<React.ReactElement> {
	const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } })

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
