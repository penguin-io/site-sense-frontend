import fetchAuth from "@/services/fetchAuth";

const useProject = () => {
  const getAllProjectsByAdmin = async () => {
    try {
      const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/projects/all`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getAllProjectsByUser = async () => {
    try {
      let res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/projects/`);

      if (!res.ok) throw new Error("Failed to fetch user's projects");
          return await res.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const getAllProjectWorksites = async (projectID) => {
      try {
        const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/projects/${projectID}/worksites`);

        if (!res.ok) throw new Error("Failed to fetch user's projects");
            return await res.json();
        } catch (error) {
          console.error(error);
          return null;
        }
      };

    const getProjectByID = async (projectID) => {
      try {
        const res = await fetchAuth(`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/projects/${projectID}`);
        if (!res.ok) throw new Error("Failed to fetch project details");
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

  return { 
    getAllProjectsByAdmin, 
    createProject, 
    getAllProjectsByUser,
    createProject,
    getProjectByID,
    getAllProjectWorksites
  };
};

export default useProject;
