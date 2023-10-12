import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function DoubleLineForm() {
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
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          // Tooltip Element
          let tooltipEl = document.getElementById("chartjs-tooltip");
          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.innerHTML = "<table></table>";
            document.body.appendChild(tooltipEl);
          }
          // Hide if no tooltip
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }
          // Set caret Position
          tooltipEl.classList.remove("above", "below", "no-transform");
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
            tooltipEl.classList.add("no-transform");
          }
          function getBody(bodyItem) {
            return bodyItem.lines;
          }
          // Set Text
          if (tooltipModel.body) {
            const titleLines = tooltipModel.title || [];
            const bodyLines = tooltipModel.body.map(getBody);
            let innerHtml = "<thead>";
            titleLines.forEach(function (title) {
              innerHtml += "<tr><th>" + title + "</th></tr>";
            });
            innerHtml += "</thead><tbody>";
            bodyLines.forEach(function (body, i) {
              const colors = tooltipModel.labelColors[i];
              let style = "background:" + colors.backgroundColor;
              style += "; border-color:" + colors.borderColor;
              style += "; border-width: 2px";
              const span = '<span style="' + style + '">' + body + "</span>";
              innerHtml += "<tr><td>" + span + "</td></tr>";
            });
            innerHtml += "</tbody>";
            let tableRoot = tooltipEl.querySelector("table");
            tableRoot.innerHTML = innerHtml;
          }
          const position = context.chart.canvas.getBoundingClientRect();
          // const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);
          // Display, position, and set styles for font
          tooltipEl.style.opacity = 1;
          tooltipEl.style.position = "absolute";
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + "px";
          // tooltipEl.style.font = bodyFont.string;
          tooltipEl.style.padding =
            tooltipModel.padding + "px " + tooltipModel.padding + "px";
          tooltipEl.style.pointerEvents = "none";
        },
      },
    },
    scales: {
      y: {
        display: true,
        position: "left",
        ticks: {
          maxTicksLimit: 5,
        },
      },
      y1: {
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          maxTicksLimit: 5,
        },
      },
    },
  };

  const data = {
    labels: ["저층", "중층", "고층"],
    datasets: [
      {
        type: "line",
        label: "최고가",
        borderColor: "#FF5959",
        backgroundColor: "#FF5959",
        pointRadius: 5,
        pointHoverRadius: 5,
        data: [26.8, 29, 30],
        yAxisID: "y",
      },
      {
        type: "line",
        label: "최저가",
        borderColor: "#417BE6",
        backgroundColor: "#417BE6",
        pointRadius: 5,
        pointHoverRadius: 5,
        data: [25.2, 28.5, 29],
        yAxisID: "y",
      },
      {
        type: "bar",
        label: "거래량",
        backgroundColor: "#DEDFE5",
        hoverBackgroundColor: "#ACACB4",
        borderRadius: 15,
        data: [16, 18, 36],
        yAxisID: "y1",
      },
    ],
  };
  return <Chart options={options} data={data} plugins={[hoverLine]} />;
}
