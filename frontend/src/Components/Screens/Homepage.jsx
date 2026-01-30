import React, { useState, useEffect } from "react";
import {
  Terminal,
  Zap,
  Code,
  Mic,
  Image as ImageIcon,
  Globe,
  Cpu,
  Sparkles,
  ChevronRight,
  Command,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Homepage = () => {
  const [mounted, setMounted] = useState(false);
  const [activeCode, setActiveCode] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveCode((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const codeSnippets = [
    {
      lang: "python",
      code: 'def debug():\n    ai.fix_errors()\n    return "✓ Fixed"',
    },
    {
      lang: "javascript",
      code: 'const magic = async () => {\n  await AI.optimize();\n  console.log("⚡ Done");\n}',
    },
    {
      lang: "cpp",
      code: "int main() {\n  AI::compile();\n  return 0; // Perfect\n}",
    },
  ];

  const features = [
    {
      icon: Code,
      title: "Multi-Language Execution",
      description:
        "Run Java, Python, C, C++ instantly. No setup, no config files, just pure execution power.",
      color: "from-cyan-500 to-blue-500",
      accent: "cyan",
    },
    {
      icon: Globe,
      title: "Live Web Editor",
      description:
        "Real-time HTML, CSS, JS preview. See changes as you type. Hot reload built-in.",
      color: "from-purple-500 to-pink-500",
      accent: "purple",
    },
    {
      icon: ImageIcon,
      title: "Image to Code",
      description:
        "Upload screenshots, get working code. AI extracts UI elements and generates clean markup.",
      color: "from-orange-500 to-red-500",
      accent: "orange",
    },
    {
      icon: Mic,
      title: "Voice to Code",
      description:
        "Speak your logic, get implementation. Natural language to syntax in milliseconds.",
      color: "from-green-500 to-emerald-500",
      accent: "green",
    },
    {
      icon: Zap,
      title: "AI Debugging",
      description:
        "Smart error detection and instant fixes. The AI reads your stack traces better than you do.",
      color: "from-yellow-500 to-orange-500",
      accent: "yellow",
    },
    {
      icon: Cpu,
      title: "Cloud Execution",
      description:
        "Serverless runtime. Your code runs on distributed infrastructure. Zero local dependencies.",
      color: "from-indigo-500 to-blue-500",
      accent: "indigo",
    },
  ];

  const stats = [
    { value: "4.7M", label: "Lines Executed", suffix: "+" },
    { value: "89K", label: "Bugs Fixed", suffix: "+" },
    { value: "12ms", label: "Avg Response", suffix: "" },
    { value: "99.9%", label: "Uptime", suffix: "" },
  ];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-black text-gray-100 overflow-hidden font-mono">
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

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap");

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

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.5;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-glitch:hover {
          animation: glitch 0.3s infinite;
        }

        .code-appear {
          animation: slideUp 0.6s ease-out forwards;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
        }
      `}</style>
     

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${mounted ? "code-appear" : "opacity-0"}`}>
            <div className="inline-block">
              <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Code Execution</span>
              </div>
            </div>

            <h1 className="text-6xl font-bold leading-tight">
              Code at the
              <br />
              <span className="gradient-text">Speed of Thought</span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed">
              Multi-language compiler with AI debugging. Voice commands.
              Image-to-code. Live web editor. Everything a developer needs,
              nothing they don't.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/editor/java')} className="cursor-pointer group px-8 py-4 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all flex items-center gap-2 hover:shadow-2xl hover:shadow-cyan-500/50">
                <Play className="w-5 h-5" />
                Start Coding
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="https://github.com/KartikeyaGupta05/DevCanvas" target="_blank" rel="noopener noreferrer" className="cursor-pointer px-8 py-4 border border-cyan-500/30 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all flex items-center gap-2">
                <Command className="w-5 h-5" />
                View Docs
              </a>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="text-2xl font-bold text-cyan-400">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`${mounted ? "code-appear" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/20">
              <div className="bg-black/50 px-4 py-3 flex items-center gap-2 border-b border-cyan-500/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-cyan-400 ml-4">
                  editor.{codeSnippets[activeCode].lang}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <pre className="text-sm text-gray-300 leading-relaxed">
                  <code className="text-cyan-400">
                    {codeSnippets[activeCode].code}
                  </code>
                </pre>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI: Analyzing code...</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-yellow-400">
                  <Zap className="w-3 h-3" />
                  <span>Optimization suggestions ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-cyan-400">&lt;</span>
            Features
            <span className="text-cyan-400">/&gt;</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built for developers who don't have time for slow compilers and
            broken toolchains
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`card-hover bg-gradient-to-br from-gray-900/90 to-black/90 border border-${feature.accent}-500/20 rounded-xl p-6 backdrop-blur-sm`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3
                className={`text-xl font-bold mb-2 text-${feature.accent}-400`}
              >
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why <span className="gradient-text">DevCanvas</span>?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-xs">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                      Zero Configuration
                    </h3>
                    <p className="text-gray-400">
                      No Docker, no VMs, no environment hell. Click and code.
                      That's it.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-xs">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                      AI That Actually Helps
                    </h3>
                    <p className="text-gray-400">
                      Not a chatbot that tells you to "try Googling it." Real
                      fixes, real-time.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black font-bold text-xs">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                      Built for Speed
                    </h3>
                    <p className="text-gray-400">
                      12ms average response time. Because waiting 5 seconds to
                      compile is a crime.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-black border border-cyan-500/30 rounded-xl p-6">
                <div className="text-sm text-gray-400 mb-4">
                  // Real developer feedback
                </div>
                <blockquote className="space-y-4">
                  <p className="text-lg text-gray-300 italic">
                    "Finally, a code editor that doesn't make me want to throw
                    my laptop. The voice-to-code feature is insane."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-cyan-400">
                        Om Shukla
                      </div>
                      <div className="text-xs text-gray-500">
                        Senior Engineer @ TechCorp
                      </div>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 rounded-2xl p-16 backdrop-blur-sm">
          <h2 className="text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Ship Code</span> Faster?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who've ditched their slow local
            environments
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate('/editor/python')} className="cursor-pointer group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-lg font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-3">
              <Terminal className="w-6 h-6" />
              Start Building Now
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-10 py-5 border-2 border-cyan-500/50 text-cyan-400 text-lg font-bold rounded-lg hover:bg-cyan-500/10 transition-all">
              Watch Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • Free tier forever • Cancel anytime
          </p>
        </div>
      </section>

      <footer className="relative z-10 border-t border-cyan-900/30 bg-black/80 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold gradient-text">
                  DevCanvas
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                The AI-powered code editor for developers who move fast and
                break... nothing.
              </p>
            </div>

            <div>
              <h3 className="text-cyan-400 font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/editor/c" className="hover:text-cyan-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="/editor/voice2text" className="hover:text-cyan-400 transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-cyan-400 font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="https://github.com/KartikeyaGupta05/DevCanvas" className="hover:text-cyan-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-cyan-400 font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-cyan-900/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 DevCanvas. Built with AI. Powered by developers.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/KartikeyaGupta05/DevCanvas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/KartikeyaGupta05"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Homepage;
