# 🛠 DevCanvas Backend

DevCanvas Backend is a robust **Node.js + Express** server that powers secure code execution, AI-assisted debugging, and authentication for the DevCanvas platform.

It handles real-time compilation, execution, error handling, and AI-powered explanations for multiple programming languages.

---

## 🚀 Features

- Multi-language code execution  
  - C  
  - C++  
  - Java  
  - Python  
  - Dart  

- Secure, isolated file-based execution
- AI-powered error explanation & code improvement (Gemini AI)
- User authentication (Login / Register)
- RESTful API architecture
- MongoDB-based user management

---

## 🧠 Architecture Overview

```

Frontend (React)
↓
Express API
↓
Language Runners
(C / C++ / Java / Python / Dart)
↓
Execution Output / Errors

```

Each execution request follows this flow:

1. Generate a temporary source file (UUID-based)
2. Compile and/or execute using the respective language runner
3. Capture stdout / stderr
4. Return output or error securely to frontend
5. Clean up temporary files

---

## 📂 Folder Structure

```

backend/
├── app.js                # Server entry point
├── router/               # API routes
│   ├── auth.js           # Authentication routes
│   ├── ai.js             # AI helper routes
│   ├── executeC.js
│   ├── executeCpp.js
│   ├── executeJava.js
│   ├── executePy.js
│   ├── executeDart.js
│   ├── generateC.js
│   ├── generateCpp.js
│   ├── generateJava.js
│   ├── generatePy.js
│   └── generateDart.js
├── services/
│   └── gemini.service.js # Gemini AI integration
├── model/
│   └── userSchema.js     # User schema
├── db/
│   └── conn.js           # MongoDB connection
├── c_runner/             # C execution files
├── cpp_runner/           # C++ execution files
├── java_runner/          # Java execution files
├── python_runner/        # Python execution files
├── dart_runner/          # Dart execution files
├── package.json
└── .env                  # Environment variables

````

---

## 🔑 Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
DB=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
````

---

## ▶️ Run Backend Locally

```bash
cd backend
npm install
npm start
```

Backend will start on:

```
http://localhost:5000
```

---

## 🧪 Supported Languages

* C
* C++
* Java
* Python
* Dart

Each language uses a **dedicated runner directory** for isolation and security.

---

## 🤖 AI Integration (Gemini)

DevCanvas integrates **Google Gemini AI** to:

* Explain compilation and runtime errors
* Suggest corrected code
* Improve code quality and performance
* Answer follow-up questions contextually

AI is **context-aware**:

* Reads user code
* Reads compiler output
* Responds with structured explanations

---

## 🔐 Security Notes

* Temporary files generated using UUIDs
* Isolated execution per request
* No user code stored permanently
* API keys remain server-side only
* No direct shell access from client

---

## 📌 Future Improvements

* Docker-based sandbox execution
* Execution time & memory limits
* Rate limiting for AI requests
* User-based execution history
* Scalable job queue for heavy workloads

---

## 👨‍💻 Author

**Kartikeya Gupta**
Computer Science (AI & DS)

DevCanvas – Backend Architecture & Execution Engine


