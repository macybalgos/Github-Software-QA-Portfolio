// open-report.js
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportPath = path.join(__dirname, "performance-report.html");

console.log("📊 Opening Performance Report...");
exec(`start "" "${reportPath}"`); // Windows
// For Mac use: exec(`open "${reportPath}"`);
// For Linux use: exec(`xdg-open "${reportPath}"`);
