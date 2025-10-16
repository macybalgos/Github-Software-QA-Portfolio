# Playwright Test Suite – Swag Labs

This repository contains an automated **Playwright test suite** designed to validate the functionality and performance of the [Swag Labs](https://www.saucedemo.com/) application. The suite includes:

- Functional tests for login/logout flows
- Performance and resource tracking
- Browser console log capture

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running Test](#running-test)
5. [Generating Performance Reports](#generating-performance-reports)
6. [Understanding the Performance Report](#understanding-the-performance-report)
7. [Contributing](#contributing)
8. [License](#license)

---

## Project Overview

This Playwright test suite automates the following:

- **Login Scenarios**:
- **UI Element Verification**:
  - Page navigation
  - Element visibility and interaction
- **Logout Functionality**
- **Performance and Resource Tracking**:
  - Total test duration
  - Network requests (method, status, size, duration)
  - Browser console logs

All tests are executed in **headless or headed mode**, depending on configuration.

---

## Prerequisites

Before running the tests, ensure the following are installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Internet access (to reach Swag Labs demo site)

Optional:

- [Visual Studio Code](https://code.visualstudio.com/) for code editing
- Allure CLI (if generating advanced reports)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/macybalgos/Github-Software-QA-Portfolio.git
   cd Github-Software-QA-Portfolio/automation/playwright
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Install Playwright browsers:

   ```bash
   npx playwright install
   ```

---

## Running Test

Run all tests:

```bash
npm run test:report
```

---

## Generating Performance Reports

The tests automatically track performance and resource usage. After the test suite finishes:

- A **performance-report.html** is generated in `reports/`
- The report **automatically opens** in your default browser

---

## Understanding the Performance Report

The report provides:

- **Test Duration** – how long each test took to complete
- **Network Requests** – all resources loaded (API calls, images, CSS, JS) with:
  - HTTP method (GET, POST, etc.)
  - Status code
  - File size
  - Load duration
- **Console Logs** – JavaScript errors or warnings captured during the test

This helps identify slow-loading resources, failed network calls, or errors affecting user experience.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-test`)
3. Commit your changes (`git commit -m "Add new test"`)
4. Push to the branch (`git push origin feature/new-test`)
5. Create a pull request

---

## License

This project is licensed under the MIT License.

