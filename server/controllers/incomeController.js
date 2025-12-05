import incomeModel from "../models/incomeModel.js";
//Controller to add income
export const addIncome = async (req, res) => {
  const { title, amount, category, date, des } = req.body;
  //Checking if all the field are filled
  try {
    if (!title || !amount || !category || !date || !des)
      res.status(400).json({ message: "All fields are required" });
    if (amount < 0 || typeof amount === "string")
      res.status(400).json({ message: "Amount must be positive" });
    //If all validated inputs then saving the data into the database
    const income = new incomeModel({ title, amount, category, date, des });

    await income.save();
    res.status(200).json({ message: "Income added successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error:${error.message}` });
  }
};
//Controller to getIncome
export const getIncome = async (req, res) => {
  try {
    const income = await incomeModel.find().sort({ createdAt: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Controller to deleteIncome
export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    await incomeModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted income successfully" });
  } catch (error) {
    res.status(500).josn({ message: "Server error", error: error.message });
  }
};
