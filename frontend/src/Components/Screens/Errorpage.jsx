import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Terminal, Home, ArrowLeft, Code2, AlertTriangle } from "lucide-react";

function Errorpage() {
  const textRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const elements = document.querySelectorAll(".parallax-text");
      elements.forEach((elem) => {
        const speed = elem.getAttribute("data-speed");
        const x = (window.innerWidth - e.clientX * speed) / 100;
        const y = (window.innerHeight - e.clientY * speed) / 100;
        elem.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap");

        * {
          font-family: "JetBrains Mono", monospace;
        }

        @keyframes gridScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes glitch {
          0% {
            text-shadow:
              0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            text-shadow:
              0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            text-shadow:
              -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          49% {
            text-shadow:
              -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          50% {
            text-shadow:
              0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          99% {
            text-shadow:
              0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          100% {
            text-shadow:
              -0.025em 0 0 rgba(255, 0, 0, 0.75),
              -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-glitch {
          animation: glitch 1s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .gradient-text {
          background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
      `}</style>
      <div></div>

      <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative font-mono">
        <div className="fixed inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "gridScroll 20s linear infinite",
            }}
          />
        </div>

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="parallax-text absolute top-20 left-10 text-cyan-500/10 text-6xl animate-float"
            data-speed="7"
          >
            &lt;/&gt;
          </div>
          <div
            className="parallax-text absolute top-40 right-20 text-red-500/10 text-8xl animate-float"
            data-speed="5"
            style={{ animationDelay: "1s" }}
          >
            404
          </div>
          <div
            className="parallax-text absolute bottom-20 left-1/4 text-purple-500/10 text-5xl animate-float"
            data-speed="3"
            style={{ animationDelay: "2s" }}
          >
            {"{ }"}
          </div>
          <div
            className="parallax-text absolute top-1/2 right-1/3 text-cyan-500/10 text-7xl animate-float"
            data-speed="4"
            style={{ animationDelay: "0.5s" }}
          >
            [ ]
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-3 mb-8">
                <AlertTriangle className="w-12 h-12 text-yellow-500 animate-pulse" />
                <h1
                  className="text-9xl font-bold text-cyan-400 animate-glitch parallax-text"
                  data-speed="7"
                >
                  404
                </h1>
                <AlertTriangle className="w-12 h-12 text-yellow-500 animate-pulse" />
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-sm shadow-2xl shadow-cyan-500/10 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-cyan-400 ml-4">error.log</span>
              </div>

              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold gradient-text">
                    Page Not Found
                  </h2>
                  <p className="text-gray-400 text-lg">
                    The page you are looking for is out to{" "}
                    <span className="text-gray-500 text-2xl">lunch.</span>
                  </p>
                  <p className="text-gray-500">Please come back later.</p>
                </div>

                <div className="bg-black/50 border border-cyan-500/20 rounded-lg p-6 text-left">
                  <pre className="text-sm text-gray-300 leading-relaxed">
                    <code>
                      <span className="text-purple-400">if</span> (
                      <span className="text-cyan-400">pageExists</span>) {"{\n"}
                      {"  "}
                      <span className="text-green-400">render</span>
                      <span className="text-gray-500">(</span>
                      <span className="text-yellow-400">content</span>
                      <span className="text-gray-500">)</span>;<br />
                      {"}"} <span className="text-purple-400">else</span>{" "}
                      {"{\n"}
                      {"  "}
                      <span className="text-red-400">throw</span>{" "}
                      <span className="text-purple-400">new</span>{" "}
                      <span className="text-cyan-400">Error</span>
                      <span className="text-gray-500">(</span>
                      <span className="text-green-400">'404: Not Found'</span>
                      <span className="text-gray-500">)</span>;<br />
                      {"}"}
                    </code>
                  </pre>
                </div>

                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-6">
                  <p className="text-cyan-400 text-sm mb-3">// Suggestions:</p>
                  <ul className="text-left text-gray-400 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">→</span>
                      <span>Check if the URL is typed correctly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">→</span>
                      <span>The page might have been moved or deleted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">→</span>
                      <span>Head back to the homepage and start fresh</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 justify-center pt-6">
                  <NavLink to="/">
                    <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-3">
                      <Home className="w-5 h-5" />
                      Back to Home
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </NavLink>
                  <button className="px-8 py-4 border border-cyan-500/30 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 transition-all flex items-center gap-3">
                    <Code2 className="w-5 h-5" />
                    View Docs
                  </button>
                </div>
              </div>
            </div>

            <div
              className="text-center mt-8 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-gray-600 text-sm">
                // Error code: 404 | Page not found in DevCanvas routing table
              </p>
            </div>
          </div>
        </div>
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </>
  );
}

export default Errorpage;
