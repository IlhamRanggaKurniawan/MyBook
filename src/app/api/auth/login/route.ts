import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const POSTBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const validation = POSTBodySchema.safeParse(body)
        if (!validation.success) {
            return handleError(validation.error)
        }

        const admin = await prisma.admin.findUnique({
            where: {
                email: validation.data.email
            }
        })

        if (!admin) {
            return NextResponse.json({ error: "Admin with this email doen't exist" }, { status: 404 })
        }

        const isPasswordValid = await comparePassword(validation.data.password, admin.password)

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Password is not valid" }, { status: 400 })
        }

        const token = generateToken(admin.name)

        const response = NextResponse.json(admin, { status: 200 })

        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7
        })

        return response
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}