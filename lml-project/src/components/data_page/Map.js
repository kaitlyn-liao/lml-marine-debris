
// Map.js renders the restricted interactive map via API
// Renders a map restricted to the Santa Cruz area, noted with markers
// for the set locations used for data gathering, as well as a legend.
// Selected markers/pins will be passed upwards to DataVis.js for use in Display.js

// Map.js is rendered by DataVis.js, and currently renders no children.

import React, { useRef, useEffect, useState } from 'react';
import MapGL, { Marker, Popup } from "@urbica/react-map-gl";
import { withSize } from "react-sizeme";
import BEACHES from "./beaches.json";
import { GeoAltFill } from "react-bootstrap-icons";
import Graph from './Graph.js';
import "../../css/Map.css";
import 'mapbox-gl/dist/mapbox-gl.css';

// Images of every beach to be displayed on popups
import WaddellIMG from '../../images/pins/waddell.png';
import NaturalBridgesIMG from '../../images/pins/natural-bridges.png';
import MainIMG from '../../images/pins/main-beach.png';
import SeabrightIMG from '../../images/pins/seabright.png';
import LiveOakIMG from '../../images/pins/live-oak.png';
import CapitolaIMG from '../../images/pins/capitola.png';
import SunsetIMG from '../../images/pins/sunset-state-beach.png';
import NZmudowskiIMG from '../../images/pins/north-zmudowski.png';
import SZmudowskiIMG from '../../images/pins/south-zmudowski.png';
import MarinaIMG from '../../images/pins/marina.png';
import SeasideIMG from '../../images/pins/seaside.png';
import DelMonteIMG from '../../images/pins/del-monte.png';

const beachJSON = BEACHES;
const latLongList = getLatLongList(beachJSON);
const mapViewCenter = getMapCenter(latLongList);

const defaultBeach = {
  "beach_id": -1,
  "name": "",
  "lat": 0,
  "long": 0,
  "type": "neither",
  "bottom": [0, 0]
};

const beachList = [
  { label: "Waddell", src: WaddellIMG },
  { label: "Natural Bridges", src: NaturalBridgesIMG },
  { label: "Main Beach", src: MainIMG },
  { label: "Seabright", src: SeabrightIMG },
  { label: "Live Oak", src: LiveOakIMG },
  { label: "Capitola", src: CapitolaIMG },
  { label: "Sunset State Beach", src: SunsetIMG },
  { label: "North Zmudowski", src: NZmudowskiIMG },
  { label: "South Zmudowski", src: SZmudowskiIMG },
  { label: "Marina", src: MarinaIMG },
  { label: "Seaside", src: SeasideIMG },
  { label: "Del Monte", src: DelMonteIMG },
];

let selectedBeach; // Beach for main popup (beach displayed on charts)
let beachString; // Stores image imported of beach
let hoveredBeach = defaultBeach; // Beach for the hover popup
// Initialize map view
let currentZoom = 9.5;
let currentLat = mapViewCenter[0];
let currentLong = mapViewCenter[1];
const INITIAL_MAP_VIEW = {
  latitude: mapViewCenter[0],
  longitude: mapViewCenter[1],
  zoom: 9.5,
  maxZoom: 18,
  minZoom: 8
}

let NEW_MAP_VIEW = {
  latitude: mapViewCenter[0],
  longitude: mapViewCenter[1],
  zoom: 9.6,
  maxZoom: 18,
  minZoom: 8
}

const SizeAware = withSize({ noPlaceholder: true, monitorHeight: true })(
  (props) => props.children
);

function Map(props) {
  // Default map orientation
  const [viewport, setViewport] = useState(INITIAL_MAP_VIEW);
  // map.scrollZoom.disable();

  const mapContainer = {
    width: "100%", height: "83vh",
  }

  const bounds = [
    [-124, 36], // Southwest coordinates
    [-119.5, 38] // Northeast coordinates
  ];
  const mapRef = useRef();
  // Resize the map to the current webpage size
  const resizeMap = () => {
    mapRef.current && mapRef.current.getMap().resize();
  };

  // Set the beach displayed on hover popups
  function setHoveredBeach(b) {
    hoveredBeach = b;
    currentZoom = viewport.zoom;
    currentLat = viewport.latitude;
    currentLong = viewport.longitude;
    NEW_MAP_VIEW = {
      latitude: currentLat,
      longitude: currentLong,
      zoom: currentZoom,
      maxZoom: 18,
      minZoom: 8
    }
    setViewport(NEW_MAP_VIEW);
  }

  // Set the currently selected beach for click popups
  function setSelectedBeach(b) {
    selectedBeach = b;
    // Set image based on beach name
    if (selectedBeach !== defaultBeach) {
      switch (selectedBeach.name) {
        case "Waddell":
          beachString = WaddellIMG;
          break;
        case "Natural Bridges":
          beachString = NaturalBridgesIMG;
          break;
        case "Main Beach":
          beachString = MainIMG;
          break;
        case "Seabright":
          beachString = SeabrightIMG;
          break;
        case "Live Oak":
          beachString = LiveOakIMG;
          break;
        case "Capitola":
          beachString = CapitolaIMG;
          break;
        case "Sunset State Beach":
          beachString = SunsetIMG;
          break;
        case "North Zmudowski":
          beachString = NZmudowskiIMG;
          break;
        case "South Zmudowski":
          beachString = SZmudowskiIMG;
          break;
        case "Marina":
          beachString = MarinaIMG;
          break;
        case "Seaside":
          beachString = SeasideIMG;
          break;
        case "Del Monte":
          beachString = DelMonteIMG;
          break;
        default:
          beachString = "";
          break;
      }

      // Snap to clear view of beach on map
      currentZoom = viewport.zoom;
      currentLat = viewport.latitude;
      currentLong = viewport.longitude;
      NEW_MAP_VIEW = {
        latitude: selectedBeach.lat + 0.1,
        longitude: selectedBeach.long + 0.1,
        zoom: 10,
        maxZoom: 18,
        minZoom: 8
      }
    }
    else {
      NEW_MAP_VIEW = {
        latitude: currentLat,
        longitude: currentLong,
        zoom: currentZoom,
        maxZoom: 18,
        minZoom: 8
      }
    }


    setViewport(NEW_MAP_VIEW);

  }


  // Close popup on escape key
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        // set to defaultBeach to clear popup selection
        setSelectedBeach(defaultBeach);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <SizeAware onSize={resizeMap}>
        {/* Map component */}
        <MapGL
          id='mainMap'
          {...viewport}
          ref={mapRef}
          style={mapContainer}
          accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"
          maxBounds={bounds}
          onViewportChange={(viewport) => {
            viewport.zoom = 9.5
            viewport.maxZoom = 18
            viewport.minZoom = 8
          }}
        >
          {/* All 12 beaches mapped to pin */}
          {BEACHES.map(beach => (
            <Marker
              key={beach.beach_id}
              longitude={beach.long}
              latitude={beach.lat}
            >
              {/* Pins that handle clicking and hovering */}
              <GeoAltFill id="fly" class="pin" onMouseOver={e => {
                e.preventDefault();
                setHoveredBeach(defaultBeach);
                setHoveredBeach(beach);
              }}
                onMouseLeave={e => {
                  e.preventDefault();
                  setHoveredBeach(defaultBeach);
                }}
                onClick={e => {
                  e.preventDefault();
                  beachString = "";
                  setSelectedBeach(defaultBeach);
                  setSelectedBeach(beach);
                }}
                id={beach.type}
                size={50} />
            </Marker>
          ))}
          {/* The main popup
            * Not displayed when selectedBeach == defaultBeach
            * Includes graph button and picture
            */}
          {selectedBeach && selectedBeach != defaultBeach ? (
            <div>
              <Popup id='notpop'
                value="Capitola"
                latitude={selectedBeach.lat}
                longitude={selectedBeach.long}
                offsetTop={-30}
                anchor="bottom"
                offset={50}
                closeOnClick={false}
                closeButton={false}
                onClose={() => {
                  setSelectedBeach(defaultBeach);
                }}
              >
                <div>
                  <div className="text-center">
                    <h4 className="text-center">{selectedBeach.name}</h4>
                  </div>
                  <center>
                    <img id="photo" src={beachString} style={{ width: 200 + "px" }}></img>
                  </center>
                  <br></br>
                  <div class="text-center">
                    <Graph />
                    <br></br>
                    <i className="text-secondary">Press "esc" to close</i>
                  </div>
                </div>
              </Popup>
            </div>
          ) : null}
          {/* The small popup
            * Not displayed when hoveredBeach == defaultBeach
            * Appears on top when overlapping with main popup
            */}
          {hoveredBeach != defaultBeach && hoveredBeach != selectedBeach ?
            <div class="small-popup">
              <Popup
                value="Capitola"
                latitude={hoveredBeach.lat}
                longitude={hoveredBeach.long}
                anchor="left"
                offset={5}
                closeOnClick={false}
                closeButton={false}
                onClose={() => { }
                }
              >
                <div>
                  <b id="hoverName" className="text-center text-secondary">{hoveredBeach ? hoveredBeach.name : ""}</b>
                </div>
              </Popup>
            </div>
            : null}
        </MapGL>
      </SizeAware>
      {/* IMPORTANT: the element below passes the selected beach name to graphs for data display.
        * Chart components uses getElementById to get innerHTML of this
        */}
      <b id='pop'>{selectedBeach && selectedBeach != defaultBeach ? selectedBeach.name : <br></br>}</b>
    </div>
  );
}

function getLatLongList(beachJSON) {
  let lat = 36.961518;
  let long = -122.002881;
  let latLongList = [];
  let latLongBeach = [];
  for (var i = 0; i < beachJSON.length; i++) {
    latLongBeach = [beachJSON[i].lat, beachJSON[i].long];
    latLongList[i] = latLongBeach
  }
  return (latLongList);
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
function getMapCenter(latLongList) {
  var LATIDX = 0;
  var LNGIDX = 1;
  var sumX = 0;
  var sumY = 0;
  var sumZ = 0;

  for (var i = 0; i < latLongList.length; i++) {
    var lat = degr2rad(latLongList[i][LATIDX]);
    var lng = degr2rad(latLongList[i][LNGIDX]);
    // sum of cartesian coordinates
    sumX += Math.cos(lat) * Math.cos(lng);
    sumY += Math.cos(lat) * Math.sin(lng);
    sumZ += Math.sin(lat);
  }

  var avgX = sumX / latLongList.length;
  var avgY = sumY / latLongList.length;
  var avgZ = sumZ / latLongList.length;

  // convert average x, y, z coordinate to latitude and longtitude
  var lng = Math.atan2(avgY, avgX);
  var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
  var lat = Math.atan2(avgZ, hyp);

  return ([rad2degr(lat), rad2degr(lng)]);
}


export default Map;