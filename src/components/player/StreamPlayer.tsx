"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

// Type definitions
interface StreamPlayerProps {
  streamUrl: string;
}

const retryPause = 2000;

const StreamPlayer: React.FC<StreamPlayerProps> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [message, setMessage] = useState<string>("");
//   const [audioTracks, setAudioTracks] = useState<Hls.AudioTrack[]>([]);
  const [showLangList, setShowLangList] = useState<boolean>(false);

  const isIOS = () => {
    return (
      /iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  };

  const handleHlsError = (hls: Hls) => {
    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        hls.destroy();
        // setAudioTracks([]);
        setShowLangList(false);

        let errorMsg = "Unknown error, retrying in some seconds";
        if (data.details === "manifestIncompatibleCodecsError") {
          errorMsg = "Stream uses incompatible codecs for this browser.";
        } else if (data.response?.code === 404) {
          errorMsg = "Stream not found, retrying soon.";
        } else {
          errorMsg = `${data.error?.message ?? "Error"} - retrying...`;
        }

        setMessage(errorMsg);

        // Retry after pause
        setTimeout(() => loadStream(), retryPause);
      }
    });
  };

  const loadStream = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported() && !isIOS()) {
      const hls = new Hls({ maxLiveSyncPlaybackRate: 1.5 });
      handleHlsError(hls);

      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(streamUrl);
      });

      hls.on(Hls.Events.MANIFEST_LOADED, () => {
        // const tracks = hls.audioTracks;
        // if (tracks.length > 1) {
        //   setAudioTracks(tracks);
        //   setShowLangList(true);
        // }
        setMessage("");
        video.play().catch((err) => {
          setMessage("Autoplay failed. Please play manually.");
          console.error(err);
        });
      });

      // Synchronize stream if video resumes after being paused
      video.onplay = () => {
        if (hls.liveSyncPosition) video.currentTime = hls.liveSyncPosition;
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native iOS HLS
      fetch(streamUrl)
        .then(() => {
          video.src = streamUrl;
          video.play();
        })
        .catch(() => {
          setMessage("Failed to load stream.");
        });
    } else {
      setMessage("HLS not supported in this browser.");
    }
  };

  useEffect(() => {
    loadStream();
  }, [streamUrl]);

  const handleAudioTrackChange = (trackId: number) => {
    const video = videoRef.current;
    if (!video) return;
    const hls = video as unknown as Hls; // TS workaround
    hls.audioTrack = trackId;
  };

  return (
    <div className="flex flex-col items-center justify-center  space-y-4 bg-gray-900 text-white">
      {message && <div className="bg-red-500 px-4 py-2 rounded">{message}</div>}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        controls
        className="w-[600px] h-[340px] rounded-lg shadow-lg"
      />

      {showLangList && (
        <div className="bg-gray-800 p-3 rounded">
          <h4 className="mb-2 font-bold">Available Audio Tracks:</h4>
          <ul className="space-y-2">
            {/* {audioTracks.map((track) => (
              <li
                key={track.id}
                className="cursor-pointer hover:text-yellow-400"
                onClick={() => handleAudioTrackChange(track.id)}
              >
                {track.name}
              </li>
            ))} */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StreamPlayer;
