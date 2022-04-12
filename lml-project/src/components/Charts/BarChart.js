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
let beach = "Waddell";

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

  var Xvalues = ["Fragmented Plastic", 'Plastic Products', 'Food Wrappers', 'Styrofoam', 'Cigarette Butts', 'Paper', 'Metal', 'Glass', 'Fabric', 'Rubber', 'Other']
  var Xdata = [0,0,0,0,0,0,0,0,0,0,0]

  // debrisData stores the result of a GET call from the data table, setDebrisData sets the value of debrisData
  const [debrisData, setDebrisData] = useState(false);
  useEffect(() => { getDebrisDataByBeach(); }, []);

  // GET call to display updated version of data table
  function getDebrisDataByBeach() {
    fetch(`http://localhost:3001/beach/${beach}`)
      .then(response => response.json())
      .then(data => { setDebrisData(data);});
  }

  function setBeach(newBeach) {
    beach = newBeach.label;
    console.log(beach);
    getDebrisDataByBeach();
    updateChart();
    newChartInstance.update();
  }

  function dataToArray(){
    let debrisDataArray = []
    if(debrisData){
      for(var i=0; i < debrisData.length; i++){
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
  
  if(debrisData){
    for(var i=0; i < Xvalues.length; i++){
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
            label: "Name of Beach", 
            backgroundColor: 'rgba(255, 99, 132, 1)', 
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