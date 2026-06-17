import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import styles from "./Expenses.module.css";
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
function Expenses() {
  const [expense, setExpense] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  const [selectedExpense, setSelectedExpense] = useState(null);
  const token = localStorage.getItem("token");
  const [showForm, setShowForm] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [selectedDate, setSelectedDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = () => {
    let url = "http://127.0.0.1:8000/api/expenses/";

    if (selectedDate) {
      url += `?date=${selectedDate}`;
    }

    axios.get(url, config).then((response) => {
      setExpense(response.data);
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    if (editId) {
      axios
        .put(`http://127.0.0.1:8000/api/expenses/update/${editId}/`, formData, config)
        .then(() => {
          fetchData();
          setEditId(null);
          setFormData({
            title: "",
            amount: "",
            category: "",
            date: "",
            description: "",
          });
        });
    } else {
      axios
        .post("http://127.0.0.1:8000/api/expenses/", formData, config)
        .then(() => {
          fetchData();

          setFormData({
            title: "",
            amount: "",
            category: "",
            date: "",
            description: "",
          });
        })
        .catch((error) => {
          console.log(error.response?.data);
        });
    }
  };
  const deleteExpense = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/expenses/${id}/`, config)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editExpense = (expense) => {
    setEditId(expense.id);

    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      description: expense.description,
    });
    setShowForm(true);
  };
  const filteredExpenses = expense.filter((exp) => {
    const matchesSearch = exp.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || exp.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  const sortedExpenses = [...filteredExpenses];
  const viewExpense = (expense) => {
    setSelectedExpense(expense);
  };
  if (sortBy === "highest") {
    sortedExpenses.sort(
      (a, b) => Number(b.amount) - Number(a.amount)
    );
  }

  if (sortBy === "lowest") {
    sortedExpenses.sort(
      (a, b) => Number(a.amount) - Number(b.amount)
    );
  }

  if (sortBy === "newest") {
    sortedExpenses.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  if (sortBy === "oldest") {
    sortedExpenses.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }
  const totalExpense = expense.reduce(
    (total, exp) => total + Number(exp.amount),
    0
  );

  const totalTransactions = expense.length;

  const averageExpense =
    totalTransactions > 0
      ? (totalExpense / totalTransactions).toFixed(2)
      : 0;
  const totalCategories = new Set(
    expense.map((exp) => exp.category)
  ).size;
  const categoryColors = {
    All: "#5B4DDB",
    Food: "#FF9F43",
    Travel: "#2ECC71",
    Shopping: "#9B59B6",
    Bills: "#E74C3C",
    Entertainment: "#3498DB",
    Others: "#95A5A6",
  };
  return (
    <div className="container-fluid mt-4" style={{
      padding: "30px"
    }}>
      < div className={styles.welcomeSection} >
        <h2>{greeting}</h2>
        <p>Track your expenses and stay on budget.</p>
      </div >
      <div className={`row mb-4 ${styles.card_box}`}>
        <div className="col-6 col-md-3 mb-3">
          <div className={styles.statsCard}>
            <div className={styles.statsTitle}>
              Total Expenses
            </div>
            <div className={styles.statsValue}>
              ₹{totalExpense}
            </div>
          </div>

        </div>

        <div className="col-6 col-md-3 mb-3">
          <div className={styles.statsCard}>
            <div className={styles.statsTitle}>
              Transaction
            </div>
            <div className={styles.statsValue}>
              {totalTransactions}
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 mb-3">
          <div className={styles.statsCard}>
            <div className={styles.statsTitle}>
              Categories
            </div>
            <div className={styles.statsValue}>
              {totalCategories}
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 mb-3">
          <div className={styles.statsCard}>
            <div className={styles.statsTitle}>
              Average
            </div>
            <div className={styles.statsValue}>
              ₹{averageExpense}
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">

          <button
            className={`btn btn-primary ${styles.submitBtn}`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "− Close Form" : "+ Add Expense"}
          </button>

          {showForm && (
            <div className="mt-4">
              <ExpenseForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                editId={editId}
              />
            </div>
          )}

        </div>
      </div>
      <input
        type="text"
        className="form-control my-4"
        placeholder="🔍 Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="d-flex gap-2 flex-wrap mb-4">
        {[
          "All",
          "Food",
          "Travel",
          "Shopping",
          "Bills",
          "Entertainment",
          "Others",
        ].map((category) => (
          <button
            key={category}
            className={`${styles.categoryPill} ${selectedCategory === category
              ? styles.activePill
              : ""
              }`}
            style={{
              backgroundColor:
                selectedCategory === category
                  ? categoryColors[category]
                  : "#f3f4f6",
              color:
                selectedCategory === category
                  ? "#fff"
                  : "#333",
            }}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <select
        className="form-select mb-4"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest">Highest Amount</option>
        <option value="lowest">Lowest Amount</option>
      </select>
      <ExpenseList
        expense={sortedExpenses}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
        viewExpense={viewExpense}
      />
      {
        selectedExpense && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">
                    Expense Details
                  </h5>

                  <button
                    className="btn-close"
                    onClick={() => setSelectedExpense(null)}
                  ></button>
                </div>

                <div className="modal-body">
                  <p>
                    <strong>Title:</strong>{" "}
                    {selectedExpense.title}
                  </p>

                  <p>
                    <strong>Amount:</strong> ₹
                    {selectedExpense.amount}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {selectedExpense.category}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {selectedExpense.date}
                  </p>

                  <p>
                    <strong>Description:</strong>
                    <br />
                    {selectedExpense.description ||
                      "No description"}
                  </p>
                </div>

              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default Expenses;
