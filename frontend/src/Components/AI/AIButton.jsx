import React from "react";

function AIButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-sm font-semibold"
    >
      🤖 {label}
    </button>
  );
}

export default AIButton;
