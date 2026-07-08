import { useState, useEffect } from "react";
import styles from "./AIInsights.module.css";
import { FaRobot } from "react-icons/fa";
import {
    MdInsights,
    MdSavings,
    MdTrendingUp,
} from "react-icons/md";
import api from "../api/api";

function AIInsights() {
    const [aiData, setAiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [asking, setAsking] = useState(false);
    const fetchAIInsights = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "http://127.0.0.1:8000/api/ai-insights/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAiData(response.data);

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };
    const askAI = async () => {

        if (!question.trim()) return;

        setAsking(true);

        try {

            const response = await api.post(
                "ask-ai/",
                {
                    question: question
                }
            );

            setAnswer(response.data.answer);

            // Clear the textarea after successful response
            setQuestion("");

        } catch (error) {

            console.log(error);

        } finally {

            setAsking(false);

        }

    };
    useEffect(() => {
        fetchAIInsights();
    }, []);
    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>

                <h2>🤖 AI is analyzing your expenses...</h2>

                <p>
                    Generating personalized financial insights...
                </p>
            </div>
        );
    }
    return (

        <div className={styles.container}>

            {/* Header */}

            <div className={styles.header}>

                <div className={styles.titleRow}>
                    <FaRobot
                        size={34}
                        color="#5b4ddb"
                    />

                    <h1>AI Financial Insights</h1>
                </div>

                <p>
                    Personalized insights based on
                    your spending habits.
                </p>

            </div>

            {/* Financial Score */}
            <div className={styles.topSection}>

                <div className={styles.scoreCard}>

                    <h3>Financial Score</h3>
                    {aiData?.status === "Not Started" ? (
                        <div className={styles.emptyState}>
                            <h3>Start Tracking Your Expenses</h3>
                            <p>
                                Add your monthly budget and at least one expense to receive AI insights.
                            </p>
                        </div>
                    ) : (
                        <div className={styles.scoreCircle}>
                            <h1>{aiData.score}</h1>
                            <span>/100</span>
                        </div>
                    )}

                    < p className={styles.good}>
                        {aiData?.status}
                    </p>

                </div>

                <div className={styles.summaryCard}>

                    <h3>AI Summary</h3>

                    <ul>
                        <li>
                            💰 Budget Remaining :
                            ₹{aiData?.budget_remaining || 0}
                        </li>
                        <li>
                            🍔 Highest Spending :
                            {aiData?.highest_category || "-"}
                        </li>
                        <li>
                            📈 Spending Trend :
                            {aiData?.trend || "-"}
                        </li>

                        <li>
                            🎯 Goal Status :
                            {aiData?.goal_status || "-"}
                        </li>

                    </ul>

                </div>

            </div>
            {/* Insight Cards */}

            <div className={styles.bottomGrid}>

                <div className={styles.largeCard}>

                    <h3>
                        <MdInsights /> Smart Insights
                    </h3>



                    <ul>
                        {aiData?.insights?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>



                </div>

                <div className={styles.largeCard}>

                    <h3>
                        <MdSavings /> AI Recommendations
                    </h3>

                    <ul>
                        {aiData?.recommendations?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                </div>

            </div>

            {/* Ask AI */}

            <div className={styles.askCard}>

                <h3>Ask AI</h3>

                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask anything about your expenses..."
                    disabled={asking}
                />

                <button
                    onClick={askAI}
                    disabled={asking}
                >
                    {asking ? "Thinking..." : "Ask AI"}
                </button>
                {
                    answer && (
                        <div className={styles.answerCard}>
                            <h4>🤖 AI Response</h4>

                            <p>{answer}</p>
                        </div>
                    )
                }

            </div>

        </div >
    );
}

export default AIInsights;