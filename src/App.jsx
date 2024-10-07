import React from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import ExpenseForm from "./components/ExpenseForm";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import SummaryPage from "./components/SummaryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ExpenseForm />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </Router>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;
