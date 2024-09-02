import axios from "axios";
import { useEffect } from "react";
import { BASE_URL_API_APPLICATION } from "../utils/baseUrl";
import { useDispatch } from "react-redux";
import { setAppliedJob } from "../redux/applicationSlice";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const appliedJobs = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL_API_APPLICATION}/application_JobDetails`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAppliedJob(res.data.application));
        }
      } catch (error) {
        console.log(error)
      }
    };
    appliedJobs();
  }, []);
};

export default useGetAppliedJob;
