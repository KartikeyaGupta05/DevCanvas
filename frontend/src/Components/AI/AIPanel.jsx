import { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

function AIPanel({ loading, result, onClose, onAsk }) {
  const [question, setQuestion] = useState("");

  const sendQuestion = () => {
    if (!question.trim()) return;
    onAsk(question);
    setQuestion("");
  };

  return (
    <div className="fixed right-6 bottom-20 w-[440px] h-[520px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <h3 className="text-indigo-400 font-semibold">AI Assistant</h3>
        <button onClick={onClose} className="text-zinc-400 hover:text-white">
          <FaTimes />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4 text-sm">
        {loading && (
          <p className="text-zinc-400 italic">AI is analyzing your code...</p>
        )}

        {!loading && result && (
          <>
            <div>
              <h4 className="text-red-400 font-semibold mb-1">Code Analysis</h4>
              <p className="text-zinc-300 whitespace-pre-wrap">
                {result.split("### 3. How to fix it")[0]}
              </p>
            </div>

            <div>
              <h4 className="text-green-400 font-semibold mb-1">
                Suggested Fix
              </h4>
              <div className="space-y-4 text-sm leading-relaxed">
                {result.split("\n").map((line, i) => {
                  if (line.startsWith("###")) {
                    return (
                      <h3
                        key={i}
                        className="text-indigo-400 font-semibold text-base"
                      >
                        {line.replace("###", "").trim()}
                      </h3>
                    );
                  }

                  if (line.startsWith("```")) {
                    return null;
                  }

                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={i} className="text-yellow-400 font-medium">
                        {line.replaceAll("**", "")}
                      </p>
                    );
                  }

                  if (/error|undefined|failed|warning/i.test(line)) {
                    return (
                      <p key={i} className="text-red-400">
                        {line}
                      </p>
                    );
                  }

                  if (
                    line.trim().startsWith("#include") ||
                    line.trim().startsWith("int ")
                  ) {
                    return (
                      <pre
                        key={i}
                        className="bg-black/60 border border-zinc-800 rounded-md p-3 text-green-400 font-mono whitespace-pre-wrap"
                      >
                        {line}
                      </pre>
                    );
                  }

                  return (
                    <p key={i} className="text-zinc-300">
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {!loading && !result && (
          <p className="text-zinc-500 italic">No AI response yet</p>
        )}
      </div>

      <div className="border-t border-zinc-800 p-3 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask more about this error..."
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm outline-none text-zinc-200"
        />
        <button
          onClick={sendQuestion}
          className="bg-indigo-500 hover:bg-indigo-600 px-3 rounded-md text-white"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default AIPanel;
