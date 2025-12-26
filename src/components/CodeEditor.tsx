"use client";

import { useState, useEffect } from "react";
import { Code2, Trash2 } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const PLACEHOLDER_CODE = `// Paste your code here to get roasted! 🔥
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

export default function CodeEditor({ code, onChange }: CodeEditorProps) {
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const lines = (code || PLACEHOLDER_CODE).split("\n").length;
    setLineCount(Math.max(lines, 10));
  }, [code]);

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="code-editor-wrapper glow-box">
      {/* Header */}
      <div className="code-editor-header">
        <div className="code-editor-dot bg-red-500" />
        <div className="code-editor-dot bg-yellow-500" />
        <div className="code-editor-dot bg-green-500" />
        <div className="flex-1 flex items-center justify-center gap-2 text-sm text-gray-400">
          <Code2 size={14} />
          <span>your_code.js</span>
        </div>
        <button
          onClick={handleClear}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="Clear code"
        >
          <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
        </button>
      </div>

      {/* Editor */}
      <div className="flex min-h-[300px] max-h-[400px] overflow-auto">
        {/* Line numbers */}
        <div className="flex flex-col items-end py-4 px-3 bg-black/30 text-gray-500 text-sm font-mono select-none border-r border-white/5">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code area */}
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          placeholder={PLACEHOLDER_CODE}
          className="flex-1 p-4 bg-transparent text-[#e0e0e0] font-mono text-sm leading-6 resize-none focus:outline-none placeholder:text-gray-600"
          spellCheck={false}
          style={{ tabSize: 2 }}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
        <span>
          {code.length > 0 ? `${code.split("\n").length} lines` : "Ready to roast"}
        </span>
        <span className="text-[var(--neon-pink)]">
          {code.length > 0 ? `${code.length} chars` : ""}
        </span>
      </div>
    </div>
  );
}

