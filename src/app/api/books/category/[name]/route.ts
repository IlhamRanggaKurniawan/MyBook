import prisma from "@/lib/prisma";
import { handleError } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GetParamsSchema = z.object({
    name: z.string()
})

export const GET = async (_request: NextRequest, { params }: { params: Promise<{ name: string }> }) => {
    try {
        const validation = GetParamsSchema.safeParse(await params)

        if (!validation.success) {
            return handleError(validation.error)
        }
 
        const books = await prisma.book.findMany({
            where: {
                Category: {
                    name: validation.data.name
                }
            }
        })

        return NextResponse.json({ books }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}