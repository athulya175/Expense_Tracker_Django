import { useState } from "react";
import axios from "axios";
import styles from './Register.module.css'
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

  const handleSubmit = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/register/",
        formData
      )
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
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

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
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