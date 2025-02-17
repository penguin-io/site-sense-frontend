

import React from 'react';
import ReactDOM from 'react-dom';
import ReactHlsPlayer from 'react-hls-player';

const player = () => {
  return (
    <div>
    <ReactHlsPlayer
        src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
        autoPlay={false}
        controls={true}
        width="100%"
        height="auto"
    />,
    </div>
  )
}

export default player
