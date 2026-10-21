import { MongoClient, Db, Collection, ServerApiVersion } from 'mongodb';
import { User, UserStats, LeaderboardEntry, Badge, MongoStatusInfo } from '../src/types/game.js';
import { ALL_BADGES } from './badgesData.js';
import { ALL_CHALLENGES } from './challengesData.js';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface StoredUserDoc extends User {
  _id: string; // matches User.id
  passwordHash: string;
  salt: string;
  updatedAt?: string;
}

export interface SessionDoc {
  _id: string; // token
  token: string;
  userId: string;
  createdAt: string;
  lastActive: string;
}

export interface SolutionLogDoc {
  _id?: string;
  userId: string;
  challengeId: string;
  pointsEarned: number;
  hintsUsedCount: number;
  timeRemainingSeconds: number;
  timestamp: string;
}

export function isValidMongoScheme(uri: string): boolean {
  if (!uri || typeof uri !== 'string') return false;
  const trimmed = uri.trim();
  return trimmed.startsWith('mongodb://') || trimmed.startsWith('mongodb+srv://');
}

export interface SanitizeResult {
  normalizedUri: string;
  sanitized: boolean;
  notes: string[];
  cleanUser?: string;
  cleanPass?: string;
  host?: string;
  altUriNoSpaces?: string;
}

export function sanitizeAndNormalizeMongoUri(rawUri: string, defaultDb: string = 'bughunt'): SanitizeResult {
  if (!rawUri || typeof rawUri !== 'string') {
    return { normalizedUri: '', sanitized: false, notes: ['Empty URI'] };
  }

  let str = rawUri.trim();
  const notes: string[] = [];
  let sanitized = false;

  const schemeMatch = str.match(/^(mongodb(?:\+srv)?:\/\/)(.*)$/i);
  if (!schemeMatch) {
    return { normalizedUri: str, sanitized: false, notes: ['Invalid scheme'] };
  }

  const scheme = schemeMatch[1].toLowerCase();
  const rest = schemeMatch[2];

  const lastAtIndex = rest.lastIndexOf('@');
  if (lastAtIndex === -1) {
    let pathPart = rest;
    if (!pathPart.includes('/') || pathPart.endsWith('/')) {
      pathPart = pathPart.replace(/\/+$/, '') + '/' + defaultDb + '?retryWrites=true&w=majority';
      sanitized = true;
      notes.push(`Appended target database /${defaultDb}`);
    }
    return { normalizedUri: `${scheme}${pathPart}`, sanitized, notes };
  }

  let creds = rest.slice(0, lastAtIndex).trim();
  const hostAndPath = rest.slice(lastAtIndex + 1).trim();

  if (creds.includes('<') || creds.includes('>')) {
    sanitized = true;
    notes.push('Removed placeholder angle brackets < >');
  }

  const firstColon = creds.indexOf(':');
  let rawUser = '';
  let rawPass = '';

  if (firstColon === -1) {
    rawUser = creds.replace(/[<>]/g, '').trim();
  } else {
    rawUser = creds.slice(0, firstColon).replace(/[<>]/g, '').trim();
    rawPass = creds.slice(firstColon + 1).replace(/[<>]/g, '').trim();
  }

  if (rawPass.includes('@')) {
    sanitized = true;
    notes.push('URL-encoded "@" in password as "%40"');
  }

  let decodedUser = rawUser;
  try { decodedUser = decodeURIComponent(rawUser); } catch {}
  let decodedPass = rawPass;
  try { decodedPass = decodeURIComponent(rawPass); } catch {}

  const cleanUser = encodeURIComponent(decodedUser);
  const cleanPass = encodeURIComponent(decodedPass);

  let pathPart = hostAndPath;
  if (!pathPart.includes('/') || pathPart.endsWith('/')) {
    pathPart = pathPart.replace(/\/+$/, '') + '/' + defaultDb + '?retryWrites=true&w=majority';
    sanitized = true;
    notes.push(`Appended target database /${defaultDb}`);
  }

  const normalized = `${scheme}${cleanUser}:${cleanPass}@${pathPart}`;
  
  let altUriNoSpaces: string | undefined;
  if (decodedUser.includes(' ')) {
    const noSpaceUser = encodeURIComponent(decodedUser.replace(/\s+/g, ''));
    altUriNoSpaces = `${scheme}${noSpaceUser}:${cleanPass}@${pathPart}`;
  }

  return {
    normalizedUri: normalized,
    sanitized,
    notes,
    cleanUser: decodedUser,
    cleanPass: decodedPass,
    host: hostAndPath.split('/')[0],
    altUriNoSpaces
  };
}

const CONFIG_FILE_PATH = path.resolve(process.cwd(), 'data/mongo-config.json');

function readSavedMongoConfig(): any | null {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    // ignore
  }
  return null;
}

function writeSavedMongoConfig(cfg: any) {
  try {
    const dir = path.dirname(CONFIG_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(cfg, null, 2), 'utf-8');
  } catch (e) {
    // ignore
  }
}

class MongoDatabaseManager {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private isConnected: boolean = false;
  private isConnecting: boolean = false;
  private currentUri: string = '';
  private currentDbName: string = 'bughunt';
  private lastError: string | null = null;
  private lastSyncTime: string | null = null;
  private atlasHelpRequired: boolean = false;
  private atlasHelpMessage: string | null = null;

  constructor() {
    const rawUri = (process.env.MONGODB_URI || process.env.MONGO_URL || process.env.MONGODB_URL || '').trim();
    const savedConfig = readSavedMongoConfig();

    let initialUri = '';
    if (rawUri && isValidMongoScheme(rawUri)) {
      initialUri = rawUri;
    } else if (savedConfig?.normalizedUri && isValidMongoScheme(savedConfig.normalizedUri)) {
      initialUri = savedConfig.normalizedUri;
    }

    if (initialUri) {
      this.connect(initialUri, savedConfig?.databaseName || 'bughunt').catch(err => {
        console.log('[MongoDB] Initial connection deferred:', err.message);
      });
    } else {
      console.log('[MongoDB] Notice: Running with local persistent JSON datastore. MongoDB driver ready on demand.');
    }
  }

  public async connect(uri: string, dbName: string = 'bughunt'): Promise<{ success: boolean; message: string; error?: string }> {
    if (this.isConnecting) {
      return { success: false, message: 'Connection already in progress' };
    }

    const trimmedInput = (uri || '').trim();
    if (!isValidMongoScheme(trimmedInput)) {
      this.lastError = 'Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"';
      console.log('[MongoDB] Connection skipped: Invalid scheme. Local datastore remains active.');
      return {
        success: false,
        message: 'Invalid MongoDB connection URI. Expected connection string to start with "mongodb://" or "mongodb+srv://"',
        error: this.lastError
      };
    }

    const sanitizedResult = sanitizeAndNormalizeMongoUri(trimmedInput, dbName);
    const targetUri = sanitizedResult.normalizedUri;

    if (sanitizedResult.sanitized) {
      console.log(`[MongoDB] Sanitized URI format: ${sanitizedResult.notes.join(', ')}`);
    }

    this.isConnecting = true;
    this.lastError = null;
    this.atlasHelpRequired = false;
    this.atlasHelpMessage = null;

    try {
      if (this.client) {
        await this.client.close(true).catch(() => {});
        this.client = null;
        this.db = null;
        this.isConnected = false;
      }

      console.log(`[MongoDB] Connecting to MongoDB cluster at ${sanitizedResult.host || 'remote'}...`);
      
      const client = new MongoClient(targetUri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: false,
          deprecationErrors: true,
        },
        connectTimeoutMS: 8000,
        serverSelectionTimeoutMS: 8000,
      });

      await client.connect();
      
      // Ping the database
      const database = client.db(dbName);
      await database.command({ ping: 1 });

      this.client = client;
      this.db = database;
      this.isConnected = true;
      this.currentUri = targetUri;
      this.currentDbName = dbName;
      this.lastSyncTime = new Date().toISOString();
      this.lastError = null;
      this.atlasHelpRequired = false;
      this.atlasHelpMessage = null;

      // Persist working config
      writeSavedMongoConfig({
        rawUri: trimmedInput,
        normalizedUri: targetUri,
        altUriNoSpaces: sanitizedResult.altUriNoSpaces,
        databaseName: dbName,
        atlasCluster: sanitizedResult.host,
        configuredAt: new Date().toISOString()
      });

      console.log(`[MongoDB] Successfully connected to database: ${dbName}!`);

      // Initialize collections and indexes
      await this.initCollectionsAndIndexes();

      this.isConnecting = false;
      return {
        success: true,
        message: `Successfully connected to MongoDB (${dbName})!`
      };
    } catch (err: any) {
      this.isConnected = false;
      this.isConnecting = false;
      const rawMsg = err?.message || 'Failed to connect to MongoDB';
      this.currentUri = targetUri;

      // Detect MongoDB Atlas Network Access Firewall block (SSL Alert 80)
      if (rawMsg.includes('SSL alert number 80') || rawMsg.includes('tlsv1 alert internal error')) {
        this.atlasHelpRequired = true;
        this.atlasHelpMessage = 'MongoDB Atlas Network Access Firewall: Connection rejected (SSL Alert 80). In your MongoDB Atlas dashboard, go to "Network Access" -> click "Add IP Address" -> select "Allow Access from Anywhere" (0.0.0.0/0) -> click Confirm.';
        this.lastError = this.atlasHelpMessage;
      } else if (rawMsg.includes('bad auth') || rawMsg.includes('Authentication failed')) {
        const isPlaceholderPass = sanitizedResult.cleanPass?.toLowerCase() === 'db_password' || sanitizedResult.cleanPass?.toLowerCase() === 'password';
        if (isPlaceholderPass) {
          this.lastError = 'MongoDB Atlas Notice: The URI still has the template placeholder "<db_password>". Please replace "<db_password>" with your actual MongoDB Atlas database password.';
        } else {
          this.lastError = `MongoDB Authentication failed. Verify that user "${sanitizedResult.cleanUser}" exists in Atlas (Security -> Database Access) with the correct password.`;
        }
      } else {
        this.lastError = rawMsg;
      }

      // Persist candidate config
      writeSavedMongoConfig({
        rawUri: trimmedInput,
        normalizedUri: targetUri,
        altUriNoSpaces: sanitizedResult.altUriNoSpaces,
        databaseName: dbName,
        atlasCluster: sanitizedResult.host,
        lastError: this.lastError,
        configuredAt: new Date().toISOString()
      });

      console.log(`[MongoDB] Connection notice: ${this.lastError}. Local JSON datastore remains active.`);
      return {
        success: false,
        message: this.atlasHelpRequired ? this.atlasHelpMessage! : 'Could not connect to MongoDB cluster. Local storage fallback is active.',
        error: this.lastError || undefined
      };
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close(true).catch(() => {});
      this.client = null;
      this.db = null;
      this.isConnected = false;
      this.currentUri = '';
    }
    this.lastError = null;
  }

  private async initCollectionsAndIndexes(): Promise<void> {
    if (!this.db) return;

    try {
      const usersCol = this.db.collection<StoredUserDoc>('users');
      await usersCol.createIndex({ username: 1 }, { unique: true, sparse: true }).catch(() => {});
      await usersCol.createIndex({ email: 1 }, { unique: true, sparse: true }).catch(() => {});

      const sessionsCol = this.db.collection<SessionDoc>('sessions');
      await sessionsCol.createIndex({ token: 1 }, { unique: true }).catch(() => {});
      await sessionsCol.createIndex({ userId: 1 }).catch(() => {});

      const logsCol = this.db.collection<SolutionLogDoc>('challenge_solutions');
      await logsCol.createIndex({ userId: 1, challengeId: 1 }).catch(() => {});
      await logsCol.createIndex({ timestamp: -1 }).catch(() => {});

      // Seed & sync all 106 challenges into MongoDB collection
      const challengesCol = this.db.collection('challenges');
      await challengesCol.createIndex({ id: 1 }, { unique: true }).catch(() => {});
      
      const bulkOps = ALL_CHALLENGES.map(ch => ({
        updateOne: {
          filter: { id: ch.id },
          update: { $set: ch },
          upsert: true
        }
      }));
      if (bulkOps.length > 0) {
        await challengesCol.bulkWrite(bulkOps, { ordered: false }).catch(err => {
          console.warn('[MongoDB] Challenge bulk sync notice:', err.message);
        });
        console.log(`[MongoDB] Synced ${ALL_CHALLENGES.length} challenges into MongoDB collection 'challenges'`);
      }
    } catch (err) {
      console.warn('[MongoDB] Index creation notice:', err);
    }
  }

  public getIsConnected(): boolean {
    return this.isConnected;
  }

  public async getStatus(): Promise<MongoStatusInfo> {
    let usersCount = 0;
    let sessionsCount = 0;
    const challengesCount = ALL_CHALLENGES.length;

    if (this.isConnected && this.db) {
      try {
        usersCount = await this.db.collection('users').countDocuments().catch(() => 0);
        sessionsCount = await this.db.collection('sessions').countDocuments().catch(() => 0);
      } catch (err) {
        // ignore count errors
      }
    }

    let maskedUri = '';
    if (this.currentUri && isValidMongoScheme(this.currentUri)) {
      maskedUri = this.currentUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
    }

    const savedCfg = readSavedMongoConfig();
    const envUri = (process.env.MONGODB_URI || process.env.MONGO_URL || process.env.MONGODB_URL || '').trim();
    const hasValidEnv = isValidMongoScheme(envUri);

    let statusText = 'Ready to Connect (Local Fallback Active)';
    if (this.isConnected) {
      statusText = 'Connected (MongoDB Driver v6)';
    } else if (this.atlasHelpRequired && this.atlasHelpMessage) {
      statusText = this.atlasHelpMessage;
    } else if (this.lastError) {
      statusText = this.lastError;
    } else if (envUri && !hasValidEnv) {
      statusText = 'Ready (Local Fallback Active)';
    }

    const suggestedUris: { label: string; uri: string }[] = [
      { label: 'Cluster0 (bughunt user)', uri: 'mongodb+srv://bughunt:<db_password>@cluster0.rebyb4m.mongodb.net/bughunt?retryWrites=true&w=majority&compressors=zlib' },
      { label: 'Cluster0 (bughunt:bughunt@123)', uri: 'mongodb+srv://bughunt:bughunt%40123@cluster0.rebyb4m.mongodb.net/bughunt?retryWrites=true&w=majority&compressors=zlib' },
      { label: 'Cluster0 (bug hunt:bughunt@123)', uri: 'mongodb+srv://bug%20hunt:bughunt%40123@cluster0.rebyb4m.mongodb.net/bughunt?retryWrites=true&w=majority&compressors=zlib' }
    ];
    if (savedCfg?.normalizedUri && !suggestedUris.some(s => s.uri === savedCfg.normalizedUri)) {
      suggestedUris.push({ label: 'Saved Config URI', uri: savedCfg.normalizedUri });
    }

    return {
      connected: this.isConnected,
      statusText,
      uriMasked: maskedUri || (hasValidEnv ? 'Configured via process.env.MONGODB_URI' : savedCfg?.normalizedUri ? 'Configured in data/mongo-config.json' : undefined),
      databaseName: this.currentDbName,
      collections: {
        usersCount,
        sessionsCount,
        challengesCount
      },
      error: this.lastError || undefined,
      lastSync: this.lastSyncTime || undefined,
      atlasHelpRequired: this.atlasHelpRequired,
      atlasHelpMessage: this.atlasHelpMessage || undefined,
      suggestedUris: suggestedUris.length > 0 ? suggestedUris : undefined
    };
  }

  public async syncFromLocal(localUsers: Record<string, any>, localSessions: Record<string, string>): Promise<number> {
    if (!this.isConnected || !this.db) return 0;

    let syncedCount = 0;
    const usersCol = this.db.collection<StoredUserDoc>('users');
    const sessionsCol = this.db.collection<SessionDoc>('sessions');

    for (const u of Object.values(localUsers)) {
      await usersCol.updateOne(
        { _id: u.id },
        { 
          $set: {
            ...u,
            _id: u.id,
            updatedAt: new Date().toISOString()
          }
        },
        { upsert: true }
      );
      syncedCount++;
    }

    for (const [token, userId] of Object.entries(localSessions)) {
      await sessionsCol.updateOne(
        { _id: token },
        {
          $set: {
            _id: token,
            token,
            userId,
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString()
          }
        },
        { upsert: true }
      );
    }

    this.lastSyncTime = new Date().toISOString();
    return syncedCount;
  }

  // MongoDB User Operations
  public async getUser(userId: string): Promise<StoredUserDoc | null> {
    if (!this.isConnected || !this.db) return null;
    return await this.db.collection<StoredUserDoc>('users').findOne({ _id: userId });
  }

  public async getUserByUsernameOrEmail(identifier: string): Promise<StoredUserDoc | null> {
    if (!this.isConnected || !this.db) return null;
    const lower = identifier.toLowerCase();
    return await this.db.collection<StoredUserDoc>('users').findOne({
      $or: [
        { username: { $regex: new RegExp(`^${lower}$`, 'i') } },
        { email: { $regex: new RegExp(`^${lower}$`, 'i') } }
      ]
    });
  }

  public async saveUser(user: StoredUserDoc): Promise<void> {
    if (!this.isConnected || !this.db) return;
    await this.db.collection<StoredUserDoc>('users').updateOne(
      { _id: user.id },
      { $set: { ...user, _id: user.id, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
  }

  public async saveSession(token: string, userId: string): Promise<void> {
    if (!this.isConnected || !this.db) return;
    await this.db.collection<SessionDoc>('sessions').updateOne(
      { _id: token },
      {
        $set: {
          _id: token,
          token,
          userId,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString()
        }
      },
      { upsert: true }
    );
  }

  public async deleteSession(token: string): Promise<void> {
    if (!this.isConnected || !this.db) return;
    await this.db.collection<SessionDoc>('sessions').deleteOne({ _id: token });
  }

  public async getUserIdByToken(token: string): Promise<string | null> {
    if (!this.isConnected || !this.db) return null;
    const session = await this.db.collection<SessionDoc>('sessions').findOne({ _id: token });
    return session ? session.userId : null;
  }

  public async logChallengeSolution(log: SolutionLogDoc): Promise<void> {
    if (!this.isConnected || !this.db) return;
    await this.db.collection<SolutionLogDoc>('challenge_solutions').insertOne(log);
  }

  public async getAllUsers(): Promise<StoredUserDoc[]> {
    if (!this.isConnected || !this.db) return [];
    return await this.db.collection<StoredUserDoc>('users').find({}).toArray();
  }
}

export const mongoDbManager = new MongoDatabaseManager();
