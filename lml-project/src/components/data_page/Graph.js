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
import { DistributeHorizontal, BarChartFill } from "react-bootstrap-icons";
import { useState } from 'react';
// import graphOffcanvas from '../../css/GraphCanvas.css';

import PieChart from '../charts/PieChart.js';
// import StackedChart from '../charts/StackedChart.js';
import ComparisonChart from '../charts/ComparisonChart.js';
import OneColumn from '../charts/OneColumn.js';
import BarChart from '../charts/BarBeachDebris.js';
import SeasonBarChart from '../charts/BarSeasons.js';

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
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="Bar" title="Types of Debris">
        <BarChart />
      </Tab>
      <Tab eventKey="Pie" title="Pie">
        <PieChart />
      </Tab>
      <Tab eventKey="Seasons" title="Seasons">
        <SeasonBarChart />
      </Tab>
      <Tab eventKey="Comparison" title="Comparison">
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