"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useUser from '@/hooks/useUser';
import useAdmin from '@/hooks/useAdmin';

const UserPermissionsPage = () => {
    const params = useParams();
    const userID = params?.userID;
    const { getUserInfo} = useUser();
    const {setUserAccess, setUserRole } = useAdmin();
    const [user, setUser] = useState<any>(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [resourceId, setResourceId] = useState('');
    const [resourceType, setResourceType] = useState('project');
    const [access, setAccess] = useState('allow');

    useEffect(() => {
        const fetchUser = async () => {
            if (userID) {
                const userInfo = await getUserInfo({ userID });
                setUser(userInfo);
            }
        };
        fetchUser();
    }, [userID, getUserInfo]);

    const handleRoleChange = async () => {
        if (selectedRole) {
            await setUserRole(userID, selectedRole);
            alert('Role updated successfully');
        }
    };

    const handleAccessChange = async () => {
        if (resourceId) {
            await setUserAccess(userID, [resourceId], resourceType as 'project' | 'worksite', access as 'allow' | 'deny');
            alert('Access updated successfully');
        }
    };

    if (!user) return <div>Loading user information...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">User Permissions for {user.name}</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Current Details:</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Worksite Access:</strong> {user.hasWorksiteAccess ? 'Yes' : 'No'}</p>
                <p><strong>Project Access:</strong> {user.hasProjectAccess ? 'Yes' : 'No'}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Change Role</h3>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border p-2 mr-2"
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="wadmin">Worksite Admin</option>
                    <option value="padmin">Project Admin</option>
                    <option value="user">User</option>
                </select>
                <button
                    onClick={handleRoleChange}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update Role
                </button>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Change Access</h3>
                <input
                    type="text"
                    placeholder="Resource ID"
                    value={resourceId}
                    onChange={(e) => setResourceId(e.target.value)}
                    className="border p-2 mr-2"
                />
                <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    className="border p-2 mr-2"
                >
                    <option value="project">Project</option>
                    <option value="worksite">Worksite</option>
                </select>
                <select
                    value={access}
                    onChange={(e) => setAccess(e.target.value)}
                    className="border p-2 mr-2"
                >
                    <option value="allow">Allow</option>
                    <option value="deny">Deny</option>
                </select>
                <button
                    onClick={handleAccessChange}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Update Access
                </button>
            </div>
        </div>
    );
};

export default UserPermissionsPage;

// useAdmin.ts
export const setUserAccess = async (userId: string, resourceIds: string[], resourceType: 'project' | 'worksite', access: 'allow' | 'deny') => {
    try {
        const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/set-access`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userId,
                resource_ids: resourceIds,
                resource_type: resourceType,
                access: access,
            }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.detail || 'Failed to set user access');
        }

        return await res.json();
    } catch (error) {
        console.error('Failed to set user access:', error);
        throw error;
    }
};
