import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const take = Number(req.nextUrl.searchParams.get("take")) || 8

    try {
        const books = await prisma.book.findMany({
            take,
            orderBy: {
                loan: {
                    _count: "desc"
                }
            },
            include: {
                _count: {
                    select: {
                        loan: {}
                    }
                }
            }
        })

        return NextResponse.json(books, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}