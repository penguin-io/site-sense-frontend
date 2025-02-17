"use client";

import StreamPlayer from "@/components/player/StreamPlayer";
import React, { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";

function App() {
  const videoSrc = "http://192.168.137.30/akhil/index.m3u8"; // Ensure this is a valid HLS URL
  const playerRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🎥 HLS Stream Player</h1>
      <video src={videoSrc}></video>
      <StreamPlayer streamUrl={videoSrc} />
      <StreamPlayer streamUrl={"http://192.168.137.30/v0/1/index.m3u8"} />
      </div>
  );
}

export default App;
