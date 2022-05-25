import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import { Bar, Pie } from "react-chartjs-2"
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

let newChartInstance;
const placeholderBeach = "Waddell";

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

function BarChart() {
  let newBeach;
  console.log(newBeach);
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  function updateChart(){
    newChartInstance.data.datasets[0].data = Xdata;
  }

  var Xvalues = ["Winter", "Spring", "Summer", "Autum"]
  var Xdata  = [0,0,0,0]

  // debrisData stores the result of a GET call from the data table, setDebrisData sets the value of debrisData
  const [debrisData, setDebrisData] = useState(false);
  useEffect(() => { getDebrisDataByBeach(placeholderBeach); }, []);

  // GET call to display updated version of data table
  function getDebrisDataByBeach(beach) {
    fetch(`/beach/${beach}`)
      .then(response => response.json())
      .then(data => { setDebrisData(data);});
  }

  function setBeach(newBeach) {
    console.log(newBeach.label);
    getDebrisDataByBeach(newBeach.label);
    updateChart();
    newChartInstance.update();
  }

  if(debrisData){
    let i = 0;
    while(debrisData[i]){
      switch(debrisData[i].season){
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
    console.log(Xdata)
    updateChart();
    newChartInstance.update();
  }
  
  const chartConfig = {
      type: 'bar',
      data: {
          labels: Xvalues,
          datasets: [{ 
            backgroundColor: ['rgba(100, 240, 255, 1)', 'rgba(100, 255, 0, 1)', 'rgba(255, 230, 100, 1)', 'rgba(255, 100, 100, 1)'], 
            data: Xdata 
          }]
      },
      options: {
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
  console.log("after config " + Xdata)


  return (
    <div>
        <div className="row">
            <div className="col-md-2">
                <h4>Beach: </h4>
            </div>
            <div className="col-md-4">
              <Select placeholder={ "Waddell" } value={ newBeach } options={ beachList } onChange={setBeach}/>
            </div>
          </div>
        <div class="bar-chart">
          <canvas ref={chartContainer} />
           {/* {!debrisData ? 'There is no debrisData available' : 
            <ol>
              {dataToArray()}
            </ol>
          }  */}
        </div>
    </div>

  );
}

export default BarChart;
