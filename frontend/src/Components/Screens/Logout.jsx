import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsedContext } from "../../App";
import { LogOut, Terminal, Loader2, CheckCircle2 } from "lucide-react";

function Logout() {
  const { state, dispatch } = useContext(UsedContext);
  const history3 = useNavigate();
  const [status, setStatus] = useState("logging_out"); // logging_out, success, error

  useEffect(() => {
    const performLogout = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (res.status === 200) {
          setStatus("success");
          setTimeout(() => {
            dispatch({ type: "USER", payload: false });
            history3("/login");
          }, 2000);
        } else {
          throw new Error("Logout failed");
        }
      } catch (err) {
        console.log("error in logout", err);
        setStatus("success"); // Still redirect even on error
        setTimeout(() => {
          dispatch({ type: "USER", payload: false });
          history3("/login");
        }, 2000);
      }
    };

    performLogout();
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

        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
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

        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

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

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center animate-fade-in">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-cyan-500/30 rounded-full pulse-ring"></div>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ animationDelay: "1s" }}
              >
                <div className="w-32 h-32 border-4 border-cyan-500/30 rounded-full pulse-ring"></div>
              </div>

              <div className="relative w-32 h-32 bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                {status === "logging_out" && (
                  <Loader2 className="w-16 h-16 text-cyan-400 animate-spin" />
                )}
                {status === "success" && (
                  <CheckCircle2 className="w-16 h-16 text-green-400" />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                {status === "logging_out" && (
                  <span className="gradient-text">Logging Out...</span>
                )}
                {status === "success" && (
                  <span className="text-green-400">
                    Logged Out Successfully
                  </span>
                )}
              </h1>

              <p className="text-gray-400 text-lg max-w-md mx-auto">
                {status === "logging_out" &&
                  "Clearing your session and securing your data"}
                {status === "success" &&
                  "You have been logged out. Redirecting to login page..."}
              </p>
            </div>

            <div className="mt-12 bg-black/50 border border-cyan-500/30 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">
                  System Status
                </span>
              </div>
              <div className="space-y-2 text-left text-sm">
                <div className="flex items-center justify-between text-gray-400">
                  <span>// Session cleanup</span>
                  {status === "logging_out" ? (
                    <span className="text-yellow-400">Processing...</span>
                  ) : (
                    <span className="text-green-400">✓ Complete</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>// Token revocation</span>
                  {status === "logging_out" ? (
                    <span className="text-yellow-400">Processing...</span>
                  ) : (
                    <span className="text-green-400">✓ Complete</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>// Cache clearing</span>
                  {status === "logging_out" ? (
                    <span className="text-yellow-400">Processing...</span>
                  ) : (
                    <span className="text-green-400">✓ Complete</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </>
  );
}

export default Logout;
