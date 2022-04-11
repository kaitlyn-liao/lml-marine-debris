import React, { useEffect, useRef, useState } from 'react'
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

function BarChart() {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  var Xvalues = ["Fragmented Plastic", 'Plastic Products', 'Food Wrappers', 'Styrofoam', 'Cigarette Butts', 'Paper', 'Metal', 'Glass', 'Fabric', 'Rubber', 'Other']
  var Xdata = []

  // debrisData stores the result of a GET call from the data table, setDebrisData sets the value of debrisData
  const [debrisData, setDebrisData] = useState(false);
  useEffect(() => { getDebrisDataByBeach(); }, []);

  // GET call to display updated version of data table
  function getDebrisDataByBeach() {
    fetch(`http://localhost:3001/${"Sunset"}`)
      .then(response => response.json())
      .then(data => { setDebrisData(data);});
  }
  
  if(debrisData){
    for(var i=0; i < Xvalues.length; i++){
      Xdata[i] = [
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
      ] 
    }
  }

  const chartConfig = {
    type: 'bar',
    data: {
        labels: Xvalues,
        datasets: [{ 
          label: "Name of Beach", 
          backgroundColor: 'rgba(255, 99, 132, 1)', 
          data: Xdata 
        },
    ]
    },
    height: 400,
    width: 600
  };

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


  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
        <div class="bar-chart">
          <canvas ref={chartContainer} />
          {!debrisData ? 'There is no debrisData available' : 
            <ol>
              {dataToArray()}
            </ol>
          }
        </div>
    </div>

  );
}

export default BarChart;