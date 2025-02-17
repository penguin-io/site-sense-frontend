"use client";
import React, { useState, useEffect } from "react";
import useAdmin from "@/hooks/useAdmin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import roleCheck from "@/services/roleCheck";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  name: string;
  description: string;
  created_time: string;
  location: string;
};

const Page = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const { getProjects } = useAdmin();

  useEffect(() => {
    const checkAdmin = async () => {
      const isAdmin = await roleCheck("admin");
      if (!isAdmin) {
        router.push("/dashboard");
        return;
      }
    };

    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        if (data) setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    checkAdmin();
    fetchProjects();
  }, [getProjects, router]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📌 Projects</h1>

      {projects ? (
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id} className="border rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                  <CardDescription>{project.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Created: {new Date(project.created_time).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No projects available.</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-md" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
