"use client"

import { IoTrashOutline } from "react-icons/io5"
import { useRouter } from "next/navigation"
import * as todoApi from "../helpers/todos"
import { useState } from "react"

export const NewTodo = () => {
	const [description, setDescription] = useState("")
	const router = useRouter()

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (description.trim().length === 0) return

		await todoApi.createTodo(description)
		router.refresh()
		setDescription("")
	}

	const deleteCompletedTodos = async () => {
		await todoApi.deleteCompletedTodos()
		router.refresh()
	}

	return (
		<form className="flex w-full" onSubmit={onSubmit}>
			<input
				type="text"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="-ml-10 w-6/12 rounded-lg border-2 border-gray-200 py-2 pl-3 pr-3 outline-none transition-all focus:border-sky-500"
				placeholder="¿Qué necesita ser hecho?"
			/>

			<button
				type="submit"
				className="ml-2 flex items-center justify-center rounded bg-sky-500 p-2 text-white transition-all hover:bg-sky-700"
			>
				Crear
			</button>

			<span className="flex flex-1"></span>

			<button
				onClick={() => deleteCompletedTodos()}
				type="button"
				className="ml-2 flex items-center justify-center rounded bg-red-400 p-2 text-white transition-all hover:bg-red-700"
			>
				<IoTrashOutline />
				Delete Completed
			</button>
		</form>
	)
}
