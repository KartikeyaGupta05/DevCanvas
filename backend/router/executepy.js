import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const executepy = (filepath) => {
  return new Promise((resolve, reject) => {
    const uniqueName = path.basename(filepath).split(".")[0];

    const wayName = path.join(__dirname, "../python_runner");
    console.log("📍 Python Runner Location:", wayName);

    exec(`cd "${wayName}" && python ${uniqueName}.py`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Python execution error:", error);
        return reject(error);
      }

      if (stderr) {
        console.error("⚠️ Python stderr:", stderr);
        return reject(stderr);
      }

      console.log("✅ Python output:", stdout);
      resolve(stdout);
    });
  });
};
