import prisma from "@/lib/prisma";
import { upload } from "@/lib/s3";
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
        const formData = await request.formData()

        const file = formData.get("file") as Blob | null;

        const imageUrl = await upload(file);

        const bookData = {
            title: formData.get("title") as string,
            publisher: formData.get("publisher") as string,
            author: formData.get("author") as string,
            isbn: formData.get("isbn") as string,
            pages: Number(formData.get("pages")),
            image: imageUrl,
            categoryId: formData.get("categoryId") as string,
        };

        const validation = PostBodySchema.safeParse(bookData)
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
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}