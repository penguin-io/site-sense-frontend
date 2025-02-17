"use client";

import dynamic from "next/dynamic";
import ProjectDetails from "../components/ProjectDetails";
import WorksiteList from "../components/WorkSiteList";
import { useState, useEffect } from "react";
import useProject from "@/hooks/useProject";
import { useParams } from "next/navigation";

// Dynamically import WorksiteMap to prevent SSR issues with maps
const WorksiteMap = dynamic(() => import("../components/WorkSiteMap"), { ssr: false });

interface Project {
  id: string;
  name: string;
  description: string;
  created_time: string;
  location: string;
  workSites: Worksite[];
}

interface Worksite {
  id: string;
  name: string;
  description: string;
  created_time: string;
  location: string;
  status: boolean;
  lat: number;
  long: number;
}

export default function Page() {
  const params = useParams();
  const projectID = params.projectID as string;

  const { getProjectByID, getAllProjectWorksites } = useProject();

  const [user, setUser] = useState<any | null>(null);
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [worksites, setWorksites] = useState<Worksite[]>([]);

  useEffect(() => {
    // Ensure projectID is defined before making requests
    if (!projectID) {
      console.error("Project ID is missing from URL params.");
      return;
    }

    const fetchProjectData = async () => {
      try {
        const project = await getProjectByID(projectID);
        if (project) {
          setProjectData(project);
        }
        const worksitesData = await getAllProjectWorksites(projectID);
        if (worksitesData) {
          setWorksites(worksitesData);
        }
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };

    fetchProjectData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Project Overview</h1>
      {projectData ? (
        <div className="mb-6">
          <ProjectDetails
            name={projectData.name}
            location={projectData.location}
            activeWorksites={worksites.filter((ws) => ws.status).length}
            totalWorksites={worksites.length}
            parentCompany={user?.organization ?? "N/A"}
          />
          <WorksiteList worksites={worksites} />
          <WorksiteMap worksites={worksites} />
        </div>
      ) : (
        <p className="text-gray-500">No projects found.</p>
      )}
    </div>
  );
}
