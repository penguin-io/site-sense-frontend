import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

// Define props interface
interface VideoPlayerProps {
  options: videojs.PlayerOptions;
  onReady?: (player: videojs.Player) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ options, onReady }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize player if not already initialized
    if (!playerRef.current) {
      const videoElement = document.createElement("video");
      videoElement.className = "video-js vjs-big-play-centered";
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("🎬 Video.js player is ready");
        onReady?.(player);
      }));

      // Player error handling
      player.on("error", () => {
        const error = player.error();
        videojs.log("❌ Video.js Error:", error?.message);
      });
    } else {
      const player = playerRef.current;
      player.src(options.sources);
      player.autoplay(options.autoplay ?? false);
    }
  }, [options]);

  // Cleanup player on component unmount
  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className="w-[600px] mx-auto">
      <div ref={videoRef}></div>
    </div>
  );
};

export default VideoPlayer;
