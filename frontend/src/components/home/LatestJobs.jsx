import React from "react";
import LatestJobsCard from "./LatestJobsCard";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

function LatestJobs() {
  const {allJobs} = useSelector(store => store.job)
  return (
    <div className="max-w-7xl mx-auto my-32">
      <h1 className="text-4xl font-bold">
        <span className="bg-gradient-to-r to-black from-red-600 bg-clip-text text-transparent">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-11">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobsCard key={job._id} job={job}/>)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
