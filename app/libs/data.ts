import { PrismaClient } from "@prisma/client"
import { error } from "console"
import * as z from "zod"

interface postData {
    url: string[];
    title: string;
    posPrompt: string;
    negPrompt: string;
}

const prisma = new PrismaClient()

export async function uploadPost(params: postData) {
    await prisma.post.create({
        data: {
          url: params.url,
          title: params.title,
          posPrompt: params.posPrompt,
          negPrompt: params.negPrompt,
        },
    })
}

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

export async function upload2Imgur(params: File) {
    try {
        console.log(params.name)
        //let base64Img = await getBase64(params);
        const parm = new FormData();
        parm.append('image', params)
        /*if (typeof base64Img == 'string') {
            base64Img = base64Img.replace(/^data:.+base64,/, '')
            parm.append('image', base64Img)
            parm.append('type', 'base64')
        }*/

        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: 'Client-ID 3323c16a5b7b123',
            },
            body: parm,
        })

        if (response.ok) {
            const resp = await response.json()
            console.log(`Successfully delivered your precious image to Imgur. ${resp.data.link}`)
            return resp.data.link
        } else {
            console.log(`Error occured while uploading an Image. status: ${response.status}}`);
            return null
        }
    } catch (e) {
        console.error('Caught an error while uploading to imgur:', e)
        return null
    }
}