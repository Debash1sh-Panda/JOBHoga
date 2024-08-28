import { Search } from 'lucide-react'
import React from 'react'

function HeroSection() {
  return (
    <div className='text-center'>
    <div className='flex flex-col gap-5 my-10'>
        <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#ff522b] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent hover:from-gray-500 hover:to-red-500 hover:text-transparent'>Dream Jobs</span></h1>
        <p>JOBHoga is a dynamic job listing and application platform designed to connect job seekers with employers.</p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 pr-1 py-2 rounded-full items-center gap-2 mx-auto bg-white">
  <input
    type="text"
    placeholder="Find your dream jobs"
    className="outline-none border-none w-full text-gray-700 placeholder-gray-400"
  />
  <button className="bg-gradient-to-r from-black to-red-500 p-2 rounded-full flex items-center justify-center hover:bg-[#5429a0] focus:ring-2 focus:ring-[#6A38C2] focus:outline-none">
    <Search className="h-5 w-5 text-white " />
  </button>
</div>

    </div>
</div>
  )
}

export default HeroSection
