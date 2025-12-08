import React, { createContext, useEffect, useState } from "react";
import { MdDashboard, MdOutlineSwapHoriz, MdAttachMoney } from "react-icons/md";
import {
  FaBook,
  FaBus,
  FaFileInvoiceDollar,
  FaFilm,
  FaHome,
  FaHospital,
  FaMoneyBillWave,
  FaShoppingCart,
  FaUtensils,
} from "react-icons/fa";
import {
  FaBitcoin,
  FaYoutube,
  FaDollarSign,
  FaMoneyBill,
  FaPaintBrush,
} from "react-icons/fa";
import esewalogo from "../assets/esewa.png";
import axios from "axios";
export const TransactionContext = createContext();
export const TransactionContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("User");
  const sections = [
    {
      name: "Dashboard",
      type: "dashboard",
      icons: MdDashboard,
    },
    {
      name: "View Transaction",
      type: "viewTransaction",
      icons: MdOutlineSwapHoriz,
    },
    {
      name: "Income",
      type: "income",
      icons: MdAttachMoney,
    },
    {
      name: "Expense",
      type: "expense",
      icons: FaMoneyBillWave,
    },
  ];
  const iconsForIncome = [
    {
      category: "Bitcoin",
      icons: FaBitcoin,
    },
    {
      category: "Youtube",
      icons: FaYoutube,
    },
    {
      category: "Salary",
      icons: FaDollarSign,
    },
    {
      category: "Freelancing",
      icons: FaMoneyBill,
    },
    {
      category: "Esewa",
      icons: esewalogo,
    },
    {
      category: "Designing",
      icons: FaPaintBrush,
    },
    {
      category: "Loan",
      icons: FaMoneyBillWave,
    },
  ];
  const iconsForExpense = [
    {
      category: "Food",
      icons: FaUtensils,
    },
    {
      category: "Transport",
      icons: FaBus,
    },
    {
      category: "Shopping",
      icons: FaShoppingCart,
    },
    {
      category: "Rent",
      icons: FaHome,
    },
    {
      category: "Bills",
      icons: FaFileInvoiceDollar,
    },
    {
      category: "Health",
      icons: FaHospital,
    },
    {
      category: "Entertainment",
      icons: FaFilm,
    },
    {
      category: "Education",
      icons: FaBook,
    },
  ];
  const [user_id, setUserID] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const serverURL = "http://localhost:5000";
  //fetch the user when someone logsin
  const fetchUserAndData = async () => {
    try {
      const res = await axios.get(`${serverURL}/auth/`, {
        withCredentials: true,
      });
      const currentUserID = res.data.userID;
      const currentUserName = res.data.userName;
      setUserID(currentUserID);
      setUserName(currentUserName);
      const incomeResponse = await axios.get(
        `${serverURL}/transactions/get_income/${currentUserID}`,
        {
          withCredentials: true,
        }
      );

      setIncomes(incomeResponse.data);

      const expenseResponse = await axios.get(
        `${serverURL}/transactions/get_expense/${currentUserID}`,
        {
          withCredentials: true,
        }
      );

      setExpenses(expenseResponse.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  //getting user from token
  useEffect(() => {
    fetchUserAndData();
  }, []);
  // useEffect(() => {
  //   if (!user_id) return;

  //   axios
  //     .get(`${serverURL}/transactions/get_income/${user_id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setIncomes(res.data);
  //     })
  //     .catch((error) => console.log(`Error: ${error}`));
  // }, [user_id]);
  // useEffect(() => {
  //   if (!user_id) return;
  //   axios
  //     .get(`${serverURL}/transactions/get_expense/${user_id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setExpenses(res.data);
  //     })
  //     .catch((error) => console.log(`Error: ${error}`));
  // }, [user_id]);
  const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const activeSection = sections[activeSectionIndex];
  return (
    <TransactionContext.Provider
      value={{
        activeSection,
        sections,
        serverURL,
        incomes,
        setIncomes,
        userName,
        user_id,
        activeSectionIndex,
        setActiveSectionIndex,
        iconsForIncome,
        iconsForExpense,
        fetchUserAndData,
        expenses,
        setExpenses,
        totalIncome,
        totalExpense,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
