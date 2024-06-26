"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

import type { Todo } from "@prisma/client"

export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
	const todo = await prisma.todo.findFirst({
		where: { id },
	})

	if (!todo) {
		throw `Todo with id ${id} not found`
	}

	const updatedTodo = await prisma.todo.update({
		where: { id },
		data: { completed },
	})

	revalidatePath("/dashboard/server-todos")
	return updatedTodo
}

export const addTodo = async (description: string, userId: string) => {
	try {
		const todo = await prisma.todo.create({
			data: { description, userId },
		})

		revalidatePath("/dashboard/server-todos")
		return todo
	} catch (error) {
		return {
			message: "Error creating todo",
		}
	}
}

export const deleteCompleted = async (): Promise<void> => {
	try {
		await prisma.todo.deleteMany({
			where: {
				completed: true,
			},
		})

		revalidatePath("/dashboard/server-todos")
	} catch (error) {
		throw "Error deleting completed todos"
	}
}
