import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()

  console.log(body.page)

  const res = await prisma.post.findMany({
    take: 20, // Retrieves the last 10 posts
    skip: body.page || 0 * 20,
    orderBy: {
      createdAt: 'desc', 
    },
  }).catch((e) => {
    return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
  })

  return NextResponse.json(res, {status: 200})
}

export async function GET(req: Request) {
  
  return new NextResponse(null, {status: 200})
}