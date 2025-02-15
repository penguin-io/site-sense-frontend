'use client';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { SitesList } from "./sites-list";

export function ProjectsGrid({ projects }) {
  return (
    <div className="space-y-4">
      {projects.map(project => (
        <Card key={project.id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-sm text-muted-foreground">{project.contractor}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {project.sites.filter(s => s.status === 'ACTIVE').length} Active Sites
              </Badge>
              <ProjectActions project={project} />
            </div>
          </div>

          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between pt-4">
              <span className="text-sm text-muted-foreground">View Sites</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SitesList project={project} />
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}