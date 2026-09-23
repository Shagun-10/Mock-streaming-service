import { useState } from "react";

export default function ResumeReviewer() {
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [score, setScore] = useState(null);

  const analyzeResume = () => {
    const text = resumeText.trim();

    if (!text) {
      setFeedback(["Please enter a resume before reviewing."]);
      setScore(0);
      return;
    }

    const issues = [];

    // Basic checks (simple but assignment-safe logic)
    if (text.length < 100) {
      issues.push("Resume is too short. Add more detail.");
    }

    if (!text.toLowerCase().includes("experience")) {
      issues.push("Missing 'Experience' section.");
    }

    if (!text.toLowerCase().includes("education")) {
      issues.push("Missing 'Education' section.");
    }

    if (!text.toLowerCase().includes("skills")) {
      issues.push("Missing 'Skills' section.");
    }

    // Score logic
    let calculatedScore = 100 - issues.length * 20;
    if (calculatedScore < 0) calculatedScore = 0;

    setFeedback(issues.length ? issues : ["Resume looks well structured 👍"]);
    setScore(calculatedScore);
  };

  const clearAll = () => {
    setResumeText("");
    setFeedback([]);
    setScore(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Resume Reviewer</h2>

      <textarea
        style={styles.textarea}
        placeholder="Paste your resume here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <div style={styles.buttonRow}>
        <button style={styles.button} onClick={analyzeResume}>
          Review Resume
        </button>

        <button style={styles.clearButton} onClick={clearAll}>
          Clear
        </button>
      </div>

      {score !== null && (
        <div style={styles.scoreBox}>
          <h3>Score: {score} / 100</h3>
        </div>
      )}

      <div style={styles.feedbackBox}>
        {feedback.map((item, index) => (
          <p key={index}>• {item}</p>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#0b1b3a",
    color: "white",
    borderRadius: "10px",
    marginTop: "20px"
  },
  title: {
    marginBottom: "10px"
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "10px"
  },
  buttonRow: {
    display: "flex",
    gap: "10px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  clearButton: {
    padding: "10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  scoreBox: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#1e3a8a",
    borderRadius: "8px"
  },
  feedbackBox: {
    marginTop: "10px"
  }
};