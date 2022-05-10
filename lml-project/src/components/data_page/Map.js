
   
// Map.js renders the restricted interactive map via API
// Renders a map restricted to the Santa Cruz area, noted with markers
// for the set locations used for data gathering, as well as a legend.
// Selected markers/pins will be passed upwards to DataVis.js for use in Display.js

// Map.js is rendered by DataVis.js, and currently renders no children.

import React, { useRef, useEffect, useState } from 'react';
import MapGL, { Marker, Popup } from "@urbica/react-map-gl";
import Button from 'react-bootstrap/Button'
import { withSize } from "react-sizeme";
import BEACHES from "./beaches.json";
import { GeoAltFill, XCircleFill } from "react-bootstrap-icons";
import PieChart from '../charts/PieChart.js';
import Graph from './Graph.js';
import "../../css/Map.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { closeComplete } from 'pg-protocol/dist/messages';

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
let selectedBeach;
let popup;
let onPopup = false;
let p;
let popups = [];
let settingBeach = false;
let idx = 0;
let currentZoom = 9.5;
let currentLat = mapViewCenter[0];
let currentLong = mapViewCenter[1];
const INITIAL_MAP_VIEW = {
  latitude: mapViewCenter[0],
  longitude:mapViewCenter[1],
  zoom: 9.5,
  maxZoom: 18,
  minZoom: 8
}

let NEW_MAP_VIEW = {
  latitude: mapViewCenter[0],
  longitude:mapViewCenter[1],
  zoom: 9.6,
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
  //const selectedBeach = useRef(null);
  //const [selectedBeach, setSelectedBeach] = React.useState(null);

  

  /*let popup = [<Popup
  latitude={0}
  longitude={0}
  offsetTop={-30}
  anchor="bottom"
  bottom = {0}
>
  <div>
    <h2>Hi</h2>
  </div>
</Popup>];*/
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function updateDiv()
{ 
  if(!document.getElementById("pop")){return};
  document.getElementById("pop").innerHTML = document.getElementById("pop").innerHTML;
  if(!onPopup){return;}
  if(!document.getElementById("drop")){return};
  document.getElementById("drop").innerHTML = document.getElementById("drop").innerHTML;
  if(document.getElementById("pop").innerHTML != document.getElementById("drop").innerHTML){
    for(var i = 0; i < BEACHES.length; i++){
      var b = BEACHES[i];
      if(b.name === document.getElementById("pop").innerHTML){
        setSelectedBeach(defaultBeach);
        setSelectedBeach(b);
        document.getElementById("drop").innerHTML = document.getElementById("pop").innerHTML;
        return;
      }
    }
  }
}

function setSelectedBeach(b){
  selectedBeach = b;
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
  /*if(idx === 0){
  setViewport(INITIAL_MAP_VIEW); idx = 1;}
  else{setViewport(NEW_MAP_VIEW); idx = 0;}*/
  /*for(var i = 0; i < BEACHES.length; i++){
    popups[i] = <Popup
    key={BEACHES[i].id}
    latitude={BEACHES[i].lat}
    longitude={BEACHES[i].long}
    offsetTop={-30}
    anchor="bottom"
    offset = {50}
    closeOnClick={true}
    onClose={() => {
      setSelectedBeach(selectedBeach);
    }}
  >
    <div>
      <h2>Hi</h2>
    </div>
  </Popup>
  if(selectedBeach.name === BEACHES[i].name){
    popup = [popups[i]];
  }
  }*/   
}

  /*useEffect(() => {
    if (selectedBeach) {
      setSelectedBeach(selectedBeach);
    }
  }, [selectedBeach]);*/

  /*function setSelectedBeach (b){
    selectedBeach = b;
  }*/
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedBeach(null);
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
        <MapGL
        id='mainMap'
        {...viewport}
        ref={mapRef}
        style={ mapContainer } 
        accessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
        mapStyle="mapbox://styles/hfox999/ck6crjgkn0bfs1imqs16f84wz"
        maxBounds={bounds}
        onViewportChange={(viewport) => {
          viewport.zoom=9.5
          viewport.maxZoom=18
          viewport.minZoom=8
          //setSelectedBeach(selectedBeach);
          //if(document.getElementById('pop')){document.getElementById('pop').reload(true);}
          //setViewport(viewport);
        }}
        >
          {BEACHES.map(beach => (
                <Marker
            key={beach.beach_id}
            longitude={beach.long}
            latitude={beach.lat}
            >
              <GeoAltFill id="fly" class="pin" onMouseOver={e => {
                e.preventDefault();
                console.log(beach);
                //updateBeach(beach);
                console.log('setting');
                if(!onPopup)
                {setSelectedBeach(beach);}
                //setViewport(INITIAL_MAP_VIEW);
                console.log(selectedBeach);
                updateDiv();
                if(document.getElementById("pop")){console.log("found");}
                }}  
                onMouseLeave={e => {
                  e.preventDefault();
                  if(!onPopup)
                  {setSelectedBeach(defaultBeach);}
                  }}
                  onClick={e => {
                    e.preventDefault();
                    
                    setSelectedBeach(defaultBeach);
                    setSelectedBeach(beach);
                    onPopup = true;
                    updateDiv();
                    }}
              id={beach.type}
              size={50} />
            </Marker>
          ))}
          
          {/*selectedBeach ? <div id='pop'><ol>{popups}</ol></div> : null*/}
          {selectedBeach && selectedBeach != defaultBeach? (
            <div>
              
            <Popup id='notpop'
            value="Capitola"
            latitude={selectedBeach.lat}
            longitude={selectedBeach.long}
            offsetTop={-30}
            anchor="bottom"
            offset = {50}
            closeOnClick={false}
            closeButton={false}
            onClose={() => {
              if(!settingBeach){
                console.log('trying to set');}
              //setSelectedBeach(defaultBeach);
              setSelectedBeach(defaultBeach);
              //onPopup = false;
            }}
          >
            <div>
              {onPopup ? (<div className="text-center"><XCircleFill
              onClick={e => {
                e.preventDefault();
                setSelectedBeach(defaultBeach);
                onPopup = false;
                }}
                size={20}
              />
              <h4 className="text-center">{selectedBeach.name}</h4></div>) :
              <h4 className="text-center text-secondary">{selectedBeach.name}</h4>}
            </div>
              </Popup></div>
          ) : null}
        </MapGL>
      </SizeAware>
      <b id='pop'>{selectedBeach ? selectedBeach.name : null}</b>
        
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