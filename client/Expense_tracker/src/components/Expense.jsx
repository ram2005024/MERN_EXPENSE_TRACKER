import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/transactionContext";
import { toast } from "react-toastify";
import {
  FaCalendar,
  FaCircle,
  FaComment,
  FaDollarSign,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import axios from "axios";
const Expense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [date, setDate] = useState("");

  const { serverURL, expenses, setExpenses, iconsForExpense, totalExpense } =
    useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${serverURL}/add_expense`, {
        title,
        amount: Number(amount),
        category,
        date,
        des,
      })
      .then((response) => {
        toast.success(response.data.message);
        setTitle("");
        setAmount("");
        setCategory("");
        setDate("");
        setDes("");
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    axios
      .get(`${serverURL}/get_expense`)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log("Error occured: ", error);
      });
  }, [expenses, setExpenses, serverURL]);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${serverURL}/remove_expense/${id}`);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-3.5 p-4 bg-gray-100 border-2 border-white rounded-lg md:col-span-8">
      <h2 className="text-3xl text-indigo-800 font-semibold">Expenses</h2>
      <div className="py-5  bg-gray-50 border-2 border-white rounded-lg flex gap-2 justify-center items-center">
        <h2 className="text-2xl text-indigo-900 ">Total expense </h2>
        <span className="text-red-600 font-semibold text-3xl inline-flex items-center">
          -<FaDollarSign className="size-6" />
          {totalExpense}{" "}
        </span>
      </div>
      <div
        className="w-full  gap-5 grid md:grid-cols-8"
        onSubmit={handleSubmit}
      >
        {/* Form Section */}
        <form className="flex flex-col gap-4 md:col-span-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="text-gray-500 p-2  rounded-lg bg-pink-100 border-2 border-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Expense Amount"
            required
            className="text-gray-500 p-2 no-spinner rounded-lg bg-pink-100 border-2 border-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter a date"
            required
            className="text-gray-500 p-2 rounded-lg bg-pink-100 border-2 border-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200"
          />
          <div className="flex justify-end">
            <select
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="text-gray-500 p-2 rounded-lg cursor-pointer bg-pink-100 border-2 border-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200"
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Rent">Rent</option>
              <option value="Bills">Bills</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <textarea
            className="text-gray-500 p-2 rounded-lg resize-none bg-pink-100 border-2 border-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200"
            placeholder="Enter description"
            value={des}
            required
            onChange={(e) => setDes(e.target.value)}
            rows={5}
          ></textarea>
          <div class="button-bg rounded-full hover:scale-105 p-0.5  w-fit transition duration-300 active:scale-100">
            <button
              type="submit"
              class="px-5 text-sm  py-2.5 cursor-pointer  text-white rounded-full font-medium bg-indigo-500 inline-flex gap-2 justify-center items-center"
            >
              <FaPlus className="size-3 text-white font-light" />
              Add Expense
            </button>
          </div>
        </form>
        {/* View grid */}
        <div className="flex flex-col gap-2 md:col-span-6">
          {expenses.map((items) => {
            const ItemLogo = iconsForExpense.find(
              (item) => item.category === items.category
            )?.icons;
            return (
              <div
                key={items._id}
                className=" relative w-full flex flex-col gap-2 py-6 px-3 rounded-lg bg-gray-50 items-start overflow-visible"
              >
                <div className="flex gap-2 items-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {ItemLogo && (
                      <ItemLogo className="size-8  bg-center  text-indigo-950" />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1.5 items-center">
                      <FaCircle className="size-3 text-red-500" />
                      <span className="text-indigo-950 font-semibold">
                        {items.title}
                      </span>
                    </div>
                    <div className="flex gap-4   ">
                      <span className="inline-flex  text-sm font-light justify-center items-center">
                        <FaDollarSign className="size-3 text-indigo-950 font-light" />
                        {items.amount}
                      </span>
                      <span className="inline-flex gap-1.5 text-sm font-light justify-center items-center">
                        <FaCalendar className="size-3 text-indigo-950 font-light" />
                        {new Date(items.date).getFullYear()}/
                        {new Date(items.date).getMonth() + 1}/
                        {new Date(items.date).getDate()}
                      </span>
                      <span className="inline-flex gap-1.5 text-sm font-ligh justify-center items-center">
                        <FaComment className="size-3 text-indigo-950 font-light" />
                        {items.des}
                      </span>
                    </div>
                  </div>
                </div>
                <span>
                  <FaTrash
                    className="absolute bottom-6 right-4 size-8 bg-indigo-950 p-2 rounded-lg cursor-pointer text-white hover:scale-105 hover:text-red-400 z-10"
                    onClick={() => handleDelete(items._id)}
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Expense;
