import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(...registerables);

const innerBarText = {
  id: "innerBarText",
  afterDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      data,
      chartArea: { left },
      scales: { x, y },
    } = chart;
    ctx.save();
    data.datasets.forEach((point, index) => {
      return point.data.forEach((dataPoint) => {
        ctx.font = "bolder 15px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(
          `${data.labels[0]} : ${dataPoint}`,
          left + 10,
          y.getPixelForValue(index) / 2
        );
      });
    });
  },
};

export const options = {
  indexAxis: "y",
  responsive: true,
  showLine: false,
  scales: {
    x: {
      max: 4000,
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

export const data = {
  labels: ["세대"],
  datasets: [
    {
      label: "단지",
      data: [2350],
      backgroundColor: "#417BE6",
      borderRadius: 15,
    },
    {
      label: "서초구 평균",
      data: [1350],
      backgroundColor: "#DCE7FC",
      borderRadius: 15,
      borderWidth: 1,
      height: 30,
    },
  ],
};

export default function HorizonBar() {
  return <Bar options={options} data={data} plugins={[innerBarText]} />;
}
