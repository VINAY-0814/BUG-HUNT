const fs = require('fs');
const path = require('path');
const vm = require('vm');

function deepEqual(a, b) {
  if (a === b) return true;
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!keysB.includes(k) || !deepEqual(a[k], b[k])) return false;
  }
  return true;
}

function verifyChallenge(c) {
  // 1. Verify correctCode passes all tests
  let fnCorrect;
  try {
    const sandbox = {};
    vm.createContext(sandbox);
    const script = new vm.Script(`${c.correctCode}\n${c.functionName};`);
    fnCorrect = script.runInContext(sandbox);
  } catch (err) {
    throw new Error(`[${c.id}] correctCode syntax error: ${err.message}`);
  }

  for (const t of c.testCases) {
    let res;
    try {
      res = fnCorrect(...JSON.parse(JSON.stringify(t.args)));
    } catch (err) {
      throw new Error(`[${c.id}] correctCode threw on test "${t.description}": ${err.message}`);
    }
    if (!deepEqual(res, t.expected)) {
      throw new Error(`[${c.id}] correctCode failed test "${t.description}". Expected ${JSON.stringify(t.expected)}, got ${JSON.stringify(res)}`);
    }
  }

  // 2. Verify starterCode fails at least one test or throws
  let fnStarter;
  let starterSyntaxErr = false;
  try {
    const sandbox = {};
    vm.createContext(sandbox);
    const script = new vm.Script(`${c.starterCode}\n${c.functionName};`);
    fnStarter = script.runInContext(sandbox);
  } catch (err) {
    starterSyntaxErr = true;
  }

  if (!starterSyntaxErr) {
    let allPassed = true;
    for (const t of c.testCases) {
      try {
        const res = fnStarter(...JSON.parse(JSON.stringify(t.args)));
        if (!deepEqual(res, t.expected)) {
          allPassed = false;
          break;
        }
      } catch (err) {
        allPassed = false;
        break;
      }
    }
    if (allPassed) {
      console.warn(`[WARNING: ${c.id}] starterCode passes all tests! It needs to exhibit a real bug.`);
    }
  }
}

console.log('Verification harness ready.');
