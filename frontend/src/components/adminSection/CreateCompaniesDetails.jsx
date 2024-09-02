import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API_COMPANY } from "../../utils/baseUrl";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import useGetCompanyById from "../../hooks/useGetCompanyById";

function CreateCompaniesDetails() {
  const params = useParams();
  useGetCompanyById(params.id);

  const { loading } = useSelector((store) => store.auth);
  const { singleCompany } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [errors, setErrors] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        companyName: singleCompany.companyName || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.logo || null,
      });
    }
  }, [singleCompany]);

  const validateForm = () => {
    const newErrors = {};
    if (!input.companyName) newErrors.companyName = "Company name is required";
    if (!input.description) newErrors.description = "Description is required";
    if (!input.website) {
      newErrors.website = "Website is required";
    } else if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
        input.website
      )
    ) {
      newErrors.website = "Invalid website URL";
    }
    if (!input.location) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("companyName", input.companyName);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `${BASE_URL_API_COMPANY}/update-company/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Company update failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto bg-slate-200 shadow-lg rounded-lg overflow-hidden mt-7">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
            Create Company
          </h2>
          <p className="mt-1 text-center text-gray-600">
            Add your company details
          </p>
        </div>
        <div className="px-6 py-4 text-start">
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="companyName"
              >
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                value={input.companyName}
                onChange={changeEventHandler}
                type="text"
                placeholder="Your Company Name"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Describe your company"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="website"
              >
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://yourcompany.com"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Company Location"
                className="w-full px-3 py-2 border  text-blue-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2">
                <Label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="logo"
                >
                  Logo
                </Label>
                <Input
                  id="logo"
                  accept="image/*"
                  type="file"
                  name="file"
                  onChange={fileChangeHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="mb-6">
              {loading ? (
                <button className="w-full px-3 py-2 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 mt-1" />
                  Creating...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full px-3 py-2 text-white font-bold bg-gradient-to-r from-black to-red-500 rounded-md hover:from-gray-600 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Update Info
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Want to go back?{" "}
            <Link
              to="/admin/companies/create"
              className="text-blue-500 hover:text-blue-700"
            >
              Cancel
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default CreateCompaniesDetails;
