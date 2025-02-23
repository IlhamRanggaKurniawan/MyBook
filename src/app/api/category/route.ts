import prisma from "@/lib/prisma";
import { handleError } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PostBodySchema = z.object({
    name: z.string()
})

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const validation = PostBodySchema.safeParse(body)

        if (!validation.success) {
            return handleError(validation.error)
        }

        const existingCategory = await prisma.category.findUnique({
            where: {
                name: validation.data.name
            }
        })

        if (existingCategory) {
            return NextResponse.json({ error: "category with this name already exist" }, { status: 400 })
        }

        const category = await prisma.category.create({
            data: validation.data
        })

        return NextResponse.json({ category }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export const GET = async () => {
    try {
        const categories = await prisma.category.findMany()

        return NextResponse.json({ categories }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}