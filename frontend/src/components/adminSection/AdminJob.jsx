import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { useDispatch } from "react-redux";
import JobTable from "./JobTable";
import { setSearchJobByText } from "../../redux/jobSlice";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";

function AdminJob() {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-14">
        <div className="flex items-center justify-between my-14">
          <Input
            className="max-w-2xl border border-slate-400"
            placeholder="Filter by CompanyName or JobRole"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/Job/create")}
            name="New Job"
          />
        </div>
        <JobTable className="my-10" />
      </div>
    </div>
  );
}

export default AdminJob;
