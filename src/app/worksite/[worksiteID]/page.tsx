"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useWorksite from "@/hooks/useWorksite";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactHlsPlayer from "react-hls-player";
import { toast } from "react-hot-toast";
import StreamPlayer from "@/components/player/StreamPlayer";

// Worksite and Zone Interfaces
interface Worksite {
  id: string;
  name: string;
  description: string;
  created_time: string;
  project_id: string;
  lat: number;
  long: number;
  status: boolean;
}

interface Zone {
  id: string;
  name: string;
  description: string;
  location: string;
  created_time: string;
}

export default function WorksitePage() {
  const { worksiteID } = useParams();
  const { getWorksiteByID, getWorksiteZones, updateWorksiteStatus, addWorksiteZone } = useWorksite();

  // State management
  const [worksite, setWorksite] = useState<Worksite | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);

  const [newZone, setNewZone] = useState({
    name: "",
    description: "",
    location: "",
    feed_uri: "",
    activity: "inactive",
    lat: "",
    long: "",
  });

  // Dummy HLS feeds (replace later with dynamic data)
  const feeds = {
    Feed1: "http://192.168.137.30/v0/1/index.m3u8",
    Feed2: "http://192.168.137.30/v1/1/index.m3u8",
    Feed3: "http://192.168.137.30/v2/1/index.m3u8",
    Feed4: "http://192.168.137.30/v3/1/index.m3u8",
  };

  // Fetch worksite and zones on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const worksiteData = await getWorksiteByID(worksiteID as string);
        setWorksite(worksiteData);
        const zonesData = await getWorksiteZones(worksiteID as string);
        setZones(zonesData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [worksiteID]);

  // Toggle worksite status
  const handleStatusToggle = async () => {
    if (!worksite) return;
    const updatedStatus = !worksite.status;
    try {
      await updateWorksiteStatus(worksite.id, updatedStatus);
      setWorksite({ ...worksite, status: updatedStatus });
      toast.success(`Worksite ${updatedStatus ? "activated" : "deactivated"}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Handle form input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewZone({ ...newZone, [name]: value });
  };

  // Get device location
  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewZone({
            ...newZone,
            lat: position.coords.latitude.toString(),
            long: position.coords.longitude.toString(),
          });
          toast.success("Location fetched successfully!");
        },
        (error) => {
          console.error("Failed to get location:", error);
          toast.error("Failed to get location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  // Submit new zone
  const handleAddZone = async () => {
    if (
      !newZone.name ||
      !newZone.description ||
      !newZone.location ||
      !newZone.feed_uri ||
      !newZone.lat ||
      !newZone.long
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const zonePayload = {
        ...newZone,
        worksite_id: worksite?.id,
        lat: parseFloat(newZone.lat),
        long: parseFloat(newZone.long),
      };
      const newZoneResponse = await addWorksiteZone(zonePayload);
      setZones((prev) => [...prev, newZoneResponse]);
      setNewZone({
        name: "",
        description: "",
        location: "",
        feed_uri: "",
        activity: "inactive",
        lat: "",
        long: "",
      });
      toast.success("New zone added successfully!");
    } catch (error) {
      toast.error("Failed to add zone");
    }
  };

  // Loading State
  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
      {/* Worksite Details */}
      <h1 className="text-4xl my-5 font-bold">🏗️ Worksite Details</h1>
      <Card className="shadow-md border pt-6">
        <CardContent className="space-y-4">
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border border-gray-300">
                <td className="p-3 font-semibold bg-gray-100">ID</td>
                <td className="p-3">{worksite?.id}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-3 font-semibold bg-gray-100">Name</td>
                <td className="p-3">{worksite?.name}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-3 font-semibold bg-gray-100">Description</td>
                <td className="p-3">{worksite?.description}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-3 font-semibold bg-gray-100">Created</td>
                <td className="p-3">{new Date(worksite?.created_time || "").toLocaleString()}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-3 font-semibold bg-gray-100">Project ID</td>
                <td className="p-3">{worksite?.project_id}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-3 font-semibold bg-gray-100">Location</td>
                <td className="p-3">Lat: {worksite?.lat}, Long: {worksite?.long}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-3 font-semibold bg-gray-100">Status</td>
                <td className="p-3 flex items-center gap-2">
                  <Switch checked={worksite?.status} onCheckedChange={handleStatusToggle} />
                  <span className={worksite?.status ? "text-green-600" : "text-red-500"}>
                    {worksite?.status ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Zone List */}
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle>🗺️ Zones</CardTitle>
        </CardHeader>
        <CardContent>
          {zones.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Zone Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((zone) => (
                  <tr key={zone.id} className="border border-gray-300 hover:bg-gray-100">
                    <td className="p-3">{zone.name}</td>
                    <td className="p-3">{zone.description}</td>
                    <td className="p-3">{zone.location}</td>
                    <td className="p-3">{new Date(zone.created_time).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No zones available.</p>
          )}
        </CardContent>
      </Card>

      {/* 🔴 ShadCN Tabs for Video Feeds */}
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle>🎥 Live Video Feeds</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="Feed1">Camera Feed</TabsTrigger>
              <TabsTrigger value="Feed2">YOLO Feed</TabsTrigger>
              <TabsTrigger value="Feed3">Body Tracker Feed</TabsTrigger>
              <TabsTrigger value="Feed4">Digital Twin Feed</TabsTrigger>
            </TabsList>

            {Object.entries(feeds).map(([key, url]) => (
              <TabsContent key={key} value={key}>
                <div className="flex flex-col items-center space-y-4">
                  <h3 className="text-xl font-semibold">{key}</h3>
                  <StreamPlayer
                    streamUrl={url}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
