import { useNavigate, useLocation } from "react-router-dom";
import { Terminal } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="relative z-50 border-b border-cyan-900/30 bg-black backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div onClick={() => navigate('/')} className="cursor-pointer w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center">
            <Terminal className="w-6 h-6 text-black" />
          </div>
          <span onClick={() => navigate('/')} className="cursor-pointer text-2xl font-bold gradient-text">DevCanvas</span>
          <span className="text-cyan-400 text-sm ml-2 opacity-60">[v2.0]</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 cursor-pointer py-2 text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-500/30 rounded hover:border-cyan-400/50" onClick={() => navigate('/login')}>
            Login
          </button>
          <button onClick={() => navigate('/register')} className="px-6 py-2 bg-linear-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
