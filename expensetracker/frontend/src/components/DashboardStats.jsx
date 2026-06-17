import styles from "./DashboardStats.module.css";

function DashboardStats({
  highestExpense,
  totalTransactions,
  averageExpense,
}) {
  return (
    <div className={styles.statsContainer}>

      <div className={styles.statCard}>
        <h6>Highest Expense</h6>
        <h2>₹{highestExpense}</h2>
      </div>

      <div className={styles.statCard}>
        <h6>Total Transactions</h6>
        <h2>{totalTransactions}</h2>
      </div>

      <div className={styles.statCard}>
        <h6>Average Expense</h6>
        <h2>₹{averageExpense}</h2>
      </div>

    </div>
  );
}

export default DashboardStats;