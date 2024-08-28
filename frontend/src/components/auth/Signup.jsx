import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API_USER } from "../../utils/baseUrl";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const file = watch("file"); // Watch the file input

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("role", data.role);

    if (file && file.length > 0) {
      formData.append("file", file[0]); // Append the file
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${BASE_URL_API_USER}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto bg-slate-200 shadow-lg rounded-lg overflow-hidden mt-7">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
            Sign Up
          </h2>
          <p className="mt-1 text-center text-gray-600">Create your account</p>
        </div>
        <div className="px-6 py-4 text-start">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="your@name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("fullname", { required: "Name is required" })}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                placeholder="+00 0000-0000-00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("phone", { required: "Phone Number is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="[A-Z a-z 0-n @-#]"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 my-5">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="r1"
                    value="student"
                    {...register("role", { required: "Role is required" })}
                    className="cursor-pointer"
                    defaultChecked
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="r2"
                    value="recruiter"
                    {...register("role", { required: "Role is required" })}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-14">
                <Label>Photo</Label>
                <Input
                  accept="image/*"
                  type="file"
                  {...register("file")}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="mb-6">
              {loading ? (
                <button className="w-full px-3 py-2 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" />
                  Please Wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full px-3 py-2 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Signup
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
