import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

const ChartComponents = {
  Bar,
  Line,
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
);


export default function Chart({ chartType, options, data }) {
    const ChartComponent = ChartComponents[chartType];

    if (!ChartComponent) {
        return <div>Error: Invalid chart type "{chartType}"</div>;
    }

    return (
        <ChartComponent options={options} data={data} />
    );
}