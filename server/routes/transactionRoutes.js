import express from "express";
import {
  addIncome,
  deleteIncome,
  getIncome,
} from "../controllers/incomeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addExpense,
  getExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
export const transactionRoute = express.Router();

//Creating methods for transaction route
transactionRoute
  .post("/add_income", authMiddleware, addIncome)
  .get("/get_income", authMiddleware, getIncome)
  .delete("/delete_income/:id", authMiddleware, deleteIncome)
  .post("/add_expense", authMiddleware, addExpense)
  .get("/get_expense", authMiddleware, getExpense)
  .delete("/remove_expense/:id", authMiddleware, deleteExpense);
