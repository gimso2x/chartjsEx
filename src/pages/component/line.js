import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

const color = ["#41414F", "#AB76EF", "#14BA85", "#EB513C"];

export default function LineForm(second) {
  const hoverLine = {
    id: "hoverLine",
    afterDatasetsDraw(chart, args, plugins) {
      const {
        ctx,
        tooltip,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart;

      if (tooltip._active.length > 0) {
        const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#7A7A89";
        ctx.moveTo(xCoor, top);
        ctx.lineTo(xCoor, bottom);
        ctx.stroke();
        ctx.closePath();
      }
    },
  };

  const options = {
    interaction: {
      intersect: false,
      mode: "index",
    },
    // maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        border: {
          display: false,
        },
        ticks: {
          // stepSize: 15,
          maxTicksLimit: 5,
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

  const data = {
    labels: [
      "20.08",
      "20.12",
      "21.04",
      "21.08",
      "21.12",
      "22.04",
      "22.08",
      "22.12",
      "23.04",
    ],
    datasets: [
      {
        label: "레미안퍼스티지",
        data: [1.2, 3, 4, 5, 10, 50, 23, 15, 23],
        borderColor: color[0],
        pointBackgroundColor: "transparent",
        pointBorderWidth: 5,
        pointRadius: 0,
        pointHoverRadius: 10,
        tension: 0.2,
      },
      {
        label: "동그라미아파트",
        data: [9.2, 2.3, 14, 25, 100, 50, 23, 123, 45],
        borderColor: color[1],
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.2,
      },
      {
        label: "세모아파트",
        data: [123, 52, 2, 3, 4, 5, 1, 15, 27],
        borderColor: color[2],
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.2,
      },
      {
        label: "네모아파트",
        data: [18, 90, 2, 3, 4, 5, 15, 26, 0],
        borderColor: color[3],
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.2,
      },
    ],
  };
  return <Line options={options} data={data} plugins={[hoverLine]} />;
}
