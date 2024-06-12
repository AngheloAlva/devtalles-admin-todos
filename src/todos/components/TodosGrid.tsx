"use client"

import { toggleTodo } from "../actions/todo-actions"
import TodoItem from "./TodoItem"

import type { Todo } from "@prisma/client"

export default function TodosGrid({ todos = [] }: TodosGridProps): React.ReactElement {
	// const toggleTodo = async (id: string, completed: boolean) => {
	// 	const updateTodo = await todosApi.updateTodo(id, completed)

	// 	router.refresh()
	// 	return updateTodo
	// }

	return (
		<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
			))}
		</div>
	)
}

interface TodosGridProps {
	todos?: Todo[]
}
