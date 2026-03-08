import React, { useEffect, useState } from "react";
import LangList from "./LangList";
import { toast } from "react-hot-toast";
import { FaCopy, FaDownload } from "react-icons/fa";
import AIButton from "../AI/AIButton";
import AIPanel from "../AI/AIPanel";
import { useAI } from "../AI/useAI";
import Header from "../Header";

const DEFAULT_JS_CODE = `console.log("Hello DevCanvas");`;

function Javascript() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [input, setInput] = useState("");
  const { askAI, loading, result } = useAI();

  const isError =
    output && /error|failed|warning|segmentation|exception/i.test(output);

  const expectsInput = /prompt\(/.test(code);
  const runCode = () => {
  try {
    toast.loading("Executing JavaScript...");
    setOutput("");

    const originalLog = console.log;
    const originalPrompt = window.prompt;

    console.log = (...args) => {
      setOutput((prev) => prev + args.join(" ") + "\n");
      originalLog(...args);
    };

    const inputLines = input.split("\n");
    let inputIndex = 0;

    window.prompt = () => {
      return inputLines[inputIndex++] || "";
    };

    // Execute user code
    eval(code);

    // Restore originals
    console.log = originalLog;
    window.prompt = originalPrompt;

    toast.remove();
    toast.success("Executed Successfully");

  } catch (err) {
    toast.remove();
    setOutput(err.toString());
    toast.error("Execution Error");
  }
};

  const copyContent = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code Copied");
  };

  const codeToFile = () => {
    const blob = new Blob([code], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DevCanvas-main.js";
    link.click();
    toast.success("File Downloaded");
  };

  const clearOutput = () => {
    setOutput("");
    toast.success("Output Cleared");
  };

  const clearInput = () => {
    setInput("");
    toast.success("Input Cleared");
  };

  return (
    <>
    <Header/>
    <div className="flex h-screen bg-slate-950 text-zinc-100">
      <LangList />

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
          <h2 className="text-indigo-400 font-semibold text-lg">main.js</h2>

          <div className="flex items-center gap-3">
            <AIButton
              label={
                loading
                  ? "Thinking..."
                  : isError
                    ? "Explain Error"
                    : "Improve Code"
              }
              disabled={loading || !code.trim()}
              onClick={() => {
                setShowAI(true);
                askAI({
                  language: "JavaScript",
                  code,
                  output,
                  mode: isError ? "error" : "optimize",
                });
              }}
            />

            <button
              onClick={copyContent}
              className="p-2 cursor-pointer rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition"
            >
              <FaCopy size={18} />
            </button>

            <button
              onClick={codeToFile}
              className="p-2 cursor-pointer rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition"
            >
              <FaDownload size={18} />
            </button>

            <div className="h-6 w-px bg-zinc-700 mx-2" />

            <button
              onClick={runCode}
              className="px-6 cursor-pointer py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md font-semibold text-sm"
            >
              RUN
            </button>
          </div>
        </div>

        <div className="flex flex-1 gap-4 p-5">
          <div className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
            <p className="text-sm text-zinc-400 mb-2">
              💻 Press <span className="text-indigo-400">TAB</span> to insert
              starter code
            </p>

            <textarea
              className="flex-1 bg-transparent outline-none resize-none font-mono text-[16px] text-zinc-100"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab" && code.trim() === "") {
                  e.preventDefault();
                  setCode(DEFAULT_JS_CODE);
                }
              }}
              placeholder="Write JavaScript here..."
            />
          </div>

          <div className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
          <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-zinc-400 mb-1">📥 Input</p>
                  <button
                    onClick={clearInput}
                    className="text-sm text-indigo-400 hover:underline"
                  >
                    Clear
                  </button>
                </div>
                <textarea
                  className={`w-full bg-zinc-800 border ${
                    expectsInput && !input.trim()
                      ? "border-red-500"
                      : "border-zinc-700"
                  } rounded-md p-2 text-sm font-mono text-zinc-200 resize-none`}
                  rows="4"
                  placeholder="Enter input here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-zinc-400">🖥 Output</p>
              <button
                onClick={clearOutput}
                className="text-sm cursor-pointer text-indigo-400 hover:underline"
              >
                Clear
              </button>
            </div>

            <pre className="flex-1 overflow-auto font-mono text-green-400 whitespace-pre-wrap">
              {output || "// Output will appear here"}
            </pre>
          </div>
        </div>
      </div>
      {showAI && (
        <AIPanel
          loading={loading}
          result={result}
          onClose={() => setShowAI(false)}
          onAsk={(question) =>
            askAI({
              language: "JavaScript",
              code,
              output: question,
              mode: "followup",
            })
          }
        />
      )}
    </div>
    </>
  );
}

export default Javascript;
