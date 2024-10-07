import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import "../styles/ExpenseTableStyles.css";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    // Container for the table with Material-UI Paper component
    <TableContainer component={Paper} className="table-container">
      <Table className="styled-table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Amount Paid</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <TableCell>{expense.expenseTitle}</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.paymentMethod}</TableCell>
              <TableCell>{`$${expense.amountPaid}`}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => onEdit(index)}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
