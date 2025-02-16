// app/page.tsx
import dynamic from "next/dynamic";
import ProjectDetails from "./components/ProjectDetails";
import WorksiteList from "./components/WorkSiteList";

const WorksiteMap = dynamic(() => import("./components/WorkSiteMap"), { ssr: false });

const projectData = {
  name: "City Center Redevelopment",
  location: "Downtown Metro",
  activeWorksites: 3,
  totalWorksites: 5,
  parentCompany: "Urban Builders Inc.",
};

const worksitesData = [
  { id: "WS001", status: "active", name: "Main Plaza", numberOfZones: 3, managerName: "John Doe", lat: 40.7128, lng: -74.006 },
  { id: "WS002", status: "inactive", name: "Riverside Park", numberOfZones: 2, managerName: "Jane Smith", lat: 40.7282, lng: -73.9942 },
  { id: "WS003", status: "inactive", name: "Central Station", numberOfZones: 4, managerName: "Bob Johnson", lat: 40.7589, lng: -73.9851 },
  { id: "WS004", status: "active", name: "Harbor Front", numberOfZones: 2, managerName: "Alice Brown", lat: 40.702, lng: -74.015 },
  { id: "WS005", status: "inactive", name: "Tech District", numberOfZones: 3, managerName: "Charlie Davis", lat: 40.7411, lng: -74.0018 },
];

export default function ConstructionProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Construction Project Overview</h1>
      <ProjectDetails {...projectData} />
      <WorksiteList worksites={worksitesData} />
      <WorksiteMap worksites={worksitesData} />
    </div>
  );
}
