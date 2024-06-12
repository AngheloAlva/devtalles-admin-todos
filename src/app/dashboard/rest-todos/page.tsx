import prisma from "@/lib/prisma"
import { TodosGrid } from "@/todos/components"
import { NewTodo } from "@/todos/components/NewTodo"

export const metadata = {
	title: "TODOs list",
	description: "List of all the TODOs",
}

export default async function RestTodosPages(): Promise<React.ReactElement> {
	const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } })

	return (
		<div>
			<h1>Page Rest Todos</h1>
			<div className="mx-5 mb-5 w-full px-3">
				<NewTodo />
			</div>
			<TodosGrid todos={todos} />
		</div>
	)
}
