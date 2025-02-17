import fetchAuth from "@/services/fetchAuth";

// hooks/useWorksite.ts
const useWorksite = () => {
    
    // Fetch a worksite by ID
    const getWorksiteByID = async (worksiteID: string) => {
        try {
            const response = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/worksites/${worksiteID}`);
            if (!response.ok) throw new Error(`Failed to fetch worksite: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching worksite:", error);
            throw error;
        }
        return null
    };

    // Fetch all zones in a worksite
    const getWorksiteZones = async (worksiteID: string) => {
        try {
            const response = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/worksites/${worksiteID}/zones`);
            if (!response.ok) throw new Error(`Failed to fetch zones: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching zones:", error);
            throw error;
        }
    };

    // Update worksite status
    const updateWorksiteStatus = async (worksiteID: string, status: boolean) => {
        try {
            const response = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/worksites/${worksiteID}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ worksiteID, status }),
            });
            if (!response.ok) throw new Error(`Failed to update status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error updating worksite status:", error);
            throw error;
        }
    };

    // Add a new zone
    const addWorksiteZone = async (
        
        zoneData: { 
            worksiteID: string, 
            name: string; 
            description: string; 
            feed_uri: string ; 
            location : string ;
            activity : string ;
            lat : Number ;
            long : Number ;  
        }) => {
        try {
            const response = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/worksites`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(zoneData),
            });
            if (!response.ok) throw new Error(`Failed to add zone: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error adding zone:", error);
            throw error;
        }
    };

    return {
        getWorksiteByID,
        getWorksiteZones,
        updateWorksiteStatus,
        addWorksiteZone,
    };
};

export default useWorksite;
