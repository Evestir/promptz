import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()

  const res = await prisma.post.findMany({
    take: 10, // Retrieves the last 10 posts
    skip: (parseInt(body.page) || 0) * 10,
    orderBy: {
      createdAt: 'desc', 
    },
  }).catch((e) => {
    return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
  })

  return NextResponse.json(res, {status: 200})
}

export async function GET(req: Request) {
  const body = await req.json()

  const res = await prisma.post.findMany({
    take: 10, // Retrieves the last 10 posts
    skip: (parseInt(body.page) || 0) * 10,
    orderBy: {
      createdAt: 'desc', 
    },
  }).catch((e) => {
    return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
  })

  return NextResponse.json(res, {status: 200})
}