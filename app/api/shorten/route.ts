import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { url } = await req.json();
    const shortUrl = nanoid(8)
    const shortendUrl = await prisma.url.create({
        data: {
            originalUrl: url,
            shortUrl
        }
    });

    return NextResponse.json({ shortCode: shortendUrl.shortUrl });

}