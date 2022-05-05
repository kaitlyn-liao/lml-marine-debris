/*
 * This is a demo of filtering charts with dropdown menus (Select).
 * Run "npm install react-select"
 * 
 * SOURCES
 * react-select: https://appdividend.com/2018/10/19/react-dropdown-select-example-tutorial/
 * options example: https://www.codegrepper.com/code-examples/javascript/react+select+onchange
 * update chart tutorial: https://www.youtube.com/watch?v=_wnaQ-oR9YE
 * 
 */
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { Bar, Pie } from "react-chartjs-2"
import Select from 'react-select';
import { usePapaParse } from 'react-papaparse';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    registerables
} from 'chart.js';


Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    ...registerables
);

let newChartInstance;

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

function ComparisonChart() {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  function updateChart(){
    newChartInstance.data.datasets[0].data = Udata;
    newChartInstance.data.datasets[1].data = Rdata;
  }

  var Xvalues = ["Fragmented Plastic", 'Plastic Products', 'Food Wrappers', 'Styrofoam', 'Cigarette Butts', 'Paper', 'Metal', 'Glass', 'Fabric', 'Rubber', 'Other']
  var Udata = [0,0,0,0,0,0,0,0,0,0,0]
  var Rdata = [0,0,0,0,0,0,0,0,0,0,0]

  // debrisData stores the result of a GET call from the data table, setDebrisData sets the value of debrisData
  const [urbanData, setUrbanData] = useState(false);
  const [ruralData, setRuralData] = useState(false);
  useEffect(() => { getDebrisDataByBeach(); }, []);

  // GET call to display updated version of data table
  function getDebrisDataByBeach() {
    fetch(`http://localhost:3001/urban`)
      .then(response => response.json())
      .then(data => { setUrbanData(data);});
    fetch(`http://localhost:3001/rural`)
      .then(response => response.json())
      .then(data => { setRuralData(data);});
  }
  
  if(urbanData){
    let i = 0;
    while(urbanData[i]){
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

  if(ruralData){
    let i = 0;
    while(ruralData[i]){
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
  
  const chartConfig = {
      type: 'bar',
      data: {
          labels: Xvalues,
          datasets: [{ 
            label: 'Urban',
            backgroundColor: 'orange', 
            data: Udata
          },
          { 
            label: 'Rural',
            backgroundColor: 'royalblue', 
            data: Rdata
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
  console.log("after config " + Udata);

  function dataToArray(){
    let debrisDataArray = []
    if(urbanData){
      for(var i=0; i < urbanData.length; i++){
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
        <div class="bar-chart">
          <canvas ref={chartContainer} />
        </div>
        {/*!urbanData ? 'There is no debrisData available' : 
            <ol>
              {dataToArray()}
            </ol>
        */} 
    </div>

  );
        }

export default ComparisonChart;
