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
let placeholderBeach = "Waddell";
let placeholderLong = "Waddell";
let holderTemp = "Waddell";
let holderLong = "Waddell";
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

function LineChart() {
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
      if(document.getElementById("line-drop") && document.getElementById("pop")){
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
    fetch(`/beach/${beach}`)
      .then(response => response.json())
      .then(data => { setDebrisData(data);});
  }

  function setBeach(newBeach) {
    getDebrisDataByBeach(newBeach.label);
    if(document.getElementById("line-drop") && document.getElementById("pop")
    && document.getElementById("line-drop").innerHTML != document.getElementById("pop").innerHTML){
      console.log("NOPE");
      updateChart();
      newChartInstance.update();
    }
    //discardPlaceholder = true;
    console.log(newBeach.label);
    
    if(document.getElementById("line-drop").innerHTML){
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
      document.getElementById("line-drop").innerHTML = p;
      discardPlaceholder = true;
    }
  }

  function formatDate(date) {
    // console.log("in format date:");
    console.log("date: " + date);
    const dateNums = date.split("-");
    if(!dateNums){return;}
    let month;
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
            // console.log("month unspecified");
    }
    return month.concat(' ', day, ', ', dateNums[0]);
  }

  if(debrisData){
    let i = 0;
    while(debrisData[i]){
      Xdata[i] = debrisData[i].total_debris;
      Xvalues[i] = formatDate(debrisData[i].date);
      //Xvalues[i] = debrisData[i].date;
      i++;
    }
    // console.log(Xdata)
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
            
            <div className="col-md-6">
            <h4 id="line-drop" className="text-secondary">{placeholderLong}</h4>
              {/*<Select id="pie-menu" placeholder={placeholderBeach} value={newBeach} options={ beachList } onChange={setBeach}
              onMenuOpen={setMouseOver(true)} onMenuClose={setMouseOver(false)}>*/}
            </div>
          </div>
          <i class="text-secondary">This data includes all debris types.</i>
        <div class="line-chart">
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

export default LineChart;