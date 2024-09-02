import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { Camera, Contact, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import UpdateProfilePhoto from "./UpdateProfilePhoto";
import useGetAppliedJob from "../../hooks/useGetAppliedJob";

// Mock Badge Component (Replace with actual Badge component)
const Badge = ({ children }) => (
  <span className="px-2 py-1 rounded-full font-semibold text-white bg-gradient-to-r from-black to-red-500 cursor-pointer">
    {children}
  </span>
);

function ViewProfile() {
  useGetAppliedJob();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto bg-gradient-to-r from-gray-200 to-red-100 border border-gray-200 rounded-2xl my-5 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="relative h-16 w-16">
              <AvatarImage
                className="rounded-md"
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
                alt="profile"
              />
              <button
                onClick={() => setProfileOpen(true)}
                className="absolute left-12 top-12 bg-black rounded-full shadow-md p-1"
              >
                <Camera className="h-3 w-3 text-white" />
              </button>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="font-medium text-lg sm:text-xl select-none">
                {user?.fullname || "User Name"}
              </h1>
              <p className="select-none text-sm sm:text-base">
                {user?.profile?.bio || "No bio available."}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mt-4 sm:mt-0 text-center sm:text-right"
            title="Edit"
          >
            <Pen className="w-full px-2 py-1 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="select-all cursor-pointer text-sm sm:text-base">
              {user?.email || "Email not provided"}
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="select-all cursor-pointer text-sm sm:text-base">
              {user?.phone || "Phone number not available"}
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between my-5">
          <div className="w-full md:w-1/2 pr-0 md:pr-4">
            <h1 className="font-bold text-md">Skills</h1>
            <div className="flex flex-wrap items-center gap-2">
              {user?.profile?.skills && user.profile.skills.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span className="bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent">
                  Add Skills
                </span>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0 pl-0 md:pl-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-md font-bold">Resume</Label>
              {user?.profile?.resume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user.profile.resume}
                  className="text-blue-500 hover:underline cursor-move"
                >
                  {user.profile.resumeOriginalName || "View Resume"}
                </a>
              ) : (
                <span className="bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent">
                  Add Resume
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
        <h1 className="font-bold text-lg mb-5 bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent">
          Applied Jobs
        </h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <UpdateProfilePhoto open={profileOpen} setOpen={setProfileOpen} />
    </div>
  );
}

export default ViewProfile;
