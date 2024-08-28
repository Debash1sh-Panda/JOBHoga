import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL_API_USER } from "../../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${BASE_URL_API_USER}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast(res.data.message);
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto bg-slate-200 shadow-lg rounded-lg overflow-hidden mt-11">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
            Login
          </h2>
          <p className="mt-1 text-center text-gray-600">
            Welcome back! Please login to your account.
          </p>
        </div>
        <div className="px-6 py-4">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <RadioGroup className="flex items-center gap-2 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
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
                  name="role"
                  id="r2"
                  value="recruiter"
                  {...register("role", { required: "Role is required" })}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
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
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
