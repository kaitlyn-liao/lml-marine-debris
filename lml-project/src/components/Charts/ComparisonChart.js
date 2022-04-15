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

  /*function dataToArray(){
    let uDataArray = []
    if(urbanData){
      for(var i=0; i < urbanData.length; i++){
        uDataArray[i] = [
          urbanData[i].entry_id, 
          urbanData[i].beach, 
          urbanData[i].type, 
          urbanData[i].season,
          urbanData[i].date, 
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
          urbanData[i].total_debris,
          urbanData[i].total_debris_divby_m_sq, 
          urbanData[i].notes
        ]
        uDataArray[i] = uDataArray[i].map((row) => 
          row = row + " "
        );
      }
      uDataArray = uDataArray.map((row) => 
        <li>{row}</li>
      );
      return debrisDataArray;
    }

    if(ruralData){
        for(var i=0; i < ruralData.length; i++){
          debrisDataArray[i] = [
            ruralData[i].entry_id, 
            ruralData[i].beach, 
            ruralData[i].type, 
            ruralData[i].season,
            ruralData[i].date, 
            ruralData[i].total_fragmented_plastic, 
            ruralData[i].total_plastic_products, 
            ruralData[i].total_food_wrappers,
            ruralData[i].total_styrofoam, 
            ruralData[i].total_cigarette_butts, 
            ruralData[i].total_paper_and_treated_wood, 
            ruralData[i].total_metal,
            ruralData[i].total_glass, 
            ruralData[i].total_fabric, 
            ruralData[i].total_rubber, 
            ruralData[i].total_other,
            ruralData[i].total_debris,
            ruralData[i].total_debris_divby_m_sq, 
            ruralData[i].notes
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
  }*/
  
    if(urbanData){
        for(var i=0; i < Xvalues.length; i++){
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
    }


    if(ruralData){
        for(var i=0; i < Xvalues.length; i++){
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
            backgroundColor: 'orange', 
            data: Udata 
          },
          { 
            backgroundColor: 'royalblue', 
            data: Rdata 
          }
        ]
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
  console.log("after config " + Udata);


  return (
    <div>
        <h4>Urban vs Rural Beaches: </h4>
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
/*
// Object with functions to update chart
class ComparisonChart extends React.Component{
    // Initialize state
    state = {
        urbanOption: null,
        ruralOption: null,
      };
      // Update the chart with correct data after urban, rural values are set
      updateChart = () => {
        var newDataP = [dataP[urban], dataP[rural]];
        var newDataC = [dataC[urban], dataC[rural]];
        var newDataSf = [dataSf[urban], dataSf[rural]];
        var newLabels = [beaches[urban], beaches[rural]]
        newChartInstance.data.datasets[0].data = newDataP;
        newChartInstance.data.datasets[1].data = newDataC;
        newChartInstance.data.datasets[2].data = newDataSf;
        newChartInstance.data.labels = newLabels;
      }
      // Update urban value
      setUrban = urbanOption => {
        // Set state with value
        this.setState({ urbanOption });
        console.log(`Option selected:`, urbanOption);
        updateUrban(urbanOption);
        this.updateChart();
        // Update chart after data values are set in updateChart()
        newChartInstance.update();
        
      };
      // Update rural value
      setRural = ruralOption => {
        // Set state with value
        this.setState({ ruralOption });
        console.log(`Option selected:`, ruralOption);
        updateRural(ruralOption);
        this.updateChart();
        // Update chart after data values are set in updateChart()
        newChartInstance.update();
      };
    render(){
        const { urbanOption, ruralOption } = this.state;
  return (
      
    <div>
        <div className="row">
            <div className="col-md-2">
                <h4>Compare </h4>
            </div>
            <div className="col-md-3">
                <Select id='sel' placeholder={ "All Urban" } value={ urbanOption } options={ urbanBeaches } onChange={this.setUrban}/>
            </div>
            <div className="col-md-1">
                <h4> and </h4>
            </div>
            <div className="col-md-3">
                <Select id='sel' placeholder={ "All Rural" } value={ ruralOption } options={ ruralBeaches } onChange={this.setRural}/>
            </div>
            <div className="col-md-7"></div>
        </div>
        <br></br>
        <CompareContainer />
    </div>
  );
}
}
*/
export default ComparisonChart;