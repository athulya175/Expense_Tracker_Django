import React, { useState } from 'react'
import styles from "./Reports.module.css"
import { TbReportAnalytics } from "react-icons/tb";
import ReportsStats from "../components/ReportStats";

function Reports() {
    const currentMonth = new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
    });
    const currentYear = new Date().getFullYear();
    let years = []
    for (let year = currentYear; year >= 2020; year--) {
        years.push(year)
    }
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <div className={styles.titleRow}>
                        <TbReportAnalytics size={34} color="#4f46e5" />
                        <h1>Reports</h1>
                    </div>
                    <p>
                        Analyze your spending trends, compare monthly
                        expenses, and gain valuable financial insights.
                    </p>
                </div>
                <div className={styles.dateBadge}>
                    {currentMonth}
                </div>
            </div>
            {/* Filters */}
            <div className={styles.filterContainer}>
                <select className={styles.filterInput}
                    value={selectedMonth}
                    onChange={(e) =>
                        setSelectedMonth(e.target.value)
                    }>
                    <option value="">All Months</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select
                    className={styles.filterInput}
                    value={selectedCategory}
                    onChange={(e) =>
                        setSelectedCategory(e.target.value)
                    }
                >
                    <option value="">All Categories</option>
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Entertainment</option>
                    <option>Others</option>
                </select>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="🔍 Search expenses..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />
            </div>
            <ReportsStats />
        </div>
    )
}

export default Reports
