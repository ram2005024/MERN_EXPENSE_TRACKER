import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  CategoryScale,
} from "chart.js";
ChartJS.register(
  LineElement,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  CategoryScale
);

import { useContext } from "react";
import { TransactionContext } from "../context/transactionContext";

export const LineChart = () => {
  const { expenses, incomes } = useContext(TransactionContext);

  const dates = Array.from(
    new Set([
      ...incomes.map((item) => item.date),
      ...expenses.map((item) => item.date),
    ])
  ).sort((a, b) => new Date(a) - new Date(b));

  const incomeTransaction = incomes.reduce((acc, i) => {
    acc[i.date] = (acc[i.date] || 0) + i.amount;
    return acc;
  }, {});
  const expenseTransaction = expenses.reduce((acc, i) => {
    acc[i.expenseDate] = (acc[i.expenseDate] || 0) + i.expenseAmount;
    return acc;
  }, {});
  const dateFormat = (d) => {
    return `${new Date(d).getDate().toString().padStart(2, "0")}-${(
      new Date(d).getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${new Date(d).getFullYear().toString()}`;
  };
  const chartData = {
    labels: dates.map(dateFormat),
    datasets: [
      {
        label: "Income",
        data: dates.map((items) => incomeTransaction[items] || 0),
        borderradius: 2,
        borderWidth: 1,
        borderColor: "rgba(0, 128, 0, 0.5)",
        backgroundColor: "rgba(0,128,0,0.2)",
        pointRadius: 4,
        tension: 0.4,
        pointBackgroundColor: "green",
      },
      {
        label: "Expense",
        data: dates.map((items) => expenseTransaction[items] || 0),
        borderColor: "rgba(150, 0, 0, 0.5)",
        backgroundColor: "rgba(150,0,0,0.2)",
        borderWidth: 1,
        pointRadius: 4,
        tension: 0.4,
        pointBackgroundColor: "red",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
};
