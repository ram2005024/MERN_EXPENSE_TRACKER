import React, { useContext } from "react";
import { TransactionContext } from "../context/transactionContext";
import { DateFormatter } from "../utils/DateFormatter";
const ViewTransaction = () => {
  const { incomes, expenses } = useContext(TransactionContext);
  const transactions = [...incomes, ...expenses].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  console.log(transactions);
  return (
    <div className="md:col-span-9 py-3 px-2 flex flex-col sm:gap-8 gap-4 sm:h-content h-screen  mr-3 sm:m-0  ">
      <h2 className="text-3xl font-semibold text-slate-900 ">
        Transaction history
      </h2>
      <div className="w-full flex flex-col gap-4 border-2 rounded-lg grow border-white bg-gray-50 p-4">
        <div className="flex  gap-5 justify-between w-full mb-6">
          <span className="sm:text-xl  text-sm text-indigo-800 font-semibold">
            Type
          </span>
          <span className="sm:text-xl text-sm text-indigo-800 font-semibold">
            Category
          </span>
          <span className="sm:text-xl text-sm text-indigo-800 font-semibold">
            Amount
          </span>
          <span className="sm:text-xl text-sm text-indigo-800 font-semibold">
            Date of Transaction
          </span>
          <span className="sm:text-xl text-sm text-indigo-800 font-semibold">
            Title
          </span>
        </div>
        {transactions.map((i) => {
          return (
            <div
              key={i._id}
              className="w-full p-4 flex justify-between border-2 rounded-lg border-white bg-gray-100"
            >
              <span className="text-sm text-indigo-900 font-light">
                {i.type}
              </span>
              <span className="text-sm text-indigo-900 font-light">
                {i.category}
              </span>
              <span className="text-sm text-indigo-900 font-light">
                {i.amount}
              </span>
              <span className="text-sm text-indigo-900 font-light">
                {DateFormatter(i.date)}
              </span>
              <span className="text-sm text-indigo-900 font-light">
                {i.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewTransaction;
