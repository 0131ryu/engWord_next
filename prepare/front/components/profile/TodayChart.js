import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { loadGamesRequest } from "../../redux/feature/gameSlice";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TodayChart = () => {
  const dispatch = useDispatch();
  const { gameScoreLists } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(loadGamesRequest());
  }, []);

  console.log("gameScoreLists", gameScoreLists);
  const ResultArray = [];

  gameScoreLists.map((score, i) => {
    // console.log("결과", `"[${parseInt(score)}]"`);
    ResultArray.push(`[${parseInt(score)}]`);
  });

  console.log("ResultArray", ResultArray);

  var lineChartData = {
      labels: [""],
      datasets: [],
    },
    array = ResultArray;

  //console.log("array type", typeof array[0]); //string

  array.forEach((a, i) => {
    lineChartData.datasets.push({
      label: i + 1 + "번째",
      fillColor: "#4E6C50",
      strokeColor: "#4E6C50",
      pointColor: "#4E6C50",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#4E6C50",
      data: JSON.parse(a),
    });
  });

  const data = {
    labels: lineChartData.labels,
    datasets: lineChartData.datasets,
  };
  const options = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
      x: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div>
      <h1 className="font-bold">오늘의 결과</h1>
      <div>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
};

export default TodayChart;
