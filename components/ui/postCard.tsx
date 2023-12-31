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
        <Card className="w-[350px] sm:w-max md:w-max">
            <CardContent className="pt-6">
                <Carousel className="w-full">
                    <CarouselContent>
                        {postData.url.map((imageSRC, index) => (
                            <CarouselItem key={index}>
                                <div className="flex relative aspect-square items-center justify-center">
                                    <Image className="rounded-xl border-stone-750 border-2" src={imageSRC} fill={true} alt=""/>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
            <CardHeader className="pt-0">
                <CardTitle>{postData.title}</CardTitle>
                <CardDescription>{postData.createdAt}</CardDescription>
                <CardFooter>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-indigo-600 text-gray-200">Copy</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem onClick={() => {Copy2Clipboard(postData.posPrompt)}}>Copy Positive Prompt</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {Copy2Clipboard(postData.negPrompt)}}>Copy Negative Prompt</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardFooter>
            </CardHeader>
        </Card>
    )
}

export default PostCard;