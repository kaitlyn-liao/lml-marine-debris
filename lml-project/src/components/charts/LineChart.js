/*
 * This chart displays debris data over time and formats dates from
 * uploaded spreadhseets for better readability.
 * 
 */

// Rendered in Graph.js and renders no children

import React, { useEffect, useRef, useState } from 'react'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
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

// Returns line chart
function LineChart() {
  let newBeach;
  let mouseOverMenu = false;
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

  // Update names in HTML on click
  useEffect(() => {
    const listener = e => {
      if (document.getElementById("line-drop") && document.getElementById("pop")) {
        if (!mouseOverMenu) {
          var p = document.getElementById("pop").innerHTML;
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
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // Initialize chart
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  // Helper function to update data displayed on chart
  function updateChart() {
    newChartInstance.data.datasets[0].data = Xdata;
    newChartInstance.data.labels = Xvalues;
  }

  // Initial data values
  var Xvalues = [];
  var Xdata = [];

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
    // Get new data to display
    getDebrisDataByBeach(newBeach.label);
    // Check for tab title and popup title
    if (document.getElementById("line-drop") && document.getElementById("pop")
      && document.getElementById("line-drop").innerHTML != document.getElementById("pop").innerHTML) {
      // Update chart data
      updateChart();
      newChartInstance.update();
    }
    //discardPlaceholder = true;

    // Changes a few beach display names from their CSV data names to publicly
    // available names
    if (document.getElementById("line-drop").innerHTML) {
      var p = newBeach.label;
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
      // Set title found on tab
      document.getElementById("line-drop").innerHTML = p;
      discardPlaceholder = true;
    }
  }

  /*
   * Converts CSV file's date format to readable format
   * Input: string of format found in CSV data
   * Output: string of proper date format e.g. January 1, 2019
   */
  function formatDate(date) {
    const dateNums = date.split("-");
    if (!dateNums) { return; }
    let month;
    const dayNum = dateNums[2].split('T');
    let day = dayNum[0];
    if (day && day.charAt(0) === '0') {
      day = day.substring(1);
    }
    switch (dateNums[1]) {
      case '01':
        month = "January ";
        break;
      case '02':
        month = "February ";
        break;
      case '03':
        month = "March ";
        break;
      case '04':
        month = "April ";
        break;
      case '05':
        month = "May ";
        break;
      case '06':
        month = "June ";
        break;
      case '07':
        month = "July ";
        break;
      case '08':
        month = "August ";
        break;
      case '09':
        month = "September ";
        break;
      case '10':
        month = "October ";
        break;
      case '11':
        month = "November ";
        break;
      case '12':
        month = "December ";
        break;
      default:
        month = "";
    }
    return month.concat(' ', day, ', ', dateNums[0]);
  }

  // Set data point for date to total debris and X-axis value to formatted date
  if (debrisData) {
    let i = 0;
    while (debrisData[i]) {
      Xdata[i] = debrisData[i].total_debris;
      Xvalues[i] = formatDate(debrisData[i].date);
      i++;
    }
    updateChart();
    newChartInstance.update();
  }

  // Set chart configuration
  const chartConfig = {
    type: 'line',
    data: {
      labels: Xvalues,
      datasets: [{
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: Xdata,
        //lineAtIndex: 2
      }],

    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          enabled: false
        },
        hover: {
          mode: 'index',
          intersect: false
        }
      }
    },

    height: 400,
    width: 600
  };


  return (
    <div>
      <h4 id="line-drop" className="text-secondary">{placeholderLong}</h4>
      <i class="text-secondary">Total amount of debris at {placeholderLong} over time.</i>
      <div class="line-chart">
        <canvas ref={chartContainer} />
      </div>
    </div>

  );
}

export default LineChart;