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
    type: 'bar',
    data: {
        labels: ['Waddell', 'Natural Bridges', 'Main', 'Zmudowski', 'Marina', 'Del Monte'],
        datasets: [{
            label: "Plastic",
            backgroundColor: 'rgba(30, 225, 0, 0.2)',
            borderColor: 'rgba(30, 225, 0, 1)',
            borderWidth: 1,
            data: [3,7,4, 5, 12, 1]
        },
        {
            label: "Cigarettes",
            backgroundColor: 'rgba(255, 155, 0, 0.2)',
            borderColor: 'rgba(255, 155, 0, 1)',
            borderWidth: 1,
            data: [4,3,5, 8, 4, 3]
        },
        {
            label: "Cardboard",
            backgroundColor: 'rgba(200, 0, 255, 0.2)',
            borderColor: 'rgba(200, 0, 255, 1)',
            borderWidth: 1,
            data: [7,2,6, 5, 5, 5]
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

const StackedChart = () => {

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

export default StackedChart;