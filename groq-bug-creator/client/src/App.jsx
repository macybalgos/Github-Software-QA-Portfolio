import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [feature, setFeature] = useState("");
  const [bugReport, setBugReport] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!feature.trim()) return alert("Please enter a feature name.");
    setLoading(true);
    setBugReport("");

    try {
      const res = await axios.post("http://localhost:3001/api/generate-bug", { feature });
      setBugReport(res.data.bugReport);
    } catch (err) {
      console.error(err);
      setBugReport("❌ Error connecting to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>
        🐞 Bug Creator <span style={{ fontSize: "1rem", color: "#6b7280" }}></span>
      </h1>

      <input
        type="text"
        placeholder="Describe bug or issue (e.g. Confidential Password Display in Dev Tools)"
        value={feature}
        onChange={(e) => setFeature(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Bug"}
      </button>

      {bugReport && (
        <>
          <pre>{bugReport}</pre>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "0.5rem" }}>
            ⚠️ Disclaimer: This bug report is AI-generated. As a QA engineer, all reports should be
            manually verified before filing the actual issue.
          </p>
        </>
      )}
    </div>
  );
}

export default App;
