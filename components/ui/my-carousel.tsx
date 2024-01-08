import React, { ReactNode, useState } from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react'

interface CarouselProps {
    children: ReactNode;
  }

const Carousel: React.FC<CarouselProps> = ({children}) => {
    const [current, setCurrent] = useState(0)
    const [emblaRef] = useEmblaCarousel()

    return  (
        <div className="embla" ref={emblaRef}>
            <div className="embla_container h-full flex">
                <div className="embla_slide h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Carousel