"use client"

import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"
import { startTransition, useOptimistic } from "react"

import styles from "./TodoItem.module.css"
import type { Todo } from "@prisma/client"

export default function TodoItem({ todo, toggleTodo }: TodoItemProps): React.ReactElement {
	const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
		todo,
		(state, newCompleteValue: boolean) => ({ ...state, completed: newCompleteValue })
	)

	const onToggleTodo = async () => {
		try {
			startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))
			await toggleTodo?.(todoOptimistic.id, !todoOptimistic.completed)
		} catch (error) {
			startTransition(() => toggleTodoOptimistic(todoOptimistic.completed))
		}
	}

	return (
		<div className={todoOptimistic.completed ? styles.todoDone : styles.todoPending}>
			<div className="flex flex-col items-center justify-start gap-4 sm:flex-row">
				<div
					onClick={onToggleTodo}
					className={`flex cursor-pointer rounded-md p-2 hover:bg-opacity-60 ${todoOptimistic.completed ? "bg-blue-100" : "bg-red-100"}`}
				>
					{todoOptimistic.completed ? (
						<IoCheckboxOutline size={24} />
					) : (
						<IoSquareOutline size={24} />
					)}
				</div>

				<div className="text-center text-neutral-900 sm:text-left">
					{todoOptimistic.description}
				</div>
			</div>
		</div>
	)
}

interface TodoItemProps {
	todo: Todo
	toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>
}
