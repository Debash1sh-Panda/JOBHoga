import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Job({job}) {
  const navigate = useNavigate();

  const daysAgoJobCreatedFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-gradient-to-r to-gray-200 from-red-100 border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{daysAgoJobCreatedFunction(job?.createdAt) == 0 ? "Today": `${daysAgoJobCreatedFunction(job?.createdAt)}  Days Ago`}</p>
        <button className="rounded-full" size="icon" variant="outline">
          <Bookmark />
        </button>
      </div>
      <div className="flex items-center gap-3 my-2">
        <button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              className="w-16 h-14"
              src={ job?.companyId?.logo ? job?.companyId?.logo : "https://tse2.mm.bing.net/th?id=OIP.OFInEkY3zHqXMrjRPWzgtgHaGL&pid=Api&P=0&h=180"}
            />
          </Avatar>
        </button>
        <div>
          <h1 className="bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent text-lg font-bold">
          {job?.companyId?.companyName}
          </h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className=" font-medium text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p
          className={"text-blue-700 font-bold bg-gradient-to-r from-gray-300 to-red-200 rounded-md p-1"}
          variant="ghost"
        >
         Position: {job?.position}
        </p>
        <p
          className={"text-blue-700 font-bold bg-gradient-to-r from-gray-300 to-red-200 rounded-md p-1"}
          variant="ghost"
        >
          {job?.jobType}
        </p>
        <p
          className={"text-blue-700 font-bold bg-gradient-to-r from-gray-300 to-red-200 rounded-md p-1"}
          variant="ghost"
        >
          {job?.salary}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button
          className="px-2 py-1 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => navigate(`/job/description/${job._id}`)}
          variant="outline"
        >
          Details
        </button>
        <button className="px-2 py-1 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Save For Later
        </button>
      </div>
    </div>
  );
}

export default Job;
