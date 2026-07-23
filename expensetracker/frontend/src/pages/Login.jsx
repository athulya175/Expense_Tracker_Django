import { useState } from "react";
import api from "../api/api";
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
    setError("");
  };

  const handleSubmit = () => {
    api
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
        if (error.response?.status === 401) {
          setError("Invalid username or password.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  };
  const [error, setError] = useState("");

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
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          <button
            className={`btn btn-primary ${styles.loginBtn}`}
            onClick={handleSubmit}
          >
            Login
          </button>
          <p>Dont have a account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;