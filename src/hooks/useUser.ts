import fetchAuth from "@/services/fetchAuth";

interface User {
    name: string
    email: string
    avatar: string
}

const useUser = () => {
    const getAllUsers = async (): Promise<User[]> => {
        try {
            const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/users`);
            if (res.status === 200) {
                const data = await res.json();
                const formattedData = data.map((user: any) => ({
                    id: user.id,
                    name: user.username,
                    hasWorksiteAccess: user.role === "wadmin" ? true : false,
                    hasProjectAccess: user.role === "padmin" ? true : false
                }));
                console.log("All users", formattedData);
                
                return formattedData;
            } else {
                const errorData = await res.json();
                console.error("Get all users failed", errorData);
            }
        } catch (error) {
            console.error("Get all users failed", error);
        }
        return [];
    };

    const getMyUserInfo = async (): Promise<{ name: string; email: string; avatar: string } | null> => {
        try {
            const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/users/me`);
            if (res.status === 200) {
                const data = await res.json();
                console.log("My user data", data);
                return data;
            } else {
                const errorData = await res.json();
                console.error("Get user data failed", errorData);
            }
        } catch (error) {
            console.error("Get user data failed internally", error);
        }
        return null;
    };

    const getUserInfo = async (userID:string) => {
        console.log("hi")
        try {
            const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/users/${userID}`);
            if (res) {
                const data = await res.json();
                if(data){
                    console.log("My user data", data);
                    return data;    
                }
            } else {
                const errorData = await res.json();
                console.error("Get user data failed", errorData);
            }
        } catch (error) {
            console.error("Get user data failed internally", error);
        }
        return null;
    };

    return {
        getAllUsers,
        getMyUserInfo,
        getUserInfo
    };
};

export default useUser;
