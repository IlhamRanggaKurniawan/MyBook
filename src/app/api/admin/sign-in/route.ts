import { comparePassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PostBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const validation = PostBodySchema.safeParse(body)

        if (!validation.success) {
            return handleError(validation.error)
        }

        const admin = await prisma.admin.findUnique({
            where: {
                email: validation.data.email
            }
        })

        if (!admin) {
            return NextResponse.json({ error: "There is no account with this email" }, { status: 400 })
        }

        if (!await comparePassword(validation.data.password, admin.password)) {
            return NextResponse.json(
                { message: "Incorrect Password" },
                { status: 400 }
            )
        }

        return NextResponse.json({ admin }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export { POST }