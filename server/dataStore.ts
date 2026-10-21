import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { User, UserStats, LeaderboardEntry, Badge } from '../src/types/game.js';
import { ALL_BADGES } from './badgesData.js';
import { ALL_CHALLENGES } from './challengesData.js';
import { mongoDbManager } from './mongoStore.js';

interface StoredUser extends User {
  passwordHash: string;
  salt: string;
}

interface DatabaseSchema {
  users: Record<string, StoredUser>;
  sessions: Record<string, string>; // token -> userId
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// In-memory cache
let db: DatabaseSchema = {
  users: {},
  sessions: {}
};

function hashPassword(password: string, salt: string): string {
  return crypto.createHash('sha256').update(password + salt).digest('hex');
}

/**
 * Initializes database with default seed users and persists to disk
 */
export function initDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      db = JSON.parse(raw);
    } catch (err) {
      console.warn('Failed to parse existing db.json, re-initializing...', err);
      seedInitialData();
    }
  } else {
    seedInitialData();
  }

  // Ensure demo accounts always exist
  if (!db.users['usr_neo']) {
    seedInitialData();
  }

  // Auto-sync with MongoDB if connected at startup
  setTimeout(async () => {
    if (mongoDbManager.getIsConnected()) {
      console.log('[MongoDB] Auto-syncing local datastore into MongoDB collections...');
      await mongoDbManager.syncFromLocal(db.users, db.sessions).catch(err => {
        console.log('[MongoDB] Initial boot sync notice:', err.message);
      });
    }
  }, 2500);
}

function seedInitialData() {
  const seedSalt = 'cyber_salt_2026';
  
  const seedUsers: StoredUser[] = [
    {
      id: 'usr_neo',
      username: 'Neo_Hacker',
      email: 'neo@matrix.cyber',
      passwordHash: hashPassword('matrix123', seedSalt),
      salt: seedSalt,
      avatarSeed: 'neo_matrix',
      createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
      badges: ['first_blood', 'syntax_sentinel', 'logic_master', 'loop_conqueror', 'algorithm_ace', 'root_terminator', 'speed_demon'],
      stats: {
        score: 6420,
        coins: 850,
        xp: 6420,
        lives: 3,
        maxLives: 3,
        streak: 12,
        unlockedLevel: 5,
        solvedChallengeIds: ALL_CHALLENGES.slice(0, 22).map(c => c.id),
        hintsUsedCount: 4,
        totalSubmissions: 35,
        perfectFixesCount: 18,
        lastPlayedDate: new Date().toISOString()
      }
    },
    {
      id: 'usr_ada',
      username: 'Ada_Lovelace',
      email: 'ada@computing.cyber',
      passwordHash: hashPassword('ada123', seedSalt),
      salt: seedSalt,
      avatarSeed: 'ada_lovelace',
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      badges: ['first_blood', 'syntax_sentinel', 'logic_master', 'flawless_fix', 'streak_operative'],
      stats: {
        score: 4180,
        coins: 520,
        xp: 4180,
        lives: 3,
        maxLives: 3,
        streak: 8,
        unlockedLevel: 4,
        solvedChallengeIds: ALL_CHALLENGES.slice(0, 16).map(c => c.id),
        hintsUsedCount: 2,
        totalSubmissions: 22,
        perfectFixesCount: 12,
        lastPlayedDate: new Date().toISOString()
      }
    },
    {
      id: 'usr_cipher',
      username: 'Cipher_Queen',
      email: 'cipher@defense.cyber',
      passwordHash: hashPassword('cipher123', seedSalt),
      salt: seedSalt,
      avatarSeed: 'cipher_queen',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      badges: ['first_blood', 'syntax_sentinel', 'flawless_fix'],
      stats: {
        score: 2850,
        coins: 340,
        xp: 2850,
        lives: 2,
        maxLives: 3,
        streak: 5,
        unlockedLevel: 3,
        solvedChallengeIds: ALL_CHALLENGES.slice(0, 10).map(c => c.id),
        hintsUsedCount: 3,
        totalSubmissions: 18,
        perfectFixesCount: 8,
        lastPlayedDate: new Date().toISOString()
      }
    },
    {
      id: 'usr_glitch',
      username: 'Glitch_Hunter',
      email: 'glitch@sentinel.cyber',
      passwordHash: hashPassword('glitch123', seedSalt),
      salt: seedSalt,
      avatarSeed: 'glitch_hunter',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      badges: ['first_blood'],
      stats: {
        score: 1450,
        coins: 180,
        xp: 1450,
        lives: 3,
        maxLives: 3,
        streak: 2,
        unlockedLevel: 2,
        solvedChallengeIds: ALL_CHALLENGES.slice(0, 6).map(c => c.id),
        hintsUsedCount: 5,
        totalSubmissions: 12,
        perfectFixesCount: 3,
        lastPlayedDate: new Date().toISOString()
      }
    }
  ];

  db.users = {};
  for (const u of seedUsers) {
    db.users[u.id] = u;
  }
  db.sessions = {};
  saveToDisk();
}

function saveToDisk(userToSync?: StoredUser) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    if (userToSync) {
      syncUserToMongo(userToSync);
    }
  } catch (err) {
    console.error('Failed to write to db.json:', err);
  }
}

function syncUserToMongo(user: StoredUser) {
  if (mongoDbManager.getIsConnected()) {
    mongoDbManager.saveUser({ ...user, _id: user.id }).catch(err => {
      console.warn('[MongoDB] Sync user notice:', err.message);
    });
  }
}

function syncSessionToMongo(token: string, userId: string) {
  if (mongoDbManager.getIsConnected()) {
    mongoDbManager.saveSession(token, userId).catch(err => {
      console.warn('[MongoDB] Sync session notice:', err.message);
    });
  }
}

function removeSessionFromMongo(token: string) {
  if (mongoDbManager.getIsConnected()) {
    mongoDbManager.deleteSession(token).catch(err => {
      console.warn('[MongoDB] Delete session notice:', err.message);
    });
  }
}

// User & Auth operations
export function registerUser(username: string, email: string, password: string): { user: User; token: string } {
  // Check if username exists
  const existingUser = Object.values(db.users).find(
    u => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
  );
  if (existingUser) {
    throw new Error('Username or email is already registered.');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);
  const userId = 'usr_' + crypto.randomUUID().slice(0, 8);

  const newUser: StoredUser = {
    id: userId,
    username,
    email,
    passwordHash,
    salt,
    avatarSeed: username.toLowerCase().replace(/[^a-z0-9]/g, '_'),
    createdAt: new Date().toISOString(),
    badges: [],
    stats: {
      score: 0,
      coins: 100, // starter bonus coins
      xp: 0,
      lives: 3,
      maxLives: 3,
      streak: 1,
      unlockedLevel: 1,
      solvedChallengeIds: [],
      hintsUsedCount: 0,
      totalSubmissions: 0,
      perfectFixesCount: 0,
      lastPlayedDate: new Date().toISOString()
    }
  };

  db.users[userId] = newUser;
  const token = 'tok_' + crypto.randomBytes(24).toString('hex');
  db.sessions[token] = userId;
  saveToDisk();
  syncUserToMongo(newUser);
  syncSessionToMongo(token, userId);

  const { passwordHash: _, salt: __, ...sanitized } = newUser;
  return { user: sanitized, token };
}

export function loginUser(usernameOrEmail: string, password: string): { user: User; token: string } {
  const user = Object.values(db.users).find(
    u => u.username.toLowerCase() === usernameOrEmail.toLowerCase() || u.email.toLowerCase() === usernameOrEmail.toLowerCase()
  );

  if (!user) {
    throw new Error('Invalid credentials. User not found.');
  }

  const hash = hashPassword(password, user.salt);
  if (hash !== user.passwordHash) {
    throw new Error('Invalid credentials. Password incorrect.');
  }

  const token = 'tok_' + crypto.randomBytes(24).toString('hex');
  db.sessions[token] = user.id;
  saveToDisk();
  syncSessionToMongo(token, user.id);

  const { passwordHash: _, salt: __, ...sanitized } = user;
  return { user: sanitized, token };
}

export function getUserByToken(token: string): User | null {
  const userId = db.sessions[token];
  if (!userId) return null;
  const user = db.users[userId];
  if (!user) return null;

  const { passwordHash: _, salt: __, ...sanitized } = user;
  return sanitized;
}

export function logoutUser(token: string) {
  delete db.sessions[token];
  saveToDisk();
  removeSessionFromMongo(token);
}

export function getUserById(userId: string): User | null {
  const user = db.users[userId];
  if (!user) return null;
  const { passwordHash: _, salt: __, ...sanitized } = user;
  return sanitized;
}

export function updateUserStats(userId: string, updates: Partial<UserStats>): User {
  const user = db.users[userId];
  if (!user) throw new Error('User not found');

  user.stats = {
    ...user.stats,
    ...updates
  };

  saveToDisk(user);
  const { passwordHash: _, salt: __, ...sanitized } = user;
  return sanitized;
}

export function recordFailedAttempt(userId: string): { livesRemaining: number } {
  const user = db.users[userId];
  if (!user) throw new Error('User not found');

  user.stats.lives = Math.max(0, user.stats.lives - 1);
  user.stats.totalSubmissions += 1;
  saveToDisk(user);

  return { livesRemaining: user.stats.lives };
}

export function reviveUserWithCoins(userId: string): { success: boolean; coins: number; lives: number; error?: string } {
  const user = db.users[userId];
  if (!user) throw new Error('User not found');

  const COST = 100;
  if (user.stats.coins < COST) {
    return {
      success: false,
      coins: user.stats.coins,
      lives: user.stats.lives,
      error: `Insufficient coins. Revive requires ${COST} coins, but you have ${user.stats.coins}.`
    };
  }

  user.stats.coins -= COST;
  user.stats.lives = user.stats.maxLives;
  saveToDisk(user);

  return {
    success: true,
    coins: user.stats.coins,
    lives: user.stats.lives
  };
}

export function restartUserSession(userId: string): { lives: number } {
  const user = db.users[userId];
  if (!user) throw new Error('User not found');

  user.stats.lives = user.stats.maxLives;
  saveToDisk(user);
  return { lives: user.stats.lives };
}

export function buyPerk(userId: string, perkId: 'shield' | 'overclock' | 'xray'): { success: boolean; user: User; error?: string } {
  const user = db.users[userId];
  if (!user) throw new Error('User not found');

  const prices: Record<string, number> = {
    shield: 60,
    overclock: 40,
    xray: 50
  };

  const cost = prices[perkId] || 50;
  if (user.stats.coins < cost) {
    return {
      success: false,
      user: user as any,
      error: `Requires ${cost} Cyber Coins, but you have ${user.stats.coins}.`
    };
  }

  user.stats.coins -= cost;
  if (!user.stats.inventory) {
    user.stats.inventory = { shield: 0, overclock: 0, xray: 0 };
  }
  user.stats.inventory[perkId] = (user.stats.inventory[perkId] || 0) + 1;
  saveToDisk(user);

  const { passwordHash: _, salt: __, ...sanitized } = user;
  return { success: true, user: sanitized };
}

export function usePerk(userId: string, perkId: 'shield' | 'overclock' | 'xray'): { success: boolean; user: User; error?: string } {
  const user = db.users[userId];
  if (!user) throw new Error('User not found');

  if (!user.stats.inventory || (user.stats.inventory[perkId] || 0) <= 0) {
    return { success: false, user: user as any, error: 'You do not own this perk.' };
  }

  user.stats.inventory[perkId] -= 1;
  saveToDisk(user);

  const { passwordHash: _, salt: __, ...sanitized } = user;
  return { success: true, user: sanitized };
}

/**
 * Evaluates and awards badges based on player statistics
 */
export function checkAndAwardBadges(user: StoredUser, recentChallengeId?: string, hintsUsed: number = 0, secondsRemaining: number = 0): Badge[] {
  const newlyAwarded: Badge[] = [];
  const existingBadgeIds = new Set(user.badges);

  const award = (badgeId: string) => {
    if (!existingBadgeIds.has(badgeId)) {
      user.badges.push(badgeId);
      existingBadgeIds.add(badgeId);
      const b = ALL_BADGES.find(item => item.id === badgeId);
      if (b) newlyAwarded.push(b);
    }
  };

  // 1. First Blood
  if (user.stats.solvedChallengeIds.length >= 1) {
    award('first_blood');
  }

  // 2. Syntax Sentinel (All L1 solved)
  const l1Ids = ALL_CHALLENGES.filter(c => c.level === 1).map(c => c.id);
  if (l1Ids.every(id => user.stats.solvedChallengeIds.includes(id))) {
    award('syntax_sentinel');
  }

  // 3. Logic Master (All L2 solved)
  const l2Ids = ALL_CHALLENGES.filter(c => c.level === 2).map(c => c.id);
  if (l2Ids.every(id => user.stats.solvedChallengeIds.includes(id))) {
    award('logic_master');
  }

  // 4. Loop Conqueror (All L3 solved)
  const l3Ids = ALL_CHALLENGES.filter(c => c.level === 3).map(c => c.id);
  if (l3Ids.every(id => user.stats.solvedChallengeIds.includes(id))) {
    award('loop_conqueror');
  }

  // 5. Algorithm Ace (All L4 solved)
  const l4Ids = ALL_CHALLENGES.filter(c => c.level === 4).map(c => c.id);
  if (l4Ids.every(id => user.stats.solvedChallengeIds.includes(id))) {
    award('algorithm_ace');
  }

  // 6. Root Terminator (All L5 solved)
  const l5Ids = ALL_CHALLENGES.filter(c => c.level === 5).map(c => c.id);
  if (l5Ids.every(id => user.stats.solvedChallengeIds.includes(id))) {
    award('root_terminator');
  }

  // 7. Flawless fix
  if (hintsUsed === 0 && user.stats.perfectFixesCount >= 1) {
    award('flawless_fix');
  }

  // 8. Speed demon
  if (secondsRemaining >= 60) {
    award('speed_demon');
  }

  // 9. Streak operative
  if (user.stats.streak >= 3) {
    award('streak_operative');
  }

  // 10. Coin hoarder
  if (user.stats.coins >= 500) {
    award('coin_hoarder');
  }

  // 11. Daily crusher
  if (recentChallengeId === 'daily_special_quantum_hasher') {
    award('daily_crusher');
  }

  return newlyAwarded;
}

/**
 * Records a successful challenge solve and calculates score, XP, coins, and unlocks
 */
export function recordChallengeSuccess(
  userId: string,
  challengeId: string,
  hintsUsedCount: number,
  timeRemainingSeconds: number
): {
  pointsEarned: number;
  coinsEarned: number;
  xpEarned: number;
  newBadges: Badge[];
  user: User;
} {
  const user = db.users[userId];
  if (!user) throw new Error('User not found');

  const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) throw new Error('Challenge not found');

  const alreadySolved = user.stats.solvedChallengeIds.includes(challengeId);

  // Scoring formula: Base Points - (Hints * 25) + Time Bonus
  const hintPenalty = hintsUsedCount * 25;
  const timeBonus = Math.floor(timeRemainingSeconds * 0.5);
  const pointsEarned = Math.max(30, challenge.points - hintPenalty + timeBonus);
  const coinsEarned = alreadySolved ? 10 : Math.floor(challenge.points / 5);
  const xpEarned = pointsEarned;

  if (!alreadySolved) {
    user.stats.solvedChallengeIds.push(challengeId);
  }

  user.stats.score += pointsEarned;
  user.stats.xp += xpEarned;
  user.stats.coins += coinsEarned;
  user.stats.totalSubmissions += 1;
  user.stats.hintsUsedCount += hintsUsedCount;
  if (hintsUsedCount === 0) {
    user.stats.perfectFixesCount += 1;
  }

  // Update streak if played today
  user.stats.streak = (user.stats.streak || 0) + 1;
  user.stats.lastPlayedDate = new Date().toISOString();

  // Calculate unlocked level:
  // L2 requires 4 L1 solves
  // L3 requires 4 L2 solves
  // L4 requires 4 L3 solves
  // L5 requires 4 L4 solves
  const solvedSet = new Set(user.stats.solvedChallengeIds);
  const countLevel = (lvl: number) =>
    ALL_CHALLENGES.filter(c => c.level === lvl && solvedSet.has(c.id)).length;

  let maxUnlocked = 1;
  if (countLevel(1) >= 4) maxUnlocked = 2;
  if (countLevel(2) >= 4) maxUnlocked = 3;
  if (countLevel(3) >= 4) maxUnlocked = 4;
  if (countLevel(4) >= 4) maxUnlocked = 5;

  user.stats.unlockedLevel = Math.max(user.stats.unlockedLevel, maxUnlocked);

  // Check badges
  const newBadges = checkAndAwardBadges(user, challengeId, hintsUsedCount, timeRemainingSeconds);

  saveToDisk(user);

  // Asynchronously log solution attempt in MongoDB if connected
  if (mongoDbManager.getIsConnected()) {
    mongoDbManager.logChallengeSolution({
      userId,
      challengeId,
      pointsEarned,
      hintsUsedCount,
      timeRemainingSeconds,
      timestamp: new Date().toISOString()
    }).catch(err => console.warn('[MongoDB] Log challenge solution error:', err.message));
  }

  const { passwordHash: _, salt: __, ...sanitized } = user;
  return {
    pointsEarned,
    coinsEarned,
    xpEarned,
    newBadges,
    user: sanitized
  };
}

export function getLeaderboard(): LeaderboardEntry[] {
  const usersList = Object.values(db.users);
  
  usersList.sort((a, b) => b.stats.score - a.stats.score);

  return usersList.map((u, index) => {
    const topBadgeId = u.badges[u.badges.length - 1];
    const topBadge = ALL_BADGES.find(b => b.id === topBadgeId)?.name;

    return {
      rank: index + 1,
      userId: u.id,
      username: u.username,
      avatarSeed: u.avatarSeed,
      score: u.stats.score,
      solvedCount: u.stats.solvedChallengeIds.length,
      streak: u.stats.streak,
      currentLevel: u.stats.unlockedLevel,
      topBadge
    };
  });
}

// ----------------------------------------------------
// MONGODB MANAGEMENT & SYNC EXPORTS
// ----------------------------------------------------
export async function getMongoStatus() {
  return await mongoDbManager.getStatus();
}

export async function connectToMongo(uri: string, dbName: string = 'bughunt') {
  const result = await mongoDbManager.connect(uri, dbName);
  if (result.success) {
    const syncedCount = await mongoDbManager.syncFromLocal(db.users, db.sessions);
    return { ...result, syncedCount };
  }
  return result;
}

export async function disconnectFromMongo() {
  await mongoDbManager.disconnect();
}

export async function syncLocalDataToMongo() {
  return await mongoDbManager.syncFromLocal(db.users, db.sessions);
}
