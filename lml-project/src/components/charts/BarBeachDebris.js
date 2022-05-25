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
let placeholderBeach = "Waddell";

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

function BarChart({selectBeach}) {
  let newBeach;
  console.log(placeholderBeach);
  function setBeach(newBeach) {
    console.log(newBeach.label);
    getDebrisDataByBeach(newBeach.label);
    updateChart();
    newChartInstance.update();
  }
  function setPlaceholder(){
  if({selectBeach}){
    switch(selectBeach){
      case '':
        break;
      case 'Sunset State Beach':
        placeholderBeach = 'Sunset';
        break;
      case 'North Zmudowski':
        placeholderBeach = 'N. Zmudowski';
        break;
      case 'South Zmudowski':
        placeholderBeach = 'S. Zmudowski';
        break;
      default:
        placeholderBeach = selectBeach;
    }
  }
  if(newBeach){setBeach();}
}
setPlaceholder();
document.body.addEventListener('click', setPlaceholder, true);
  console.log(placeholderBeach);
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
  useEffect(() => { getDebrisDataByBeach(placeholderBeach); }, []);

  // GET call to display updated version of data table
  function getDebrisDataByBeach(beach) {
    fetch(`http://localhost:3001/beach/${beach}`)
      .then(response => response.json())
      .then(data => { setDebrisData(data);});
  }

  

  if(debrisData){
    let i = 0;
    while(debrisData[i]){
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
    console.log(Xdata)
    updateChart();
    newChartInstance.update();
  }
  
  const chartConfig = {
      type: 'bar',
      data: {
          labels: Xvalues,
          datasets: [{ 
            backgroundColor: ["#91B77B", "#003D03", "#002839", "#005F73", "#0A9396", "#94D2BD" , "#E9d8A6", "#ECBA53", "#EE9B00", "#CA6702", "#9B2226"], 
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
              <Select placeholder={ placeholderBeach } value={ placeholderBeach } options={ beachList } onChange={setBeach}/>
            </div>
          </div>
        <div class="bar-chart">
          <canvas ref={chartContainer} />
        </div>
    </div>

  );
}

export default BarChart;
