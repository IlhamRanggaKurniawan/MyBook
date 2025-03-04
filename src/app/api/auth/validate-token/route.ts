import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { handleError } from "@/lib/validation";

const SECRET_KEY = process.env.SECRET_KEY!;

const POSTBodySchema = z.object({
    token: z.string().jwt()
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = POSTBodySchema.safeParse(body)

        if(!validation.success) {
            return handleError(validation.error)
        }

        const decoded = jwt.verify(validation.data.token, SECRET_KEY);
        return NextResponse.json(decoded, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
