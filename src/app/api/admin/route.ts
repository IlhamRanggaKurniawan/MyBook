import { hashPassword } from "@/lib/bcrypt"
import prisma from "@/lib/prisma"
import { handleError } from "@/lib/validation"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const PostBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const validation = PostBodySchema.safeParse(body);

        if (!validation.success) {
            return handleError(validation.error)
        }

        const existingAccount = await prisma.admin.findFirst({
            where: {
                email: validation.data.email
            }
        })

        if (existingAccount) {
            return NextResponse.json({ error: "Account with this email already registered" }, { status: 400 })
        }

        const hashedPassword = await hashPassword(validation.data.password)

        const admin = await prisma.admin.create({
            data: {
                name: validation.data.name,
                email: validation.data.email,
                password: hashedPassword
            }
        })

        return NextResponse.json({ admin }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export { POST }