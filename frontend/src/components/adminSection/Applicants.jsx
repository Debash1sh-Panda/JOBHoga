import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { BASE_URL_API_APPLICATION } from "../../utils/baseUrl";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setApplicants} from "../../redux/applicationSlice";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL_API_APPLICATION}/${params.id}/allApplicants`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    fetchApplicants();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto">
          <h1 className=" m-8 text-2xl font-bold text-center bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
            Applicants
          </h1>
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
}

export default Applicants;
