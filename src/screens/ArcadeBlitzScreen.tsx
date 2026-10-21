import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Zap, Flame, Trophy, RotateCcw, CheckCircle2, XCircle, Sparkles, Compass } from 'lucide-react';
import { User } from '../types/game';
import { soundManager } from '../utils/audio';

interface ArcadeBlitzScreenProps {
  user: User | null;
  onBack: () => void;
  onCoinsAwarded: (coins: number) => void;
}

interface BlitzQuestion {
  id: string;
  snippet: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const BLITZ_QUESTIONS: BlitzQuestion[] = [
  {
    id: 'q1',
    snippet: `functon captureBug() {\n  return "TRAPPED";\n}`,
    question: 'Spot the syntax bug in this declaration:',
    options: ['Missing semicolon', 'Misspelled `functon` keyword', 'String needs backticks', 'Missing arguments'],
    correctIndex: 1,
    explanation: '`functon` is missing the letter "i".',
  },
  {
    id: 'q2',
    snippet: `if (specimenType = "RARE_BEETLE") {\n  giveGoldenBadge();\n}`,
    question: 'Why does this condition award badges to all specimens?',
    options: ['`specimenType` is undefined', '`giveGoldenBadge()` errors', 'Single `=` assigns instead of compares (`===`)', 'String needs brackets'],
    correctIndex: 2,
    explanation: 'Single `=` performs assignment, evaluating to truthy.',
  },
  {
    id: 'q3',
    snippet: `for (let i = 0; i <= specimens.length; i++) {\n  count += specimens[i];\n}`,
    question: 'What runtime value causes `count` to become `NaN`?',
    options: ['`specimens[0]` is negative', '`specimens[length]` is `undefined`', '`let i` cannot increment', 'Array must use `while`'],
    correctIndex: 1,
    explanation: '0-indexed arrays end at `length - 1`. `specimens[length]` is `undefined`.',
  },
  {
    id: 'q4',
    snippet: `const jarCapacity = 10;\njarCapacity = 20;`,
    question: 'What error does this code throw when run?',
    options: ['TypeError: Assignment to constant variable', 'ReferenceError: jarCapacity is not defined', 'SyntaxError: Unexpected token', 'RangeError: Maximum capacity'],
    correctIndex: 0,
    explanation: 'Variables declared with `const` cannot be reassigned.',
  },
  {
    id: 'q5',
    snippet: `function getPrice(isVIP) {\n  return isVIP ? 100 : 80;\n}`,
    question: 'If VIP explorers should receive a discount (80), what is wrong?',
    options: ['Ternary branches are inverted', '`isVIP` must be string', 'Missing `return`', 'Float numbers unsupported'],
    correctIndex: 0,
    explanation: 'Ternary returns the first branch on true, so VIPs get 100 instead of 80.',
  },
  {
    id: 'q6',
    snippet: `function countdown(n) {\n  if (n === 1) return;\n  countdown(n - 1);\n}`,
    question: 'What happens if `countdown(0)` is executed?',
    options: ['Returns 0', 'Infinite recursion stack overflow', 'SyntaxError', 'Immediately exits'],
    correctIndex: 1,
    explanation: '`0 === 1` is false, descending into negative infinity until call stack exhaustion.',
  },
  {
    id: 'q7',
    snippet: `const copy = { ...specimen };\ncopy.meta.color = "gold";`,
    question: 'Why does this also modify `specimen.meta.color`?',
    options: ['Object spread only performs shallow copy', 'Spread operator is deprecated', '`copy` is frozen', '`meta` requires `const`'],
    correctIndex: 0,
    explanation: 'Nested objects are copied by reference with standard object spread.',
  },
  {
    id: 'q8',
    snippet: `const mid = (low + high) / 2;\nreturn arr[mid];`,
    question: 'What happens in binary search when `(0 + 3) / 2 = 1.5`?',
    options: ['JavaScript rounds automatically', '`arr[1.5]` evaluates to `undefined`', 'Returns 1', 'Throws InvalidIndexException'],
    correctIndex: 1,
    explanation: 'Array indices must be integers; missing `Math.floor()`.',
  },
];

export const ArcadeBlitzScreen: React.FC<ArcadeBlitzScreenProps> = ({
  user,
  onBack,
  onCoinsAwarded,
}) => {
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || isGameOver) {
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          soundManager.playError();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameOver]);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null || isGameOver) return;
    setSelectedOption(index);

    const curr = BLITZ_QUESTIONS[qIndex];
    const correct = index === curr.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      soundManager.playSuccess();
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      const multiplier = Math.min(5, 1 + newCombo * 0.5);
      const points = Math.round(100 * multiplier);
      setScore(prev => prev + points);
    } else {
      soundManager.playError();
      setCombo(0);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      if (qIndex + 1 < BLITZ_QUESTIONS.length) {
        setQIndex(prev => prev + 1);
      } else {
        setQIndex(0);
      }
    }, 900);
  };

  const handleRestart = () => {
    soundManager.playKey();
    setQIndex(0);
    setTimeLeft(60);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setIsGameOver(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const currentQ = BLITZ_QUESTIONS[qIndex];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6 bg-[#04140d]">
      {/* HUD Header */}
      <div className="flex items-center justify-between p-4 bg-[#082216] border-2 border-[#184b35] rounded-3xl shadow-xl">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#05170f] hover:bg-[#0c2f21] text-emerald-300 rounded-xl text-xs font-bold cursor-pointer transition-colors border border-[#164632]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Blitz</span>
        </button>

        <div className="flex items-center gap-6 font-mono text-xs">
          {/* Combo Multiplier */}
          <div className="flex items-center gap-1 text-orange-400 font-extrabold">
            <Flame className={`w-4 h-4 fill-orange-400 ${combo > 1 ? 'animate-bounce' : ''}`} />
            <span>COMBO x{combo}</span>
          </div>

          {/* Clock */}
          <div className={`flex items-center gap-1.5 ${timeLeft <= 15 ? 'text-orange-400 animate-pulse font-extrabold' : 'text-lime-400 font-bold'}`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm tabular-nums">{timeLeft}s</span>
          </div>

          {/* Total Score */}
          <div className="text-slate-100 font-black text-sm">
            {score.toLocaleString()} PTS
          </div>
        </div>
      </div>

      {!isGameOver ? (
        /* Active Question Card */
        <div className="bg-[#082216] border-2 border-[#184b35] rounded-3xl p-6 shadow-2xl space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span className="text-lime-400 font-extrabold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>RAPID BUG TARGET #{qIndex + 1}</span>
            </span>
            <span className="font-bold">Speedrun Survival</span>
          </div>

          {/* Code Snippet */}
          <div className="p-4 bg-[#04120b] rounded-2xl border border-[#14422e] font-mono text-xs text-lime-300 leading-relaxed overflow-x-auto shadow-inner">
            <pre>{currentQ.snippet}</pre>
          </div>

          {/* Question Text */}
          <h2 className="text-base font-extrabold text-slate-100">{currentQ.question}</h2>

          {/* Answer Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              const isChosen = selectedOption === idx;
              const isAnswerCorrect = idx === currentQ.correctIndex;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-2xl border-2 text-left text-xs font-mono transition-all cursor-pointer ${
                    isChosen
                      ? isCorrect
                        ? 'bg-lime-950/80 border-lime-400 text-lime-200 shadow-[0_0_20px_rgba(132,204,22,0.5)] font-bold'
                        : 'bg-orange-950/80 border-orange-500 text-orange-200 shadow-[0_0_20px_rgba(249,115,22,0.5)] font-bold'
                      : selectedOption !== null && isAnswerCorrect
                      ? 'bg-lime-950/40 border-lime-500 text-lime-300'
                      : 'bg-[#05170f] hover:bg-[#0c2f21] border-[#164632] text-emerald-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {isChosen && (
                      isCorrect ? <CheckCircle2 className="w-4 h-4 text-lime-400 stroke-[3]" /> : <XCircle className="w-4 h-4 text-orange-400 stroke-[3]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Arcade Game Over Summary */
        <div className="bg-[#082216] border-2 border-lime-500/50 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-lime-500/20 border-2 border-lime-400 flex items-center justify-center text-lime-400 mx-auto shadow-[0_0_25px_rgba(132,204,22,0.5)]">
            <Trophy className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-100">Bug Blitz Complete!</h2>
            <p className="text-xs text-lime-300 font-mono font-bold">Safari speedrun expedition concluded.</p>
          </div>

          <div className="grid grid-cols-2 max-w-sm mx-auto gap-4 p-4 bg-[#05170f] rounded-2xl border border-[#164632] font-mono text-xs">
            <div>
              <div className="text-emerald-500 font-bold uppercase">Final Score</div>
              <div className="text-xl font-black text-lime-400">{score.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-emerald-500 font-bold uppercase">Max Combo</div>
              <div className="text-xl font-black text-orange-400">x{maxCombo}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-orange-950/60 transition-all cursor-pointer uppercase tracking-wider"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Hunt Again</span>
            </button>
            <button
              onClick={onBack}
              className="px-5 py-3.5 bg-[#05170f] hover:bg-[#0c2f21] text-emerald-200 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-[#164632]"
            >
              Return to Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
