"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import useUser from '@/hooks/useUser';

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

  const {getAllUsers} = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getAllUsers();
      if (userData!==null || userData!==undefined) {
          setUsers(userData);
          setIsLoading(false)
      }
  };
  fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="min-w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Worksite Access</th>
            <th className="px-4 py-2 text-left">Project Access</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.hasWorksiteAccess ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2">{user.hasProjectAccess ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2">
                <Link href={`/user/${user.id}/permissions`}>
                  <button className="text-blue-500 hover:underline">Manage Permissions</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
