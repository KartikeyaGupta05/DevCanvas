# 🚀 DevCanvas – AI Powered Online Code Editor

DevCanvas is a full-stack, AI-powered online code editor that allows users to write, run, debug, and improve code directly in the browser.  
It supports multiple programming languages, real-time web previews, voice & image based inputs, and an integrated AI assistant for debugging and optimization.

Built with **modern frontend tooling**, **secure backend execution**, and **Gemini AI integration**, DevCanvas is designed for both learning and productivity.

---

## 🌟 Key Highlights

- Multi-language online compiler
- Live Web Editor (HTML / CSS / JS)
- AI-powered debugging & code improvement
- Voice-to-Code support
- Image-to-Code extraction
- Secure server-side execution
- Modern animated UI
- Authentication system
- Scalable backend architecture

---

## 🧠 Supported Languages & Tools

### Programming Languages
- C
- C++
- Java
- Python
- Dart
- JavaScript

### Special Editors
- HTML / CSS / JavaScript Live Preview
- Voice to Text (Speech Recognition)
- Image to Text (OCR based)

---

## 🤖 AI Capabilities (Gemini AI)

DevCanvas integrates **Gemini AI** to assist developers by:

- Explaining compilation & runtime errors
- Suggesting corrected code
- Improving code quality & performance
- Answering follow-up questions interactively

AI is deeply integrated into every editor via a reusable AI panel.

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Lucide Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Gemini AI SDK
- Secure Code Execution (C, C++, Java, Python, Dart)

---

## 📁 Project Structure

```

DevCanvas
├── backend
│   ├── app.js
│   ├── router/
│   ├── services/
│   ├── model/
│   ├── db/
│   ├── c_runner/
│   ├── cpp_runner/
│   ├── java_runner/
│   ├── python_runner/
│   ├── dart_runner/
│   └── .env
│
├── frontend
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Editor/
│   │   │   ├── AI/
│   │   │   ├── Screens/
│   │   │   └── Header.jsx
│   │   ├── assets/
│   │   ├── reducer/
│   │   ├── TestCase/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env
│   └── README.md
│
├── package.json
└── readme.md

````

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
npm start
````

Backend runs on:

```
http://localhost:5000
```

### Backend Environment Variables (`backend/.env`)

```env
PORT=5000
DB=your_mongodb_connection_string
SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

### Frontend Environment Variables (`frontend/.env`)

```env
VITE_SERVER_URL=http://localhost:5000
```

---

## 🔐 Authentication

* User Registration
* Login / Logout
* Secure password storage
* Auth-protected routes (expandable)

---

## 🧪 Testing

* Component testing with `@testing-library/react`
* Editor behavior validation
* UI rendering tests

Tests are located in:

```
frontend/src/TestCase/
```

---

## 🎯 Use Cases

* Practice coding online
* Debug compiler/runtime errors with AI
* Learn programming interactively
* Prototype web interfaces instantly
* Accessibility via voice commands
* Convert UI screenshots into code

---

## 📈 Future Enhancements

* User dashboards
* Save & share code snippets
* Collaborative coding
* AI auto-fix suggestions
* Execution history
* Cloud deployment scaling

---

## 👨‍💻 Author

**Kartikeya Gupta**
Full-Stack Developer | AI & Developer Tools Enthusiast

DevCanvas – Code. Debug. Improve. 🚀

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
