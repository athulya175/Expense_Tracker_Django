import { useState, } from "react";
import api from "../api/api";
import styles from './Register.module.css'
import { useNavigate } from "react-router-dom";
function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleSubmit = () => {
    api
      .post(
        "http://127.0.0.1:8000/api/register/",
        formData
      )
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Full Error:", error);
        setErrors(error.response.data);
      });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className="container mt-5" >
          <h2>Create Account ✨</h2>
          <p className={styles.subtitle}>Start tracking your expenses today</p>

          <input
            className="form-control mb-3"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          {errors.username && (
            <small className="text-danger">
              {errors.username[0]}
            </small>
          )}
          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          {errors.email && (
            <small className="text-danger">
              {errors.email[0]}
            </small>
          )}
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {errors.email && (
            <small className="text-danger">
              {errors.username[0]}
            </small>
          )}
          <button
            className={styles.registerBtn}
            onClick={handleSubmit}
          >
            Register
          </button>
          <p className="text-center mt-3">
            Already have an account?
            <a href="/login"> Login</a>
          </p>
        </div >
      </div>
    </div >
  );
}

export default Register;