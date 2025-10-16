import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

interface ResourceLog {
  url: string;
  method: string;
  status: number;
  duration: number;
  type: string;
  sizeKB?: number;
}

interface PerformanceResult {
  testName: string;
  duration: number;
  resources?: ResourceLog[];
  consoleLogs?: string[];
}

export class ReportHelper {
  private static results: PerformanceResult[] = [];

  static recordPerformance(
    testName: string,
    duration: number,
    resources: ResourceLog[] = [],
    consoleLogs: string[] = []
  ) {
    this.results.push({ testName, duration, resources, consoleLogs });
  }

  static saveReport(): void {
    const reportsDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

    const outputPath = path.join(reportsDir, 'performance-report.html');

    const rows = this.results.map((r, i) => {
      const resourceRows = (r.resources || [])
        .map((req) => {
          const size = req.sizeKB ? `${req.sizeKB.toFixed(1)} KB` : 'N/A';
          const duration = isNaN(req.duration) ? 'N/A' : `${req.duration.toFixed(2)} ms`;
          const statusColor =
            req.status >= 200 && req.status < 300
              ? 'success'
              : req.status >= 400
              ? 'error'
              : 'warning';

          return `
            <tr>
              <td><span class="badge ${req.method.toLowerCase()}">${req.method}</span></td>
              <td>${req.type}</td>
              <td><span class="status ${statusColor}">${req.status}</span></td>
              <td class="url-cell">${req.url}</td>
              <td>${size}</td>
              <td>${duration}</td>
            </tr>`;
        })
        .join('');

      const consoleSection =
        r.consoleLogs && r.consoleLogs.length
          ? `
        <div class="console-section">
          <h4>🧠 Console Logs</h4>
          <div class="console-logs">
            ${r.consoleLogs
              .map((log) => `<div class="console-line">${JSON.stringify(log)}</div>`)
              .join('')}
          </div>
        </div>`
          : '';

      return `
        <div class="test-card">
          <div class="test-header">
            <div class="test-header-left">
              <span class="test-index">#${i + 1}</span>
              <span class="test-name">${r.testName}</span>
            </div>
            <div class="test-header-right">
              <span class="test-duration">${r.duration.toFixed(2)} ms</span>
            </div>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Type</th>
                <th>Status</th>
                <th>URL</th>
                <th>Size</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              ${resourceRows}
            </tbody>
          </table>
          ${consoleSection}
        </div>`;
    });

    const html = `
      <html>
        <head>
          <title>Playwright Performance Report</title>
          <style>
            body {
              font-family: 'Segoe UI', Roboto, Arial, sans-serif;
              background: #f4f6f8;
              color: #333;
              padding: 20px;
              margin: 0;
            }
            h1 {
              text-align: center;
              color: #0078ff;
              margin-bottom: 10px;
            }
            .description {
              max-width: 900px;
              margin: 0 auto 30px auto;
              background: #ffffff;
              padding: 15px 20px;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
              border-left: 5px solid #0078ff;
              font-size: 15px;
              line-height: 1.6;
            }
            .description strong { color: #0078ff; }
            .test-card {
              background: #fff;
              border-radius: 12px;
              box-shadow: 0 3px 8px rgba(0,0,0,0.08);
              margin-bottom: 30px;
              overflow: hidden;
              border: 1px solid #e0e0e0;
            }
            .test-header {
              background: linear-gradient(90deg, #0078ff, #00bfff);
              color: #fff;
              padding: 12px 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              font-size: 15px;
            }
            .test-header-left {
              display: flex;
              align-items: center;
              gap: 10px;
              font-weight: 500;
            }
            .test-index {
              background: rgba(255,255,255,0.2);
              padding: 3px 8px;
              border-radius: 6px;
              font-weight: bold;
              font-size: 13px;
            }
            .data-table {
              width: 100%;
              border-collapse: collapse;
            }
            .data-table th, .data-table td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
              font-size: 13px;
            }
            .data-table th { background: #f0f6ff; position: sticky; top: 0; }
            .url-cell { max-width: 450px; overflow-wrap: anywhere; }
            .badge {
              padding: 3px 6px;
              border-radius: 4px;
              font-weight: 600;
              color: white;
              font-size: 12px;
            }
            .badge.get { background: #0078ff; }
            .badge.post { background: #00bfa5; }
            .badge.put { background: #ff9800; }
            .badge.delete { background: #e53935; }
            .status {
              padding: 3px 6px;
              border-radius: 4px;
              color: white;
              font-weight: 600;
              font-size: 12px;
            }
            .status.success { background: #4caf50; }
            .status.error { background: #f44336; }
            .status.warning { background: #ff9800; }
            .console-section {
              background: #f3f3f3;
              color: #333;
              padding: 10px 15px;
              margin: 15px;
              border-radius: 8px;
            }
            .console-section h4 { margin-top: 0; color: #0078ff; }
            .console-logs {
              font-family: monospace;
              font-size: 12px;
              background: #fafafa;
              padding: 10px;
              border-radius: 5px;
              overflow-x: auto;
              max-height: 200px;
            }
            .console-line {
              border-bottom: 1px solid #ddd;
              padding: 2px 0;
            }
            @media (prefers-color-scheme: dark) {
              body { background: #1e1e1e; color: #eee; }
              .test-card { background: #252526; border: 1px solid #333; }
              .data-table th { background: #2a2d2e; }
              .data-table td { border-color: #333; }
              .console-section { background: #2d2d2d; color: #ddd; }
              .console-logs { background: #1a1a1a; color: #ccc; }
            }
          </style>
        </head>
        <body>
          <h1>Swag Labs Performance Report</h1>

          <div class="description">
            <p>This performance report is automatically generated after running Playwright tests.</p>
            <p>It gives a clear picture of how your web app performed during testing — in simple terms:</p>
            <ul>
              <li><strong>Test duration:</strong> how long each test took to finish.</li>
              <li><strong>Network requests:</strong> every image, file, or API your browser loaded, showing its method, size, and response time.</li>
              <li><strong>HTTP status codes:</strong> which requests succeeded, failed, or had warnings.</li>
              <li><strong>Console logs:</strong> any browser messages or JavaScript errors captured during test execution.</li>
            </ul>
            <p>Use this to identify slow resources, failed network calls, or issues affecting performance and user experience.</p>
          </div>

          ${rows.join('')}
        </body>
      </html>
    `;

    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`✅ Performance report generated: ${outputPath}`);

    // 🚀 Automatically open the report
    if (process.platform === 'win32') {
      exec(`start "" "${outputPath}"`);
    } else if (process.platform === 'darwin') {
      exec(`open "${outputPath}"`);
    } else {
      exec(`xdg-open "${outputPath}"`);
    }
  }
}
