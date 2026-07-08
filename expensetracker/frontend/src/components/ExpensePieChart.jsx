import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpensePieChart({
  foodExpense,
  travelExpense,
  shoppingExpense,
  billsExpense,
  entertainmentExpense,
  othersExpense,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const categories = [
    {
      label: "Food",
      value: foodExpense,
      color: "#F59E0B",
    },
    {
      label: "Travel",
      value: travelExpense,
      color: "#10B981",
    },
    {
      label: "Shopping",
      value: shoppingExpense,
      color: "#3B82F6",
    },
    {
      label: "Bills",
      value: billsExpense,
      color: "#8B5CF6",
    },
    {
      label: "Entertainment",
      value: entertainmentExpense,
      color: "#EC4899",
    },
    {
      label: "Others",
      value: othersExpense,
      color: "#6B7280",
    },
  ];

  const filteredCategories = categories.filter(
    (category) => category.value > 0
  );

  const data = {
    labels: filteredCategories.map(
      (category) => category.label
    ),

    datasets: [
      {
        data: filteredCategories.map(
          (category) => category.value
        ),

        backgroundColor: filteredCategories.map(
          (category) => category.color
        ),

        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const total =
    foodExpense +
    travelExpense +
    shoppingExpense +
    billsExpense +
    entertainmentExpense +
    othersExpense;

  const centerTextPlugin = {
    id: "centerText",

    beforeDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      if (!meta.data.length) return;

      const x = meta.data[0].x;
      const y = meta.data[0].y;

      ctx.save();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#475569";
      ctx.fillText(`₹${total}`, x, y - 12);

      ctx.font = "15px sans-serif";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText("Total Spent", x, y + 18);

      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "68%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: isDark ? "#E2E8F0" : "#475569",

          font: {
            size: 13,
            weight: "600",
          },

          padding: 20,
          boxWidth: 14,
          boxHeight: 14,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },

      tooltip: {
        backgroundColor: isDark
          ? "#1E293B"
          : "#FFFFFF",

        titleColor: isDark
          ? "#FFFFFF"
          : "#0F172A",

        bodyColor: isDark
          ? "#FFFFFF"
          : "#0F172A",

        borderColor: isDark
          ? "#475569"
          : "#E2E8F0",

        borderWidth: 1,

        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (a, b) => a + b,
              0
            );

            const value = context.raw;

            const percentage = (
              (value / total) *
              100
            ).toFixed(1);

            return `${context.label}: ₹${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (total === 0) {
    return (
      <div
        style={{
          height: "320px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: isDark
            ? "#94A3B8"
            : "#64748B",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        No expense data available
      </div>
    );
  }

  return (
    <div
      style={{
        height: "340px",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Doughnut
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
}

export default ExpensePieChart;