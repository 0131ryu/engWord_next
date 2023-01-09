import { Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Test4 = () => {
  const data = {
    labels: ["Yes", "No", "Non"],
    datasets: [
      {
        label: "Poll",
        data: [3, 6, 3],
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
      },
    ],
  };

  const options = {};

  return (
    <div className="w-90 max-w-screen-lg">
      <h1>Doughnut</h1>
      <Doughnut data={data} options={options}></Doughnut>
    </div>
  );
};

export default Test4;
