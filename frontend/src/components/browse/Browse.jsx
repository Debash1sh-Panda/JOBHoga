import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Job from "../jobs/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchJobByQuery } from "../../redux/jobSlice";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { motion } from "framer-motion";

// const randomJobs = [1, 2, 3, 4, 5, 6];

function Browse() {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchJobByQuery(""));
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10 ">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
            >
              <Job job={job} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Browse;
