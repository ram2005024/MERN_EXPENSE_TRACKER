import React, { useContext } from "react";
import { LineChart } from "../config/LineChart.jsx";
import { TransactionContext } from "../context/transactionContext.jsx";
import { FaDollarSign } from "react-icons/fa";
const Dashboard = () => {
  const { totalIncome, totalExpense, incomes, expenses } =
    useContext(TransactionContext);
  const allTransactions = [...incomes, ...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const recentTransactions = allTransactions
    .map((item) => ({
      title: item.title,
      amount: item.amount,
      type: item.type,
    }))
    .slice(0, 4);
  const minIncome =
    incomes.length == 0 ? "0" : Math.min(...incomes.map((i) => i.amount)); //satefy from dispalying infinity if incomes is empty
  const maxIncome =
    incomes.length == 0 ? "0" : Math.max(...incomes.map((i) => i.amount)); //satefy from dispalying infinity if incomes is empty
  const minExpense =
    expenses.length == 0 ? "0" : Math.min(...expenses.map((i) => i.amount)); //satefy from dispalying infinity if incomes is empty
  const maxExpense =
    expenses.length == 0 ? "0" : Math.max(...expenses.map((i) => i.amount)); //satefy from dispalying infinity if incomes is empty
  return (
    <div className="md:col-span-9 w-auto bg-gray-100 border-2 border-white rounded-lg sm:px-4 sm:py-8 pr-6 py-3  flex flex-col gap-2">
      <h2 className="sm:text-3xl text-xl text-indigo-900 font-semibold ml-6 sm:text-start">
        Transactions Overview
      </h2>
      <div className="grid md:grid-cols-9 pl-3 gap-6">
        {/* For chart grid */}
        <div className="flex flex-col md:col-span-5 gap-6 ">
          <div className="border-2 border-white rounded-lg sm:pl-3 sm:pr-8 sm:py-6 p-3 sm:w-full w-auto bg-gray-50">
            <LineChart />
          </div>
          <div className="flex flex-col sm:flex-row gap-4  md:justify-center ">
            <div className="flex flex-col gap-2 border-2 rounded-lg  border-white bg-gray-50 flex-1 sm:pl-2 sm:pr-10 md:pr-30 sm:py-3.5 p-3">
              <span className="text-lg  text-indigo-900">Total income</span>
              <span className="sm:text-5xl text-2xl  text-gray-400 inline-flex justify-center items-center">
                <FaDollarSign className="sm:size-8 size-4  text-gray-400 font-light mr-2" />
                {totalIncome}
              </span>
            </div>
            <div className="flex flex-col gap-2 border-2 rounded-lg border-white bg-gray-50 flex-1 sm:pl-2 sm:pr-10 md:pr-30  sm:py-3.5 p-3">
              <span className="text-lg  text-indigo-900">Total expense</span>
              <span className="sm:text-5xl text-2xl  text-gray-400 inline-flex justify-center items-center">
                <FaDollarSign className="sm:size-8 size-4 text-gray-400 font-light mr-2" />
                {totalExpense}
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col gap-2 border-2 rounded-lg border-white bg-gray-50 px-10 py-3.5">
              <span className="text-lg  text-indigo-900">Total balance</span>
              <span className="text-5xl font-semibold text-green-500 inline-flex justify-center items-center">
                <FaDollarSign className="size-8  text-green-500 font-light mr-2" />
                {totalIncome - totalExpense}
              </span>
            </div>
          </div>
        </div>
        {/* History grid */}
        <div className="md:col-span-4 flex flex-col pt-3 gap-3">
          <span className="text-indigo-900 text-3xl font-semibold">
            Recent History
          </span>
          {recentTransactions.map((items) => {
            return (
              <div className="border-2 border-white rounded-lg bg-gray-50 py-3 px-4 flex justify-between">
                <span
                  className={
                    items.type === "expense"
                      ? "text-red-500 font-light"
                      : "text-green-500 font-light"
                  }
                >
                  {items.title}
                </span>
                <span
                  className={
                    items.type === "expense"
                      ? "text-red-500 font-light"
                      : "text-green-500 font-light"
                  }
                >
                  {items.type === "expense"
                    ? `-${items.amount}`
                    : `+${items.amount}`}
                </span>
              </div>
            );
          })}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex w-full pl-2 justify-between">
              <span className="text-indigo-950 ">Min</span>
              <span className="text-indigo-950 text-xl font-semibold">
                Income
              </span>
              <span className="text-indigo-950 ">Max</span>
            </div>

            <div className="flex w-full border-2 rounded-lg border-white bg-gray-50 px-3.5 py-2.5 justify-between">
              <span className="text-xl text-indigo-800 font-light">
                $ {minIncome}
              </span>
              <span className="text-xl text-indigo-800 font-light ">
                $ {maxIncome}
              </span>
            </div>
            <div className="flex w-full pl-2 justify-between">
              <span className="text-indigo-950 ">Min</span>
              <span className="text-indigo-950 text-xl font-semibold">
                Expense
              </span>
              <span className="text-indigo-950 ">Max</span>
            </div>

            <div className="flex w-full border-2 rounded-lg border-white bg-gray-50 px-3.5 py-2.5 justify-between">
              <span className="text-xl text-indigo-800 font-light">
                $ {minExpense}
              </span>
              <span className="text-xl text-indigo-800 font-light ">
                $ {maxExpense}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
