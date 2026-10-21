import { Challenge, TestResult, RunSubmissionResult } from '../src/types/game.js';

const DISALLOWED_TOKENS = [
  'process',
  'child_process',
  'require',
  'import',
  'fs',
  'path',
  'os',
  'global',
  'globalThis',
  'window',
  'document',
  'fetch',
  'XMLHttpRequest',
  'WebSocket',
  'eval',
  'Function',
  'setTimeout',
  'setInterval',
  'setImmediate',
  '__dirname',
  '__filename',
  'exec',
  'spawn'
];

/**
 * Checks equality between two values deeply (primitives, objects, arrays, null, undefined)
 */
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

/**
 * Runs player code in a sandboxed, restricted virtual environment
 */
export function executeChallengeInSandbox(
  playerCode: string,
  challenge: Challenge
): RunSubmissionResult {
  const startTime = Date.now();
  const consoleLogs: string[] = [];

  // 1. Static Security Scan
  for (const token of DISALLOWED_TOKENS) {
    // Regex matching whole word token to prevent false positives in variable names
    const regex = new RegExp(`\\b${token}\\b`);
    if (regex.test(playerCode)) {
      return {
        passed: false,
        testResults: [],
        passedTestsCount: 0,
        totalTestsCount: challenge.testCases.length,
        consoleLogs: [`[SANDBOX SECURITY ALERT] Blocked disallowed token: '${token}'`],
        compileError: `Security Boundary Violation: Token '${token}' is prohibited in the code execution sandbox.`,
        executionTimeTotalMs: Date.now() - startTime
      };
    }
  }

  // 2. Syntax Compilation & Function Extraction
  let extractedFn: Function;
  try {
    // Sandbox wrapper that shields globals and captures console.log
    const sandboxScope = {
      console: {
        log: (...args: any[]) => {
          const formatted = args
            .map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
            .join(' ');
          consoleLogs.push(`[LOG] ${formatted}`);
        },
        error: (...args: any[]) => {
          const formatted = args
            .map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
            .join(' ');
          consoleLogs.push(`[ERR] ${formatted}`);
        },
        warn: (...args: any[]) => {
          const formatted = args
            .map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
            .join(' ');
          consoleLogs.push(`[WARN] ${formatted}`);
        }
      },
      Math,
      JSON,
      Number,
      String,
      Boolean,
      Array,
      Object,
      RegExp,
      parseInt,
      parseFloat,
      isNaN,
      isFinite
    };

    // Construct isolated executor wrapper
    // We pass sandboxScope properties as arguments to mask any outer lexical environment
    const runnerFactory = new Function(
      'sandbox',
      `
      with (sandbox) {
        ${playerCode}
        if (typeof ${challenge.functionName} !== 'function') {
          throw new Error("Function '${challenge.functionName}' was not found or is not defined as a function.");
        }
        return ${challenge.functionName};
      }
    `
    );

    extractedFn = runnerFactory(sandboxScope);
  } catch (err: any) {
    return {
      passed: false,
      testResults: [],
      passedTestsCount: 0,
      totalTestsCount: challenge.testCases.length,
      consoleLogs,
      compileError: err?.message || 'Syntax or Compilation Error occurred.',
      executionTimeTotalMs: Date.now() - startTime
    };
  }

  // 3. Test Cases Execution
  const testResults: TestResult[] = [];
  let allPassed = true;

  for (const testCase of challenge.testCases) {
    const testStart = Date.now();
    try {
      // Deep clone arguments to prevent side-effects across test cases
      const clonedArgs = JSON.parse(JSON.stringify(testCase.args));
      
      const received = extractedFn(...clonedArgs);
      const testElapsed = Date.now() - testStart;
      
      const isPassed = deepEqual(received, testCase.expected);
      if (!isPassed) {
        allPassed = false;
      }

      testResults.push({
        id: testCase.id,
        description: testCase.description,
        args: testCase.args,
        expected: testCase.expected,
        received: received,
        passed: isPassed,
        executionTimeMs: testElapsed
      });
    } catch (testErr: any) {
      allPassed = false;
      testResults.push({
        id: testCase.id,
        description: testCase.description,
        args: testCase.args,
        expected: testCase.expected,
        received: null,
        passed: false,
        error: testErr?.message || 'Runtime execution exception',
        executionTimeMs: Date.now() - testStart
      });
    }
  }

  const passedTestsCount = testResults.filter(t => t.passed).length;

  return {
    passed: allPassed,
    testResults,
    passedTestsCount,
    totalTestsCount: challenge.testCases.length,
    consoleLogs,
    executionTimeTotalMs: Date.now() - startTime
  };
}
