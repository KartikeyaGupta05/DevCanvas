import { exec } from "child_process";
import path from "path";

export const executeC = ({ filepath, jobId }) => {
  const dir = path.dirname(filepath);

  return new Promise((resolve, reject) => {
    exec(
      `cd "${dir}" && gcc ${jobId}.c -o ${jobId} && ${jobId}`,
      (error, stdout, stderr) => {
        if (error) return reject(stderr || error.message);
        resolve(stdout);
      }
    );
  });
};
