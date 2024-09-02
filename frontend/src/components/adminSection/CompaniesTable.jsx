import { Edit2, MoreHorizontal, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API_COMPANY } from "../../utils/baseUrl";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function CompaniesTable() {
  const { multipleCompany, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filtercompany, setFilterCompany] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      multipleCompany.length >= 0 &&
      multipleCompany.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }

        const searchText = searchCompanyByText.toLowerCase();
        return (
          company?.companyName?.toLowerCase().includes(searchText) ||
          company?.location?.toLowerCase().includes(searchText)
        );
      });
    setFilterCompany(filteredCompany);
  }, [multipleCompany, searchCompanyByText]);

  const handelDelete = async (companyId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-red-100 rounded-md p-5 shadow-lg">
            <h1 className="text-red-600 text-lg font-semibold mb-3 text-center">
              Confirm to Delete
            </h1>
            <p className="text-center">
              <span className="text-yellow-400">Warning : </span>If you delete
              this company, all jobs and related data created under this company
              will be permanently deleted.
              <br />{" "}
              <span className=" text-blue-950 font-sans">
                Do you want to proceed?
              </span>
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                className="bg-red-300 text-sm hover:bg-red-600 hover:text-white py-2 px-4 rounded-md"
                onClick={async () => {
                  try {
                    const res = await axios.delete(
                      `${BASE_URL_API_COMPANY}/deleteCompany/${companyId}`,
                      {
                        withCredentials: true,
                      }
                    );

                    if (res.data.success) {
                      toast.success(res.data.message);
                      window.location.reload();
                    }
                  } catch (error) {
                    console.log(error);
                  } finally {
                    onClose();
                  }
                }}
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="bg-green-300 text-sm hover:bg-green-600 hover:text-white py-2 px-4 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="text-right">
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Website</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {multipleCompany.length <= 0 ? (
            <span>No Companies, Please Register Your Company</span>
          ) : (
            filtercompany?.map((company, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo || "https://github.com/shadcn.png"}
                      className="h-14 w-14"
                      alt="Company logo"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="text-left">
                  {company.companyName}
                </TableCell>
                <TableCell className="text-left">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-left">{company.location}</TableCell>
                <TableCell variant="link" className="text-left">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {company.website}
                  </a>
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex flex-col justify-center items-center gap-2 cursor-pointer bg-gradient-to-r from-gray-400 to-red-400 rounded-md text-black p-2 font-semibold">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/create/${company._id}`)
                          }
                          className="flex items-center gap-2 hover:bg-green-500 hover:py-1 hover:px-3 hover:rounded-md"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() => handelDelete(company._id)}
                          className="flex items-center gap-2 hover:bg-red-500 hover:py-1 hover:px-3 hover:rounded-md"
                        >
                          <Trash2Icon className="w-4" />
                          <span>Delete</span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
