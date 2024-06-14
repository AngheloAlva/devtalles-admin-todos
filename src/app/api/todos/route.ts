import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { boolean, object, string } from "yup"

export async function GET(req: Request, res: Response) {
	const { searchParams } = new URL(req.url)
	const take = parseInt(searchParams.get("take") ?? "10")
	const skip = parseInt(searchParams.get("skip") ?? "0")

	if (isNaN(take)) {
		return NextResponse.json({ error: "Invalid take parameter" }, { status: 400 })
	}

	if (isNaN(skip)) {
		return NextResponse.json({ error: "Invalid skip parameter" }, { status: 400 })
	}

	const todos = await prisma.todo.findMany({
		take,
		skip,
	})

	return NextResponse.json(todos)
}

const postSchema = object({
	description: string().required(),
	completed: boolean().optional().default(false),
})

export async function POST(req: Request) {
	const session = await auth()

	if (!session?.user || !session.user.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	try {
		const { completed, description } = await postSchema.validate(await req.json())

		const todo = await prisma.todo.create({
			data: {
				completed,
				description,
				userId: session.user.id,
			},
		})

		return NextResponse.json(todo, { status: 201 })
	} catch (error) {
		return NextResponse.json(error, { status: 400 })
	}
}

export async function DELETE(req: Request) {
	const session = await auth()

	if (!session?.user || !session.user.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	try {
		await prisma.todo.deleteMany({
			where: {
				completed: true,
				userId: session.user.id,
			},
		})

		return NextResponse.json(
			{
				message: "Deleted successfully",
			},
			{ status: 201 }
		)
	} catch (error) {
		return NextResponse.json(error, { status: 400 })
	}
}
