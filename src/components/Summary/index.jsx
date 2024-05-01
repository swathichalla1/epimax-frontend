import React from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip } from 'chart.js';
import './index.css'

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Title,
  Tooltip
);

const Summary = () => {

  const {start,inprogress,end} = useParams();

  const labels = ["All Tasks"];


const options = {
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "black" // Change legend label color to black
      }
    },
    title: {
      display: true,
      text: "Task Summary"
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Number of Tasks"
      },
      ticks: {
        stepSize: 1,
        min:1,
        max:10
      }
    }
  }
};

const data = {
  labels: labels,
  datasets: [
    {
      label: "Start",
      data: [start],
      backgroundColor: ["pink"]
    },
    {
      label: "In progress",
      data: [inprogress],
      backgroundColor: ["grey"]
    },
    {
      label: "End",
      data: [end],
      backgroundColor: ["green"]
    },
  ],
};

  return (
    <div className="tasksummary">
    <h1>Task summary</h1>
      <Bar options={options} data={data} />
    </div>
  );
};





export default Summary;
