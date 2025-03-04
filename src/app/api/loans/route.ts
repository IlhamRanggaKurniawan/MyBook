import prisma from "@/lib/prisma";
import { handleError } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const POSTBodySchema = z.object({
    bookId: z.string().uuid(),
    studentId: z.string().uuid()
})

const DELETEQuerySchema = z.string().uuid()

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const validation = POSTBodySchema.safeParse(body)

        if (!validation.success) {
            return handleError(validation.error)
        }

        const [student, book] = await Promise.all([
            await prisma.student.findUnique({ where: { id: validation.data.studentId } }),
            await prisma.book.findUnique({ where: { id: validation.data.bookId } })
        ])

        if (!student) {
            return NextResponse.json({error: "Student With This Id doen't exist"}, { status: 404 })
        }

        if (!book) {
            return NextResponse.json({error: "Book With This Id doen't exist"}, { status: 404 })
        }

        const loan = await prisma.loan.create({
            data: {
                bookId: validation.data.bookId,
                studentId: validation.data.studentId
            }
        })

        return NextResponse.json(loan, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams
        const query = decodeURIComponent(searchParams.get("query") || "")
        const page = Number(searchParams.get("page"))

        const loans = await prisma.loan.findMany({
            where: {
                OR: [
                    { book: { title: { contains: query } } },
                    { student: { name: { contains: query } } },
                    { student: { class: { contains: query } } },
                ],
                status: "borrowed"
            },
            take: 10,
            skip: 10 * (page - 1),
            select: {
                id: true,
                loanDate: true,
                book: { select: { title: true } },
                student: { select: { name: true } }
            }
        })

        return NextResponse.json(loans, { status: 200 })
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

        const tes = await prisma.loan.delete({
            where: {
                id: id!
            }
        })

        return NextResponse.json(tes, { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}