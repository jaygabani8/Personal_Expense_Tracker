import React, { createContext, useContext, useState } from "react";

// Create a Context for the expense data
const ExpenseContext = createContext();

// Custom hook to use the Expense Context
export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  // Function to add an expense
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // Function to edit an expense
  const editExpense = (index, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense, i) => (i === index ? updatedExpense : expense))
    );
  };

  // Function to delete an expense
  const deleteExpense = (index) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, editExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
