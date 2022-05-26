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
let placeholderLong = "Waddell";
let holderTemp = "Waddell";
let holderLong = "Waddell";
let discardPlaceholder = false;
let pinBeach;

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
  let mouseOverMenu = false;
  console.log(newBeach);
  if(document.getElementById("pop").innerHTML){
    var p = document.getElementById("pop").innerHTML;
    console.log("discard: " + discardPlaceholder);
    if(!discardPlaceholder){placeholderLong = p;}
    switch(p){
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

  useEffect(() => {
    const listener = e => {
      console.log("TEST");
      if(document.getElementById("pie-drop") && document.getElementById("pop")){
        if(!mouseOverMenu){
        console.log("TEST2");
        var p = document.getElementById("pop").innerHTML;
        switch(p){
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
        console.log("TEST3");
        console.log(p);
        for(var i = 0; i < beachList.length; i++){
          if(p === beachList[i].label){
            setBeach(beachList[i]);
            console.log("HMMM");
          }
        }
      }
        
      }
    };
    window.addEventListener("click", listener);
    

    /*return () => {
      window.removeEventListener("click", listener);
    };*/
  }, []);

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

 /*function setDiv(){
    document.getElementById("pie-drop").innerHTML = document.getElementById("pie-drop").innerHTML;
  }*/

  function setBeach(newBeach) {
    getDebrisDataByBeach(newBeach.label);
    if(document.getElementById("pie-drop") && document.getElementById("pop")
    && document.getElementById("pie-drop").innerHTML != document.getElementById("pop").innerHTML){
      console.log("NOPE");
      updateChart();
      newChartInstance.update();
    }
    //discardPlaceholder = true;
    console.log(newBeach.label);
    
    if(document.getElementById("pie-drop").innerHTML){
      console.log("inside1: " + newBeach.label);
      console.log("inside2: " + placeholderLong);
      var p = newBeach.label;
      switch(p){
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

  function setMouseOver(bool){
    //mouseOverMenu = bool;
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
      type: 'pie',
      data: {
          labels: Xvalues,
          datasets: [{ 
            backgroundColor: ["#91B77B", "#003D03", "#002839", "#005F73", "#0A9396", "#94D2BD" , "#E9d8A6", "#ECBA53", "#EE9B00", "#CA6702", "#9B2226"],
            data: Xdata 
          }]
      },
      /*options: {
        plugins: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        }
      },*/
      height: 200,
      width: 300
  };
  console.log("after config " + Xdata)


  return (
    <div>
        <div className="row">
            <div className="col-md-2">
                <h4>Beach: </h4>
            </div>
            
            <div className="col-md-6">
            <h4 id="pie-drop" className="text-secondary">{placeholderLong}</h4>
              {/*<Select id="pie-menu" placeholder={placeholderBeach} value={newBeach} options={ beachList } onChange={setBeach}
              onMenuOpen={setMouseOver(true)} onMenuClose={setMouseOver(false)}>*/}
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