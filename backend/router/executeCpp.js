import { exec } from "child_process";
import path from "path";

export const executeCpp = ({ filepath, jobId }) => {
  const dir = path.dirname(filepath);

  return new Promise((resolve, reject) => {
    const command = `cd "${dir}" && g++ ${jobId}.cpp -o ${jobId}.exe && ${jobId}.exe`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr || error.message);
      }
      if (stderr) {
        return reject(stderr);
      }
      resolve(stdout);
    });
  });
};
