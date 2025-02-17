import React from 'react';
import ReactDOM from 'react-dom';
import ReactHlsPlayer from 'react-hls-player';

ReactDOM.render(
  <ReactHlsPlayer
    src="http://192.168.137.30/v0/1/playlist.m3u8"
    autoPlay={false}
    controls={true}
    width="100%"
    height="auto"
  />,
  document.getElementById('app')
);