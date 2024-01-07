import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  console.log(`Removed an item: ${body.id}`)

  try {
    const deletedItem = await prisma.post.delete({
        where: {
            id: body.id,
        },
    })
  } catch (e) {
    return NextResponse.json(e, { status: 500 })
  }

  return new NextResponse(JSON.stringify({ message: "Successfully deleted an item." }), { status: 200 })
}

export async function GET(req: Request) {
    return NextResponse.json({ message: "OK"}, {status: 200})
}