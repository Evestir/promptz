'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { uploadPost } from "@/app/libs/data"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./form"
import { Button } from "./button"
import { useState } from 'react'
import { upload2Imgur } from "@/app/libs/data"

interface postDataSchema {
    url: string[];
    title: string;
    posPrompt: string;
    negPrompt: string;
}

const postData: postDataSchema = {
    url: [],
    title: '',
    posPrompt: '',
    negPrompt: '',
}

const formSchema = z.object({
    title: z.string(),
    posPrompt: z.string(),
    negPrompt: z.string(),
})

const PostForm = () => {
    const urlStrings:string[] = []
    const [image, setFile] = useState<File>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const recieveUrlFromImage = async (params:File | undefined) => {
        setFile(params);
        if (!params) {
            console.log("No input image from form.")
            return
        }

        const url = await upload2Imgur(params)
        urlStrings.push(url)
    }
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!image) {
            console.error("Target image not found!")
            return
        }
        postData.url = urlStrings
        postData.negPrompt = values.negPrompt
        postData.posPrompt = values.posPrompt
        postData.title = values.title
        console.log(postData)

        uploadPost(postData)
    }

    return (
        <div>
            <Input type="file" onChange={(e) => recieveUrlFromImage(e.target.files?.[0])} placeholder="giv me sum name!!"/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="giv me sum name!!"/>
                            </FormControl>
                            <FormDescription>
                                Title of your post goes here.
                            </FormDescription>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="posPrompt" render={({ field }) => (
                        <FormItem>
                            <FormLabel><p className="text-blue-400">Positive</p> Prompt</FormLabel>
                            <FormControl>
                                <Input placeholder="positive"/>
                            </FormControl>
                            <FormDescription>
                                Copy and Paste your Positive Prompt here.
                            </FormDescription>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="negPrompt" render={({ field }) => (
                        <FormItem>
                            <p><p className="text-red-400">Negative</p> Prompt</p>
                            <FormControl>
                                <Input placeholder="negative"/>
                            </FormControl>
                            <FormDescription>
                                Copy and Paste your Negative Prompt here.
                            </FormDescription>
                        </FormItem>
                    )} />
                    <Button type="submit">Upload</Button>
                </form>
            </Form>
        </div>
    )
}

export default PostForm;