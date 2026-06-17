import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/token/",
        formData
      )
      .then((response) => {
        localStorage.setItem(
          "token",
          response.data.access
        );

        localStorage.setItem(
          "refresh",
          response.data.refresh
        );

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className="container mt-5">
          <h1 className={styles.title}>Welcome Back 👋</h1>
          <p className={styles.subtitle}>
            Sign in to manage your expenses
          </p>

          <input
            className="form-control mb-3"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            className={`btn btn-primary ${styles.loginBtn}`}
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;