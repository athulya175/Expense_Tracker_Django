import styles from "./DashboardCards.module.css";
import { HiTrendingDown } from "react-icons/hi";
import { MdRestaurant } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";

function DashboardCards({
  totalExpense,
  foodExpense,
  travelExpense,
  shoppingExpense,
  billsExpense,
  entertainmentExpense,
  othersExpense,
}) {
  return (
    <>
      <h5 className={styles.sectionTitle}>
        Spending By Category
      </h5>
      <div className={styles.cardContainer}>

        <div className={`${styles.card} ${styles.foodCard}`}>
          <div className={styles.header}>
            <h6>Food</h6>

            <div className={styles.iconBox}><MdRestaurant size={30} color="#f59e0b" /></div>
          </div>

          <h1 className={`${styles.amount} ${styles.food}`}>₹{foodExpense}</h1>

          <div
            className={`${styles.bottomLine} ${styles.foodLine}`}
          ></div>
        </div>

        <div className={`${styles.card} ${styles.travelCard}`}>
          <div className={styles.header}>
            <h6>Travel</h6>

            <div className={styles.iconBox}><FaCar size={30} color="#10b981" /></div>
          </div>

          <h1 className={`${styles.amount} ${styles.travel}`}>₹{travelExpense}</h1>
          <div
            className={`${styles.bottomLine} ${styles.travelLine}`}
          ></div>
        </div>

        <div className={`${styles.card} ${styles.shoppingCard}`}>
          <div className={styles.header}>
            <h6>Shopping</h6>

            <div className={styles.iconBox}><FaShoppingBag size={30} color="#ef4444" /></div>
          </div>

          <h1 className={`${styles.amount} ${styles.exp}`}>₹{shoppingExpense}</h1>
          <div
            className={`${styles.bottomLine} ${styles.shoppingLine}`}
          ></div>
        </div>

        <div className={`${styles.card} ${styles.billCard}`}>
          <div className={styles.header}>
            <h6>Bills</h6>

            <div className={styles.iconBox}><FaReceipt size={30} color="#8b5cf6" /></div>
          </div>

          <h1 className={`${styles.amount} ${styles.bills}`}>₹{billsExpense}</h1>
          <div
            className={`${styles.bottomLine} ${styles.billsLine}`}
          ></div>
        </div>

        <div className={`${styles.card} ${styles.enterCard}`}>
          <div className={styles.header}>
            <h6>Entertainment</h6>

            <div className={styles.iconBox}><FaFilm size={30} color="#3b82f6" /></div>
          </div>

          <h1 className={`${styles.amount} ${styles.enter}`}>₹{entertainmentExpense}</h1>
          <div
            className={`${styles.bottomLine} ${styles.enterLine}`}
          ></div>
        </div>

        <div className={`${styles.card} ${styles.otherCard}`}>
          <div className={styles.header}>
            <h6>Others</h6>

            <div className={styles.iconBox}><FaWallet size={30} color="#6b7280" /></div>
          </div>

          <h1 className={`${styles.amount} ${styles.other}`}>₹{othersExpense}</h1>
          <div
            className={`${styles.bottomLine} ${styles.otherLine}`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default DashboardCards;
