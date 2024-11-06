import { Table } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { UserInterface } from "@/interfaces/userInterface";

interface TableUserProps {
  headers: string[];
  items: UserInterface[];
}

const TableUser: React.FC<TableUserProps> = ({ headers, items }) => {
  return (
    <Table>
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((item, index) => (
            <TableHead key={index}>{item}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{user.nama}</TableCell>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell className="font-medium">{user.umur}</TableCell>
            <TableCell className="font-medium">
              {user.status_keanggotaan ? "Aktif" : "Tidak Aktif"}
            </TableCell>
            <TableCell className="gap-2 flex">
              <Button className="bg-yellow-500">Edit</Button>
              <Button className="bg-red-700">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableUser;
