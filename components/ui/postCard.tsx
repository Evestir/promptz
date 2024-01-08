import Carousel from "@/components/ui/my-carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Label } from "./label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { postDataSchema } from "@/app/libs/interfaces"
import { FaTrash } from "react-icons/fa"
import { deletePost } from "@/app/libs/data"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { ScrollArea } from "./scroll-area"
import Grid from '@mui/material/Grid'
import UseEmblaCarousel  from "embla-carousel-react"
import styles from "@/app/styles/styles.module.css"

const delPost = async (e:any) => {
    const postData = {
        id: e.target.id
    }

    const deletedPost = await deletePost(postData)
    console.log(deletedPost)

    if (deletedPost.message === "Successfully deleted an item.") {
        redirect("/")
    }
}

const PostCard = (postData: postDataSchema) => {
    const [emblaRef] = UseEmblaCarousel()
    const posPrmptArray = postData.posPrompt.split(',').filter(item => item !== null).filter(item => item !== "")
    const negPrmptArray = postData.negPrompt.split(',').filter(item => item !== null).filter(item => item !== "")

    const Prm2Clipboard = async (e: any) => {
        let text = e.target.id

        try {
            if ('clipboard' in navigator) {
                await navigator.clipboard.writeText(text)
                toast("Successfully copied to clipboard!")
            } else {
                toast("Your browser doesn't support clipboard!")
                return
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Dialog>
            <div>
                <DialogTrigger asChild>
                    <div className="relative border border-stone-700 w-full p-0 rounded-md lg:w-[300px] sm:w-max md:w-max justify-center items-center">
                        <div className="flex items-center justify-center">
                            <Image className="w-full block h-full rounded-md" src={postData.url[0]} sizes="100vw" width={350} height={0} alt=""/>
                        </div>
                        <div className="absolute bottom-0 right-0 left-0 flex bg-gradient-to-b rounded-md 
                        from-transparent to-stone-900 flex-col justify-center items-start p-4 align-top">
                            <Label className="font-bold text-lg">{postData.title}</Label>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className={`${styles.shadow} rounded-lg lg:flex h-9/10 justify-between w-full bg-gradient-to-br from-stone-900 via-transparent to-neutral-900 p-0`} style={{transformStyle: "preserve-3d", maxWidth: '80%'}}>
                    <div className="embla justify-center flex w-full lg:ml-4 overflow-hidden" ref={emblaRef} >
                        <div className="embla_container w-full h-full flex">
                            {postData.url.map((imageSRC ) => (
                                <div className="embla_slide w-full h-full min-w-0 flex items-center justify-center" style={{ flex: '0 0 auto'}}>
                                    <Image className="drop-shadow-lg border lg:rounded-none rounded-lg lg:m-0 mt-6 lg:border-x-2 w-full" src={imageSRC} width={0} height={0} sizes="100vw" style={{ objectFit: 'cover' , height: '100%', width: 'auto' }} alt=""/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ScrollArea className="max-w-lg border-l bg-gradient-to-br rounded-r-lg from-slate-900 via-transparent to-stone-900 w-full p-6">
                    <div className="flex-col p-3 " >
                        <div className="rounded-md border -mt-3 mb-2 bg-neutral-900 bg-opacity-70">
                            <div className="w-full h-full bg-neutral-900 p-2 rounded-t-md font-medium border-b"><p className="font-thin">Prompt</p></div>
                            <div className="p-2">
                                <p className="text-xs opacity-50 mb-1">Positive</p>
                                <ScrollArea>
                                    <div className="max-h-[200px]">
                                        <Grid container spacing={0.5}>
                                            {posPrmptArray.map((item) => (
                                                <Grid item><div className="border text-center rounded-sm overflow-hidden bg-stone-900 text-xs p-1">{item}</div></Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                </ScrollArea>
                                <div className="w-full h-[1px] bg-stone-800 my-1" />
                                <p className="text-xs opacity-50 mb-1">Negative</p>
                                <ScrollArea>
                                    <div className="max-h-[200px]">
                                        <Grid container spacing={0.5}>
                                            {negPrmptArray.map((item) => (
                                                <Grid item><div className="border text-center rounded-sm overflow-hidden bg-stone-900 text-xs p-1">{item}</div></Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                        <div className="rounded-md border mt-2 flex bg-neutral-900 bg-opacity-70 flex-col">
                            <div className="w-full h-full bg-neutral-900 p-2 rounded-t-md border-b font-medium"><p className="font-thin">Details</p></div>
                            <div className="px-2">
                                <div className="py-2 flex justify-between">
                                    <p className="text-sm font-light">Model</p>
                                    <div className="border rounded-md px-10 bg-neutral-800">
                                        <p className="text-sm font-light">{postData.model}</p>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-stone-800" />

                                <div className="py-2 flex justify-between">
                                    <p className="text-sm font-light">Sampler</p>
                                    <div className="border rounded-md px-10 bg-neutral-800">
                                        <p className="text-sm font-light">{postData.sampler}</p>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-stone-800" />

                                <div className="py-2 flex justify-between">
                                    <p className="text-sm font-light">Stable Diffusion Version</p>
                                    <div className="border rounded-md px-10 bg-neutral-800">
                                        <p className="text-sm font-light">{postData.sdVersion}</p>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-stone-800" />

                                <div className="py-2 flex justify-between">
                                    <p className="text-sm font-light">Posted on</p>
                                    <div className="border rounded-md px-10 bg-neutral-800">
                                        <p className="text-sm font-light">{postData.createdAt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex mt-2 justify-between">
                            <Button id={postData.posPrompt} onClick={Prm2Clipboard} className="flex w-full rounded-r-none opacity-90" >Copy Positive</Button>
                            <Button id={postData.negPrompt} onClick={Prm2Clipboard} className="w-full rounded-l-none bg-rose-200 opacity-80" >Copy Negative</Button>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild className="flex justify-end w-full">
                                <div className="">
                                    <FaTrash size={22} className=" text-red-500 text-sm opacity-50 bg-stone-900 rounded-full border m-2 mt-4 hover:opacity-100 hover:border-4 transition-all cursor-pointer" />
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your post from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={delPost} id = {postData.id}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    </ScrollArea>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default PostCard;