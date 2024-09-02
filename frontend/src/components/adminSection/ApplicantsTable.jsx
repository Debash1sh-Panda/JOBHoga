import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { BASE_URL_API_APPLICATION } from "../../utils/baseUrl";
import { toast } from "sonner";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL_API_APPLICATION}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-lg mb-8">
        Total Applicants: {applicants.application.length}
      </h1>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader className="px-6 py-2 font-semibold bg-gradient-to-r from-slate-400 to-red-400">
          <TableRow>
            <TableHead className="text-white">FullName</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Contact</TableHead>
            <TableHead className="text-white">Resume</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-right text-green-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-left">
          {applicants &&
            applicants?.application?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phone}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col justify-center items-center gap-2 cursor-pointer bg-gradient-to-r from-gray-400 to-red-400 rounded-md text-black p-2 font-semibold">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex items-center cursor-pointer hover:bg-slate-400 hover:py-1 hover:px-3 hover:rounded-md"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
