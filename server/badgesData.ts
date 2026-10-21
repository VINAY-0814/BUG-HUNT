import { Badge } from '../src/types/game.js';

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Squash your very first bug in Cyberspace',
    icon: 'Bug',
    criteria: 'Solve any challenge'
  },
  {
    id: 'syntax_sentinel',
    name: 'Syntax Sentinel',
    description: 'Mastered variables, identifiers, and syntax fundamentals',
    icon: 'ShieldCheck',
    criteria: 'Solve all Level 1 (Beginner) challenges'
  },
  {
    id: 'logic_master',
    name: 'Logic Master',
    description: 'Conquered boolean operators and boundary condition traps',
    icon: 'Cpu',
    criteria: 'Solve all Level 2 (Easy) challenges'
  },
  {
    id: 'loop_conqueror',
    name: 'Loop Conqueror',
    description: 'Tamed iteration, scopes, and reference mutations',
    icon: 'RotateCw',
    criteria: 'Solve all Level 3 (Intermediate) challenges'
  },
  {
    id: 'algorithm_ace',
    name: 'Algorithm Ace',
    description: 'Deconstructed recursion, objects, and algorithmic bottlenecks',
    icon: 'Binary',
    criteria: 'Solve all Level 4 (Advanced) challenges'
  },
  {
    id: 'root_terminator',
    name: 'Root Terminator',
    description: 'Crushed multi-bug systems and complex concurrency flaws',
    icon: 'Flame',
    criteria: 'Solve all Level 5 (Expert) challenges'
  },
  {
    id: 'flawless_fix',
    name: 'Zero-Day Flawless',
    description: 'Fixed a challenge on the first run with zero hints used',
    icon: 'Award',
    criteria: 'Solve a challenge on first attempt with 0 hints'
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Cracked a code challenge in under 30 seconds',
    icon: 'Zap',
    criteria: 'Solve a challenge with >= 60s remaining on clock'
  },
  {
    id: 'streak_operative',
    name: 'Streak Operative',
    description: 'Maintained active hacking streak of 3 consecutive missions',
    icon: 'Radio',
    criteria: 'Reach a streak count of 3'
  },
  {
    id: 'daily_crusher',
    name: 'Daily Infiltrator',
    description: 'Successfully submitted the Daily Debugging Special',
    icon: 'Calendar',
    criteria: 'Solve the Daily Challenge'
  },
  {
    id: 'coin_hoarder',
    name: 'Crypto Baron',
    description: 'Amassed over 500 Cyber Coins in your security vault',
    icon: 'Coins',
    criteria: 'Reach 500 coins'
  }
];
