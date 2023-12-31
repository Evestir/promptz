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
        <div className="border border-stone-700 rounded-md lg:w-[350px] sm:w-max md:w-max justify-center items-center">
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
                <CarouselPrevious className="m-0" />
                <CarouselNext className="m-0" />
            </Carousel>
        </div>
    )
}

export default PostCard;