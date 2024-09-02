import React from "react";
import LatestJobsCard from "./LatestJobsCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <>
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
            Latest & Top{" "}
          </span>{" "}
          Job Openings
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allJobs.length <= 0 ? (
            <span className="col-span-full text-center">No Job Available</span>
          ) : (
            allJobs?.slice(0, 3).map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
              >
                <LatestJobsCard job={job} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default LatestJobs;
