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

// The indices of selected urban and rural data
let urban = 0;
let rural = 9;

// This will store the chart to be updated
let newChartInstance;
let debrisDataArray = []

// Dummy data
let beaches = ['All Urban', 'Seabright', 'Del Monte', 'Marina',
    'Natural Bridges', 'Seaside', 'Capitola', 'Live Oak', 'Main',
    'All Rural', 'Waddell', 'Sunset', 'N. Zmudowski', 'S. Zmudowski'];
let dataP = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let dataC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let dataSf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Set the displayed urban beach
function updateUrban(val){
    if (val["value"] != null){
        urban = val["value"];
    }
    console.log(urban);
    
}

// Set the displayed rural beach
function updateRural(val){
    if (val["value"] != null){
        rural = val["value"];
    }
    console.log(rural);
}

// Urban options
const urbanBeaches = [
    { label: "All Urban", value: 0 },
    { label: "Seabright", value: 1 },
    { label: "Del Monte", value: 2 },
    { label: "Marina", value: 3 },
    { label: "Natural Bridges", value: 4 },
    { label: "Seaside", value: 5 },
    { label: "Capitola", value: 6 },
    { label: "Live Oak", value: 7 },
    { label: "Main", value: 8 },
  ];

// Rural options
const ruralBeaches = [
    { label: "All Rural", value: 9 },
    { label: "Waddell", value: 10 },
    { label: "Sunset", value: 11 },
    { label: "N. Zmudowski", value: 12 },
    { label: "S. Zmudowski", value: 13 },
  ];

// Chart settings
const chartConfig = {
    type: 'bar',
    data: {
        labels: [beaches[urban], beaches[rural]],
        datasets: [{
            label: "Plastic Products",
            backgroundColor: 'rgba(30, 225, 0, 1)',
            borderWidth: 1,
            data: [dataP[urban], dataP[rural]],
        },
        {
            label: "Cigarettes",
            backgroundColor: 'rgba(255, 182, 0, 1)',
            borderWidth: 1,
            data: [dataC[urban], dataC[rural]],
        },
        {
            label: "Styrofoam",
            backgroundColor: 'rgba(200, 0, 255, 1)',
            borderWidth: 1,
            data: [dataSf[urban], dataSf[rural]],
        },
        ]

    },
    options: {
        plugins: {
          title: {
            display: true,
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },
    height: 400,
    width: 600
  };

// The comment below is from a different approach, which might be useful.
// This approach uses the Dropdown library, so instal and import that if needed.

/*function setUrban(beach){
    urban = beach;
    console.log(urban);
    if (document.getElementById("urban-menu") != null){
        document.getElementById("urban-menu").render();
    }
    
}

function setRural(beach){
    rural = beach;
}*/

/*class UrbanMenu extends React.Component{
    constructor(props){
        super(props)
         
        // Set initial state
        this.state = {beach: ""}
        this.handleClick = this.handleClick.bind(this)
         
        // Binding this keyword
        // this.handleClick = this.handleClick.bind(this)
      }
    
    handleClick(newBeach){
        this.setState({beach : newBeach});
    }

    renderBeach(b){
        this.setState({beach: b});
        console.log(this.state.beach);
    }
    render(){
        return (
            <Dropdown>
        <Dropdown.Toggle id="urban-dropdown" variant="secondary">
        {this.state.beach}
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
        
        
        <Dropdown.Item onClick={() => this.renderBeach({beach: 'Natural Bridges'})}>Natural Bridges</Dropdown.Item>
        <Dropdown.Item onSelect={() => this.renderBeach({beach: 'Main'})}>Main</Dropdown.Item>
        <Dropdown.Item onSelect={() => this.renderBeach({beach: 'Seabright'})}>Seabright</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onSelect={() => this.renderBeach({beach: 'All Urban'})} active>All Urban</Dropdown.Item>
       
        </Dropdown.Menu>
    </Dropdown>
        );
    }
}*/

// Back to the method that I actually used

// Container for the chart
const CompareContainer = () => {
    function getDebrisData() {
        fetch('http://localhost:3001/')
        .then(response => response.json())
        .then(data => { setDebrisData(data);});
    }
    const [debrisData, setDebrisData] = useState(false);
    useEffect(() => { getDebrisData(); }, []);
    function dataToArray(){
        if(debrisData){
            let j = 0;
            let newDataP = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let newDataC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let newDataSf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for(var i=0; i < /*15*/ debrisData.length; i++){
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
            if (debrisData[i].type === 'U'){
                console.log("Urban found");
                j = 0;
                newDataP[j] += debrisData[i].total_plastic_products;
                newDataC[j] += debrisData[i].total_cigarette_butts;
                newDataSf[j] += debrisData[i].total_styrofoam;
                console.log(newDataP[0]);
                switch (debrisData[i].beach) {
                    case 'Seabright':
                    case 'Seabright Beach':
                        j = 1;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    case 'Del Monte':
                    case 'Del Monte Beach':
                        j = 2;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    case 'Marina':
                    case 'Marina Beach':
                        j = 3;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    case 'Natural Bridges':
                    case 'Natural Bridges Beach':
                    case 'Natural Bridges State Beach':
                        j = 4;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    case 'Seaside':
                    case 'Seaside Beach':
                        j = 5;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    case 'Capitola':
                    case 'Capitola Beach':
                        j = 6;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    case 'Live Oak':
                    case 'Live Oak Beach':
                        j = 7;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    case 'Main Beach':
                    case 'Main':
                        j = 8;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    default:
                }
            }
            else if (debrisData[i].type === 'R'){
                console.log("Rural found");
                j = 9;
                newDataP[j] += debrisData[i].total_plastic_products;
                newDataC[j] += debrisData[i].total_cigarette_butts;
                newDataSf[j] += debrisData[i].total_styrofoam;
                console.log(newDataP[8]);
                switch (debrisData[i].beach) {
                    case 'Waddell':
                    case 'Waddell Beach':
                    case 'Waddell Creek':
                    case 'Waddell Creek Beach':
                        j = 10;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    case 'Sunset':
                    case 'Sunset Beach':
                        j = 11;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    case 'N. Zmudowski':
                    case 'North Zmudowski':
                    case 'N Zmudowski':
                    case 'Zmudowski N':
                    case 'Zmudowski N.':
                    case 'Zmudowski North':
                        j = 12;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                       break;
                    case 'S. Zmudowski':
                    case 'South Zmudowski':
                    case 'S Zmudowski':
                    case 'Zmudowski S':
                    case 'Zmudowski S.':
                    case 'Zmudowski South':
                        j = 13;
                        newDataP[j] += debrisData[i].total_plastic_products;
                        newDataC[j] += debrisData[i].total_cigarette_butts;
                        newDataSf[j] += debrisData[i].total_styrofoam;
                        break;
                    default:
                }
            }
            debrisDataArray[i] = debrisDataArray[i].map((row) => 
              row = row + " "
            );
          }
          dataP = newDataP;
          dataC = newDataC;
          dataSf = newDataSf;
          debrisDataArray = debrisDataArray.map((row) => 
            <li>{row}</li>
          );
          return debrisDataArray;
        }
      }  
    // Set up the chart instance
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    // Search for the chart container and add event listener for option select
    const cc = document.getElementById('cc');
    if(cc != null){
        cc.addEventListener('change', updateChart);
    }
    // Update the chart
    function updateChart(){
        newChartInstance.update();
    }

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            newChartInstance = new Chart(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    // Display chart
    return (
        <div class="bar-chart">
            <canvas id='cc' ref={chartContainer} />
            {!debrisData ? 'There is no debrisData available' : 
        <ol>
          {dataToArray()}
        </ol>
      }
        </div>
    );
}

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
      /*<div>
          <h3>Compare </h3>
        <select name="urban" id="urban">
            <option value="3">All Urban</option>
            <option value="0" onChange={updateUrban(0)}>Natural Bridges</option>
            <option value="1">Main</option>
            <option value="2">Seabright</option>
        </select>
  <h3> and </h3>
  <select name="rural" id="rural">
            <option value="7">All Rural</option>
            <option value="4">Waddell</option>
            <option value="5">Sunset</option>
            <option value="6">Zmudowski</option>
        </select>
    <div class="bar-chart">
      <canvas ref={chartContainer} />
    </div>
      </div>*/
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

export default ComparisonChart;