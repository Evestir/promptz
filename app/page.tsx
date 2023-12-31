import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import PostCard from '@/components/ui/postCard'
import PostForm from '@/components/ui/postForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <PostForm/>
      </div>
      <div>
        {PostCard()}  
      </div>    
    </main>
  )
}
