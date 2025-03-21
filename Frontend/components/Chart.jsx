import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const LeetCodeChart = ({ solvedQues }) => {
  // Count Easy, Medium, Hard questions
  const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };
  solvedQues.forEach((q) => difficultyCounts[q.difficulty]++);

  // Chart Data
  const chartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: Object.values(difficultyCounts),
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverBackgroundColor: ["#45A049", "#FFB300", "#D32F2F"],
      },
    ],
  };

  return (
    <div className="w-64 h-64">
      <Doughnut data={chartData} />
    </div>
  );
};

export default LeetCodeChart;
