"use client"

import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"

import styles from "./TodoItem.module.css"
import type { Todo } from "@prisma/client"

export default function TodoItem({ todo, toggleTodo }: TodoItemProps): React.ReactElement {
	return (
		<div className={todo.completed ? styles.todoDone : styles.todoPending}>
			<div className="flex flex-col items-center justify-start gap-4 sm:flex-row">
				<div
					onClick={() => toggleTodo?.(todo.id, !todo.completed)}
					className={`flex cursor-pointer rounded-md p-2 hover:bg-opacity-60 ${todo.completed ? "bg-blue-100" : "bg-red-100"}`}
				>
					{todo.completed ? <IoCheckboxOutline size={24} /> : <IoSquareOutline size={24} />}
				</div>

				<div className="text-center text-neutral-900 sm:text-left">{todo.description}</div>
			</div>
		</div>
	)
}

interface TodoItemProps {
	todo: Todo
	toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>
}
