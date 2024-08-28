import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import { BASE_URL_API_USER } from "../../utils/baseUrl";

const UpdateProfilePhoto = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL_API_USER}/profile/photo/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="sm:max-w-[425px]"
            onInteractOutside={() => setOpen(false)}
          >
            <DialogHeader>
              <DialogTitle>Update Profile Photo</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Photo
                  </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <button className="w-full px-3 py-2 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" />
                    Updating...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full px-3 py-2 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Update
                  </button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UpdateProfilePhoto;
