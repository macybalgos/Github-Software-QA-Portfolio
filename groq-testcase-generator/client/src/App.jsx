import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [feature, setFeature] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Format AI response for HTML display
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

  // Parse text into structured rows for Excel
  const parseTestCases = (text) => {
    const rows = [];
    const testCases = text.split(/Test Case \d+:/i).filter(Boolean);

    testCases.forEach((tc) => {
      const idMatch = tc.match(/Test Case ID:\s*(.*)/i);
      const objectiveMatch = tc.match(/Objective:\s*(.*)/i);
      const preconditionsMatch = tc.match(/Preconditions:\s*([\s\S]*?)\* Steps:/i);
      const stepsMatch = tc.match(/Steps:\s*([\s\S]*?)\* Expected Result:/i);
      const expectedMatch = tc.match(/Expected Result:\s*([\s\S]*?)\* Test Data:/i);
      const dataMatch = tc.match(/Test Data:\s*([\s\S]*)/i);

      rows.push({
        Title: tc.split("\n")[0].trim(),
        "Test Case ID": idMatch ? idMatch[1].trim() : "",
        Objective: objectiveMatch ? objectiveMatch[1].trim() : "",
        Preconditions: preconditionsMatch ? preconditionsMatch[1].replace(/\n\+/g, "\n").trim() : "",
        Steps: stepsMatch ? stepsMatch[1].replace(/\n\d+\./g, "\n").trim() : "",
        "Expected Result": expectedMatch ? expectedMatch[1].replace(/\n\+/g, "\n").trim() : "",
        "Test Data": dataMatch ? dataMatch[1].replace(/\n\+/g, "\n").trim() : "",
      });
    });

    return rows;
  };

  // Collapsible HTML for test cases
  const createCollapsibleHTML = (text) => {
    if (!text) return "No test cases generated yet.";
    const testCases = text.split(/Test Case \d+:/i).filter(Boolean);
    let html = "";
    testCases.forEach((tc, idx) => {
      const titleLine = tc.split("<br/>")[0] || `Test Case ${idx + 1}`;
      html += `
        <details style="margin-bottom:10px;">
          <summary style="cursor:pointer; font-weight:bold; color:#4fc3f7;">Test Case ${idx + 1}: ${titleLine}</summary>
          <div style="margin-left:12px; color:#e0e0e0; font-size:14px; line-height:1.6;">
            ${tc}
          </div>
        </details>
      `;
    });
    return html;
  };

  // Handle generate button
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
      const text = data.testCases || data.output || data.result || "";
      if (text) {
        setOutput(formatOutput(text));
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

  // Export current test cases to Excel
  const handleExport = () => {
    if (!output) return alert("No test cases to export.");
    const text = output.replace(/<br\/>/g, "\n").replace(/<strong>/g, "").replace(/<\/strong>/g, "");
    const rows = parseTestCases(text);

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Test Cases");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "test-cases.xlsx");
  };

  // Clear generated test cases
  const handleClear = () => setOutput("");

  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#121212",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "30px",
          background: "#1e1e1e",
          borderRadius: "16px",
          padding: "40px",
          width: "90%",
          maxWidth: "1200px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        }}
      >
        {/* Left Section */}
        <div>
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <h1 style={{ fontSize: "26px", color: "#4fc3f7", margin: 0 }}>🧠 R. Garde</h1>
            <p style={{ fontSize: "18px", color: "#e0e0e0", marginTop: "6px" }}>
              Test Case Generator
            </p>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              backgroundColor: "#333333",
              border: "1px solid #555555",
              borderRadius: "10px",
              padding: "12px",
              marginBottom: "15px",
              fontSize: "14px",
              color: "#bbbbbb",
            }}
          >
            ⚠️ Disclaimer: I use these generated test cases as a <strong>basis or starting point</strong>. 
            They are <strong>automatically created by AI</strong> and should be <strong>reviewed and refined</strong> before considering them as final test cases. 
            These are <strong>not the only possible scenarios</strong> — testers must <strong>think out of the box</strong> to cover additional cases.
          </div>

          <textarea
            rows="6"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            placeholder="Enter your feature or requirement..."
            style={{
              width: "94%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #444444",
              backgroundColor: "#2c2c2c",
              color: "#e0e0e0",
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
              backgroundColor: loading ? "#5a9eff" : "#4fc3f7",
              color: "#121212",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.2s ease",
              marginBottom: "10px",
            }}
          >
            {loading ? "Generating..." : "Generate Test Cases"}
          </button>

          <button
            onClick={handleExport}
            style={{
              width: "100%",
              backgroundColor: "#66bb6a",
              color: "#121212",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.2s ease",
              marginBottom: "10px",
            }}
          >
            Export to Excel
          </button>

          <button
            onClick={handleClear}
            style={{
              width: "100%",
              backgroundColor: "#f44336",
              color: "#ffffff",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.2s ease",
            }}
          >
            Clear Test Cases
          </button>
        </div>

        {/* Right Section */}
        <div
          style={{
            background: "#2c2c2c",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #444444",
            overflowY: "auto",
            height: "480px",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#4fc3f7" }}>Generated Test Cases</h2>

          {/* Total Test Cases Badge */}
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#4fc3f7",
              color: "#121212",
              fontWeight: "bold",
              padding: "6px 12px",
              borderRadius: "12px",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            Total Test Cases: {output ? output.split(/Test Case \d+:/i).filter(Boolean).length : 0}
          </div>

          <div
            style={{
              color: "#e0e0e0",
              fontSize: "15px",
              lineHeight: "1.7",
            }}
            dangerouslySetInnerHTML={{
              __html: createCollapsibleHTML(output),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
