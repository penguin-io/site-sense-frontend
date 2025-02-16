"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useProject from "@/hooks/useProject";

const CreateProjectPage = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { createProject } = useProject();

  const handleCreateProject = async () => {
    if (!projectName || !projectDescription) {
      setError("Please fill in all fields.");
      return;
    }

    const projectData = {
      name: projectName,
      description: projectDescription,
    };

    try {
      const response = await createProject(projectData);
      if (response) {
        router.push(`/project/${response.id}`);
      } else {
        setError("Failed to create project. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the project.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
          placeholder="Enter project name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Project Description</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
          placeholder="Enter project description"
          rows={4}
        ></textarea>
      </div>

      <button
        onClick={handleCreateProject}
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
      >
        Create Project
      </button>
    </div>
  );
};

export default CreateProjectPage;
