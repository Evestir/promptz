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

const PostCard = () => {
    const images = ['https://i.imgur.com/iDeyjOr.jpeg', 'https://i.imgur.com/3zGuyFi.jpeg', 'https://i.imgur.com/qkVct64.jpeg']

    return (
        <Card className="w-[350px] sm:w-max md:w-max">
            <CardContent className="pt-6">
                <Carousel className="w-full">
                    <CarouselContent>
                        {images.map((imageSRC, index) => (
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
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
        </Card>
    )
}

export default PostCard;