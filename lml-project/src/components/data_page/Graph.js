// Graph.js renders a graph visualizing the debris data for a specified degree
// This component will recieve information from Map.js and 
// Filters.js via DataVis.js and Display.js to specify the beach considered, 
// filters applied, and graph type requested.

// Graph.js is rendered by Display.js, and currently renders no children.

import React from 'react';

// bootstrap imports
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { DistributeHorizontal, BarChartFill, PieChartFill, Snow, Flower3, SunFill, CloudRainFill, CalendarWeekFill } from "react-bootstrap-icons";
import { useState } from 'react';
// import graphOffcanvas from '../../css/GraphCanvas.css';

import PieChart from '../charts/PieChart.js';
// import StackedChart from '../charts/StackedChart.js';
import LineChart from '../charts/LineChart.js';
import StackedChart from '../charts/StackedChart.js';
import ComparisonChart from '../charts/ComparisonChart.js';
import OneColumn from '../charts/OneColumn.js';
import BarChart from '../charts/BarBeachDebris.js';
import SeasonBarChart from '../charts/BarSeasons.js';
import '../../css/GraphTabs.css';

let selectBeach = "Waddell"; 
let inProgress = false;

// function checkPopup() {
//   inProgress = true;
//   if(document.getElementById('pop') != null){selectBeach = document.getElementById('pop').innerHTML;
//   console.log("checked");}
//   console.log(selectBeach);
//   console.log(document.getElementById('pop').innerHTML);
//   inProgress = false;
// }
// document.body.addEventListener('click', checkPopup, true);
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

function ControlledTabs() {
  const [key, setKey] = useState('Bar');
  const [key2, setKey2] = useState('All');
  const [key3, setKey3] = useState('BarChart');
  const [key4, setKey4] = useState('Seasons');
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      
      <Tab eventKey="Bar" title="Types of Debris">
      <Tabs
      id="controlled-tab-example"
      activeKey={key3}
      onSelect={(k) => setKey3(k)}
      className="mb-3"
    >
      <Tab eventKey="BarChart" title={<BarChartFill size={20}></BarChartFill>}>
        {!inProgress ? <BarChart selectBeach={selectBeach}/> : null}
      </Tab>
      <Tab eventKey="PieChart" title={<PieChartFill size={20}></PieChartFill>}>
        <PieChart />
      </Tab>
      </Tabs>
      </Tab>
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

  const graphOffcanvas = {
    width: "50%",
    boxShadow: "-10px 0px 45px 5px rgba(100,100,100,0.5)"
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        Graph
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