"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useUser from '@/hooks/useUser';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  hasWorksiteAccess: boolean;
  hasProjectAccess: boolean;
}

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { getAllUsers } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        if (userData) {
          setUsers(userData);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <Card className="p-6 mb-6">
      <CardContent>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <Table className="w-full border border-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-4 py-2 text-left">ID</TableHead>
              <TableHead className="px-4 py-2 text-left">Name</TableHead>
              <TableHead className="px-4 py-2 text-left">Worksite Access</TableHead>
              <TableHead className="px-4 py-2 text-left">Project Access</TableHead>
              <TableHead className="px-4 py-2 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-b">
                <TableCell className="px-4 py-2">{user.id}</TableCell>
                <TableCell className="px-4 py-2">{user.name}</TableCell>
                <TableCell className="px-4 py-2">{user.hasWorksiteAccess ? 'Yes' : 'No'}</TableCell>
                <TableCell className="px-4 py-2">{user.hasProjectAccess ? 'Yes' : 'No'}</TableCell>
                <TableCell className="px-4 py-2">
                  <Link href={`/admin/user/${user.id}`} passHref legacyBehavior>
                    <Button variant="outline" className="text-blue-500 hover:text-blue-700">
                      Manage Permissions
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserListPage;
