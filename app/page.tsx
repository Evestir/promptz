import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import PostBoard from '@/components/ui/postBoard'
import PostForm from '@/components/ui/postForm'
import axios from 'axios'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <div className='mt-20'>
        <PostBoard />
      </div>    
    </main>
  )
}
