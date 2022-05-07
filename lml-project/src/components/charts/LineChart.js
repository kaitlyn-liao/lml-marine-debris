import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import { Bar, Pie, Line } from "react-chartjs-2"
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

function LineChart() {
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
    newChartInstance.data.labels = Xvalues;
  }

  var Xvalues = [];
  var Xdata = [];

  // debrisData stores the result of a GET call from the data table, setDebrisData sets the value of debrisData
  const [debrisData, setDebrisData] = useState(false);
  useEffect(() => { getDebrisDataByBeach(placeholderBeach); }, []);

  // GET call to display updated version of data table
  function getDebrisDataByBeach(beach) {
    fetch(`http://localhost:3001/beach/${beach}`)
      .then(response => response.json())
      .then(data => { setDebrisData(data);});
  }

  function setBeach(newBeach) {
    console.log(newBeach.label);
    getDebrisDataByBeach(newBeach.label);
    updateChart();
    newChartInstance.update();
  }

  function formatDate(date) {
    console.log("in format date:");
    console.log(date);
    const dateNums = date.split("-");
    if(!dateNums){return;}
    let month;
    const dayNum = dateNums[2].split('T');
    let day = dayNum[0];
    if(day && day.charAt(0) === '0'){
        day = day.substring(1);
    }
    switch (dateNums[1]){
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
            console.log("month unspecified");
    }
    return month.concat(' ', day, ', ', dateNums[0]);
  }

  if(debrisData){
    let i = 0;
    while(debrisData[i]){
      /*Xdata[0] += debrisData[i].total_fragmented_plastic;
      Xdata[1] += debrisData[i].total_plastic_products;
      Xdata[2] += debrisData[i].total_food_wrappers;
      Xdata[3] += debrisData[i].total_styrofoam;
      Xdata[4] += debrisData[i].total_cigarette_butts;
      Xdata[5] += debrisData[i].total_paper_and_treated_wood;
      Xdata[6] += debrisData[i].total_metal;
      Xdata[7] += debrisData[i].total_glass;
      Xdata[8] += debrisData[i].total_fabric;
      Xdata[9] += debrisData[i].total_rubber;
      Xdata[10] += debrisData[i].total_other;*/
      Xdata[i] = debrisData[i].total_debris;
      Xvalues[i] = formatDate(debrisData[i].date);
      i++;
    }
    console.log(Xdata)
    updateChart();
    newChartInstance.update();
  }
  
  const chartConfig = {
      type: 'line',
      data: {
          labels: Xvalues,
          datasets: [{ 
            backgroundColor: 'rgba(255, 99, 132, 1)', 
            borderColor: 'rgba(255, 99, 132, 1)',
            data: Xdata ,
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
  console.log("after config " + Xdata);


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
        </div>
    </div>

  );
}

export default LineChart;