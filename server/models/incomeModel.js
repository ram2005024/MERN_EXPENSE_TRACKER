import mongoose from "mongoose";
const incomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: "income",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    des: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);
const incomeModel = new mongoose.model("incomes", incomeSchema);
export default incomeModel;
