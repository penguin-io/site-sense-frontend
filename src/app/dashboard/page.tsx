"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useProject from "@/hooks/useProject"
import { BrickWallIcon, Construction, HardHat } from "lucide-react";

export default function Page() {
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>(undefined);
  const [projectsData, setProjectsData] = useState([])
  const router = useRouter();

  const { getAllProjectsByUser } = useProject();

  const handleProjectNavigation = (projectID : number) => {
    router.push(`project/${projectID}`);
  };

  function randomIcon() {
    const icons = [<HardHat />, <Construction />, <BrickWallIcon />];
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  }
  

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjectsByUser();
      if (data) {
        setProjectsData(data);
      }
    };

    fetchProjects();
  }, []);

  if(!localStorage.getItem("access_token") ){
    router.push("/auth/login")
  }
  
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4">
        <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex-col items-center space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
            {/* <DateRangePicker selectedRange={selectedRange} onChangeRange={setSelectedRange} /> */}
            {/* <Button className="w-full">Download</Button> */}
            {/* <PlyrPlayer url={"http://192.168.137.30/stream"}/>
             */}
             <div className="">
             </div>
          </div>

        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Anomalies</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <h1 className="text-2xl font-bold">Projects</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* project cards */}
              {projectsData.length <=0 ? <div> No projects data to show</div> : projectsData.map((item) => {
                return (
                  <Card
                    key={item.id}
                    className="cursor-pointer"
                    onClick={() => {
                      handleProjectNavigation(item.id);
                    }}
                  >
                    <CardHeader>
                      <div className="rounded-xl w-full h-36 bg-neutral-200 mb-5 flex items-center justify-center">
                        {randomIcon()}
                      </div>
                      <CardTitle className="">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="gap-4 flex flex-col">
                      <CardDescription className=" text-xs">{item.description ?? "why"}</CardDescription>
                      <p className="text-xs"><strong>Location:</strong> {item.location ?? "Rehan do this"}</p>

                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
