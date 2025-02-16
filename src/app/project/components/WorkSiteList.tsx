"use client"
import React from "react";

import Link from "next/link";
import { CircleCheck, CircleSlash, ExternalLink } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

interface Worksite {
  id: string;
  name: string;
  status: string;
  numberOfZones: number;
  managerName: string;
}

interface WorksiteListProps {
  worksites: Worksite[];
}

const columns: ColumnDef<Worksite>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.getValue("status") === "active" ? (
        <CircleCheck className="text-green-500" />
      ) : (
        <CircleSlash className="text-red-500" />
      ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "numberOfZones",
    header: "# of Zones",
  },
  {
    accessorKey: "managerName",
    header: "Manager Name",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Link href={`/worksite/${row.original.id}`}>
        <ExternalLink className="text-blue-500 hover:text-blue-700 cursor-pointer" />
      </Link>
    ),
  },
];

const WorksiteList: React.FC<WorksiteListProps> = ({ worksites }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Worksites</h2>
      <DataTable columns={columns} data={worksites} />
    </div>
  );
};

export default WorksiteList;
