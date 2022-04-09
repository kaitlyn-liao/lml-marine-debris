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
    registerables
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

// get method up here, put into Xdata[]

var Xlabels = ["Fragmented Plastic", 'Plastic Products', 'Food Wrappers', 'Styrofoam', 'Cigarette Butts', 'Paper', 'Metal', 'Glass', 'Fabric', 'Rubber', 'Other']
var Xcolors = ['rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)', 
               'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)']
var Xdata = [[3],[1],[4],[9],[11],[2],[3],[7],[1],[2],[3],[6],[10] ]
var Xaxis = []

for(var x = 0; x < Xlabels.length; x++){
  Xaxis[x] = { label: Xlabels[x], backgroundColor: Xcolors[x], data: Xdata[x] }
}

const chartConfig = {
    type: 'bar',
    data: {
        labels: ["Beach Name"],
        datasets: Xaxis
    },
    height: 400,
    width: 600
  };

const BarChart = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div class="bar-chart">
      <canvas ref={chartContainer} />
    </div>
  );
}

export default BarChart;