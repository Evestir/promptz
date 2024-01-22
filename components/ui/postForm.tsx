'use client'
import { IoIosImages } from "react-icons/io"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Button } from "./button"
import { useRef, useState } from 'react'
import { upload2Api, upload2Imgur } from "@/app/libs/data"
import { Label } from "@radix-ui/react-label"
import { Check, ChevronsUpDown, Loader, Loader2, Space } from "lucide-react"
import { UploadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { models } from "@/app/libs/modelList"
import { samplers } from "@/app/libs/samplerList"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "./scroll-area"
import { useCookies } from "next-client-cookies"

const sdVersionList = [
    "SD 1.5",
    "SD 2.1",
    "SDXL",
]

interface postDataSchema {
    url: string[];
    title: string;
    posPrompt: string;
    negPrompt: string;
    model: string;
    sampler: string;
    sdVersion: string;
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
    model: '',
    sampler: '',
    sdVersion: '',
}

const urlStrings:string[] = []

const PostForm = () => {
    const cookies = useCookies()

    const [image, setFile] = useState<File>()
    const [imageNames, setImageNames] = useState([""])
    const [isLoading, setIsLoading] = useState(false)
    const [dragActive, setDragActive] = useState<boolean>(false)
    const [samOpen, setSamOpen] = useState(false)
    const [sampler, setSampler] = useState("")
    const [moOpen, setMoOpen] = useState(false)
    const [model, setModel] = useState("")
    const [modelInput, setMinput] = useState("")
    const [sdVersion, setSDVersion] = useState("SD 1.5")
    const [vIndicatorOffset, setvIndicatorOffset] = useState(1)

    const recieveUrlFromImage = async (params:File | undefined) => {
        setIsLoading(true)

        setFile(params);
        if (!params) {
            console.log("No input image from form.")
            return
        }

        const ImgurID = cookies.get('ImgurID')
        if (ImgurID === undefined) {
            toast("Please set your Imgur ID First!", {
                description: 'You can set your ID in the profiles menu.'
            })
            
            setIsLoading(false)
            setDragActive(false)
            return 
        }

        const url = await upload2Imgur(params, ImgurID)
        urlStrings.push(url)

        setIsLoading(false)
        setDragActive(false)
        setImageNames(prevNames => [...prevNames, params.name])
        toast("Successfully uploaded an image!", {
            description: params.name
        })
    }

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        
        if (model === "" || sampler === "") {
            console.log("User did not fill all fields.")
            toast("Please fill out all the fields!")
            setIsLoading(false)
            return
        }

        postData.url = urlStrings.filter(item => item !== null)
        postData.negPrompt = values.negPrompt
        postData.posPrompt = values.posPrompt
        postData.title = values.title
        postData.model = model
        postData.sampler = sampler
        postData.sdVersion = sdVersion
        console.log(postData)

        if (!image) {
            console.log("Target image not found!")
            toast("Please upload at least one image!")
            setIsLoading(false)
            return
        }

        const result = await upload2Api(postData).finally(() => {setIsLoading(false)})
        if (result.message === "Successfully submitted your form!") {
            toast("Successfully uploaded your post!", {
                description: postData.title
            })
            window.location.reload()
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
                recieveUrlFromImage(e.dataTransfer.files[i])
            }
        }
    }

    const changeMinput = (e: any) => {
        setMinput(e.target.value)
    }

    const handleMkeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setModel(modelInput)
            setMoOpen(false)
        }
    }

    const handleVersionClick = (e: any) => {
        let id = e.target.id
        setSDVersion(id)
        if (id === 'SD 1.5') {
            setvIndicatorOffset(1)
        } else if (id === 'SD 2.1') {
            setvIndicatorOffset(155)
        } else if (id === 'SDXL') {
            setvIndicatorOffset(308)
        }
    }

    return (
        <div>
            <Label className="text-xl font-bold">Create Your Post</Label>
            <div className="border rounded-md my-2">
                <form className={`${
                    dragActive ? "bg-stone-800" : " bg-inherit"
                } border-b p-4 justify-center items-center flex-col flex w-full transition-all`} onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver}>
                    <p className=" opacity-50">Drag & Drop Your Images!</p>
                    <IoIosImages opacity={0.5} size={180}/>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin absolute" opacity={isLoading ? 1 : 0}/>
                </form>
                <div className="flex">
                    <p className="text-xs font-light px-2 py-1 opacity-80 border-r">Images</p>
                    <ScrollArea className="w-[400px] overflow-hidden whitespace-nowrap">
                        <div className="flex">
                            {imageNames.map((imageName) => (
                                <p key={imageName} className="pt-1 px-[2px] text-xs">{imageName}</p>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
            <Form {...form}>
                <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="border rounded-md">
                        <p className="text-md mb-1 font-semibold p-2">Title</p>
                        <FormField control={form.control} name="title" render={({field}) => {
                            return <FormItem>
                                <FormControl>
                                    <Input className="border-x-0 transition-all border-b-0 border-t rounded-t-none" placeholder="A person who breathes air 😤" type="text" {...field} required/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />
                    </div>
                    <div className="mt-2 border rounded-md">
                        <p className="p-2 font-semibold">Prompt</p>
                        <FormField control={form.control} name="posPrompt" render={({field}) => {
                            return <FormItem>
                                <FormControl>
                                    <Input className="py-8 transition-all border-y text-sm border-x-0 rounded-none" placeholder="masterpiece, best quality, ..." type="text" {...field} required/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />

                        <FormField control={form.control} name="negPrompt" render={({field}) => {
                            return <FormItem>
                                <FormControl>
                                    <Input className="py-8 transition-all border-none text-sm rounded-t-none" placeholder="badhandv4, easyNegative, ..." type="text" {...field} required/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />
                    </div>
                    <div className="rounded-md border my-2">
                        <p className="text-md font-semibold p-2">Details</p>
                        <div className="h-[1px] w-full bg-stone-800" />
                        
                        <div className="flex justify-between mt-2 px-2">
                            <Popover modal={true} open={moOpen} onOpenChange={setMoOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={moOpen} className="w-[200px] justify-between">
                                    {model ? model : "Select Model..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command className="h-[400px]">
                                        <CommandInput onKeyDown={handleMkeyDown} onChangeCapture={changeMinput} value={modelInput} placeholder="Search Model..." />
                                        <CommandEmpty>No Model found.</CommandEmpty>
                                        <CommandGroup>
                                            <ScrollArea className="w-full h-[350px]">
                                            {models.map((modelName) => (
                                            <CommandItem key={modelName.value} value={modelName.value} 
                                            onSelect={(currentValue) => {
                                                setModel(modelName.value === model ? "" : modelName.value)
                                                setMoOpen(false)
                                                }}>
                                                <Check className={cn("mr-2 h-4 w-4", model === modelName.value ? "opacity-100" : "opacity-0")}/>
                                                {modelName.value}
                                            </CommandItem>
                                            ))}
                                            </ScrollArea>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover> 
                            <Popover modal={true} open={samOpen} onOpenChange={setSamOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={moOpen} className="w-[236px] justify-between">
                                        {sampler ? sampler: "Select Sampler..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[236px] p-0">
                                    <Command className="h-[400px]">
                                        <CommandInput placeholder="Search Sampler..." />
                                        <CommandEmpty>No Sampler found.</CommandEmpty>
                                        <CommandGroup>
                                            <ScrollArea className="w-full h-[350px]">
                                            {samplers.map((samplerName) => (
                                            <CommandItem className="overflow-hidden" key={samplerName.value} value={samplerName.value} 
                                            onSelect={(currentValue) => {
                                                setSampler(samplerName.value === sampler ? "" : samplerName.value)
                                                setSamOpen(false)
                                                }}>
                                                <Check className={cn("mr-2 h-4 w-4", sampler === samplerName.value ? "opacity-100" : "opacity-0")}/>
                                                {samplerName.value}
                                            </CommandItem>
                                            ))}
                                            </ScrollArea>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="rounded-md border-t flex mt-2 justify-between cursor-pointer">
                            <div className={`opacity-20 bg-white h-[32px] w-[153px] absolute transition-all ease-in-out duration-500 rounded-md border left-6`} style={{ transform: `translateX(${vIndicatorOffset}px)` }}/>
                            {sdVersionList.map((sdVersionName) => (
                                <div className="py-1 text-center w-1/3 items-center justify-center" id={sdVersionName} key={sdVersionName} onClick={handleVersionClick}>
                                    {sdVersionName}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button className="size-fit w-full" disabled={isLoading}>
                            <UploadIcon className="w-4 mr-2"/>
                            Upload!
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default PostForm;