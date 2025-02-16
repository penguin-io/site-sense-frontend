import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const HLSPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }

    return () => {
      if (Hls.isSupported()) {
        hls.destroy();
      }
    };
  }, [src]);

  return <video ref={videoRef} controls />;
};

export default HLSPlayer;
