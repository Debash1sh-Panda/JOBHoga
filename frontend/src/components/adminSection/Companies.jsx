import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import useGetAllCompaniesDetails from "../../hooks/useGetAllCompaniesDetails";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

function Companies() {
  useGetAllCompaniesDetails();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-14">
        <div className="flex items-center justify-between my-14">
          <Input
            className="max-w-2xl"
            placeholder="Filter by CompanyName or Location"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            name="New Company"
          />
        </div>
        <CompaniesTable className="my-10" />
      </div>
    </div>
  );
}

export default Companies;
