import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const POSTRequestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const validation = POSTRequestBodySchema.safeParse(body);

        if (!validation.success) {
            const errors = validation.error.issues.map(issue => {
                return {
                    field: issue.path[0],
                    message: issue.message
                }
            });

            return NextResponse.json({ errors }, { status: 400 });
        }


        const existingUser = await prisma.admin.findFirst({
            where: {
                email: validation.data.email
            }
        })

        if (existingUser) {
            return NextResponse.json(
                { message: "Account with this email already registered" },
                { status: 400 }
            )
        }

        const user = await prisma.admin.create({
            data: validation.data
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        )
    }
}

export { POST }