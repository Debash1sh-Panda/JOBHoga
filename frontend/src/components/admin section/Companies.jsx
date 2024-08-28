import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";

function Companies() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            // onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            name="New Company"
          />
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
