import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryWiseExpensesChart({ expenses }) {
  // Aggregate data by category
  const categories = expenses.reduce((acc, expense) => {
    const { category, amountPaid } = expense;
    if (acc[category]) {
      acc[category] += parseFloat(amountPaid);
    } else {
      acc[category] = parseFloat(amountPaid);
    }
    return acc;
  }, {});
  // Prepare the data for the Pie chart
  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Expenses by Category</h2>
      <Pie data={data} />
    </div>
  );
}
