import prisma from "@/lib/prisma"
import { handleError } from "@/lib/validation"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const POSTBodySchema = z.object({
    name: z.string(),
    nis: z.string().regex(/^\d+$/, "NIS must be a number"),
    class: z.string()
})

const DELETEQuerySchema = z.string().uuid()

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const validation = POSTBodySchema.safeParse(body)

        if (!validation.success) {
            return handleError(validation.error)
        }

        const existingStudent = await prisma.student.findUnique({
            where: {
                nis: validation.data.nis
            }
        })

        if (existingStudent) {
            return NextResponse.json({ error: "Student with this nis already exist" }, { status: 400 })
        }

        const student = await prisma.student.create({
            data: {
                class: validation.data.class,
                nis: validation.data.nis,
                name: validation.data.name
            }
        })

        return NextResponse.json(student, { status: 201 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams
        const query = decodeURIComponent(searchParams.get("query") || "")
        const page = Number(searchParams.get("page")) || 1

        const students = await prisma.student.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { nis: { contains: query } },
                    { class: { contains: query, mode: "insensitive" } },
                ]
            },
            take: 10,
            skip: 10 * (page - 1)
        })

        return NextResponse.json(students, { status: 200 })
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

        const tes = await prisma.student.delete({
            where: {
                id: id!
            }
        })

        return NextResponse.json(tes, { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}