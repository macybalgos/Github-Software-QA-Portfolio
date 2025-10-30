
# 🐞 Groq Bug Creator

I developed this AI-powered tool using **Vite (React)** and **Node.js (Express)**, integrated with **Groq AI models**, to automate and enhance bug description generation.
It’s designed to assist QA engineers in producing structured, consistent, and detailed bug reports more efficiently.

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
> Confidential password display on dev tool

**Output:**
```
**Bug Report: Confidential Password Display on Dev Tool**

**Bug Title:** Incorrect Sensitive Data Display on Dev Tool Feature

**Description:** The Confidential Password Display on Dev Tool feature is not functioning as intended, causing sensitive user data to be exposed. This bug is critical as it poses a significant security risk to users' personal information.

**Steps to Reproduce:**

1. Log in to the application using admin credentials (username: "admin", password: "password123").
2. Navigate to the Developer Tools by pressing F12 or using the "Developer Tools" button in the browser.
3. In the Dev Tools, access the "Application" or "Console" tab.
4. Enter the `credentials` variable in the Dev Tools console and examine its contents.
5. Verify that the entered password is displayed in plain text.

**Expected Result:**

The password should be obfuscated or masked to prevent exposure. The output in the console should only display "*******" (or a similar masking mechanism) instead of the actual password.

**Actual Result:**

The password is displayed in plain text in the Dev Tools console, compromising user security. This is evident from the following screen shot:

[Insert screenshot or provide an example of the plain text password display]

**Severity:** Critical (Severity Level: 5/5)

This bug warrants immediate attention due to the significant security risk it poses. Exposure of sensitive user data can lead to identity theft, phishing attacks, and other malicious activities.

**Additional Notes:**

- This bug is specific to the Confidential Password Display on Dev Tool feature and does not affect other features or functionalities in the application.
- The development team should review and update the feature to ensure that sensitive data remains secure and protected.
- Consider implementing additional security measures, such as encryption or hashing algorithms, to safeguard user data.
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
