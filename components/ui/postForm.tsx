'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Button } from "./button"
import { useState } from 'react'
import { upload2Api, upload2Imgur } from "@/app/libs/data"
import { useRouter } from "next/router"
import { Label } from "@radix-ui/react-label"
import { Card } from "./card"
import { Space } from "lucide-react"
import { UploadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner"

interface postDataSchema {
    url: string[];
    title: string;
    posPrompt: string;
    negPrompt: string;
}

const formSchema = z.object({
    title: z.string(),
    posPrompt: z.string(),
    negPrompt: z.string(),
})

const postData: postDataSchema = {
    url: [],
    title: '',
    posPrompt: '',
    negPrompt: '',
}

const urlStrings:string[] = []

const PostForm = () => {
    const [image, setFile] = useState<File>()
    const [isLoading, setIsLoading] = useState(false)

    const recieveUrlFromImage = async (params:File | undefined) => {
        setIsLoading(true)

        setFile(params);
        if (!params) {
            console.log("No input image from form.")
            return
        }

        const url = await upload2Imgur(params)
        urlStrings.push(url)

        setIsLoading(false)
        toast("Your post has been submitted successfully!", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Thanks!",
              onClick: () => alert("You can donate always!"),
            },
        })
    }

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        
        postData.url = urlStrings
        postData.negPrompt = values.negPrompt
        postData.posPrompt = values.posPrompt
        postData.title = values.title
        console.log(postData)

        /* if (!image) {
            console.error("Target image not found!")
            setIsLoading(false)
            return
        } */

        upload2Api(postData).finally(() => {setIsLoading(false)})
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    return (
        <Card className="p-8">
            <div>
                <Label className="text-xl font-bold">Create Your Post</Label>
                <Input className="my-4" type="file" onChange={(e) => recieveUrlFromImage(e.target.files?.[0])} placeholder="giv me sum name!!"/>
            </div>
            <Form {...form}>
                <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField control={form.control} name="title" render={({field}) => {
                        return <FormItem>
                            <Label className="font-semibold">Title</Label>
                            <FormControl>
                                <Input placeholder="Put your title :>" type="text" {...field} required/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} />

                    <FormField control={form.control} name="posPrompt" render={({field}) => {
                        return <FormItem>
                            <Label className="font-semibold">Prompt</Label>
                            <FormControl>
                                <Input className="py-8" placeholder="masterpiece, best quality, ..." type="text" {...field} required/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} />

                    <FormField control={form.control} name="negPrompt" render={({field}) => {
                        return <FormItem>
                            <FormControl>
                                <Input className="py-8 mt-2" placeholder="badhandv4, easyNegative, ..." type="text" {...field} required/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} />
                    <div className="flex items-center justify-center">
                        <Button className="bg-indigo-300 mt-4 size-fit w-full" disabled={isLoading}><UploadIcon className="w-4 mr-2"/>Upload!</Button>
                    </div>
                </form>
            </Form>
        </Card>
    )
}

export default PostForm;