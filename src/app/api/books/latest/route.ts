import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const books = await prisma.book.findMany({
            take: 8,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                loan: true
            }
        })

        return NextResponse.json(books, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}