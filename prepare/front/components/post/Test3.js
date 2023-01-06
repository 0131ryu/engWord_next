import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Test3 = () => {
  var lineChartData = {
      labels: ["1/6"],
      datasets: [],
    },
    array = ["[50]", "[100]", "[30]", "[70]", "[80]"];

  //console.log("array type", typeof array[0]); //string

  array.forEach(function (a, i) {
    lineChartData.datasets.push({
      label: i + 1 + "번째",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: JSON.parse(a),
    });
  });

  const labels = ["1번째", "2번째", "3번째", "4번째", "5번째"];
  const datas = [5, 4, 10, 8, 2];

  const data = {
    labels: lineChartData.labels,
    datasets: lineChartData.datasets,
  };
  const options = {
    spanGaps: true,
    maxBarThickness: 50,
  };

  return (
    <div className="w-90 max-w-screen-lg">
      <h1>Today Bar</h1>
      <div>
        <Bar className="p-10 w-4/5" data={data} options={options}></Bar>
      </div>
    </div>
  );
};

export default Test3;
