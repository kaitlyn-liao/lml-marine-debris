/*
 * This chart displays totals for each debris type as a pie chart.
 * Includes filtering with legend, unlike BarBeachDebris.js
 * Otherwise uses most of the same setup as Bar Chart
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

// Returns configured pie chart with data for each debris type
function PieChart() {
  let newBeach;
  let mouseOverMenu = false;
  if (document.getElementById("pop").innerHTML) {
    var p = document.getElementById("pop").innerHTML;
    if (!discardPlaceholder) { placeholderLong = p; }
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
    placeholderBeach = p;
  }

  // Update titles on click
  // get titles with their id
  useEffect(() => {
    const listener = e => {
      if (document.getElementById("pie-drop") && document.getElementById("pop")) {
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

  // Set labels and initialize data for pie slices
  var Xvalues = ["Fragmented Plastic", 'Plastic Products', 'Food Wrappers', 'Styrofoam', 'Cigarette Butts', 'Paper', 'Metal', 'Glass', 'Fabric', 'Rubber', 'Other']
  var Xdata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


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
    if (document.getElementById("pie-drop") && document.getElementById("pop")
      && document.getElementById("pie-drop").innerHTML != document.getElementById("pop").innerHTML) {
      updateChart();
      newChartInstance.update();
    }

    if (document.getElementById("pie-drop").innerHTML) {
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
      document.getElementById("pie-drop").innerHTML = p;
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
      Xdata[0] += debrisData[i].total_fragmented_plastic;
      Xdata[1] += debrisData[i].total_plastic_products;
      Xdata[2] += debrisData[i].total_food_wrappers;
      Xdata[3] += debrisData[i].total_styrofoam;
      Xdata[4] += debrisData[i].total_cigarette_butts;
      Xdata[5] += debrisData[i].total_paper_and_treated_wood;
      Xdata[6] += debrisData[i].total_metal;
      Xdata[7] += debrisData[i].total_glass;
      Xdata[8] += debrisData[i].total_fabric;
      Xdata[9] += debrisData[i].total_rubber;
      Xdata[10] += debrisData[i].total_other;
      i++;
    }
    updateChart();
    newChartInstance.update();
  }

  // Set chart configuration
  const chartConfig = {
    type: 'pie',
    data: {
      labels: Xvalues,
      datasets: [{
        backgroundColor: ["#91B77B", "#003D03", "#002839", "#005F73", "#0A9396", "#94D2BD", "#E9d8A6", "#ECBA53", "#EE9B00", "#CA6702", "#9B2226"],
        data: Xdata
      }]
    },
    // Different from BarBeachDebris.js configuration
    // No specified legend options (uses default settings)
    // This makes legend visible and data filterable by user
    height: 200,
    width: 300
  };


  return (
    <div>
      <h4 id="pie-drop" className="text-secondary">{placeholderLong}</h4>
      <div class="bar-chart">
        <canvas ref={chartContainer} />
      </div>
    </div>

  );
}

export default PieChart;