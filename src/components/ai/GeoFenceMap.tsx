'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export default function GeoFenceMap() {
  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      className="h-[500px] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          Worksite Boundary
        </Popup>
      </Marker>
    </MapContainer>
  );
}