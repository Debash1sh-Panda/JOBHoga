import React from "react";
import Navbar from "../shared/Navbar";
import Job from "./Job";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Jobs() {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span className="text-lg bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent font-semibold">
              Job Not Found
            </span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job, index) => (
                  <div>
                    <Job key={index} job={job}/>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
