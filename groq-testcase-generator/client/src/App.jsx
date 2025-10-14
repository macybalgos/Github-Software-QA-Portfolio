import { useState } from "react";

function App() {
  const [feature, setFeature] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const formatOutput = (text) => {
    if (!text) return "";
    let formatted = text.replace(/\*\*\*/g, "").replace(/\*\*/g, "");
    formatted = formatted.replace(
      /(\d+\.\s*)([A-Za-z0-9\s&()\-\/]+)(:)/g,
      (_, num, title, colon) => `<strong>${num}${title.trim()}</strong>${colon}`
    );
    formatted = formatted.replace(/\n/g, "<br/>");
    return formatted;
  };

  const handleGenerate = async () => {
    if (!feature.trim()) return alert("Please enter a feature or requirement.");

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feature }),
      });

      const data = await response.json();
      if (data.output) {
        setOutput(formatOutput(data.output));
      } else {
        setOutput("No response from API.");
      }
    } catch (err) {
      console.error(err);
      setOutput("❌ Error connecting to server. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eef3ff",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "30px",
          background: "white",
          borderRadius: "16px",
          padding: "40px",
          width: "90%",
          maxWidth: "1200px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h1 style={{ fontSize: "26px", color: "#0078ff", margin: 0 }}>🧠 R. Garde</h1>
            <p style={{ fontSize: "18px", color: "#1a1a1a", marginTop: "6px" }}>
              Test Case Generator
            </p>
          </div>

          <textarea
            rows="6"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            placeholder="Enter your feature or requirement..."
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #d0d0d0",
              resize: "none",
              marginBottom: "15px",
              fontSize: "15px",
            }}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#5a9eff" : "#0078ff",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.2s ease",
            }}
          >
            {loading ? "Generating..." : "Generate Test Cases"}
          </button>
        </div>

        <div
          style={{
            background: "#f9faff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #e3e8f0",
            overflowY: "auto",
            height: "480px",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#0078ff" }}>Generated Test Cases</h2>
          <div
            style={{
              color: "#333",
              fontSize: "15px",
              lineHeight: "1.7",
            }}
            dangerouslySetInnerHTML={{
              __html: output || "Your generated test cases will appear here...",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;