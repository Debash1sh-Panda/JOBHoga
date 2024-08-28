import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import UpdateProfilePhoto from "./UpdateProfilePhoto";

// Mock Badge Component (Replace with actual Badge component)
const Badge = ({ children }) => (
  <span className="px-2 py-1 rounded-full font-semibold text-white bg-gradient-to-r from-black to-red-500 cursor-pointer">
    {children}
  </span>
);

function ViewProfile() {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-200 to-red-100 border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <button onClick={() => setProfileOpen(true)}>
                <AvatarImage className=" rounded-md"
                  src={
                    user?.profile?.profilePhoto ||
                    "https://github.com/shadcn.png"
                  }
                  alt="profile"
                />
              </button>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl select-none">
                {user?.fullname || "User Name"}
              </h1>
              <p className="select-none">
                {user?.profile?.bio || "No bio available."}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
            title="Edit"
          >
            <Pen className="w-full px-2 py-1 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="select-all cursor-pointer">
              {user?.email || "Email not provided"}
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="select-all cursor-pointer">
              {user?.phone || "Phone number not available"}
            </span>
          </div>
        </div>
        <div className="flex justify-between my-5">
          <div className="w-1/2 pr-4">
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
          <div className="w-1/2 pl-4">
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
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5">
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
