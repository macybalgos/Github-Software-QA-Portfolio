
# 🐞 Groq Bug Creator

An AI-powered **bug description generator** built with **Vite (React)** and **Node.js (Express)** using **Groq AI models**.  
This tool helps QA engineers quickly generate structured bug reports for faster and more consistent testing documentation.

---

## 🚀 Features

- 🤖 **AI-Generated Bug Reports** via Groq API  
- ⚡ Fast and modern UI built with **Vite + React**  
- 🧩 **Simple backend** powered by Express.js  
- 🧠 Useful for QA engineers, testers, and developers  
- 🔒 Local Groq API key for secure usage  

---

## 🧰 Tech Stack

**Frontend**
- React (Vite)
- Axios
- Modern CSS 

**Backend**
- Node.js + Express.js  
- Groq API for natural language generation  

---

## 📂 Folder Structure

```
Github-Software-QA-Portfolio/
└── groq-bug-creator/
    ├── client/
    │   ├── src/
    │   │   ├── App.jsx
    │   │   ├── App.css
    │   │   └── main.jsx
    │   ├── package.json
    │   └── vite.config.js
    │
    └── server/
        ├── index.js
        ├── package.json
        └── .env
```

---

## ⚙️ Setup Instructions

### 1. Clone this repository

```bash
git clone https://github.com/your-username/Github-Software-QA-Portfolio.git
cd Github-Software-QA-Portfolio/groq-bug-creator
```

### 2. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Create environment file

In the **server** folder, create a `.env` file and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

> ⚠️ **Important:** Do not share or commit your API key.

---

## ▶️ Running the App

Use **two terminals** — one for the backend and one for the frontend.

```bash
# Terminal 1 (backend)
cd server
npm run server
```

```bash
# Terminal 2 (frontend)
cd client
npm run dev
```

Then open in your browser:

👉 **http://localhost:5173**

---

## 💡 How It Works

1. Type a **bug or issue description** (e.g. _“Uploaded image doesn’t appear on profile page”_).  
2. Click **Generate Bug**.  
3. The backend sends your prompt to the **Groq API**.  
4. Groq generates a **structured bug report**.  
5. You review, refine, and verify before filing it officially.

---

## 🧾 Example Output

**Input:**
> Login button not working

**Output:**
```
**Title:** Login button does not respond on click  
**Steps to Reproduce:**
1. Open the login page.
2. Enter valid credentials.
3. Click the "Login" button.

**Expected Result:**  
User should be redirected to the dashboard.

**Actual Result:**  
Button remains inactive; no response or navigation occurs.

**Severity:** Major  
**Environment:** Chrome 120, Windows 11
```

---

## ⚠️ QA Disclaimer

> ⚠️ This tool provides **AI-generated bug reports** for faster drafting.  
> As a **QA Engineer**, you must review, validate, and reproduce each generated issue before filing it into your official bug tracker (e.g., JIRA, TestRail, Azure DevOps, etc.).  
> Always ensure the accuracy of test evidence and reproduction steps.


---

## 👤 Author

**Rosbel B. Garde**  
Software QA Engineer
📧 rosbelbalgos@gmail.com
🌐 https://github.com/macybalgos
