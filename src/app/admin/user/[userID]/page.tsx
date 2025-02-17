"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useUser from '@/hooks/useUser';
import useAdmin from '@/hooks/useAdmin';

type ResourceType = 'project' | 'worksite';
type AccessType = 'allow' | 'deny';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    hasWorksiteAccess: boolean;
    hasProjectAccess: boolean;
}

const UserPermissionsPage = () => {
    const params = useParams();
    const userID = params?.userID as string;
    const { getUserInfo } = useUser();
    const { setUserAccess, setUserRole } = useAdmin();

    const [user, setUser] = useState<User | null>(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [resourceId, setResourceId] = useState('');
    const [resourceType, setResourceType] = useState<ResourceType>('project');
    const [access, setAccess] = useState<AccessType>('allow');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userID) return;
            try {
                const userInfo = await getUserInfo(userID);
                if (userInfo) setUser(userInfo);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };
            fetchUser();
        
    }, []);
    

    const handleRoleChange = async () => {
        if (!userID || !selectedRole) return alert('Please select a role.');
        try {
            await setUserRole(userID, selectedRole);
            alert('Role updated successfully');
            setUser((prev) => (prev ? { ...prev, role: selectedRole } : prev));
        } catch (error) {
            console.error('Failed to update role:', error);
            alert('Failed to update role.');
        }
    };

    const handleAccessChange = async () => {
        if (!userID || !resourceId) return alert('Please provide a resource ID.');
        try {
            await setUserAccess(userID, [resourceId], resourceType, access);
            alert('Access updated successfully');
        } catch (error) {
            console.error('Failed to update access:', error);
            alert('Failed to update access.');
        }
    };

    if (loading) return <div className="p-6">Loading user information...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">User Permissions for {user?.name ?? "Unknown User"}</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Current Details:</h2>
                <p><strong>Email:</strong> {user?.email ?? "N/A"}</p>
                <p><strong>Role:</strong> {user?.role ?? "N/A"}</p>
                <p><strong>Worksite Access:</strong> {user?.hasWorksiteAccess ? 'Yes' : 'No'}</p>
                <p><strong>Project Access:</strong> {user?.hasProjectAccess ? 'Yes' : 'No'}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Change Role</h3>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border p-2 mr-2 rounded"
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="wadmin">Worksite Admin</option>
                    <option value="padmin">Project Admin</option>
                    <option value="user">User</option>
                </select>
                <button
                    onClick={handleRoleChange}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Update Role
                </button>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Change Access</h3>
                <input
                    type="text"
                    placeholder="Resource ID"
                    value={resourceId}
                    onChange={(e) => setResourceId(e.target.value)}
                    className="border p-2 mr-2 rounded"
                />
                <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value as ResourceType)}
                    className="border p-2 mr-2 rounded"
                >
                    <option value="project">Project</option>
                    <option value="worksite">Worksite</option>
                </select>
                <select
                    value={access}
                    onChange={(e) => setAccess(e.target.value as AccessType)}
                    className="border p-2 mr-2 rounded"
                >
                    <option value="allow">Allow</option>
                    <option value="deny">Deny</option>
                </select>
                <button
                    onClick={handleAccessChange}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Update Access
                </button>
            </div>
        </div>
    );
};

export default UserPermissionsPage;