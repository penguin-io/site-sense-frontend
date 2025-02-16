"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Plus, Power, PowerOff } from 'lucide-react'; // Import icons
import { cn } from '@/lib/utils';


interface WorksiteDetails {
  name: string;
  active: boolean;
  activityChart: any; // Replace 'any' with a more specific type if you know the structure
  location: string;
  projectName: string;
  numberOfWorksites: number;
  zones: string[]; // Assuming zones are an array of strings
}

const WorksitePage = ({ params }: { params: { projectworksiteID: string } }) => {
  const { projectworksiteID } = params;
  const [worksite, setWorksite] = useState<WorksiteDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorksiteDetails = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockData: WorksiteDetails = {
            name: "Worksite Alpha",
            active: true,
            activityChart: {},
            location: "New York",
            projectName: "Project Phoenix",
            numberOfWorksites: 10,
            zones: ["Zone A", "Zone B", "Zone C"],
          };
          setWorksite(mockData);
          setLoading(false);
        }, 500);

        // const response = await fetch(`/api/worksites/${projectworksiteID}`); // Replace with your actual API endpoint
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // const data: WorksiteDetails = await response.json();
        // setWorksite(data);
      } catch (e: any) {
        setError(e.message || 'An error occurred while fetching worksite details.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorksiteDetails();
  }, [projectworksiteID]);

  if (loading) {
    return <div>Loading worksite details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!worksite) {
    return <div>Worksite not found.</div>;
  }

  const handleToggleActive = () => {
    // Implement API call to toggle active status
    console.log("Toggling Active");
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>{worksite.name}</CardTitle>
          <CardDescription>Project: {worksite.projectName}</CardDescription>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleToggleActive}>
                {worksite.active ? (
                  <>
                    <PowerOff className="mr-2 h-4 w-4" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Power className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={worksite.location} disabled />
            </div>
            <div className="space-y-2">
              <Label>Number of Worksites</Label>
              <div>{worksite.numberOfWorksites}</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Zones</h3>
              <ul>
                {worksite.zones.map((zone, index) => (
                  <li key={index}>{zone}</li>
                ))}
              </ul>
            </div>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Zone
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorksitePage;
