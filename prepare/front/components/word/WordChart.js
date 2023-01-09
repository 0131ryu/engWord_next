import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const WordChart = ({ easyLength, middleLength, advanceLength }) => {
  const data = {
    labels: ["Easy", "Middle", "Advance"],
    datasets: [
      {
        label: "Poll",
        data: [easyLength, middleLength, advanceLength],
        backgroundColor: [
          "rgba(240, 187, 98, 0.5)",
          "rgba(78, 108, 80, 0.5)",
          "rgb(255, 99, 71, 0.5)",
        ],
        borderColor: [
          "rgba(240, 187, 98, 0.5)",
          "rgba(78, 108, 80, 0.5)",
          "rgb(255, 99, 71, 0.5)",
        ],
        datalabels: {
          // This code is used to display data values
          formatter: function (value, context) {
            var idx = context.dataIndex;
            if (easyLength < 0 || middleLength < 0 || advanceLength < 0) {
              return idx;
            }
            if (easyLength > 0 && middleLength > 0 && advanceLength > 0) {
              return context.chart.data.labels[idx] + " : " + value;
            }
          },
          font: {
            weight: "bold",
            size: 16,
          },
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
      },
    },
  };

  return (
    <div className="w-60 h-60 grid grid-cols-2 gap-4 place-content-center">
      <Doughnut data={data} options={options}></Doughnut>
    </div>
  );
};

export default WordChart;
