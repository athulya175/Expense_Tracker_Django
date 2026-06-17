import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);
  return (
    <nav className={styles.navbar}>
      <Link className={styles.brand} to="/">
        Expense Tracker
      </Link>

      <div ref={menuRef}>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* ✅ Moved inside menuRef — clicks here won't trigger handleClickOutside */}
        <div
          className={`${styles.navLinks} ${menuOpen ? styles.activeMenu : ""}`}
        >
          {token ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/expenses"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={() => setMenuOpen(false)}
              >
                Expenses
              </NavLink>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={() => setMenuOpen(false)}
              >
                Reports
              </NavLink>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
