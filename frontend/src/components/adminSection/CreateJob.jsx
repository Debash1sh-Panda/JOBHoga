import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";
import { BASE_URL_JOB } from "../../utils/baseUrl";
import { toast } from "sonner";

function CreateJob() {
  const { loading } = useSelector((store) => store.auth);
  const { multipleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: 0,
    companyId: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const selectChangeHandler = (event) => {
    const value = event.target.value.toLowerCase();
    const selectedCompany = multipleCompany.find(
      (company) => company?.companyName.toLowerCase() == value
    );
    setInput({ ...input, companyId: selectedCompany._id });
    setErrors({ ...errors, companyId: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!input.companyId) newErrors.companyId = "Please select a company.";
    if (!input.title) newErrors.title = "Job title is required.";
    if (!input.description)
      newErrors.description = "Job description is required.";
    if (!input.requirements)
      newErrors.requirements = "Job requirements are required.";
    if (!input.salary) newErrors.salary = "Salary is required.";
    if (!input.location) newErrors.location = "Location is required.";
    if (!input.jobType) newErrors.jobType = "Job type is required.";
    if (!input.experienceLevel)
      newErrors.experienceLevel = "Experience level is required.";
    if (input.position <= 0)
      newErrors.position = "Position must be greater than 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL_JOB}/create-job`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/Job");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto bg-slate-200 shadow-lg rounded-lg overflow-hidden mt-7">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent">
            Create Job
          </h2>
          <p className="mt-1 text-center text-gray-600">
            Add job details below
          </p>
        </div>
        <div className="px-6 py-4 text-start">
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company"
              >
                Company
              </label>
              <select
                id="company"
                name="companyId"
                onChange={selectChangeHandler}
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">select a Company</option>
                {multipleCompany.map((company) => (
                  <option key={company._id} value={company?.companyName}>
                    {company.companyName}
                  </option>
                ))}
              </select>
              {errors.companyId && (
                <p className="text-red-500 text-sm mt-1">{errors.companyId}</p>
              )}
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Job Title
              </label>
              <input
                id="title"
                name="title"
                value={input.title}
                onChange={handleChange}
                type="text"
                placeholder="Job Title"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
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
                onChange={handleChange}
                placeholder="Job Description"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="requirements"
              >
                Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={input.requirements}
                onChange={handleChange}
                placeholder="Job Requirements"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.requirements && (
              <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>
            )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                value={input.salary}
                onChange={handleChange}
                placeholder="Salary"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.salary && (
              <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
            )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="experienceLevel"
              >
                Experience Level
              </label>
              <input
                id="experienceLevel"
                name="experienceLevel"
                type="text"
                value={input.experienceLevel}
                onChange={handleChange}
                placeholder="Experience Level"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.experienceLevel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experienceLevel}
              </p>
            )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="jobType"
              >
                Job Type
              </label>
              <input
                id="jobType"
                name="jobType"
                type="text"
                value={input.jobType}
                onChange={handleChange}
                placeholder="Job Type"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.jobType && (
              <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
            )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="position"
              >
                Position
              </label>
              <input
                id="position"
                name="position"
                type="number"
                value={input.position}
                onChange={handleChange}
                placeholder="Position"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.position && (
              <p className="text-red-500 text-sm mt-1">{errors.position}</p>
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
                onChange={handleChange}
                placeholder="location"
                className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
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
                  Create Job
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-100 text-center">
          {multipleCompany && multipleCompany.length === 0 && (
            <p className="text-red-500">
              *Please Register a company first, before posting a Job
            </p>
          )}
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

export default CreateJob;
