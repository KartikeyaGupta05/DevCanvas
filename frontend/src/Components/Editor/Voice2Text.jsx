import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import useClipboard from "react-use-clipboard";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import LangList from "./LangList";
import { toast } from "react-hot-toast";
import {
  FaMicrophone,
  FaCopy,
  FaTrash,
  FaUpload,
  FaDownload,
} from "react-icons/fa";
import Header from "../Header";
import { phraseToSymbolMap } from "../../utils/phraseToSymbolMap";

function Voice2Text() {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [, setCopied] = useClipboard(text);
  const [mediaStream, setMediaStream] = useState(null);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    let processed = transcript;

    Object.entries(phraseToSymbolMap).forEach(([key, value]) => {
      const regex = new RegExp(`\\b${key}\\b`, "gi");
      processed = processed.replace(regex, value);
    });

    setText(processed);
  }, [transcript]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Microphone not supported on this browser");
    }
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);

      setIsRecording(true);
      toast.success("Recording started");

      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    } catch (err) {
      toast.error("Microphone permission denied");
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }

    setIsRecording(false);
    toast.success("Recording stopped");
  };

  const clearText = () => {
    setText("");
    resetTranscript();
    toast.success("Cleared");
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DevCanvas-voice.txt";
    link.click();
    toast.success("File downloaded");
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <>
        <Header />
        <div className="p-6 text-red-400 bg-black h-screen">
          Speech recognition is not supported in this browser. Please use Google
          Chrome or Microsoft Edge.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="flex h-screen bg-slate-950 text-zinc-100">
        <LangList />

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-zinc-900">
            <h2 className="text-indigo-400 font-semibold text-lg">voice.txt</h2>
            <span className="text-xs text-zinc-500">Voice → Text</span>
          </div>

          <div className="flex flex-1 gap-4 p-5">
            <div className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center gap-6">
              {window.location.protocol !== "https:" &&
                window.location.hostname !== "localhost" && (
                  <div className="w-full p-3 text-sm rounded bg-yellow-500/10 border border-yellow-500 text-yellow-400 text-center">
                    Voice input requires HTTPS. Microphone access may be
                    blocked.
                  </div>
                )}

              <FaMicrophone
                size={64}
                className={
                  isRecording ? "text-red-500 animate-pulse" : "text-indigo-400"
                }
              />

              <p className="text-zinc-400 text-center">
                Click record and speak clearly
              </p>

              <div className="flex gap-4">
                <button
                  onClick={startListening}
                  disabled={isRecording}
                  className={`editor-btn ${
                    !isRecording
                      ? "cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  🎙 Record
                </button>

                <button
                  onClick={stopListening}
                  disabled={!isRecording}
                  className={`editor-btn ${
                    !isRecording
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  ⏹ Stop
                </button>
              </div>

              <p className="text-xs text-zinc-500 text-center">
                If mic doesn't start: Click 🔒 in address bar → Allow Microphone
                → Reload
              </p>

              <div className="w-full border-t border-zinc-800 my-2" />

              <div className="text-center opacity-60">
                <FaUpload className="mx-auto mb-1" />
                <p className="text-sm">Upload Audio</p>
                <p className="text-xs text-zinc-500">(coming soon)</p>
              </div>

              <p className="text-xs text-zinc-500 italic">
                Tip: say “semicolon”, “new line”, “open bracket”
              </p>
            </div>

            <div className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-zinc-400">🖥 Output</p>
                <div className="flex gap-2">
                  <button
                    onClick={setCopied}
                    className="editor-btn cursor-pointer"
                  >
                    <FaCopy /> Copy
                  </button>
                  <button
                    onClick={downloadText}
                    className="editor-btn cursor-pointer"
                  >
                    <FaDownload /> Download
                  </button>
                  <button
                    onClick={clearText}
                    className="editor-btn cursor-pointer danger"
                  >
                    <FaTrash /> Clear
                  </button>
                </div>
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 bg-transparent resize-none outline-none font-mono text-lg text-green-400"
                placeholder="// Converted text will appear here"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Voice2Text;
