import fetchAuth from "@/services/fetchAuth";

const useAdmin = () => {

    const setUserRole = async (userId: string, role: string) => {
        try {
            const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/set-role`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    role: role
                })
            });

            if (res.status === 201) {
                const result = await res.json();
                console.log("User role updated successfully", result);
            } else {
                const errorData = await res.json();
                console.error("Failed to update user role", errorData);
            }
        } catch (error) {
            console.error("Failed to update user role internally", error);
        }
    };

    const setUserAccess = async (userId: string, resourceIds: string[], resourceType: 'project' | 'worksite', access: 'allow' | 'deny') => {
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



    return {
        setUserRole,
        setUserAccess
    }
}

export default useAdmin