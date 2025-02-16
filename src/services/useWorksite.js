// hooks/useWorksite.js (or wherever you prefer to put your hooks)

const useWorksite = () => {

    const getWorksiteZones = async ({ worksiteID }) => {
        try {
            const response = await fetch(`/api/worksite/${worksiteID}/zones`); // API route call

            if (!response.ok) {
                // Handle HTTP errors centrally
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Parse JSON

            return data;

        } catch (error) {
            console.error("Error fetching worksite zones:", error);
            throw error; // Re-throw for component to handle
        }
    };

    const getProjectWorksites = async ({ project_id }) => {
        try {
            const response = await fetch(`/api/projects/${project_id}/worksites`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching worksites for project ${project_id}:`, error);
            throw error;
        }
    };

    const getProjectDetails = async ({ project_id }) => {
        try {
            const response = await fetch(`/api/projects/${project_id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching details for project ${project_id}:`, error);
            throw error;
        }
    };

    const getWorksiteActivity = async ({ worksiteID }) => {
        try {
            const response = await fetch(`/api/worksites/${worksiteID}/activity`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching activity for worksite ${worksiteID}:`, error);
            throw error;
        }
    };

    return {
        getWorksiteZones,
        getProjectWorksites,
        getProjectDetails,
        getWorksiteActivity,
    };
};

export default useWorksite;
