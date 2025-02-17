import fetchAuth from "@/services/fetchAuth";

const useZone = () => {
  
    // 1️⃣ Fetch all zones for a worksite
    const getZonesByWorksite = async (worksiteID: string) => {
      try {
        const response = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/worksites/${worksiteID}/zones`);
        if (!response.ok) throw new Error(`Failed to fetch zones: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("Error fetching zones:", error);
        throw error;
      }
    };
  
    // 2️⃣ Fetch a single zone by ID
    const getZoneByID = async (zoneID: string) => {
      try {
        const response = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/zones/${zoneID}`);
        if (!response.ok) throw new Error(`Failed to fetch zone: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("Error fetching zone:", error);
        throw error;
      }
    };
  
    // 3️⃣ Create a new zone
    const createZone = async (
      worksiteID: string, 
      zoneData: { 
        name: string; 
        description: string; 
        feed_uri: string ; 
        location : string ;
        activity : string ;
        lat : Number ;
        long : Number ; 
      }
    ) => {
      try {
        const payload = { ...zoneData, worksite_id: worksiteID, };
        const response = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/zones/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Failed to create zone: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("Error creating zone:", error);
        throw error;
      }
    };
  
    // 4️⃣ Update an existing zone
    const updateZone = async (
      zoneID: string, 
      updateData: Partial<{ name: string; description: string; feed_uri: string }>
    ) => {
      try {
        const response = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/zones/${zoneID}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });
        if (!response.ok) throw new Error(`Failed to update zone: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("Error updating zone:", error);
        throw error;
      }
    };
  
    // 5️⃣ Delete a zone
    const deleteZone = async (zoneID: string) => {
      try {
        const response = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/zones/${zoneID}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`Failed to delete zone: ${response.status}`);
        return true;
      } catch (error) {
        console.error("Error deleting zone:", error);
        throw error;
      }
    };
  
    return {
      getZonesByWorksite,
      getZoneByID,
      createZone,
      updateZone,
      deleteZone,
    };
  };
  
  export default useZone;
  