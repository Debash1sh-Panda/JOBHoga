import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

function CategoryCarousel() {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cattegory, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3 ml-1 rounded-full bg-stone-200">
                                <button variant="outline" className="rounded-full bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent hover:from-gray-500 hover:to-red-500 hover:text-transparent">{cattegory}</button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className=" hover:text-red-700"/>
                <CarouselNext className=" hover:text-green-700"/>
            </Carousel>
    </div>
  )
}

export default CategoryCarousel
