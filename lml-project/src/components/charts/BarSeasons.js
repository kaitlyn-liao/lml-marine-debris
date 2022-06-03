/*
 * This chart displays debris for each season. Seasons are defined in uploaded CVS files.
 * 
 */

// Rendered in Graph.js and renders no children

import React, { useEffect, useRef, useState } from 'react'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  registerables,
  UpdateModeEnum
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ...registerables
);

let newChartInstance; // Instance for chart to be updated with every change
let placeholderBeach = "Waddell";
let placeholderLong = "Waddell";
let discardPlaceholder = false;

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

// Returns configured bar chart with data for each season
function BarChart() {
  let newBeach;
  let mouseOverMenu = false;
  // Set values for X and Y axis
  var Xvalues = ["Winter", "Spring", "Summer", "Autum"]
  var Xdata = [0, 0, 0, 0]
  if (document.getElementById("pop").innerHTML) {
    var p = document.getElementById("pop").innerHTML;
    if (!discardPlaceholder) { placeholderLong = p; }
    switch (p) {
      case "Sunset State Beach":
        p = "Sunset";
        break;
      case "South Zmudowski":
        p = "S. Zmudowski";
        break;
      case "North Zmudowski":
        p = "N. Zmudowski";
        break;
      default:
        break;

    }
    placeholderBeach = p;
  }

  // Update titles on click
  useEffect(() => {
    const listener = e => {
      if (document.getElementById("season-drop") && document.getElementById("pop")) {
        if (!mouseOverMenu) {
          var p = document.getElementById("pop").innerHTML;
          // Changes a few beach display names from their CSV data names to publicly
          // available names
          switch (p) {
            case "Sunset State Beach":
              p = "Sunset";
              break;
            case "South Zmudowski":
              p = "S. Zmudowski";
              break;
            case "North Zmudowski":
              p = "N. Zmudowski";
              break;
            default:
              break;

          }
          for (var i = 0; i < beachList.length; i++) {
            if (p === beachList[i].label) {
              setBeach(beachList[i]);
            }
          }
        }

      }
    };
    window.addEventListener("click", listener);
  }, []);

  // Initialize chart instance
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  // Helper function to update data displayed on chart
  function updateChart() {
    newChartInstance.data.datasets[0].data = Xdata;
  }




  // debrisData stores the result of a GET call from the data table, setDebrisData sets the value of debrisData
  const [debrisData, setDebrisData] = useState(false);
  useEffect(() => { getDebrisDataByBeach(placeholderBeach); }, []);

  // GET call to display updated version of data table
  function getDebrisDataByBeach(beach) {
    fetch(`/beach/${beach}`)
      .then(response => response.json())
      .then(data => { setDebrisData(data); });
  }

  // Sets beach displayed by chart and changes title on tab to match popup on map
  function setBeach(newBeach) {
    getDebrisDataByBeach(newBeach.label);
    if (document.getElementById("season-drop") && document.getElementById("pop")
      && document.getElementById("season-drop").innerHTML != document.getElementById("pop").innerHTML) {
      updateChart();
      newChartInstance.update();
    }

    if (document.getElementById("season-drop").innerHTML) {
      var p = newBeach.label;
      // Changes a few beach display names from their CSV data names to publicly
      // available names
      switch (p) {
        case "Sunset":
          p = "Sunset State Beach";
          break;
        case "S. Zmudowski":
          p = "South Zmudowski";
          break;
        case "N. Zmudowski":
          p = "North Zmudowski";
          break;
        default:
          break;

      }
      document.getElementById("season-drop").innerHTML = p;
      discardPlaceholder = true;
    }
  }

  // Creates an array of the debris data
  // Returns array, not currently used, useful for verifying data
  // Add {dataToArray} to rendered HTML to verify data when debugging
  function dataToArray() {
    let debrisDataArray = []
    if (debrisData) {
      for (var i = 0; i < debrisData.length; i++) {
        debrisDataArray[i] = [
          debrisData[i].entry_id,
          debrisData[i].beach,
          debrisData[i].type,
          debrisData[i].season,
          debrisData[i].date,
          debrisData[i].total_fragmented_plastic,
          debrisData[i].total_plastic_products,
          debrisData[i].total_food_wrappers,
          debrisData[i].total_styrofoam,
          debrisData[i].total_cigarette_butts,
          debrisData[i].total_paper_and_treated_wood,
          debrisData[i].total_metal,
          debrisData[i].total_glass,
          debrisData[i].total_fabric,
          debrisData[i].total_rubber,
          debrisData[i].total_other,
          debrisData[i].total_debris,
          debrisData[i].total_debris_divby_m_sq,
          debrisData[i].notes
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

  // Set data category to total debris
  if (debrisData) {
    let i = 0;
    while (debrisData[i]) {
      switch (debrisData[i].season) {
        case "Winter":
          Xdata[0] += debrisData[i].total_debris;
          break;
        case "Spring":
          Xdata[1] += debrisData[i].total_debris;
          break;
        case "Summer":
          Xdata[2] += debrisData[i].total_debris;
          break;
        case "Fall":
          Xdata[3] += debrisData[i].total_debris;
          break;
      }
      i++;
    }
    updateChart();
    newChartInstance.update();
  }

  // Set chart configuration
  const chartConfig = {
    type: 'bar',
    data: {
      labels: Xvalues,
      datasets: [{
        backgroundColor: ['rgba(10, 147, 150, 1)', 'rgba(145, 183, 123, 1)', 'rgba(238, 155, 0, 1)', 'rgba(155, 34, 38, 1)'],
        data: Xdata
      }]
    },
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: "Debris Pieces"
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    },
    height: 400,
    width: 600
  };


  return (
    <div>
      <h4 id="season-drop" className="text-secondary">{placeholderLong}</h4>
      <i class="text-secondary">Total amount of debris per season at {placeholderLong}. </i>
      <div class="season-chart">
        <canvas ref={chartContainer} />
      </div>
    </div>

  );
}

export default BarChart;
