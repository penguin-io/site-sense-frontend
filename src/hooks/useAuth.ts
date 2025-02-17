import fetchAuth from "@/services/fetchAuth";

const useAuth = () => {
    const logout = async () => {
        console.log("Logging out")
        try {
            const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/auth/jwt/logout`)
            if(res){
                const result = res.json();
                return result
            }
            else {
                const errorData = await res?.json();
                console.error("Failed to Logout", errorData);
            }
        } catch (error) {
            console.error("Failed to Logout", error);
        }

        const token = localStorage.removeItem('access_token');
    }

    return {
        logout
    }
 
}

export default useAuth
    
