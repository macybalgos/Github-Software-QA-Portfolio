# Groq Test Case Generator

🧠 **R. Garde - Test Case Generator**

This project is a web-based tool that generates software test cases from user-provided features or requirements using AI. It allows you to quickly create test cases and export them to Excel for documentation purposes.

---

## Features

- Generate test cases from any feature or requirement.
- Automatically formats test cases for readability.
- Export generated test cases to Excel.
- Dark mode, modern UI for easy usage.
- Disclaimer included to remind testers that generated test cases are a **starting point**.
- Test case count displayed for quick reference.
- Collapsible test cases for better UI navigation.

---

## Disclaimer

⚠️ I use these generated test cases as a **basis or starting point**.  
They are **automatically created by AI** and should be **reviewed and refined** before considering them as final test cases.  
These are **not the only possible scenarios** — testers must **think out of the box** to cover additional cases.

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/Github-Software-QA-Portfolio.git
```

2. Navigate to the `groq-testcase-generator/client` directory:

```bash
cd groq-testcase-generator/client
```

3. Install dependencies:

```bash
npm install
```

---

## Running the App

1. Start the backend server (make sure you have it running):

```bash
node server/server.js
```

2. Start the frontend client:

```bash
npm run dev
```

3. Open the app in your browser:

```
http://localhost:5173/
```

---

## Usage

1. Enter a feature or requirement in the text area.
2. Click **Generate Test Cases**.
3. Review the generated test cases in the right panel.
4. Export to Excel by clicking **Export to Excel**.
5. Use collapsible sections for easier navigation of multiple test cases.

---

## Tech Stack

- React.js (Frontend)
- Node.js (Backend)
- Vite (Build Tool)
- AI API for test case generation
- XLSX and FileSaver.js for Excel export

---

## Contribution

Feel free to submit issues or pull requests. Ensure sensitive information (like API keys) is **never committed** to the repository.

---

## License

This project is for personal portfolio and demonstration purposes.
