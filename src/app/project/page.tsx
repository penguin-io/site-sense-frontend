"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
// import initials from "initials";
// import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { DateRange } from "react-day-picker";
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { salesData, overviewChartData } from "@/constants/dummy-data";

import useProject from "@/hooks/useProject"
import PlyrPlayer from "@/components/player/HLSPlayer";
import { BrickWall, BrickWallIcon, Construction, HardHat } from "lucide-react";

const projects = [
  {
    id: 0,
    name: "Highway Project",
    location: "gurugram, Noida",
    description: "hehehe"
  },
  {
    id: 1,
    name: "Another Project",
    location: "Some other place",
    description: "hehehe"

  },
];

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
  

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4">
        <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
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
                      <div className="rounded-xl w-full h-20 bg-neutral-200 mb-5 flex items-center justify-center">
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
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-2 lg:col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={overviewChartData}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {salesData.map((sale) => (
                      <div key={sale.name} className="flex items-center">
                        <Avatar className="size-9">
                          <AvatarFallback>{initials(sale.name)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{sale.name}</p>
                          <p className="text-xs text-muted-foreground md:text-sm">{sale.email}</p>
                        </div>
                        <div className="ml-auto font-medium">{sale.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
