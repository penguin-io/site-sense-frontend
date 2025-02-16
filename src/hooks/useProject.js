import fetchAuth from "@/services/fetchAuth";

const useProject = () => {
    const getAllProjects = async () => {
      try {
        const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/projects/all`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        return await res.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };
  
    const createProject = async (projectData) => {
      try {
        const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        if (!res.ok) throw new Error("Failed to create project");
        return await res.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const getProjectWorksites = async (data) => {
      try {
        const res = await fetch()
      } catch (error) {
        
      }
    }
  
    return { getAllProjects, createProject };
  };
  
  export default useProject;
  