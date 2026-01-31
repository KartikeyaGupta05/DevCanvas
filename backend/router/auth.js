import express from "express";
import bcrypt from "bcryptjs";

import { executepy } from "./executepy.js";
import { executeDart } from "./executeDart.js";
import { executeC } from "./executeC.js";
import { executeCpp } from "./executeCpp.js";
import { executeJava } from "./executeJava.js";

import { generatePyfile } from "./generatePy.js";
import { generateDartfile } from "./generateDart.js";
import { generateCfile } from "./generateC.js";
import { generateCppfile } from "./generateCpp.js";
import { generateJavafile } from "./generateJava.js";

import User from "../model/userSchema.js";

const router = express.Router();

/* ================= HOME ================= */
router.get("/", (req, res) => {
  res.send("Welcome to the Home page from auth.js");
});

/* ================= PYTHON RUN ================= */
router.use(express.urlencoded({ extended: true }));

router.post("/runpy", async (req, res) => {
  const { language = "py", code = "print('hello python')" } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Please Enter Code" });
  }

  try {
    const filepath = await generatePyfile(language, code);
    const output = await executepy(filepath);
    res.json({ filepath, output });
  } catch (err) {
    const errorMessage = err.toString();
    const match = errorMessage.match(/line \d+\s+([^\n]+)/);
    const realError = match ? match[0] : "Unknown error occurred";
    res.status(500).json({ error: realError });
  }
});

/* ================= DART RUN ================= */
router.post("/rundart", async (req, res) => {
  return res.status(501).json({
    error:
      "Dart execution is currently disabled. Dart SDK is not installed on the server. You can write, copy, and download Dart code.",
  });
});

/*================= C RUN ================= */
router.post("/runc", async (req, res) => {
  const {
    language = "c",
    code = '#include <stdio.h> \nint main() { printf("Hello, World!\\n"); return 0; }',
  } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: "Please Enter Code" });
  }

  try {
    const file = await generateCfile(code);
    const output = await executeC(file);
    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

/*================= CPP RUN ================= */
router.post("/runcpp", async (req, res) => {
  const {
    language = "cpp",
    code = '#include <iostream>\nint main() { std::cout << "Hello, World!" << std::endl; return 0; }',
  } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: "Please Enter Code" });
  }

  try {
    const file = await generateCppfile(code);
    const output = await executeCpp(file);
    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

/*================= JAVA RUN ================= */
router.post("/runjava", async (req, res) => {
  const {
    language = "java",
    code = 'public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }',
  } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: "Please Enter Code" });
  }

  try {
    const file = await generateJavafile(code);
    const output = await executeJava(file);
    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  const { username, email, password, cpassword, role } = req.body;

  if (!username || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Fill all required fields" });
  }

  if (password !== cpassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const userExist = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (userExist) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const user = new User({
      username,
      email: email.toLowerCase().trim(),
      password,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();

    res.cookie("jwt_users_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ================= LOGOUT ================= */
router.get("/logout", (req, res) => {
  res.status(200).json({ message: "User logged out" });
});

export default router;
