import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()

  await prisma.post.create({
    data: {
      url: body.url,
      title: body.title,
      posPrompt: body.posPrompt,
      negPrompt: body.negPrompt,
      model: body.model,
      sampler: body.sampler,
      sdVersion: body.sdVersion,
    },
  }).then((e) => {
    console.log(e)
    return NextResponse.json(e, {status: 200})
  }).catch((e) => {
    console.log(e)
    return new NextResponse(JSON.stringify({ message: "Internal Error"}), {status: 500})
  })
}

export async function GET(req: Request) {
  const body = await req.json()

  return NextResponse.json({ message: "OK"}, {status: 200})
}