import { expenseModel } from "../models/expenseModels.js";
//Controller to add expense
export const addExpense = async (req, res) => {
  const { title, amount, category, date, des } = req.body;
  //Checking if all the field are filled
  try {
    if (!title || !amount || !category || !date || !des)
      res.status(400).json({ message: "All fields are required" });
    if (amount < 0 || typeof amount === "string")
      res.status(400).json({ message: "Amount must be positive" });
    //If all validated inputs then saving the data into the database
    const expense = new expenseModel({
      title,
      amount,
      category,
      date,
      des,
    });

    await expense.save();
    res.status(200).json({ message: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error:${error.message}` });
  }
};
//Controller to getExpense
export const getExpense = async (req, res) => {
  try {
    const expense = await expenseModel.find().sort({ createdAt: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Controller to deleteExpense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await expenseModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted expense successfully" });
  } catch (error) {
    res.status(500).josn({ message: "Server error", error: error.message });
  }
};
