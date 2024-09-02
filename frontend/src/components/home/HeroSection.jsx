import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchJobByQuery } from "../../redux/jobSlice";
import { motion } from "framer-motion";
import TypingEffect from "react-typing-effect";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    dispatch(setSearchJobByQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4">
      <div className="flex flex-col gap-5 my-10">
        <motion.span
          className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#ff522b] font-medium text-sm sm:text-base"
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 8,
            duration: 0.6,
          }}
        >
          No. 1 Job Hunt Website
        </motion.span>
        <h1 className="text-3xl sm:text-5xl font-bold">
          Search, Apply &<br />
          Get Your Dream{" "}
          <span className="bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent hover:from-gray-500 hover:to-red-500 hover:text-transparent">
            <TypingEffect
              text={["Jobs", "Internships"]}
              speed={100}
              eraseSpeed={50}
              eraseDelay={2000}
              typingDelay={500}
            />
          </span>
        </h1>
        <p className="text-sm sm:text-base">
          JOBHoga is a dynamic job listing and application platform designed to
          connect job seekers with employers.
        </p>
        <div className="flex w-full sm:w-[40%] shadow-lg border border-gray-200 pl-3 pr-1 py-2 rounded-full items-center gap-2 mx-auto bg-white">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full text-gray-700 placeholder-gray-400 text-sm sm:text-base"
          />
          <button
            onClick={searchHandler}
            className="bg-gradient-to-r from-black to-red-500 p-2 rounded-full flex items-center justify-center hover:bg-[#5429a0] focus:ring-2 focus:ring-[#6A38C2] focus:outline-none"
          >
            <Search className="h-5 w-5 text-white " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
