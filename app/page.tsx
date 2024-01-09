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
      <Image src={"https://appstorrent.ru/templates/appstorrent-25c9c1746c/assets/img/bg.webp"} alt='' height={0} width={0} style={{maxHeight: 'auto', maxWidth: '100%'}} className=" opacity-50"/>
      <div className='mt-20'>
        <PostBoard />
      </div>    
    </main>
  )
}
