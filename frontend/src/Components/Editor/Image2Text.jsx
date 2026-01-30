import React, { useState } from "react";
import LangList from "./LangList";
import Tesseract from "tesseract.js";
import { toast } from "react-hot-toast";
import { FaCopy, FaDownload, FaImage } from "react-icons/fa";
import Header from "../Header";

function Image2Text() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    toast.success("Image uploaded");
  };

  const convertToText = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    setLoading(true);
    toast.loading("Extracting text...");

    try {
      const result = await Tesseract.recognize(image, "eng");
      setText(result.data.text);
      toast.remove();
      toast.success("Text extracted");
    } catch {
      toast.remove();
      toast.error("Failed to extract text");
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DevCanvas-extracted-text.txt";
    link.click();
  };

  return (
    <>
    <Header/>
    <div className="flex h-screen bg-slate-950 text-zinc-100">
      <LangList />

      <div className="flex-1 p-6">
        <h1 className="text-xl font-semibold text-indigo-400 mb-4">
          Image → Text Converter
        </h1>

        <div className="grid grid-cols-2 gap-6 h-[85%]">
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center gap-10">
            
            {image ? (
              <img
                src={image}
                alt="preview"
                className="max-h-64 rounded-lg border border-zinc-700"
              />
            ) : (
              <div className="text-zinc-500 text-center">
                <FaImage size={48} className="mx-auto mb-2" />
                Upload an image containing text
              </div>
            )}

            <div>
              <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm file:bg-indigo-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md cursor-pointer"
            />
            </div>

            <button
              onClick={convertToText}
              disabled={loading}
              title="Convert to Text"
              className="w-full cursor-pointer py-5 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold text-lg transition"
            >
              {loading ? "Converting..." : "Convert to Text"}
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-zinc-400">Extracted Text</p>
              <div className="flex gap-3">
                <button
                  onClick={copyText}
                  className="p-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 rounded-md"
                >
                  <FaCopy />
                </button>
                <button
                  onClick={downloadText}
                  className="p-2 cursor-pointer bg-zinc-800 hover:bg-zinc-700 rounded-md"
                >
                  <FaDownload />
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Extracted text will appear here..."
              className="flex-1 bg-transparent resize-none outline-none font-mono text-[15px] text-zinc-100"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Image2Text;
