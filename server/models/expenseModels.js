import mongoose from "mongoose";
const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    userID: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    des: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      default: "expense",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
export const expenseModel = new mongoose.model("expense_table", ExpenseSchema);
