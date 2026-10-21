import React, { useState } from 'react';
import { Check, X, Terminal, Clock, AlertCircle } from 'lucide-react';
import { TestResult } from '../types/game';

interface TestRunnerProps {
  testResults: TestResult[];
  passedTestsCount: number;
  totalTestsCount: number;
  consoleLogs: string[];
  compileError?: string;
  executionTimeTotalMs: number;
  hasRun: boolean;
}

export const TestRunner: React.FC<TestRunnerProps> = ({
  testResults,
  passedTestsCount,
  totalTestsCount,
  consoleLogs,
  compileError,
  executionTimeTotalMs,
  hasRun,
}) => {
  const [activeTab, setActiveTab] = useState<'tests' | 'terminal'>('tests');

  const allPassed = hasRun && passedTestsCount === totalTestsCount && totalTestsCount > 0;

  return (
    <div className="flex flex-col h-full bg-[#071f16] border-2 border-[#194c35] rounded-2xl overflow-hidden shadow-2xl">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#04120b] border-b border-[#14422e] text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1.5 rounded-xl font-bold font-mono transition-colors cursor-pointer ${
              activeTab === 'tests'
                ? 'bg-[#0c3121] text-lime-300 border border-[#1f5d40] shadow-sm'
                : 'text-emerald-400/70 hover:text-emerald-200'
            }`}
          >
            Field Assertions ({passedTestsCount}/{totalTestsCount})
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold font-mono transition-colors cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-[#0c3121] text-lime-300 border border-[#1f5d40] shadow-sm'
                : 'text-emerald-400/70 hover:text-emerald-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Field Output {consoleLogs.length > 0 && `(${consoleLogs.length})`}</span>
          </button>
        </div>

        {hasRun && (
          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
            <Clock className="w-3 h-3 text-emerald-500" />
            <span>{executionTimeTotalMs}ms</span>
            <span aria-hidden="true" className="text-emerald-800">·</span>
            <span className={allPassed ? 'text-lime-400 font-bold' : 'text-orange-400 font-bold'}>
              {allPassed ? 'All Trapped!' : `${totalTestsCount - passedTestsCount} Escaped`}
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
        {compileError && (
          <div className="mb-4 p-3.5 bg-orange-950/60 border border-orange-700/80 rounded-xl text-orange-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-orange-300 uppercase">Scanner Fault Detected</div>
              <pre className="text-orange-200 whitespace-pre-wrap text-[11px] font-mono leading-relaxed">{compileError}</pre>
            </div>
          </div>
        )}

        {activeTab === 'tests' ? (
          <div className="space-y-3">
            {!hasRun && (
              <div className="py-12 text-center text-emerald-400/60 font-sans">
                <Terminal className="w-8 h-8 mx-auto mb-2 text-emerald-700 opacity-60" />
                <p>Click "Test Patch" to execute the specimen routine through the field assertions.</p>
              </div>
            )}

            {testResults.map((test, idx) => (
              <div
                key={test.id || idx}
                className={`p-3 rounded-xl border transition-all ${
                  test.passed
                    ? 'bg-[#051a11] border-emerald-600/40 shadow-sm'
                    : 'bg-[#180a0a] border-orange-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        test.passed ? 'bg-lime-500/20 text-lime-400 font-bold' : 'bg-orange-500/20 text-orange-400 font-bold'
                      }`}
                    >
                      {test.passed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <X className="w-3.5 h-3.5 stroke-[3]" />}
                    </span>
                    <span className="font-bold text-emerald-100">Assertion {idx + 1}: {test.description}</span>
                  </div>
                  <span className="text-[10px] text-emerald-500">{test.executionTimeMs}ms</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] bg-[#03100a] p-2.5 rounded-xl border border-[#103525]">
                  <div>
                    <span className="text-emerald-500 block text-[10px] uppercase font-bold">Input Args:</span>
                    <span className="text-emerald-200 break-all">{JSON.stringify(test.args)}</span>
                  </div>
                  <div>
                    <span className="text-emerald-500 block text-[10px] uppercase font-bold">Expected Output:</span>
                    <span className="text-lime-400 break-all font-bold">{JSON.stringify(test.expected)}</span>
                  </div>
                  {!test.passed && (
                    <div className="col-span-1 md:col-span-2 pt-1 border-t border-[#1a382b]">
                      <span className="text-orange-400 block text-[10px] uppercase font-bold">Received Output:</span>
                      <span className="text-orange-300 break-all font-semibold">
                        {test.error ? `Error: ${test.error}` : JSON.stringify(test.received)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1 bg-[#04120b] p-3.5 rounded-xl border border-[#14422e] min-h-[160px]">
            {consoleLogs.length === 0 ? (
              <span className="text-emerald-700 italic">No console logs captured during execution. Use `console.log(...)` inside your routine to inspect variables.</span>
            ) : (
              consoleLogs.map((log, index) => (
                <div key={index} className="text-lime-300 text-[11px] font-mono leading-5">
                  {log}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
