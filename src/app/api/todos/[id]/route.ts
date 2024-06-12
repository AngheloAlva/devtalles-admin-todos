import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

import type { Todo } from "@prisma/client"
import { boolean, object, string } from "yup"

interface Segments {
	params: {
		id: string
	}
}

const getTodo = async (id: string): Promise<Todo | null> => {
	const todo = await prisma.todo.findUnique({ where: { id } })
	return todo
}

export async function GET(req: Request, segments: Segments) {
	const todo = await getTodo(segments.params.id)

	if (!todo) {
		return NextResponse.json({ error: `Todo id ${segments.params.id} not found` }, { status: 404 })
	}

	return NextResponse.json(todo)
}

const putSchema = object({
	description: string().optional(),
	completed: boolean().optional(),
})

export async function PUT(req: Request, { params }: Segments) {
	const todo = await getTodo(params.id)

	if (!todo) {
		return NextResponse.json({ error: `Todo id ${params.id} not found` }, { status: 404 })
	}

	try {
		const { completed, description } = await putSchema.validate(await req.json())

		const updatedTodo = await prisma.todo.update({
			where: {
				id: params.id,
			},
			data: {
				completed,
				description,
			},
		})

		return NextResponse.json(updatedTodo)
	} catch (error) {
		return NextResponse.json(error, { status: 400 })
	}
}
