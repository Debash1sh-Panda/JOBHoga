import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useParams } from "react-router-dom";
import { BASE_URL_API_APPLICATION, BASE_URL_JOB } from "../../utils/baseUrl";
import { setSingleJobs } from "../../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  console.log(jobId)
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const isInitiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant == user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL_API_APPLICATION}/apply/${jobId}`, {
        withCredentials: true,
      });
      console.log(res.data)
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJobs(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
  const fetchSingleJobs = async () => {

    try {
      const res = await axios.get(`${BASE_URL_JOB}/jobDetails/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setSingleJobs(res.data.job));
        setIsApplied(
          res.data.job.application.some(
            (application) => application.applicant === user?._id
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch job details");
    }
  };

  fetchSingleJobs();
}, [jobId, dispatch, user?._id]);


  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent font-bold text-lg">
              {singleJob?.title}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <p
                className={
                  "text-blue-700 font-bold bg-gradient-to-r from-gray-300 to-red-200 rounded-md p-1"
                }
                variant="ghost"
              >
                Positions: {singleJob?.position}
              </p>
              <p
                className={
                  "text-[#972dcb] font-bold bg-gradient-to-r to-gray-300 from-red-200 rounded-md p-1"
                }
                variant="ghost"
              >
                Job-Type: {singleJob?.jobType}
              </p>
              <p
                className={
                  "text-blue-700 font-bold bg-gradient-to-r from-gray-300 to-red-200 rounded-md p-1"
                }
                variant="ghost"
              >
                Salary: {singleJob?.salary}
              </p>
            </div>
          </div>
          <button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-3 py-2 text-white font-bold bg-gradient-to-r from-black to-red-500 hover:from-gray-600 hover:to-red-400  ${
              isApplied ? "cursor-not-allowed from-gray-600 to-red-300" : ""
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
        <hr className="mt-8" />
        <h1 className="mt-1 text-start">JOB DESCRIPTION</h1>
        <div className="my-5 text-start">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel}
            </span>
          </h1>
          <h1 className=" font-bold my-1">
            Mandatory Skills:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.requirements?.join(", ")}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.application?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
