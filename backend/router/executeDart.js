import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const executeDart = (filepath) => {
  return new Promise((resolve, reject) => {
    const uniqueName = path.basename(filepath).split(".")[0];

    const wayName = path.join(__dirname, "../dart_runner");
    console.log("📍 Dart Runner Location:", wayName);

    exec(`cd "${wayName}" && dart ${uniqueName}.dart`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Dart execution error:", error);
        return reject(error);
      }

      if (stderr) {
        console.error("⚠️ Dart stderr:", stderr);
        return reject(stderr);
      }

      console.log("✅ Dart output:", stdout);
      resolve(stdout);
    });
  });
};
