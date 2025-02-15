'use client';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsGrid } from "@/components/project-grid"; 
import { useEffect, useState } from "react";
import { ProjectDialog } from "@/components/project-dialog";
import HeadingChip from '@/components/common/HeadingChip'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch projects with their sites
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <HeadingChip title={'Projects'}/>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <ProjectsGrid projects={projects} />

      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={(newProject) => setProjects([...projects, newProject])}
      />
    </div>
  );
}