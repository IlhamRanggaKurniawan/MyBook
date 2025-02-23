import prisma from "@/lib/prisma";
import { handleError } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PostBodySchema = z.object({
    title: z.string(),
    publisher: z.string(),
    author: z.string(),
    isbn: z.string(),
    pages: z.number(),
    image: z.string().url(),
    categoryId: z.string().uuid()
})

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const validation = PostBodySchema.safeParse(body)

        if (!validation.success) {
            return handleError(validation.error)
        }

        const existingBook = await prisma.book.findUnique({
            where: {
                isbn: validation.data.isbn
            }
        })

        if (existingBook) {
            return NextResponse.json({ error: "book with this isbn already exists" }, { status: 400 })
        }

        const book = await prisma.book.create({
            data: validation.data,
        })

        return NextResponse.json({ book }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}