import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Play, CheckCircle2, AlertTriangle, Bug } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
  highlightLine?: number;
  onSelectLine?: (lineNumber: number) => void;
  selectedBugLine?: number | null;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onSubmit,
  onReset,
  isRunning = false,
  isSubmitting = false,
  highlightLine,
  onSelectLine,
  selectedBugLine,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const lines = code.split('\n');

  // Track cursor position
  const updateCursorPosition = () => {
    if (!textareaRef.current) return;
    const text = textareaRef.current.value;
    const selStart = textareaRef.current.selectionStart;
    const linesBefore = text.substring(0, selStart).split('\n');
    setCursorPos({
      line: linesBefore.length,
      col: linesBefore[linesBefore.length - 1].length + 1,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    soundManager.playKey();

    // Ctrl+Enter or Cmd+Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    // Tab key indent (2 spaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      const updated = val.substring(0, start) + '  ' + val.substring(end);
      onChange(updated);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
          updateCursorPosition();
        }
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#071f16] border-2 border-[#194c35] rounded-2xl overflow-hidden shadow-2xl">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#04120b] border-b border-[#14422e] text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-lime-500 inline-block"></span>
          </div>
          <span className="text-emerald-300 font-mono font-bold">specimen_routine.js</span>
          {selectedBugLine && (
            <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1 font-bold">
              <Bug className="w-3 h-3 text-orange-400" /> Flagged Line {selectedBugLine}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            title="Reset code to original starter"
            className="flex items-center gap-1 px-2.5 py-1 text-emerald-400/80 hover:text-emerald-200 hover:bg-[#0c2f21] rounded-lg transition-colors text-xs font-mono cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <span className="text-emerald-800">|</span>
          <span className="text-emerald-400/60 font-mono text-[11px]">
            Ln {cursorPos.line}, Col {cursorPos.col}
          </span>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-sm leading-relaxed">
        {/* Line Numbers Gutter */}
        <div className="w-12 bg-[#041009] border-r border-[#123a28] text-emerald-700 select-none py-3 flex flex-col items-end pr-3 shrink-0">
          {lines.map((_, idx) => {
            const lineNum = idx + 1;
            const isFlagged = selectedBugLine === lineNum;
            const isHighlighted = highlightLine === lineNum;

            return (
              <button
                key={lineNum}
                onClick={() => onSelectLine && onSelectLine(lineNum)}
                title={`Click to mark line ${lineNum} as the suspected bug`}
                className={`w-full text-right text-xs leading-6 hover:text-lime-400 transition-colors cursor-pointer ${
                  isFlagged
                    ? 'text-amber-400 font-black bg-amber-500/20'
                    : isHighlighted
                    ? 'text-orange-400 font-bold'
                    : 'text-emerald-700/80'
                }`}
              >
                {lineNum}
              </button>
            );
          })}
        </div>

        {/* Code Textarea */}
        <div className="relative flex-1 h-full overflow-auto">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              onChange(e.target.value);
              updateCursorPosition();
            }}
            onKeyDown={handleKeyDown}
            onClick={updateCursorPosition}
            onKeyUp={updateCursorPosition}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="w-full h-full p-3.5 bg-transparent text-emerald-100 font-mono text-sm leading-6 resize-none focus:outline-none selection:bg-lime-500/30 selection:text-white"
          />
        </div>
      </div>

      {/* Editor Bottom Actions Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#04120b] border-t border-[#14422e]">
        <div className="text-xs text-emerald-400/60 font-mono hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 bg-[#082216] border border-[#1b5038] rounded text-emerald-300 text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-[#082216] border border-[#1b5038] rounded text-emerald-300 text-[10px]">Enter</kbd> to test
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => {
              soundManager.playRun();
              onRun();
            }}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-[#09291b] hover:bg-[#103e2a] active:scale-95 text-lime-400 text-xs font-bold rounded-xl border border-[#1c573c] transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Scanning...' : 'Test Patch'}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playRun();
              onSubmit();
            }}
            disabled={isSubmitting || isRunning}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 active:scale-95 text-slate-950 text-xs font-black rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-950/60 disabled:opacity-50 uppercase tracking-wider"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>{isSubmitting ? 'Evaluating...' : 'Trap Bug & Submit'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
