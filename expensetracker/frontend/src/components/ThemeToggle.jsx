import { FiMoon, FiSun } from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";

import styles from "./ThemeToggle.module.css";

function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    return (

        <div
            className={styles.toggle}
            onClick={toggleTheme}
        >

            <div
                className={`${styles.slider}
                ${theme === "dark" ? styles.dark : ""}`}
            />

            <FiSun className={styles.sun} />

            <FiMoon className={styles.moon} />

        </div>

    );

}

export default ThemeToggle;