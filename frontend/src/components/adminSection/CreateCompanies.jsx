import React, { useState } from "react";
import Button from "../shared/Button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API_COMPANY } from "../../utils/baseUrl";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setsingleCompany } from "../../redux/companySlice";

function CreateCompanies() {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [companyName, setCompanyName] = useState();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${BASE_URL_API_COMPANY}/register-company`,
        {companyName},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res)
      if (res?.data?.success) {
        dispatch(setsingleCompany(res.data.company))
        toast.success(res.data.message);
        const comId = res?.data?.company?._id;
        navigate(`/admin/companies/create/${comId}`)
      }
    } catch (error) {
      toast.success(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent">
            Your Company Name
          </h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>

        <Label className=" font-mono cursor-pointer" htmlFor="company">
          Company Name
        </Label>
        <Input
          id="company"
          type="text"
          className="my-2"
          placeholder="JobHoga, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center justify-center mt-20 gap-2 my-10">
          <button
            className="px-6 py-2 font-bold bg-none border border-red-600 text-white rounded-md relative"
            onClick={() => navigate("/admin/companies")}
          >
            <span className="bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent hover:from-gray-500 hover:to-red-500 hover:text-transparent">
              Cancel
            </span>
          </button>
          <Button name="Continue" onClick={registerNewCompany} />
        </div>
      </div>
    </div>
  );
}

export default CreateCompanies;
