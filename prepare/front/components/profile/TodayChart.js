import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Bar } from "react-chartjs-2";
import { useCallback, useEffect } from "react";
import { loadGamesRequest } from "../../redux/feature/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

const TodayChart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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

  var lineChartData = {
    labels: [""],
    datasets: [],
  };

  const colors = ["rgba(240, 187, 98, 0.5)", "rgba(78, 108, 80, 0.5)"];

  ResultArray.forEach((a, i) => {
    lineChartData.datasets.push({
      label: `${a.time}`,
      fillColor: `${ResultArray[0].score === a.score ? colors[0] : colors[1]}`,
      borderColor: `${
        ResultArray[0].score === a.score ? colors[0] : colors[1]
      }`,
      backgroundColor: `${
        ResultArray[0].score === a.score ? colors[0] : colors[1]
      }`,
      borderWidth: 1,
      data: JSON.parse(a.score),
      datalabels: {
        // This code is used to display data values
        anchor: "end",
        align: "top",
        formatter: Math.round,
        font: {
          weight: "bold",
          size: 16,
        },
      },
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

  const onGoGame = useCallback(() => {
    router.push("/game");
  }, []);

  return (
    <div>
      {lineChartData.datasets.length === 0 && (
        <div className="mt-5 mb-5">
          <p>오늘 게임에 참여한 적이 없습니다.</p>
          <button
            onClick={onGoGame}
            className="mt-2 font-bold bg-light-green text-white hover:bg-gray-100 hover:text-light-green px-4 py-2 rounded"
          >
            게임 시작하기
          </button>
        </div>
      )}
      {lineChartData.datasets.length !== 0 && (
        <div>
          <h1 className="font-bold">오늘의 결과</h1>
          <p>(점수가 0인 경우 표에 표시되지 않습니다.)</p>
          <Bar data={data} options={options}></Bar>
        </div>
      )}
    </div>
  );
};

export default TodayChart;
