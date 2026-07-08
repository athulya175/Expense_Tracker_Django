import styles from "./ReportsStats.module.css";
import { FaWallet } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { TbChartBar } from "react-icons/tb";
import api from "../api/api";
function ReportsStats({ totalSpent,
    transactions,
    highest,
    average }) {
    return (
        <div className={styles.cardContainer}>

            <div className={styles.card}>
                <div className={styles.icon}>
                    <FaWallet />
                </div>

                <h6>Total Spent</h6>

                <h2>₹{totalSpent}</h2>
            </div>

            <div className={styles.card}>
                <div className={styles.icon}>
                    <FaReceipt />
                </div>

                <h6>Transactions</h6>

                <h2>{transactions}</h2>
            </div>

            <div className={styles.card}>
                <div className={styles.icon}>
                    <HiTrendingUp />
                </div>

                <h6>Highest</h6>

                <h2>₹{highest}</h2>
            </div>

            <div className={styles.card}>
                <div className={styles.icon}>
                    <TbChartBar />
                </div>

                <h6>Average</h6>

                <h2>₹{average}</h2>
            </div>

        </div>
    );
}

export default ReportsStats;