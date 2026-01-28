import { exec } from "child_process";
import path from "path";

export const executeJava = ({ filepath }) => {
  const dir = path.dirname(filepath);

  return new Promise((resolve, reject) => {
    const command = `cd "${dir}" && javac Main.java && java Main`;

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
