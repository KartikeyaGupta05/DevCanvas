import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Terminal, Lock, User, ArrowRight, Code2, Home } from "lucide-react";
import { UsedContext } from "../../App";
import Header from "../Header";

function Login() {
  const { state, dispatch } = useContext(UsedContext);
  const history2 = useNavigate();
  const width2 = window.outerWidth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const data = await res.json();

    if (res.status === 400 || !data) {
      toast.error("Please Enter Valid Inputs");
    } else if (res.status === 401) {
      toast.error("Invalid email or password");
    } else if (res.status === 402) {
      toast.error("Wrong Password.");
    } else if (res.status === 403) {
      toast.error("Please Fill The Details");
    } else {
      dispatch({ type: "USER", payload: true });
      toast.success("Login Successfully");
      history2("/");
    }
  };

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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glitch {
          0%,
          100% {
            transform: translate(0);
          }
          33% {
            transform: translate(-2px, 2px);
          }
          66% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
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
      <Header/>

      {width2 < 250 && (
        <div className="fixed inset-0 bg-black text-cyan-400 flex items-center justify-center z-50 p-4 font-mono">
          <div className="text-center border border-cyan-500/30 p-6 rounded-lg bg-black/80">
            <mark className="bg-cyan-500/20 text-cyan-300 px-3 py-2 rounded">
              The Screen is Visible with width more than 250px
              <br />
              <br />
              <hr className="border-cyan-500/30 my-2" />
              <br />
              Screen Size: {width2}px
            </mark>
          </div>
        </div>
      )}

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
          <div className="absolute top-20 left-10 text-cyan-500/10 text-6xl animate-float">
            &lt;/&gt;
          </div>
          <div
            className="absolute top-40 right-20 text-purple-500/10 text-4xl animate-float"
            style={{ animationDelay: "1s" }}
          >
            {"{ }"}
          </div>
          <div
            className="absolute bottom-20 left-1/4 text-cyan-500/10 text-5xl animate-float"
            style={{ animationDelay: "2s" }}
          >
            [ ]
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-left space-y-8 hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                  <div className="relative">
                    <Terminal className="w-40 h-40 text-cyan-400/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code2 className="w-20 h-20 text-cyan-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
              </div>

              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold gradient-text">
                  Welcome Back
                </h2>
                <p className="text-gray-400 text-lg">
                  Access your DevCanvas workspace and continue coding at the
                  speed of thought.
                </p>
              </div>

              <div className="bg-black/50 border border-cyan-500/30 rounded-xl p-6">
                <p className="text-sm text-gray-400 mb-2">// Quick Stats</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">
                      99.9%
                    </div>
                    <div className="text-xs text-gray-500">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">12ms</div>
                    <div className="text-xs text-gray-500">Response</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-right">
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-black" />
                    </div>
                    <h1 className="text-3xl font-bold gradient-text">Login</h1>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Enter your credentials to access your account
                  </p>
                </div>

                <form method="POST" className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm text-cyan-400 font-semibold flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Email
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="off"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      />
                      <div className="absolute inset-0 rounded-lg bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-cyan-400 font-semibold flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    <div className="relative group">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      />
                      <div className="absolute inset-0 rounded-lg bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={loginUser}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 group"
                  >
                    Login
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm">
                    Don't have an Account?{" "}
                    <NavLink
                      to="/register"
                      className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    >
                      Create Account
                    </NavLink>
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-cyan-500/20">
                  <p className="text-xs text-gray-600 text-center">
                    // Secure authentication with DevCanvas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
