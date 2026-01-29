import React, { useState } from "react";
import LangList from "./LangList";
import { toast } from "react-hot-toast";
import { FaCopy, FaDownload } from "react-icons/fa";
import AIButton from "../AI/AIButton";
import AIPanel from "../AI/AIPanel";
import { useAI } from "../AI/useAI";

const DEFAULT_C_CODE = `#include <stdio.h>

int main() {
  printf("Hello DevCanvas!");
  return 0;
}
`;

function C() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showAI, setShowAI] = useState(false);
  const { askAI, loading, result } = useAI();

  const isError =
    output && /error|failed|warning|segmentation|exception/i.test(output);

  const handleSubmit = async () => {
    toast.loading("Compiling & Executing C code...");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/runc`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        },
      );

      const data = await response.json();
      toast.remove();

      if (response.ok) {
        setOutput(data.output);
        toast.success("Executed Successfully");
      } else {
        setOutput(data.error);
        toast.error("Compilation Error");
      }
    } catch {
      toast.remove();
      setOutput("Error in communication with server");
      toast.error("Server Error");
    }
  };

  const clear = () => {
    setOutput("");
    toast.success("Output Cleared");
  };

  const copyContent = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code Copied");
  };

  const codeToFile = () => {
    const blob = new Blob([code], { type: "text/c" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DevCanvas-main.c";
    link.click();
    toast.success("File Downloaded");
  };

  const handleAI = () => {
    setShowAI(true);
    askAI({
      language: "C",
      code,
      output,
      mode: isError ? "error" : "optimize",
    });
  };

  return (
    <div className="flex h-screen bg-slate-950 text-zinc-100">
      <LangList />

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
          <h2 className="text-indigo-400 font-semibold text-lg">main.c</h2>

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
                  language: "C",
                  code,
                  output,
                  mode: isError ? "error" : "optimize",
                });
              }}
            />

            <button
              onClick={copyContent}
              className="p-2 rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
            >
              <FaCopy size={18} />
            </button>

            <button
              onClick={codeToFile}
              className="p-2 rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
            >
              <FaDownload size={18} />
            </button>

            <button
              onClick={handleSubmit}
              className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md font-semibold"
            >
              RUN
            </button>
          </div>
        </div>

        <div className="flex flex-1 gap-4 p-5">
          <div className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
            <p className="text-sm text-zinc-400 mb-2">
              Press <span className="text-indigo-400">TAB</span> to insert
              starter code
            </p>

            <textarea
              className="flex-1 bg-transparent outline-none resize-none font-mono text-[15px]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab" && code.trim() === "") {
                  e.preventDefault();
                  setCode(DEFAULT_C_CODE);
                }
              }}
              placeholder="Start typing C code..."
            />
          </div>

          <div className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-zinc-400">Output</p>
              <button
                onClick={clear}
                className="text-sm text-indigo-400 hover:underline"
              >
                Clear
              </button>
            </div>

            <pre className="flex-1 overflow-auto text-green-400 font-mono text-sm whitespace-pre-wrap">
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
              language: "C",
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

export default C;
