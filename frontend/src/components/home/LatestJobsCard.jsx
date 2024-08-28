import { Badge } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function LatestJobsCard({job}) {
//   const navigate = useNavigate();

  return (
    <div
    //   onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-gradient-to-r to-gray-200 from-red-100 border border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-bold text-lg">{job?.companyId?.companyName || "Company Name"}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-medium text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
        <p className=" mt-2 text-sm bg-gradient-to-r from-gray-300 to-red-200"><span className=" font-mono">Mandatory Skills: </span>{job?.requirements}</p><hr/>
        <p className="text-sm bg-gradient-to-r from-gray-300 to-red-200"><span className=" font-mono">Experience Level: </span>{job?.experienceLevel}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className={"text-blue-700 font-bold bg-gradient-to-r from-gray-300 to-red-200 rounded-md p-1"} variant="ghost">
          Positions: {job?.position}
        </p>
        <p className={"text-[#972dcb] font-bold bg-gradient-to-r to-gray-300 from-red-200 rounded-md p-1"} variant="ghost">
          Job-Type: {job?.jobType}
        </p>
        <p className={"text-blue-700 font-bold bg-gradient-to-r from-gray-300 to-red-200 rounded-md p-1"} variant="ghost">
          Salary: {job?.salary}
        </p>
      </div>
    </div>
  );
}

export default LatestJobsCard;
