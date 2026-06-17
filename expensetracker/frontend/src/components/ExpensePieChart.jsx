import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

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
  const categories = [
    {
      label: "Food",
      value: foodExpense,
      color: "#22c55e",
    },
    {
      label: "Travel",
      value: travelExpense,
      color: "#3b82f6",
    },
    {
      label: "Shopping",
      value: shoppingExpense,
      color: "#06b6d4",
    },
    {
      label: "Bills",
      value: billsExpense,
      color: "#8b5cf6",
    },
    {
      label: "Entertainment",
      value: entertainmentExpense,
      color: "#ef4444",
    },
    {
      label: "Others",
      value: othersExpense,
      color: "#6b7280",
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

        backgroundColor:
          filteredCategories.map(
            (category) => category.color
          ),

        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 18,
          padding: 20,
        },
      },

      tooltip: {
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

            return `₹${value} (${percentage}%)`;
          },
        },
      },
    },

    cutout: "65%",
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

      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText(`₹${total}`, x, y - 10);

      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Total Spent", x, y + 20);

      ctx.restore();
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
          color: "#64748b",
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