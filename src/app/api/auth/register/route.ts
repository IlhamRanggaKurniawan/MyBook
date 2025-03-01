import { hashPassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const POSTBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
})

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const validation = POSTBodySchema.safeParse(body)

        if (!validation.success) {
            return handleError(validation.error)
        }

        if (validation.data.password !== validation.data.confirmPassword) {
            return NextResponse.json({ error: "password doen't match" }, { status: 400 })
        }

        const admin = await prisma.admin.findUnique({
            where: {
                email: validation.data.email
            }
        })

        if (admin) {
            return NextResponse.json({ error: "admin with this email already exist" }, { status: 400 })
        }

        const hashedPassword = await hashPassword(validation.data.password)

        const newAdmin = await prisma.admin.create({
            data: {
                name: validation.data.name,
                email: validation.data.email,
                password: hashedPassword
            }
        })

        const token = generateToken(newAdmin.name)

        const response = NextResponse.json(newAdmin, { status: 201 })

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