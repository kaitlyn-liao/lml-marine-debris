// Map.js renders the restricted interactive map via API
// Renders a map restricted to the Santa Cruz area, noted with markers
// for the set locations used for data gathering, as well as a legend.
// Selected markers/pins will be passed upwards to DataVis.js for use in Display.js

// Map.js is rendered by DataVis.js, and currently renders no children.

import React, { useRef, useEffect, useState } from 'react';
import MapGL, { Marker  } from "@urbica/react-map-gl";
import Button from 'react-bootstrap/Button'
import { withSize } from "react-sizeme";
import BEACHES from "./beaches.json";
import { GeoAltFill } from "react-bootstrap-icons";
import Graph from './Graph.js';
import "../../css/Map.css";

const beachJSON = BEACHES;
const latLongList = getLatLongList(beachJSON);
const mapViewCenter = getMapCenter(latLongList);
const mapAPItoken = "pk.eyJ1Ijoia2F5bGlhbyIsImEiOiJjbDFuOW96cTQwNmw1M2tudmJidnpia3pzIn0.Yui35e5YWeAit229l_ThRQ"

const INITIAL_MAP_VIEW = {
  latitude: mapViewCenter[0],
  longitude:mapViewCenter[1],
  zoom: 9.5,
  maxZoom: 18,
  minZoom: 8
}

const SizeAware = withSize({ noPlaceholder: true, monitorHeight: true })(
  (props) => props.children
);

function Map(props) {
  // Default map orientation
  const [viewport, setViewport] = useState( INITIAL_MAP_VIEW );

  // map.scrollZoom.disable();

  const mapContainer = {
    width: "100%", height: "83vh",
  }

  const bounds = [
    [-124, 36.2], // Southwest coordinates
    [-120, 37.5] // Northeast coordinates
    ];
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
        style={ mapContainer } 
        accessToken={ mapAPItoken }
        mapStyle="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"
        maxBounds={bounds}
        onViewportChange={(viewport) => {
          viewport.zoom=9.5
          viewport.maxZoom=18
          viewport.minZoom=8
          setViewport(viewport);
        }}
        >
          {BEACHES.map(beach =>(
            <Marker 
            key={beach.beach_id}
            longitude={beach.long}
            latitude={beach.lat}
            >
              {/* <Button> */}
                {/* <i className="bi biGeoAltFill"></i> */}
                <GeoAltFill class="pin" id={beach.type} size={50} />
              {/* </Button> */}
            </Marker>
          ))}
        </MapGL>
      </SizeAware>
    </div>
  );
}


/**
 * @param beachJSON a json file of all marine debris beaches in form of
 * {
 *  "name": "Del Monte",
 *  "lat": 36.601531,
 *  "long": -121.889650,
 *  "type": "urban"
 * }
 *
 * @return array of all the beach lat long coordinates. 
 * e.g. [[latitude1, longtitude1], [latitude2, longtitude2] ...]
 */
 function getLatLongList (beachJSON) { 
  let lat = 36.961518;
  let long = -122.002881;
  let latLongList = [];
  let latLongBeach = [];
  for(var i = 0; i < beachJSON.length; i++){
    latLongBeach = [beachJSON[i].lat, beachJSON[i].long];
    latLongList[i] = latLongBeach
  }
  return(latLongList);
}


// Helper functions for mapViewCenter
function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }
/**
 * @param latLngInDeg array of arrays with latitude and longtitude
 *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
 *   [longtitude2] ...]
 *
 * @return array with the center latitude longtitude pairs in 
 *   degrees.
 */
function getMapCenter( latLongList ) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i=0; i< latLongList.length; i++) {
        var lat = degr2rad( latLongList[i][LATIDX]);
        var lng = degr2rad( latLongList[i][LNGIDX]);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    var avgX = sumX /  latLongList.length;
    var avgY = sumY /  latLongList.length;
    var avgZ = sumZ /  latLongList.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    return ([rad2degr(lat), rad2degr(lng)]);
}


export default Map;