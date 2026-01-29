import React, { useEffect, useState } from "react";
import LangList from "./LangList";
import { toast } from "react-hot-toast";
import { FaCopy, FaDownload } from "react-icons/fa";
import AIButton from "../AI/AIButton";
import AIPanel from "../AI/AIPanel";
import { useAI } from "../AI/useAI";

const DEFAULT_JS_CODE = `console.log("Hello DevCanvas");`;

function Javascript() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showAI, setShowAI] = useState(false);
  const { askAI, loading, result } = useAI();

  const isError =
    output && /error|failed|warning|segmentation|exception/i.test(output);

  const runCode = () => {
    try {
      toast.loading("Executing JavaScript...");
      setOutput("");

      const originalLog = console.log;
      console.log = (...args) => {
        setOutput((prev) => prev + args.join(" ") + "\n");
        originalLog(...args);
      };

      eval(code);

      console.log = originalLog;
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

  return (
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
  );
}

export default Javascript;
