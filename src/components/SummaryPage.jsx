import React from "react";
import { useExpenses } from "../context/ExpenseContext";
import {
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { motion } from "framer-motion";
import CategoryWiseExpensesChart from "../components/ExpenseChart";
import "../styles/SummaryPageStyles.css";

// Getting expenses from the context
export default function SummaryPage() {
  const { expenses } = useExpenses();

  // Calculate total expenses
  const totalExpense = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amountPaid || 0),
    0
  );

  // Aggregate expenses by category
  const categorizedExpenses = expenses.reduce((acc, expense) => {
    const { category, amountPaid } = expense;
    // If category is not in accumulator, initialize it
    if (!acc[category]) {
      acc[category] = 0;
    }
    // Add the amountPaid to the corresponding category
    acc[category] += parseFloat(amountPaid);
    return acc;
  }, {});
  // Prepare rows for the table displaying categorized expenses
  const categoryRows = Object.keys(categorizedExpenses).map((category) => ({
    category,
    totalAmount: categorizedExpenses[category].toFixed(2),
  }));

  return (
    <motion.div
      className="summary-container"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <Typography variant="h4" gutterBottom>
        Expense Summary
      </Typography>

      <Paper elevation={3} className="summary-paper">
        <Typography variant="h6" className="table-title" gutterBottom>
          Expenses Categorized by Type
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryRows.map((row) => (
                <TableRow key={row.category}>
                  <TableCell component="th" scope="row">
                    {row.category.charAt(0).toUpperCase() +
                      row.category.slice(1)}
                  </TableCell>
                  <TableCell align="right">${row.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" className="total-expense">
          Total Expense: ${totalExpense.toFixed(2)}
        </Typography>

        <Box className="chart-container">
          <CategoryWiseExpensesChart expenses={expenses} />
        </Box>
      </Paper>
    </motion.div>
  );
}
