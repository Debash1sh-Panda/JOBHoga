import { Edit2, MoreHorizontal, Trash2Icon, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import axios from "axios";
import { BASE_URL_JOB } from "../../utils/baseUrl";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function JobTable() {
  useGetAllAdminJobs();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJob =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }

        const searchText = searchJobByText.toLowerCase();
        return (
          job?.title?.toLowerCase().includes(searchText) ||
          job?.companyId?.companyName?.toLowerCase().includes(searchText)
        );
      });

    setFilterJob(filteredJob);
  }, [allAdminJobs, searchJobByText]);

  const handelDelete = async (companyId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-red-100 rounded-md p-5 shadow-lg">
            <h1 className="text-red-600 text-lg font-semibold mb-3 text-center">
              Confirm to Delete
            </h1>
            <p className="text-center">
              <span className="text-yellow-400">Warning : </span>If you delete
              this job, it will be delete permanently .
              <br />{" "}
              <span className=" text-blue-950 font-sans">
                Do you want to proceed?
              </span>
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                className="bg-red-300 text-sm hover:bg-red-600 hover:text-white py-2 px-4 rounded-md"
                onClick={async () => {
                  try {
                    const res = await axios.delete(
                      `${BASE_URL_JOB}/deleteJob/${jobId}`,
                      {
                        withCredentials: true,
                      }
                    );
                    if (res.data.success) {
                      toast.success(res.data.message);
                      window.location.reload();
                    }

                    if (res.data.success) {
                      toast.success(res.data.message);
                      window.location.reload();
                    }
                  } catch (error) {
                    console.log(error);
                  } finally {
                    onClose();
                  }
                }}
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="bg-green-300 text-sm hover:bg-green-600 hover:text-white py-2 px-4 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="text-right">
            <TableHead>Company Name</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob.length <= 0 ? (
            <span>No JOBS, Please Create Your Jobs</span>
          ) : (
            filterJob?.map((job, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">
                  {job?.companyId?.companyName}
                </TableCell>
                <TableCell className="text-left">{job?.title}</TableCell>
                <TableCell className="text-left">
                  {job?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex flex-col justify-center items-center gap-2 cursor-pointer bg-gradient-to-r from-gray-400 to-red-400 rounded-md text-black p-2 font-semibold">
                        <div
                          onClick={() =>
                            navigate(`/admin/job/create/${job._id}`)
                          }
                          className="flex items-center gap-2 hover:bg-slate-500 hover:py-1 hover:px-3 hover:rounded-md"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/job/${job._id}/applicants`)
                          }
                          className="flex items-center gap-2 hover:bg-green-500 hover:py-1 hover:px-3 hover:rounded-md"
                        >
                          <User className="w-4" />
                          <span>Applicants</span>
                        </div>
                        <div
                          onClick={() => handelDelete(job._id)}
                          className="flex items-center gap-2 hover:bg-red-500 hover:py-1 hover:px-3 hover:rounded-md"
                        >
                          <Trash2Icon className="w-4" />
                          <span>Delete</span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default JobTable;
