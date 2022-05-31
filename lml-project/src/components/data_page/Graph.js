// Graph.js renders a graph visualizing the debris data for a specified degree
// This component will recieve information from Map.js and 
// Filters.js via DataVis.js and Display.js to specify the beach considered, 
// filters applied, and graph type requested.

// Graph.js is rendered by Display.js. Renders the following children:
/*
 * BarBeachDebris.js
 *  - Bar chart by debris type
 * PieChart.js
 *  - Pie chart by debris type
 * BarSeasons.js
 *  - Bar chart by labeled season
 * LineChart.js
 *  - Line chart by date
 * ComparisonChart.js
 *  - Bar chart by urban/rural label
 * OneColumn.js
 *  - Same data as ComparisonChart, but one column at a time (for visibility)
 */

// Displays a button that reveals tabs containing graphs when clicked.
// Button is rendered on map popups.

import React from 'react';

// bootstrap imports
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { DistributeHorizontal, BarChartFill, PieChartFill, Snow, Flower3, SunFill, CloudRainFill, CalendarWeekFill } from "react-bootstrap-icons";
import { useState, useEffect } from 'react';

import PieChart from '../charts/PieChart.js';
import LineChart from '../charts/LineChart.js';
import ComparisonChart from '../charts/ComparisonChart.js';
import OneColumn from '../charts/OneColumn.js';
import BarChart from '../charts/BarBeachDebris.js';
import SeasonBarChart from '../charts/BarSeasons.js';
import '../../css/GraphTabs.css';

class Graph extends React.Component {

  render() {

    return (
      // html goes here
      <div>
        <Example />
      </div>
    );
  }
}

/* Defines and returns Tabs for navigating charts
 * Layout (with high and low level tabs):
 * 1. Types of Debris  |  2. Change Over Time  |  3. Urban vs Rural (bar chart)
 * |  -Bar  -Pie       |-Seasons -Line(by date)|  -All debris  -One column at a time
 * 
 * (1,2,3 are higher tabs, '-' indicates lower level tabs)
 */

function ControlledTabs() {
  const [key, setKey] = useState('Bar');
  const [key2, setKey2] = useState('All');
  const [key3, setKey3] = useState('BarChart');
  const [key4, setKey4] = useState('Seasons');
  useEffect(() => { }, []);
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {/* Higher level tab for Bar and Pie charts */}
      <Tab eventKey="Bar" title="Types of Debris">
        <Tabs
          id="controlled-tab-example"
          activeKey={key3}
          onSelect={(k) => setKey3(k)}
          className="mb-3"
        >
          <Tab eventKey="BarChart" title={<BarChartFill size={20}></BarChartFill>}>
            <BarChart id="barGraph" />
          </Tab>
          <Tab eventKey="PieChart" title={<PieChartFill size={20}></PieChartFill>}>
            <PieChart />
          </Tab>
        </Tabs>
      </Tab>
      {/* Higher level tab for Season and Date charts */}
      <Tab eventKey="Time" title="Change Over Time">
        <Tabs
          id="controlled-tab-example"
          activeKey={key4}
          onSelect={(k) => setKey4(k)}
          className="mb-3"
        >
          <Tab eventKey="Seasons" title={<div><Snow class='padded-icon' size={20}></Snow><SunFill size={20}></SunFill></div>}>
            <SeasonBarChart />
          </Tab>
          <Tab eventKey="Date" title={<CalendarWeekFill size={20}></CalendarWeekFill>}>
            <LineChart />
          </Tab>
        </Tabs>
      </Tab>
      {/* Higher level tab for Urban vs Rural charts, all categories or just one */}
      <Tab eventKey="Comparison" title="Urban vs Rural">
        <Tabs
          id="controlled-tab-example"
          activeKey={key2}
          onSelect={(k) => setKey2(k)}
          className="mb-3"
        >
          <Tab eventKey="All" title={<BarChartFill size={20}></BarChartFill>}>
            <ComparisonChart />
          </Tab>
          <Tab eventKey="One" title={<DistributeHorizontal size={20}></DistributeHorizontal>}>
            <OneColumn />
          </Tab>
        </Tabs>
      </Tab>
    </Tabs>
  );
}

function OffCanvasExample({ ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let holder;
  function setDiv() {
    if (document.getElementById("pie-drop")) {
      document.getElementById("pie-drop").innerHTML = holder;
    }
  }

  const graphOffcanvas = {
    width: "50%",
    boxShadow: "-10px 0px 45px 5px rgba(100,100,100,0.5)"
  };

  return (
    <>
      {/* Button to display graphs and tabs */}
      <Button variant="primary" onClick={e => {
        e.preventDefault();
        handleShow();
        if (document.getElementById("pop").innerHTML) {
          holder = document.getElementById("pop").innerHTML
          setTimeout(setDiv, 100);
        }
      }} id="data-for" className="me-2">
        View Debris Data
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} style={graphOffcanvas} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Graphs</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ControlledTabs />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Example() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Graph