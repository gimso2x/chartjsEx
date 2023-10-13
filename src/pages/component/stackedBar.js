import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function StackedBarForm() {
  const [pattern, setPattern] = useState();
  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        stacked: true,
      },
      y: {
        border: {
          display: false,
        },
        // stacked: true,
      },
    },
  };

  const labels = ["23.01", "23.02", "23.03", "23.04", "23.05", "23.06"];

  const datalabel = {
    id: "dataLabel",
    afterDatasetsDraw(chart, args, plugins) {
      const {
        ctx,
        scales: { y },
      } = chart;
      const datasetMeta0 = chart.getDatasetMeta(0);
      const datasetMeta1 = chart.getDatasetMeta(1);

      datasetMeta0.data.forEach((dataPoint, index) => {
        let y0 = datasetMeta0.data[index].y;
        let y1 = datasetMeta1.data[index].y;
        if (y0 > 0 || y1 > 0) {
          y0 = datasetMeta0.hidden ? 1000 : y0;
          y1 = datasetMeta1.hidden ? 1000 : y1;
          ctx.save();
          ctx.fillStyle = "#4D4C61";
          ctx.textAlign = "center";
          ctx.font = "400 14px Noto Sans KR";

          // ** 단지 **
          ctx.fillText(
            y.getValueForPixel(y1).toFixed(0) + "건",
            dataPoint.x,
            y1 - 8
          );
          // ** 단지 **

          const yValue = y.getValueForPixel(y0).toFixed(0);
          if (+yValue !== 0) {
            ctx.fillStyle = "#fff";
            ctx.font = "700 14px Noto Sans KR";
          }
          ctx.fillText(
            yValue + "건",
            dataPoint.x,
            +yValue === 0 ? y0 - 8 : dataPoint.base - dataPoint.height / 2 + 5
          );
          ctx.restore();
        }
      });
    },
  };

  useEffect(() => {
    let shape = document.createElement("canvas");
    shape.width = 10;
    shape.height = 10;
    let c = shape.getContext("2d");
    c.strokeStyle = "#DEDFE5";
    c.moveTo(11, -1);
    c.lineTo(-1, 11);
    c.moveTo(21, 9);
    c.lineTo(9, 21);
    c.stroke();
    setPattern(c.createPattern(shape, "repeat"));
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "30평대",
        data: [0, 5, 1, 2, 0, 0],
        backgroundColor: "#FF951A",
      },
      {
        label: "단지",
        data: [4, 11, 13, 7, 3, 0],
        backgroundColor: pattern,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#DEDFE5",
      },
    ],
  };
  return <Bar options={options} data={data} plugins={[datalabel]} />;
}
