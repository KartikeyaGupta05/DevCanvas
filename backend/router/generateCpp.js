import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "../cpp_runner");
console.log("✅ Python files are storing at:", dirCodes);

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

export const generateCppfile = async (content) => {
  const jobId = uuid();
  const filename = `${jobId}.cpp`;
  const filepath = path.join(dirCodes, filename);

  fs.writeFileSync(filepath, content);
  return { filepath, jobId };
};
