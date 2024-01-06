import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Label } from "./label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Input } from "./input"

interface postDataSchema {
    id: string;
    url: string[];
    title: string;
    posPrompt: string;
    negPrompt: string;
    view: number;
    createdAt: any;
}

const Copy2Clipboard = async (text: string) => {
    try {
        if (!navigator.clipboard) {
            throw new Error("Your browser doesn't support clipboard functions!")
        }

        await navigator.clipboard.writeText(text)
    } catch (e) {
        console.log(e)
    }
}

const PostCard = (postData: postDataSchema) => {
    return (
        <Dialog>
        <DialogTrigger asChild>
        <div className="border border-stone-700 rounded-md lg:w-[300px] sm:w-max md:w-max justify-center items-center">
            <Carousel className="w-full p-0 items-center justify-center">
                {postData.url.map((imageSRC, index) => (
                    <CarouselItem className="w-full h-full p-0" key={index}>
                        <div className="flex items-center justify-center">
                            <Image className="w-full block h-full rounded-md" src={imageSRC} objectFit="contain" layout="cover" sizes="100vw" width={350} height={0} alt=""/>
                        </div>
                    </CarouselItem>
                ))}
                <div className="absolute bottom-0 left-0 right-0 flex bg-gradient-to-b rounded-md 
                from-transparent to-stone-900 flex-col justify-center items-start p-4 align-top">
                    <Label className="font-bold text-xl">{postData.title}</Label>
                    <Label className="py-2">{postData.createdAt}</Label>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-indigo-600 text-gray-200">Copy</Button>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent className="">
                            <DropdownMenuItem onClick={() => {Copy2Clipboard(postData.posPrompt)}}>Copy Positive Prompt</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {Copy2Clipboard(postData.negPrompt)}}>Copy Negative Prompt</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <CarouselPrevious className="left-2 opacity-0 hover:opacity-100 transition-all" />
                <CarouselNext className="right-2 opacity-0 hover:opacity-100 transition-all" />
            </Carousel>
        </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{postData.title}</DialogTitle>
            <DialogDescription>
            <Carousel className="w-full p-0 items-center justify-center">
                {postData.url.map((imageSRC, index) => (
                    <CarouselItem className="w-full h-full p-0" key={index}>
                        <div className="flex items-center justify-center">
                            <Image className="w-full block h-full rounded-md" src={imageSRC} objectFit="contain" layout="cover" sizes="100vw" width={350} height={0} alt=""/>
                        </div>
                    </CarouselItem>
                ))}
                <CarouselPrevious className="left-0 h-full opacity-0 rounded-none hover:opacity-100 transition-all" />
                <CarouselNext className="right-0 h-full opacity-0 rounded-none hover:opacity-100 transition-all" />
            </Carousel>
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="rounded-md border-stone-700 border p-2">
                    <p className="text-sm font-light">{postData.posPrompt}</p>
                </div>
                <div className="rounded-md border-stone-700 border p-2">
                    <p className="text-sm font-light">{postData.negPrompt}</p>
                </div>
            </div>
            <DialogFooter>
                <div className="w-full flex justify-between">
                    <Button className="flex w-full rounded-r-none bg-violet-300" >Copy Positive</Button>
                    <Button className="w-full rounded-l-none bg-rose-300" >Copy Negative</Button>
                </div>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}

export default PostCard;