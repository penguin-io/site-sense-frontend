"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Worksite {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface MapProps {
  worksites: Worksite[];
}

const containerStyle = { width: "100%", height: "400px" };

const WorksiteMap: React.FC<MapProps> = ({ worksites }) => {
  // Calculate map center dynamically based on first worksite
  const center = worksites.length > 0 
    ? { lat: worksites[0].lat, lng: worksites[0].lng } 
    : { lat: 0, lng: 0 };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {worksites.map((worksite) => (
          <Marker
            key={worksite.id}
            position={{ lat: worksite.lat, lng: worksite.lng }}
            label={worksite.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default WorksiteMap;
