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
  .post("/add_income/:user_id", authMiddleware, addIncome)
  .get("/get_income/:user_id", authMiddleware, getIncome)
  .delete("/delete_income/:id", authMiddleware, deleteIncome)
  .post("/add_expense/:user_id", authMiddleware, addExpense)
  .get("/get_expense/:user_id", authMiddleware, getExpense)
  .delete("/remove_expense/:id", authMiddleware, deleteExpense);
