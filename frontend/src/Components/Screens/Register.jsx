import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Terminal,
  User,
  Mail,
  Lock,
  Briefcase,
  ArrowRight,
  UserPlus,
  Home,
  ArrowLeft,
} from "lucide-react";
import Header from "../Header";

function Register() {
  const history1 = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword, role } = user;
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          cpassword,
          role,
        }),
      },
    );
    const data = await res.json();

    if (res.status === 422 || !data) {
      toast.error("Please Fill The Details.");
      console.log("Invalid Registration");
    } else if (res.status === 421) {
      toast.error("Email is Already Registered");
    } else if (res.status === 420) {
      toast.error("Password is not Matching");
    } else {
      toast.success("Register Successfully");
      console.log("Register Successful");
      history1("/login");
    }
  };

  const width2 = window.outerWidth;

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

        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
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

        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
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
          <div className="absolute top-20 right-20 text-cyan-500/10 text-6xl animate-float">
            {"{ }"}
          </div>
          <div
            className="absolute bottom-40 left-10 text-purple-500/10 text-5xl animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            [ ]
          </div>
          <div
            className="absolute top-1/2 right-1/3 text-cyan-500/10 text-4xl animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            &lt;/&gt;
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-6xl">
            <div className="text-center mb-12 animate-fade-up">
              <h1 className="text-5xl font-bold mb-4">
                <span className="gradient-text">Registration</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Join thousands of developers already using DevCanvas
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div
                className="animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="username"
                        className="text-sm text-cyan-400 font-semibold flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Username
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          placeholder="DevCanvas"
                          value={user.username}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                        <div className="absolute inset-0 rounded-lg bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm text-cyan-400 font-semibold flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          placeholder="DevCanvas@gmail.com"
                          value={user.email}
                          onChange={handleChange}
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
                          placeholder="••••••"
                          value={user.password}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                        <div className="absolute inset-0 rounded-lg bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="cpassword"
                        className="text-sm text-cyan-400 font-semibold flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <input
                          type="password"
                          name="cpassword"
                          id="cpassword"
                          placeholder="••••••"
                          value={user.cpassword}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                        <div className="absolute inset-0 rounded-lg bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="role"
                        className="text-sm text-cyan-400 font-semibold flex items-center gap-2"
                      >
                        <Briefcase className="w-4 h-4" />
                        Profession
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          name="role"
                          id="role"
                          placeholder="Web Developer"
                          value={user.role}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        />
                        <div className="absolute inset-0 rounded-lg bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      onClick={PostData}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 group mt-8"
                    >
                      <UserPlus className="w-5 h-5" />
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </div>

              <div
                className="animate-fade-up space-y-8"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="relative">
                  <div className="w-full h-80 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                    <div className="relative">
                      <Terminal className="w-32 h-32 text-cyan-400/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <UserPlus className="w-16 h-16 text-cyan-400 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="bg-black/50 border border-cyan-500/30 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">
                    Why Join DevCanvas?
                  </h3>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black font-bold text-xs">1</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">
                        Multi-language execution with zero setup time
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black font-bold text-xs">2</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">
                        AI-powered debugging and code optimization
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black font-bold text-xs">3</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">
                        Voice-to-code and image-to-code features
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black font-bold text-xs">4</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">
                        Live web editor with real-time preview
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6 text-center">
                  <p className="text-gray-300">
                    Already have an Account?{" "}
                    <NavLink
                      to="/login"
                      className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                    >
                      Login Now
                    </NavLink>
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-600">
                    // Your data is encrypted and secure with DevCanvas
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

export default Register;
