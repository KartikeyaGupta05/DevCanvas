import { NavLink } from "react-router-dom";
import js from "../../assets/js.png";
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import dart from "../../assets/dart.png";
import python from "../../assets/python.png";
import java from "../../assets/java.png";
import c from "../../assets/c.png";
import cpp from "../../assets/cpp.png";
import image from "../../assets/imgtotext.png";
import mic from "../../assets/mic.png";

const Item = ({ to, icon }) => (
  <NavLink to={to} className="p-2 rounded-lg hover:bg-indigo-500/20 transition">
    <img src={icon} alt="" className="w-11 h-11" />
  </NavLink>
);

function LangList() {
  return (
    <aside className="w-20 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 gap-3">
      <Item to="/editor/javascript" icon={js} />
      <Item to="/editor/html" icon={html} />
      <Item to="/editor/css" icon={css} />
      <Item to="/editor/python" icon={python} />
      <Item to="/editor/java" icon={java} />
      <Item to="/editor/c" icon={c} />
      <Item to="/editor/cpp" icon={cpp} />
      <Item to="/editor/dart" icon={dart} />

      <div className="mt-auto flex flex-col gap-4">
        <Item to="/editor/voice2text" icon={mic} />
        <Item to="/editor/image2text" icon={image} />
      </div>
    </aside>
  );
}

export default LangList;
