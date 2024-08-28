import { Edit2, MoreHorizontal } from "lucide-react";
import React from "react";
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

function CompaniesTable() {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="text-right">
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-start">
            <TableCell>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" className="h-14 w-14" alt="Company logo" />
              </Avatar>
            </TableCell>
            <TableCell >company.name</TableCell>
            <TableCell>company.createdAt</TableCell>
            <TableCell className="text-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div className="flex items-center gap-2 w-fit cursor-pointer bg-gradient-to-r from-black to-red-500 rounded-md text-white p-1 font-medium">
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
