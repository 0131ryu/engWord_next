import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const WeekendWordChart = ({ weekendResult }) => {
  const weekData = [];

  weekendResult.map((week, i) => {
    const createdAt = week.createdAt.substr(5, 5);
    const changeDate = createdAt.replace("-", "/");
    weekData.push(changeDate);
  });

  const getElCount = (arr) =>
    arr.reduce((ac, v) => ({ ...ac, [v]: (ac[v] || 0) + 1 }), {});

  const result = getElCount(weekData);
  const wordData = Object.values(result);
  const maxValue = Math.max.apply(null, wordData);
  const minValue = Math.min.apply(null, wordData);

  console.log("wordData", wordData);
  const weekDatas = new Set(weekData);
  const oneWeek = [...weekDatas];

  const data = {
    labels: oneWeek,
    datasets: [
      {
        data: wordData,
        backgroundColor: "transparent",
        borderColor: "#F0BB62",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  };
  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: minValue,
        max: maxValue,
      },
    },
  };

  return (
    <>
      <p className="text-center">
        전체 유저들의 <br />
        <span className="font-bold text-light-orange">
          주간({oneWeek[0]} ~ {oneWeek[oneWeek.length - 1]})
        </span>{" "}
        단어 작성 개수
      </p>
      <div className="h-48 lg:w-80">
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
};

export default WeekendWordChart;
