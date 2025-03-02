import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const totalStudents = await prisma.student.count()

        return NextResponse.json(totalStudents, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}