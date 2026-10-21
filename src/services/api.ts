import { User, Challenge, RunSubmissionResult, LeaderboardEntry, Badge, SandboxInfo, MongoStatusInfo } from '../types/game';

const TOKEN_KEY = 'bughunter_auth_token';

export const api = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Server request failed');
    }

    return data as T;
  },

  async register(username: string, email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await this.request<{ user: User; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    this.setToken(res.token);
    return res;
  },

  async login(usernameOrEmail: string, password: string): Promise<{ user: User; token: string }> {
    const res = await this.request<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    this.setToken(res.token);
    return res;
  },

  async demoLogin(demoUserId: string): Promise<{ user: User; token: string }> {
    const res = await this.request<{ user: User; token: string }>('/api/auth/demo-login', {
      method: 'POST',
      body: JSON.stringify({ demoUserId }),
    });
    this.setToken(res.token);
    return res;
  },

  async getMe(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/api/auth/me');
  },

  async logout(): Promise<void> {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
    }
  },

  async getChallenges(): Promise<{ challenges: (Challenge & { isUnlocked: boolean; isSolved: boolean })[]; unlockedLevel: number }> {
    return this.request('/api/challenges');
  },

  async getDailyChallenge(): Promise<{ challenge: Challenge; isSolved: boolean }> {
    return this.request('/api/challenges/daily');
  },

  async getChallenge(id: string): Promise<{ challenge: Challenge; isSolved: boolean }> {
    return this.request(`/api/challenges/${id}`);
  },

  async runCode(
    challengeId: string,
    code: string,
    isSubmitting: boolean = false,
    hintsUsed: number = 0,
    timeRemainingSeconds: number = 0
  ): Promise<RunSubmissionResult> {
    return this.request(`/api/challenges/${challengeId}/run`, {
      method: 'POST',
      body: JSON.stringify({
        code,
        isSubmitting,
        hintsUsed,
        timeRemainingSeconds,
      }),
    });
  },

  async reviveUser(): Promise<{ success: boolean; coins: number; lives: number }> {
    return this.request('/api/user/revive', { method: 'POST' });
  },

  async restartUser(): Promise<{ lives: number }> {
    return this.request('/api/user/restart', { method: 'POST' });
  },

  async buyPerk(perkId: 'shield' | 'overclock' | 'xray'): Promise<{ success: boolean; user: User }> {
    return this.request('/api/user/buy-perk', {
      method: 'POST',
      body: JSON.stringify({ perkId })
    });
  },

  async usePerk(perkId: 'shield' | 'overclock' | 'xray'): Promise<{ success: boolean; user: User }> {
    return this.request('/api/user/use-perk', {
      method: 'POST',
      body: JSON.stringify({ perkId })
    });
  },

  async getLeaderboard(): Promise<{ leaderboard: LeaderboardEntry[] }> {
    return this.request('/api/leaderboard');
  },

  async getBadges(): Promise<{ badges: Badge[] }> {
    return this.request('/api/badges');
  },

  async getSandboxInfo(): Promise<SandboxInfo> {
    return this.request('/api/system/sandbox-info');
  },

  async getMongoStatus(): Promise<MongoStatusInfo> {
    return this.request('/api/system/mongo-status');
  },

  async connectMongo(uri: string, databaseName?: string): Promise<{ success: boolean; message: string; status: MongoStatusInfo; error?: string }> {
    return this.request('/api/system/mongo-connect', {
      method: 'POST',
      body: JSON.stringify({ uri, databaseName }),
    });
  },

  async disconnectMongo(): Promise<{ success: boolean; message: string; status: MongoStatusInfo }> {
    return this.request('/api/system/mongo-disconnect', {
      method: 'POST',
    });
  },

  async syncMongo(): Promise<{ success: boolean; count: number; status: MongoStatusInfo }> {
    return this.request('/api/system/mongo-sync', {
      method: 'POST',
    });
  },
};
