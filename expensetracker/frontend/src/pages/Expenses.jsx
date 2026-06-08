import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Expenses() {
  const [expense, setExpense] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = () => {
    let url = "http://127.0.0.1:8000/api/expenses/";

    if (selectedDate) {
      url += `?date=${selectedDate}`;
    }

    axios.get(url).then((response) => {
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
  axios
    .post(
      "http://127.0.0.1:8000/api/expenses/",
      formData
    )
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
};
const deleteExpense=(id)=>{
    axios .delete(`http://127.0.0.1:8000/api/expenses/${id}/`)
    .then(()=>{
        fetchData()
    })
    .catch((error)=>{
        console.log(error)
    })
}
  return (
     <div className="container mt-4">
    <h1 className="text-center">Expenses</h1>

    <ExpenseForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      editId={editId}
    />
<ExpenseList expense={expense}
deleteExpense={deleteExpense} />
  </div>
  );
}

export default Expenses;