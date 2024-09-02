import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchJobByQuery } from "../../redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Software Developer",
  "Internship",
  "Java Developer",
  "Mern Stack Developer"
];

function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (query) => {
    dispatch(setSearchJobByQuery(query));
    navigate("/browse");
  };
  return (
    <div className="relative">
      <Carousel className="w-full max-w-4xl mx-auto my-10 px-4">
        <CarouselContent>
          {category.map((cattegory, index) => (
            <CarouselItem
              key={index}
              className="w-full sm:basis-1/2 lg:basis-1/3 p-2 rounded-full bg-stone-200 flex items-center justify-center"
            >
              <button
                onClick={() => searchHandler(cattegory)}
                className="rounded-full bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent hover:from-gray-500 hover:to-red-500 hover:text-transparent p-2"
              >
                {cattegory}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 px-2 py-4 bg-white rounded-full shadow-md hover:text-red-700" />
        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2 py-4 bg-white rounded-full shadow-md hover:text-green-700" />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
