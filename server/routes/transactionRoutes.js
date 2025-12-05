import express from "express";
import {
  addIncome,
  deleteIncome,
  getIncome,
} from "../controllers/incomeController.js";
import {
  addExpense,
  getExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
export const transactionRoute = express.Router();

//Creating methods for transaction route
transactionRoute
  .post("/add_income", addIncome)
  .get("/get_income", getIncome)
  .delete("/delete_income/:id", deleteIncome)
  .post("/add_expense", addExpense)
  .get("/get_expense", getExpense)
  .delete("/remove_expense/:id", deleteExpense);
