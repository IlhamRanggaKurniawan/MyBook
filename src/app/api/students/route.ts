import prisma from "@/lib/prisma"
import { handleError } from "@/lib/validation"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const POSTBodySchema = z.object({
    name: z.string(),
    nis: z.number(),
    class: z.string()
})

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
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams
        const query = decodeURIComponent(searchParams.get("query") || "")
        const page = Number(searchParams.get("page"))

        const students = await prisma.student.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { nis: isNaN(Number(query)) ? undefined : Number(query) },
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