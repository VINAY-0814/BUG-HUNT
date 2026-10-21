export type DifficultyLevel = 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced' | 'Expert';

export interface TestCase {
  id: string;
  description: string;
  args: any[];
  expected: any;
  isHidden?: boolean;
}

export interface TestResult {
  id: string;
  description: string;
  args: any[];
  expected: any;
  received: any;
  passed: boolean;
  error?: string;
  executionTimeMs: number;
}

export interface Challenge {
  id: string;
  title: string;
  level: number; // 1 to 5
  difficulty: DifficultyLevel;
  category: string;
  story: string;
  bugType: string;
  buggyLineHint?: number;
  points: number;
  timeLimit: number; // in seconds
  starterCode: string;
  correctCode: string;
  functionName: string;
  testCases: TestCase[];
  hints: string[];
  explanation: {
    summary: string;
    rootCause: string;
    fixDetails: string;
    takeaway: string;
  };
  isDaily?: boolean;
  isBoss?: boolean;
  bossName?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  criteria: string;
}

export interface PowerUp {
  id: 'shield' | 'overclock' | 'xray';
  name: string;
  description: string;
  cost: number;
  icon: string;
}

export interface UserStats {
  score: number;
  coins: number;
  xp: number;
  lives: number;
  maxLives: number;
  streak: number;
  lastPlayedDate?: string;
  solvedChallengeIds: string[];
  unlockedLevel: number;
  hintsUsedCount: number;
  totalSubmissions: number;
  perfectFixesCount: number;
  inventory?: {
    shield: number;
    overclock: number;
    xray: number;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarSeed: string;
  createdAt: string;
  stats: UserStats;
  badges: string[]; // badge IDs
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarSeed: string;
  score: number;
  solvedCount: number;
  streak: number;
  currentLevel: number;
  topBadge?: string;
}

export interface RunSubmissionResult {
  passed: boolean;
  testResults: TestResult[];
  passedTestsCount: number;
  totalTestsCount: number;
  consoleLogs: string[];
  compileError?: string;
  executionTimeTotalMs: number;
  pointsEarned?: number;
  coinsEarned?: number;
  xpEarned?: number;
  livesRemaining?: number;
  explanation?: Challenge['explanation'];
  nextChallengeId?: string;
  newBadgesUnlocked?: Badge[];
}

export interface SandboxInfo {
  engine: string;
  mode: 'isolated_ast_eval' | 'docker_container_mock' | 'simulated_runner';
  timeoutLimitMs: number;
  memoryLimitMb: number;
  networkAccess: boolean;
  disallowedTokens: string[];
  securityNotice: string;
}

export interface MongoStatusInfo {
  connected: boolean;
  statusText: string;
  uriMasked?: string;
  databaseName: string;
  collections: {
    usersCount: number;
    sessionsCount: number;
    challengesCount: number;
  };
  error?: string;
  lastSync?: string;
  atlasHelpRequired?: boolean;
  atlasHelpMessage?: string;
  suggestedUris?: { label: string; uri: string }[];
}

