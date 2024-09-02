import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Job from "./Job";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Jobs() {
  const { allJobs, searchJobByQuery } = useSelector((store) => store.job);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (searchJobByQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchJobByQuery.toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes(searchJobByQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchJobByQuery.toLowerCase()) ||
          job.salary.toLowerCase().includes(searchJobByQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchJobByQuery]);
  return (
    <div className="relative">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="block md:hidden fixed top-16 left-4 z-50 p-2 bg-black text-white rounded-md"
          >
            {isSidebarOpen ? "Close" : "Filters"}
          </button>

          {/* Sidebar */}
          <div
            className={`scroll-smooth inset-0 top-0 left-0 w-4/5 md:w-1/5 bg-white p-4 shadow-lg transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:relative md:block md:w-auto overflow-y-auto max-h-screen`}
          >
            <FilterCard />
          </div>

          {/* Main Content */}
          <div className={`flex-1 ml-auto ${isSidebarOpen ? "md:ml-64" : ""}`}>
            {filterJobs.length <= 0 ? (
              <span className="text-lg bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent font-semibold">
                Job Not Found
              </span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        duration: 0.4,
                      }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
