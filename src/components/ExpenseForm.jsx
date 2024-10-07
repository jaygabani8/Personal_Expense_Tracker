import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import ExpenseList from "./ExpenseList";
import { useExpenses } from "../context/ExpenseContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/ExpenseFormStyles.css";

// Get expenses and functions to modify them from context
export default function ExpenseForm() {
  const { expenses, addExpense, editExpense, deleteExpense } = useExpenses();
  const { isDarkMode } = useTheme();

  // State to hold data for a single expense
  const [expenseData, setExpenseData] = useState({
    expenseTitle: "",
    date: "",
    paymentMethod: "",
    amountPaid: "",
    category: "",
  });

  // State to handle editing an existing expense
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Effect to apply dark or light mode classes to the body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Handle input field changes
  const handleChange = (event) => {
    setExpenseData({
      ...expenseData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // If editing, update the existing expense; otherwise, add a new expense
    if (isEditing) {
      editExpense(editingIndex, expenseData);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      addExpense(expenseData);
    }

    // Reset the form fields to empty
    setExpenseData({
      expenseTitle: "",
      date: "",
      paymentMethod: "",
      amountPaid: "",
      category: "",
    });
  };

  // Handle editing of an existing expense
  const handleEdit = (index) => {
    setExpenseData(expenses[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Handle deletion of an expense
  const handleDelete = (index) => {
    deleteExpense(index);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <TextField
              label="Expense Title"
              name="expenseTitle"
              value={expenseData.expenseTitle}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="Expense Title"
              InputLabelProps={{
                className: isDarkMode ? "label-dark" : "label-light",
              }}
              InputProps={{
                className: isDarkMode ? "text-field-dark" : "text-field-light",
              }}
            />
            <TextField
              name="date"
              type="date"
              value={expenseData.date}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{
                className: isDarkMode ? "label-dark" : "label-light",
              }}
              InputProps={{
                className: isDarkMode ? "text-field-dark" : "text-field-light",
              }}
            />
            <TextField
              select
              label="Method of Payment"
              name="paymentMethod"
              value={expenseData.paymentMethod}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{
                className: isDarkMode ? "label-dark" : "label-light",
              }}
              InputProps={{
                className: isDarkMode ? "text-field-dark" : "text-field-light",
              }}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Debit Card">Debit Card</MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
            </TextField>
            <TextField
              label="Amount Paid"
              name="amountPaid"
              type="number"
              value={expenseData.amountPaid}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{
                className: isDarkMode ? "label-dark" : "label-light",
              }}
              InputProps={{
                className: isDarkMode ? "text-field-dark" : "text-field-light",
              }}
            />
            <TextField
              select
              label="Category"
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{
                className: isDarkMode ? "label-dark" : "label-light",
              }}
              InputProps={{
                className: isDarkMode ? "text-field-dark" : "text-field-light",
              }}
            >
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="transportation">Transportation</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
              <MenuItem value="utilities">Utilities</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </TextField>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              className={
                isDarkMode ? "submit-button-dark" : "submit-button-light"
              }
            >
              {isEditing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>

      <ExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
