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

  const ResultArray = [];

  gameScoreLists.map((lists, i) => {
    const splitTimes = lists.createdAt.split(" ");
    const time = splitTimes[1].split(":");
    const result = time[0] + "시" + time[1] + "분" + time[2] + "초";
    ResultArray.push({
      score: `[${parseInt(lists.score)}]`,
      time: result,
    });
  });

  console.log("ResultArray", ResultArray);

  var lineChartData = {
    labels: [""],
    datasets: [],
  };
  ResultArray.forEach((a) => {
    lineChartData.datasets.push({
      label: `${a.time}`,
      fillColor: "#4E6C50",
      strokeColor: "#4E6C50",
      pointColor: "#4E6C50",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#4E6C50",
      data: JSON.parse(a.score),
    });
  });

  console.log("lineChartData.datasets", lineChartData.datasets);

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
      <p>(점수가 0인 경우 표에 표시되지 않습니다.)</p>
      <div>
        <Bar data={data} options={options}></Bar>
      </div>
    </div>
  );
};

export default TodayChart;
