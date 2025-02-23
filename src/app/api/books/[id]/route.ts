import prisma from "@/lib/prisma";
import { handleError } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GetParamsSchema = z.object({
    id: z.string().uuid()
})

export const GET = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const validation = GetParamsSchema.safeParse(await params)

        if (!validation.success) {
            return handleError(validation.error)
        }

        const book = await prisma.book.findUnique({
            where: validation.data
        })

        return NextResponse.json({ book }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}