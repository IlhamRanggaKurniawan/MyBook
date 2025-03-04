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
    categoryName: z.string()
})

const DELETEQuerySchema = z.string().uuid()

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData()

        const bookData = {
            title: formData.get("title") as string,
            publisher: formData.get("publisher") as string,
            author: formData.get("author") as string,
            isbn: formData.get("isbn") as string,
            pages: Number(formData.get("pages")),
            categoryName: formData.get("categoryName") as string,
        };

        const validation = PostBodySchema.safeParse(bookData)
        if (!validation.success) {
            return handleError(validation.error)
        }

        const [existingBook, category] = await Promise.all([
            prisma.book.findUnique({
                where: {
                    isbn: validation.data.isbn
                }
            }),
            prisma.category.findUnique({
                where: {
                    name: validation.data.categoryName
                }
            })
        ])

        if (existingBook) {
            return NextResponse.json({ error: "book with this isbn already exists" }, { status: 400 })
        }

        if (!category) {
            return NextResponse.json({ error: "Category with this name does not exist" }, { status: 400 });
        }

        const file = formData.get("file") as Blob | null;

        const imageUrl = await upload(file);

        const book = await prisma.book.create({
            data: {
                ...validation.data,
                image: imageUrl
            },
        });

        return NextResponse.json(book, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams
        const query = decodeURIComponent(searchParams.get("query") || "")
        const categoryName = decodeURIComponent(searchParams.get("category") || "")
        const page = Number(searchParams.get("page")) || 1
        const take = Number(searchParams.get("take")) || 10

        const books = await prisma.book.findMany({
            where: {
                OR: [
                    { author: { contains: query, mode: "insensitive" } },
                    { isbn: { contains: query, mode: "insensitive" } },
                    { publisher: { contains: query, mode: "insensitive" } },
                    { title: { contains: query, mode: "insensitive" } },
                ],
                ...(categoryName ? { categoryName: categoryName } : {}),
            },
            take,
            skip: 10 * (page - 1)
        })

        return NextResponse.json(books, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const id = req.nextUrl.searchParams.get("id")

        const validation = DELETEQuerySchema.safeParse(id)

        if (!validation.success) {
            return handleError(validation.error)
        }

        const tes = await prisma.book.delete({
            where: {
                id: id!
            }
        })

        return NextResponse.json(tes, { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}