/*
 * This chart displays urban vs rural data for one type of debris t a time.
 * It provides the SAME DATA AS FULL URBAN VS RURAL CHART and is only for better
 * visibility and user engagement with data.
 * 
 * SOURCES
 * react-select: https://appdividend.com/2018/10/19/react-dropdown-select-example-tutorial/
 * options example: https://www.codegrepper.com/code-examples/javascript/react+select+onchange
 * update chart tutorial: https://www.youtube.com/watch?v=_wnaQ-oR9YE
 * 
 */

// Rendered in Graph.js and renders no children

import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { ArrowLeft, ArrowRight, Circle, CircleFill } from "react-bootstrap-icons";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  registerables
} from 'chart.js';
import { doWhileStatement } from '@babel/types';


Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  ...registerables
);

let newChartInstance; // Instance for chart to be updated with every change
let idx = 0;

const beachList = [
  { label: "Waddell", value: 0 },
  { label: "Natural Bridges", value: 1 },
  { label: "Main Beach", value: 2 },
  { label: "Seabright", value: 3 },
  { label: "Live Oak", value: 4 },
  { label: "Capitola", value: 5 },
  { label: "Sunset", value: 6 },
  { label: "N. Zmudowski", value: 7 },
  { label: "S. Zmudowski", value: 8 },
  { label: "Marina", value: 9 },
  { label: "Seaside", value: 10 },
  { label: "Del Monte", value: 11 },
];

function OneColumn() {
  /*
   * This function is for an unfinished feature to display which slide
   * of the chart is currently displayed. TO DO: make dots update without
   * exiting One-Column chart tab
   */
  /*function dots() {
      var dotsRow = [];
      for (var i=0; i<11; i++){
          if(i === idx){
              dotsRow[i] = <CircleFill></CircleFill>;
          }
          else{
              dotsRow[i] = <Circle></Circle>;
          }
      }
      
      return dotsRow;
  }*/
  var Xvalues = ["Fragmented Plastic", 'Plastic Products', 'Food Wrappers', 'Styrofoam', 'Cigarette Butts', 'Paper', 'Metal', 'Glass', 'Fabric', 'Rubber', 'Other']
  var Udata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  var Rdata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  var Uselect = [Udata[idx]];
  var Rselect = [Rdata[idx]];
  var Xselect = [Xvalues[idx]];

  // For unfinished dot feature:
  // var dotVar = dots();

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  // Helper function to set chart data to current settings
  // Updates settings of newChartInstance
  function updateChart() {
    // Additional parameters not present in ComparisonChart.js are
    // for the user's currently selected slide
    Uselect = [Udata[idx]];
    Rselect = [Rdata[idx]];
    Xselect = [Xvalues[idx]];
    newChartInstance.data.datasets[0].data = Uselect;
    newChartInstance.data.datasets[1].data = Rselect;
    newChartInstance.data.labels = Xselect;
    newChartInstance.update();

    // For unfinished dot feature:
    // dotVar = dots();
  }

  // Changes display to next data slide
  // Calls updateChart()
  function scrollChartR() {
    if (typeof newChartInstance === 'undefined') {
      return;
    }
    // Check if max index, handle and return if true
    if (idx === 10 && newChartInstance.data != null) {
      idx = 0;
      Uselect = Udata[idx];
      Rselect = Rdata[idx];
      Xselect = [Xvalues[idx]];
      updateChart();
      return;
    }
    // For all other indices:
    idx += 1;
    Uselect = [Udata[idx]];
    Rselect = [Rdata[idx]];
    Xselect = [Xvalues[idx]];
    updateChart();
  }

  // Changes display to previous data slide
  // Calls updateChart()
  function scrollChartL() {
    if (typeof newChartInstance === 'undefined') {
      return;
    }
    // Check if min index, handle and return if true
    if (idx === 0 && newChartInstance.data != null) {
      idx = 10;
      Uselect = [Udata[idx]];
      Rselect = [Rdata[idx]];
      Xselect = [Xvalues[idx]];
      updateChart();
      return;
    }
    // For all other indices:
    idx -= 1;
    Uselect = [Udata[idx]];
    Rselect = [Rdata[idx]];
    Xselect = [Xvalues[idx]];
    updateChart();
  }

  // debrisData stores the result of a GET call from the data table, setDebrisData sets the value of debrisData
  const [urbanData, setUrbanData] = useState(false);
  const [ruralData, setRuralData] = useState(false);
  useEffect(() => { getDebrisDataByBeach(); }, []);

  // GET call to display updated version of data table
  function getDebrisDataByBeach() {
    fetch(`/urban`)
      .then(response => response.json())
      .then(data => { setUrbanData(data); });
    fetch(`/rural`)
      .then(response => response.json())
      .then(data => { setRuralData(data); });
  }

  // Update values with data from debris categories
  if (urbanData) {
    let i = 0;
    while (urbanData[i]) {
      Udata[0] += urbanData[i].total_fragmented_plastic;
      Udata[1] += urbanData[i].total_plastic_products;
      Udata[2] += urbanData[i].total_food_wrappers;
      Udata[3] += urbanData[i].total_styrofoam;
      Udata[4] += urbanData[i].total_cigarette_butts;
      Udata[5] += urbanData[i].total_paper_and_treated_wood;
      Udata[6] += urbanData[i].total_metal;
      Udata[7] += urbanData[i].total_glass;
      Udata[8] += urbanData[i].total_fabric;
      Udata[9] += urbanData[i].total_rubber;
      Udata[10] += urbanData[i].total_other;
      i++;
    }

    if (ruralData) {
      let i = 0;
      while (ruralData[i]) {
        Rdata[0] += ruralData[i].total_fragmented_plastic;
        Rdata[1] += ruralData[i].total_plastic_products;
        Rdata[2] += ruralData[i].total_food_wrappers;
        Rdata[3] += ruralData[i].total_styrofoam;
        Rdata[4] += ruralData[i].total_cigarette_butts;
        Rdata[5] += ruralData[i].total_paper_and_treated_wood;
        Rdata[6] += ruralData[i].total_metal;
        Rdata[7] += ruralData[i].total_glass;
        Rdata[9] += ruralData[i].total_rubber;
        Rdata[10] += ruralData[i].total_other;
        i++;
      }
    }
    updateChart();
    newChartInstance.update();
  }

  // Settings for the chart
  const chartConfig = {
    type: 'bar',
    data: {
      labels: Xselect,
      datasets: [{
        label: 'Urban',
        backgroundColor: 'orange',
        data: Uselect
      },
      {
        label: 'Rural',
        backgroundColor: 'royalblue',
        data: Rselect
      }
      ]
    },
    options: {
      plugins: {
        legend: {
          onClick: null
        },
        tooltips: {
          enabled: false
        }
      }
    },
    height: 400,
    width: 600
  };

  // Creates an array of the debris data
  // Returns array, not currently used, useful for verifying data
  // Add {dataToArray} to rendered HTML to verify data when debugging
  function dataToArray() {
    let debrisDataArray = []
    if (urbanData) {
      for (var i = 0; i < urbanData.length; i++) {
        debrisDataArray[i] = [
          urbanData[i].type,
          urbanData[i].total_fragmented_plastic,
          urbanData[i].total_plastic_products,
          urbanData[i].total_food_wrappers,
          urbanData[i].total_styrofoam,
          urbanData[i].total_cigarette_butts,
          urbanData[i].total_paper_and_treated_wood,
          urbanData[i].total_metal,
          urbanData[i].total_glass,
          urbanData[i].total_fabric,
          urbanData[i].total_rubber,
          urbanData[i].total_other,
        ]
        debrisDataArray[i] = debrisDataArray[i].map((row) =>
          row = row + " "
        );
      }
      debrisDataArray = debrisDataArray.map((row) =>
        <li>{row}</li>
      );
      return debrisDataArray;
    }
  }

  return (
    <div>
      <h4>Urban vs Rural Beaches: </h4>
      <i class="text-secondary">Total amount of each type of debris in all urban vs. all rural beaches.</i>
      <div class="bar-chart">
        <div class="row">
          <canvas ref={chartContainer} />
        </div>
        <div class="row" style={{ marginLeft:'2%' }}>
          {/* Buttons to navigate to next slide */}
          <center>
            <Button
              variant="light"
              onClick={scrollChartL}
            >
              <ArrowLeft size={20}></ArrowLeft>
            </Button>
            <Button
              variant="light"
              onClick={scrollChartR}
            >
              <ArrowRight size={20}></ArrowRight>
            </Button>

          </center>

        </div>
      </div>
    </div>

  );
}

export default OneColumn;