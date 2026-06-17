import { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards";
import axios from "axios";
import ExpensePieChart from "../components/ExpensePieChart";
import DashboardStats from "../components/DashboardStats";
import styles from "./Dashboard.module.css";
import {
  FaCar,
  FaShoppingBag,
  FaReceipt,
  FaFilm,
  FaWallet
} from "react-icons/fa";

import { MdRestaurant } from "react-icons/md";
const hour = new Date().getHours();

let greeting = "";

if (hour < 12) {
  greeting = "Good Morning ☀️";
} else if (hour < 18) {
  greeting = "Good Afternoon 🌤️";
} else if (hour < 22) {
  greeting = "Good Evening 🌙";
} else {
  greeting = "Good Night 🌛";
}
const getCategoryIcon = (category) => {
  switch (category) {
    case "Food":
      return <MdRestaurant color="#f59e0b" />;
    case "Travel":
      return <FaCar color="#10b981" />;
    case "Shopping":
      return <FaShoppingBag color="#ef4444" />;
    case "Bills":
      return <FaReceipt color="#8b5cf6" />;
    case "Entertainment":
      return <FaFilm color="#3b82f6" />;
    default:
      return <FaWallet color="#6b7280" />;
  }
};
function SummaryCard({
  totalExpense,
  highestExpense,
  averageExpense,
  totalTransactions,
  savedBudget,
}) {
  return (
    <div className={styles.summaryCard}>
      <h6>TOTAL EXPENSES</h6>

      <h1>₹{totalExpense}</h1>
      <p className={styles.subText}>
        Out of ₹{savedBudget} monthly budget
      </p>
      <hr className={styles.divider} />
      <div className={styles.stats}>
        <div>
          <small>Highest</small>
          <h4>₹{highestExpense}</h4>
        </div>

        <div>
          <small>Average</small>
          <h4>₹{averageExpense}</h4>
        </div>

        <div>
          <small>Transactions</small>
          <h4>{totalTransactions}</h4>
        </div>
      </div>
      <hr className={styles.divider} />
      <hr className={styles.divider} />
      <hr className={styles.divider} />
      <hr className={styles.divider} />
    </div>
  );
}

function Dashboard() {
  const [expense, setExpense] = useState([]);
  const token = localStorage.getItem("token");
  const [budget, setBudget] = useState("");
  const [savedBudget, setSavedBudget] = useState(0);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/expenses/", config)
      .then((response) => {
        setExpense(response.data);
      });
    axios
      .get("http://127.0.0.1:8000/api/budget/", config)
      .then((response) => {
        setSavedBudget(response.data.amount);
      });
  }, []);
  const totalExpense = expense.reduce(
    (total, exp) => total + Number(exp.amount),
    0
  );

  const foodExpense = expense
    .filter((exp) => exp.category === "Food")
    .reduce((total, exp) => total + Number(exp.amount), 0);

  const travelExpense = expense
    .filter((exp) => exp.category === "Travel")
    .reduce((total, exp) => total + Number(exp.amount), 0);

  const shoppingExpense = expense
    .filter((exp) => exp.category === "Shopping")
    .reduce((total, exp) => total + Number(exp.amount), 0);

  const billsExpense = expense
    .filter((exp) => exp.category === "Bills")
    .reduce((total, exp) => total + Number(exp.amount), 0);

  const entertainmentExpense = expense
    .filter((exp) => exp.category === "Entertainment")
    .reduce((total, exp) => total + Number(exp.amount), 0);

  const othersExpense = expense
    .filter((exp) => exp.category === "Others")
    .reduce((total, exp) => total + Number(exp.amount), 0);

  const recentExpenses = [...expense]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);
  const highestExpense =
    expense.length > 0
      ? Math.max(
        ...expense.map((exp) =>
          Number(exp.amount)
        )
      )
      : 0;
  const totalTransactions = expense.length;
  const averageExpense =
    totalTransactions > 0
      ? (
        totalExpense /
        totalTransactions
      ).toFixed(2)
      : 0;
  const hasExpenses = expense.length > 0;
  const remainingBudget = Number(savedBudget) - totalExpense;

  const budgetPercentage =
    savedBudget > 0
      ? Math.min(
        (totalExpense / Number(savedBudget)) * 100,
        100
      )
      : 0;
  const isWarning =
    budgetPercentage >= 80 &&
    budgetPercentage < 100;

  const isExceeded =
    totalExpense > savedBudget;
  const saveBudget = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/budget/",
        {
          amount: budget,
        },
        config
      )
      .then(() => {
        setSavedBudget(budget); // update UI immediately
        setBudget("");          // clear input
      });
  };
  return (
    <div className="container-fluid mt-4">
      <div className={styles.welcomeSection}>
        <h2>{greeting}</h2>
        <p>Track your expenses and stay on budget.</p>
      </div>
      <div className={styles.heroSection}>
        <SummaryCard
          totalExpense={totalExpense}
          highestExpense={highestExpense}
          averageExpense={averageExpense}
          totalTransactions={totalTransactions}
          savedBudget={savedBudget}
        />

        <div className={styles.budgetCard}>
          <h4>Monthly Budget</h4>

          <p>
            <strong>Budget:</strong> ₹{savedBudget}
          </p>

          <p>
            <strong>Spent:</strong> ₹{totalExpense}
          </p>

          <p>
            <strong>Remaining:</strong> ₹{remainingBudget}
          </p>

          <div className={styles.progressWrapper}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${budgetPercentage}%`, background:
                    budgetPercentage < 80
                      ? "#10b981"
                      : budgetPercentage < 100
                        ? "#f59e0b"
                        : "#ef4444",
                }}
              />
            </div>
            {budgetPercentage < 80 && (
              <div className={styles.goodBadge}>
                ✓ Well within budget
              </div>
            )}

            {budgetPercentage >= 80 && budgetPercentage < 100 && (
              <div className={styles.warningBadge}>
                ⚠ Budget almost reached
              </div>
            )}

            {budgetPercentage >= 100 && (
              <div className={styles.dangerBadge}>
                ✕ Budget exceeded
              </div>
            )}
            <div className={styles.progressInfo}>
              <span>{budgetPercentage.toFixed(1)}% used</span>
              <span>₹{remainingBudget} left</span>
            </div>
          </div>

          <input
            type="number"
            className="form-control mb-2"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter budget"
          />

          <button
            className="btn btn-primary w-100"
            onClick={saveBudget}
          >
            Save Budget
          </button>
        </div>
      </div>
      <DashboardCards
        foodExpense={foodExpense}
        travelExpense={travelExpense}
        shoppingExpense={shoppingExpense}
        billsExpense={billsExpense}
        entertainmentExpense={entertainmentExpense}
        othersExpense={othersExpense}
      />

      <div className="row" style={{ padding: "30px" }}>
        <div className="col-md-6 mt-4">
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <h5>Spending Breakdown</h5>
              <p className={styles.subText}>
                ₹{totalExpense} spent across {totalTransactions} transactions
              </p>
            </div>
            <div className={styles.layout}>
              {hasExpenses ? (
                <ExpensePieChart
                  foodExpense={foodExpense}
                  travelExpense={travelExpense}
                  shoppingExpense={shoppingExpense}
                  billsExpense={billsExpense}
                  entertainmentExpense={entertainmentExpense}
                  othersExpense={othersExpense}
                />
              ) : (
                <p className={styles.emptyState}>
                  📊 Add expenses to see your spending insights
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-4">
          <div className={styles.chartCard}>

            <div className={styles.cardHeader}>
              < h5 > Recent Transactions</h5>
              <p className={styles.subText}>
                View All Transactions
              </p>
            </div>

            <div className="card - body">
              <div className="card shadow-sm">
                <div className="card-body">
                  {recentExpenses.map((exp) => (
                    <div
                      key={exp.id}
                      className={styles.transactionItem}
                    >
                      <div className={styles.leftSection}>
                        <div className={styles.transactionIcon}>
                          {getCategoryIcon(exp.category)}
                        </div>

                        <div>
                          <div className={styles.transactionTitle}>
                            {exp.title}
                          </div>

                          <div className={styles.transactionCategory}>
                            {exp.category}
                          </div>
                          <div className={styles.transactionDate}>
                            {new Date(exp.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className={styles.amountBadge}>
                        ₹{exp.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div >
    </div >
  );
}

export default Dashboard;