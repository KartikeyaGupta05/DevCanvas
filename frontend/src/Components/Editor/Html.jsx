import React, { useEffect, useRef } from "react";
import LangList from "./LangList";
import { toast } from "react-hot-toast";
import { FaPlay, FaDownload, FaTrash } from "react-icons/fa";

const HTML_STARTER = `<!DOCTYPE html>
<html>
<head>
  <title>DevCanvas Counter</title>
</head>
<body>
  <div id="app">
    <h1>DevCanvas Counter</h1>
    <button id="counter">Count is 0</button>
    <p>Edit HTML, CSS & JS to see changes</p>
  </div>
</body>
</html>`;

const CSS_STARTER = `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: white;
  font-family: system-ui, sans-serif;
}

#app {
  text-align: center;
}

button {
  margin-top: 16px;
  padding: 12px 20px;
  font-size: 16px;
  background: #6366f1;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #4f46e5;
}`;

const JS_STARTER = `let count = 0;

const button = document.querySelector("#counter");

button.addEventListener("click", () => {
  count++;
  button.textContent = "Count is " + count;
});
`;

function Html() {
  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const jsRef = useRef(null);
  const iframeRef = useRef(null);

  const updatePreview = () => {
    const html = htmlRef.current.value;
    const css = cssRef.current.value;
    const js = jsRef.current.value;

    iframeRef.current.srcdoc = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
  };

  const handleTab = (e, type) => {
    if (e.key === "Tab" && e.target.value.trim() === "") {
      e.preventDefault();
      if (type === "html") htmlRef.current.value = HTML_STARTER;
      if (type === "css") cssRef.current.value = CSS_STARTER;
      if (type === "js") jsRef.current.value = JS_STARTER;
      updatePreview();
    }
  };

  const resetAll = () => {
    htmlRef.current.value = "";
    cssRef.current.value = "";
    jsRef.current.value = "";
    iframeRef.current.srcdoc = "";
    toast.success("Project Reset");
  };

  const downloadProject = () => {
    const html = htmlRef.current.value;
    const css = cssRef.current.value;
    const js = jsRef.current.value;

    const file = `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
${html}
<script>${js}<\/script>
</body>
</html>`;

    const blob = new Blob([file], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DevCanvas-project.html";
    link.click();
    toast.success("Project Downloaded");
  };

  return (
    <div className="flex h-screen bg-slate-950 text-zinc-100">
      <LangList />

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-6 py-3 border-b border-zinc-800 bg-zinc-900">
          <h2 className="text-indigo-400 font-semibold text-lg">
            Web Editor (HTML + CSS + JS)
          </h2>

          <div className="flex gap-3">
            <button
              onClick={updatePreview}
              className="px-4 cursor-pointer py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md flex items-center gap-2"
            >
              <FaPlay /> RUN
            </button>

            <button
              onClick={downloadProject}
              className="px-4 cursor-pointer py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md flex items-center gap-2"
            >
              <FaDownload /> Download
            </button>

            <button
              onClick={resetAll}
              className="px-4 cursor-pointer py-2 bg-red-500/80 hover:bg-red-600 rounded-md flex items-center gap-2"
            >
              <FaTrash /> Reset
            </button>
          </div>
        </div>

        <div className="flex flex-1 p-4 gap-4">
          <div className="w-1/2 flex flex-col gap-3">
            <label className="text-sm text-zinc-400">HTML</label>
            <textarea
              ref={htmlRef}
              onKeyDown={(e) => handleTab(e, "html")}
              onChange={updatePreview}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-3 font-mono text-sm resize-none"
              placeholder="Press TAB to insert HTML starter"
            />

            <label className="text-sm text-zinc-400">CSS</label>
            <textarea
              ref={cssRef}
              onKeyDown={(e) => handleTab(e, "css")}
              onChange={updatePreview}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-3 font-mono text-sm resize-none"
              placeholder="Press TAB to insert CSS starter"
            />

            <label className="text-sm text-zinc-400">JavaScript</label>
            <textarea
              ref={jsRef}
              onKeyDown={(e) => handleTab(e, "js")}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-3 font-mono text-sm resize-none"
              placeholder="Press TAB to insert JS starter"
            />
          </div>

          <div className="w-1/2 bg-white rounded-lg overflow-hidden">
            <iframe ref={iframeRef} title="preview" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Html;
