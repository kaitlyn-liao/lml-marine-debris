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

const chartConfig = {
    type: 'pie',
    data: {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                
            ],
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Waddell',
            'Main',
            'Natrual Bridges'
        ]
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
    <div class="pie-chart">
      <canvas ref={chartContainer} />
    </div>
  );
}

export default BarChart;