
// App.js is rendered by Index.js, and renders the child Navbar.js

// import TicTac from './react_tutorial_ref/Tictactoe.js'

import React from 'react';
import NavBar from "./Navbar.js";

function App() {

  return (
    <div>
      <NavBar/>
    </div>
  );
}
export default App;

// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// mapboxgl.accessToken = 'pk.eyJ1Ijoia2F5bGlhbyIsImEiOiJjbDFuOW96cTQwNmw1M2tudmJidnpia3pzIn0.Yui35e5YWeAit229l_ThRQ';

// export default function App() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-122.0308);
//   const [lat, setLat] = useState(36.9741);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom
//     });
//   });

//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });

//   return (
//     <div>
//       <NavBar/>
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="mapContainer" />
//     </div>
//   );
// }

