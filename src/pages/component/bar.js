import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export const options = {
  interaction: {
    intersect: false,
    mode: "index",
  },
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
        showLine: false,
        beginAtZero: true,
        stepSize: 20,
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
};

export const data = {
  labels: ["20평 미만", "20평대", "30평대", "40평대", "50평대", "60평이상"],
  datasets: [
    {
      label: "단지",
      data: [10, 70, 50, 80, 45, 60],
      backgroundColor: "rgba(20, 186, 133, 0.7)",
      borderRadius: 6,
    },
    {
      label: "서초구 평균",
      data: [23, 72, 41, 80, 42, 70],
      backgroundColor: "rgba(65, 123, 230, 0.7)",
      borderRadius: 6,
    },
  ],
};
let hoverValue;
const hoverSegment = {
  id: "hoverSegment",
  beforeDatasetsDraw(chart, args, plugins) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;
    ctx.save();
    const segment = width / (x.max + 1);
    if (hoverValue !== undefined) {
      ctx.fillStyle = "rgba(222, 223, 229, 0.7)";
      ctx.strokeStyle = "#92929C";
      ctx.setLineDash([4, 2]);
      ctx.beginPath();
      ctx.roundRect(
        x.getPixelForValue(hoverValue) - segment / 2,
        top,
        segment,
        height,
        [15, 15, 0, 0]
      );
      ctx.fill();
      ctx.stroke();
    }
  },
  afterEvent(chart, args, plugins) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;

    // console.log(args.event.x);

    if (args.inChartArea) {
      hoverValue = x.getValueForPixel(args.event.x);
    } else {
      hoverValue = undefined;
    }
    args.changed = true;
  },
};

export default function BarForm() {
  return (
    <>
      <Bar options={options} data={data} plugins={[hoverSegment]} />
    </>
  );
}
