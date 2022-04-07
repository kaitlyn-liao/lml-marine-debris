// Map.js renders the restricted interactive map via API
// Renders a map restricted to the Santa Cruz area, noted with markers
// for the set locations used for data gathering, as well as a legend.
// Selected markers/pins will be passed upwards to DataVis.js for use in Display.js

// Map.js is rendered by DataVis.js, and currently renders no children.

// import React, { useRef, useEffect, useState } from 'react';
// import ReactMapGL from "react-map-gl";

// class Map extends React.Component {
//   render() {
//     return (
//       // html goes here
//       <div>
        
//       </div>
//     );

//   }
// }

// export default Map

import React, { useRef, useEffect, useState } from 'react';
import MapGL, { Source, Layer, NavigationControl } from "@urbica/react-map-gl";
import { withSize } from "react-sizeme";

function Map(props) {

  // Default map orientation
  const [viewport, setViewport] = useState({
    latitude: 36.954117,
    longitude: -122.030799,
    zoom: 9,
  });

  const SizeAware = withSize({ noPlaceholder: true, monitorHeight: true })(
    (props) => props.children
  );
  const mapContainer = {
    width: "100%", height: "83vh",
  }
  const mapRef = useRef();
  // Resize the map to the current webpage size
  const resizeMap = () => {
    mapRef.current && mapRef.current.getMap().resize();
  };

  return (
    <div>
      <SizeAware onSize={resizeMap}>
        <MapGL
        {...viewport}
        ref={mapRef}
        style={ mapContainer}
        accessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
        >
          hi there 
        </MapGL>
      </SizeAware>
    </div>
  );
}

export default Map;