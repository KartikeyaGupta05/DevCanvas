# DevCanvas Frontend

DevCanvas Frontend is a modern, dark-themed web application built with **React** and **Tailwind CSS**.  
It provides a fast, intuitive, and AI-assisted coding experience directly in the browser.

---

## ✨ Features

- Multi-language code editors
- Live HTML / CSS / JavaScript preview
- Voice-to-code input
- Image-to-code conversion
- AI-powered debugging and code improvement
- Modern animated UI
- Fully responsive design
- Authentication (Login / Register)

---

## 🧱 Tech Stack

- React (Vite)
- Tailwind CSS
- React Router
- Lucide Icons
- React Hot Toast
- Gemini AI (via backend)

---

## 📂 Folder Structure

```

src/
├── Components/
│   ├── Editor/            # Language editors
│   ├── AI/                # AI Button, Panel, Hook
│   ├── Screens/           # Pages (Home, Login, Register)
│   └── Header.jsx         # Global Navbar
├── assets/                # Images and icons
├── reducer/               # Global state
├── TestCase/              # Component tests
├── App.jsx
├── main.jsx
└── index.css

````

---

## 🧠 Editors Supported

- C
- C++
- Java
- Python
- Dart
- JavaScript
- HTML / CSS / JS
- Voice to Text
- Image to Text

Each editor includes:
- Code input area
- Run button
- Output panel
- AI assistance panel

---

## 🤖 AI Assistant (Frontend)

The AI assistant:
- Appears automatically when errors occur
- Explains compiler and runtime errors in simple language
- Suggests corrected and optimized code
- Supports follow-up questions for deeper understanding

The AI UI is reusable and consistent across all editors.

---

## ▶️ Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
````

The frontend will run on:

```
http://localhost:5173
```

---

## 🔗 Environment Variables

Create a `.env` file inside the `frontend/` directory:

```env
VITE_SERVER_URL=http://localhost:5000
```

---

## 🎨 Design Philosophy

* Dark theme optimized for developers
* Minimal distractions
* Fast feedback loops
* Clear error visualization
* Consistent branding across all pages

---

## 🧪 Testing

Basic component testing is implemented using:

* `@testing-library/react`

Test cases are located in:

```
src/TestCase/
```

---

## 👨‍💻 Author

**Kartikeya Gupta**
DevCanvas – Frontend UI & UX

