import React, { useState } from "react";
import LangList from "./LangList";
import { toast } from "react-hot-toast";
import { FaCopy, FaDownload } from "react-icons/fa";
import AIButton from "../AI/AIButton";
import AIPanel from "../AI/AIPanel";
import { useAI } from "../AI/useAI";
import Header from "../Header";

const DEFAULT_CPP_CODE = `#include <iostream>
using namespace std;

int main() {
  cout << "Hello DevCanvas!";
  return 0;
}
`;

function Cpp() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showAI, setShowAI] = useState(false);
  const { askAI, loading, result } = useAI();

  const isError =
    output && /error|failed|warning|segmentation|exception/i.test(output);

  const handleSubmit = async () => {
    toast.loading("Compiling & Executing C++ code...");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/runcpp`,
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
    } catch (err) {
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
    const blob = new Blob([code], { type: "text/cpp" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DevCanvas-main.cpp";
    link.click();
    toast.success("File Downloaded");
  };

  return (
    <>
      <Header />
      <div className="flex h-screen bg-slate-950 text-zinc-100">
        <LangList />

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
            <h2 className="text-indigo-400 font-semibold text-lg">main.cpp</h2>

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
                    language: "C++",
                    code,
                    output,
                    mode: isError ? "error" : "optimize",
                  });
                }}
              />

              <button
                onClick={copyContent}
                title="Copy code"
                className="p-2 cursor-pointer rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              >
                <FaCopy size={20} />
              </button>

              <button
                onClick={codeToFile}
                title="Download file"
                className="p-2 cursor-pointer rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              >
                <FaDownload size={20} />
              </button>

              <div className="h-6 w-px bg-zinc-700 mx-2" />

              <button
                onClick={handleSubmit}
                className="px-7 cursor-pointer py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md font-semibold text-sm shadow-lg transition"
              >
                RUN
              </button>
            </div>
          </div>

          <div className="flex flex-1 gap-4 p-5">
            <div className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
              <p className="text-sm text-zinc-400 mb-2">
                💻 Press{" "}
                <span className="text-indigo-400 font-medium">TAB</span> to
                insert starter C++ code
              </p>

              <textarea
                className="flex-1 bg-transparent outline-none resize-none font-mono text-[16px] leading-6 text-zinc-100"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Tab" && code.trim() === "") {
                    e.preventDefault();
                    setCode(DEFAULT_CPP_CODE);
                  }
                }}
                placeholder="Start typing C++ code..."
              />
            </div>

            <div className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-zinc-400">🖥 Output</p>
                <button
                  onClick={clear}
                  className="text-sm cursor-pointer text-indigo-400 hover:underline"
                >
                  Clear
                </button>
              </div>

              {import.meta.env.PROD && (
                <div className="mx-5 mt-4 mb-2 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
                  ⚠ <span className="font-semibold">Production Notice:</span>
                  C++ execution is disabled on the deployed version due to
                  cloud sandbox limitations. This editor works fully in local
                  development.
                </div>
              )}

              <pre className="flex-1 overflow-auto text-[16px] text-green-400 font-mono whitespace-pre-wrap">
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
                language: "C++",
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

export default Cpp;
