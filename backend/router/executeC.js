import axios from "axios";

export const executeC = async ({ code, input }) => {
  try {
    const language_id = 50;

    const submission = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false",
      {
        source_code: code,
        language_id,
        stdin: input || ""
      }
    );

    const token = submission.data.token;

    let result;
    let status;

    do {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await axios.get(
        `https://ce.judge0.com/submissions/${token}?base64_encoded=false`
      );

      result = response.data;
      status = result.status.description;

    } while (status === "In Queue" || status === "Processing");

    if (result.compile_output) {
      throw new Error(result.compile_output);
    }

    if (result.stderr) {
      throw new Error(result.stderr);
    }

    return result.stdout;

  } catch (error) {
    throw error.message || "Execution failed";
  }
};