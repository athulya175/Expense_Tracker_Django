import { getCategoryIcon } from "../utils/categoryIcons";
import styles from "./ExpenseList.module.css";
import { getCategoryColor } from "../utils/categoryColors";
function ExpenseList({ expense, deleteExpense, editExpense, viewExpense }) {
  if (expense.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h1>📭</h1>
        <h4>No expenses found</h4>
        <p>Try a different search term.</p>
      </div>
    );
  }
  return (
    <>
      <h3 className={styles.sectionTitle}>RECENT EXPENSES</h3>

      {expense.map((exp) => (
        <div className={styles.expenseCard} key={exp.id}>
          <div className={styles.leftSection}>
            <div className={styles.iconBox}>
              {getCategoryIcon(exp.category)}
            </div>

            <div>
              <h5 className={styles.title}>{exp.title}</h5>

              <p className={styles.date}>
                {new Date(exp.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <span
                className={styles.badge}
                style={{
                  color: getCategoryColor(exp.category),
                  backgroundColor: `${getCategoryColor(exp.category)}20`,
                }}
              >
                {exp.category}
              </span>
            </div>
          </div>

          <div className={styles.rightSection}>
            <h4 className={styles.amount}>₹{exp.amount}</h4>

            <div className={styles.actions}>
              <button
                onClick={() => editExpense(exp)}
                className={styles.actionBtn}
              >
                ✏️
              </button>

              <button
                onClick={() => deleteExpense(exp.id)}
                className={styles.actionBtn}
              >
                🗑️
              </button>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => viewExpense(exp)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ExpenseList;
