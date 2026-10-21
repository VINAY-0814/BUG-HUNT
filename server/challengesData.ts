import { Challenge } from '../src/types/game.js';
import { EXTENDED_CHALLENGES } from './challengesCatalog.js';

const CORE_CHALLENGES: Challenge[] = [
  // ==========================================
  // LEVEL 1: BEGINNER (Syntax, Typos, Semicolons, Variable Names)
  // ==========================================
  {
    id: 'b1_syntax_declaration',
    title: 'Decrypt the Signal: Typo in Function Keyword',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'An encrypted transmission packet failed due to a malformed keyword in the checksum routine. Fix the function definition keyword so the terminal compiles.',
    bugType: 'Keyword Typo (`functon` instead of `function`)',
    buggyLineHint: 1,
    points: 100,
    timeLimit: 90,
    functionName: 'calculateChecksum',
    starterCode: `// Bug in keyword declaration
functon calculateChecksum(a, b) {
  const result = a + b;
  return result;
}`,
    correctCode: `function calculateChecksum(a, b) {
  const result = a + b;
  return result;
}`,
    testCases: [
      { id: 't1', description: 'adds positive integers', args: [12, 28], expected: 40 },
      { id: 't2', description: 'adds negative numbers', args: [-5, -15], expected: -20 },
      { id: 't3', description: 'handles zeros', args: [0, 99], expected: 99 },
    ],
    hints: [
      'Examine the very first word in the script.',
      'JavaScript requires `function`, not `functon`.',
      'Replace `functon` with `function` on Line 1.'
    ],
    explanation: {
      summary: 'JavaScript threw a SyntaxError because `functon` is an unrecognized token.',
      rootCause: 'The function keyword was misspelled without the letter "i".',
      fixDetails: 'Corrected the keyword from `functon` to `function`.',
      takeaway: 'Keywords in JavaScript are strictly case-sensitive and must be spelled precisely.'
    }
  },
  {
    id: 'b2_case_sensitivity',
    title: 'Firewall Breach: Casing Collision',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The firewall energy counter reports ReferenceError. The telemetry logs show a variable casing discrepancy.',
    bugType: 'Variable Name Casing Mismatch',
    buggyLineHint: 3,
    points: 100,
    timeLimit: 90,
    functionName: 'computeEnergy',
    starterCode: `function computeEnergy(basePower, boostLevel) {
  const totalPower = basePower * boostLevel;
  return totalpower;
}`,
    correctCode: `function computeEnergy(basePower, boostLevel) {
  const totalPower = basePower * boostLevel;
  return totalPower;
}`,
    testCases: [
      { id: 't1', description: 'multiplies base and boost', args: [10, 5], expected: 50 },
      { id: 't2', description: 'zero boost returns zero', args: [25, 0], expected: 0 },
      { id: 't3', description: 'large power grid', args: [100, 100], expected: 10000 },
    ],
    hints: [
      'Check the return statement variable name.',
      'Notice camelCase: `totalPower` vs `totalpower`.',
      'Change `totalpower` on Line 3 to `totalPower` with capital P.'
    ],
    explanation: {
      summary: 'JavaScript identifiers are strictly case-sensitive.',
      rootCause: 'Line 2 defined `totalPower` (camelCase) but Line 3 returned `totalpower` (lowercase).',
      fixDetails: 'Changed `return totalpower;` to `return totalPower;`.',
      takeaway: 'Always follow consistent casing conventions like camelCase to prevent undefined ReferenceErrors.'
    }
  },
  {
    id: 'b3_missing_return',
    title: 'Packet Relay: Silent Drop',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The network relay computes the ping latency, but all endpoints receive `undefined`. Restore the return pipeline.',
    bugType: 'Missing Return Statement',
    buggyLineHint: 3,
    points: 100,
    timeLimit: 90,
    functionName: 'calculatePing',
    starterCode: `function calculatePing(sendTime, receiveTime) {
  const latency = receiveTime - sendTime;
  latency;
}`,
    correctCode: `function calculatePing(sendTime, receiveTime) {
  const latency = receiveTime - sendTime;
  return latency;
}`,
    testCases: [
      { id: 't1', description: 'calculates latency difference', args: [100, 142], expected: 42 },
      { id: 't2', description: 'zero latency packet', args: [500, 500], expected: 0 },
      { id: 't3', description: 'high latency router', args: [200, 560], expected: 360 },
    ],
    hints: [
      'What value is actually returned to caller functions?',
      'A naked expression without `return` yields `undefined`.',
      'Prepend `return ` before `latency;` on Line 3.'
    ],
    explanation: {
      summary: 'Functions without an explicit `return` evaluate to `undefined`.',
      rootCause: 'The variable `latency` was simply referenced on the final line without the `return` keyword.',
      fixDetails: 'Added `return latency;`.',
      takeaway: 'In JavaScript standard functions, you must explicitly return computed values.'
    }
  },
  {
    id: 'b4_template_literal_syntax',
    title: 'Cyber Deck: Corrupted HUD String',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The operative HUD is printing raw literal braces `${agent}` instead of substituting the agent codename. Fix the quote delimiter.',
    bugType: 'Single Quotes instead of Backticks for Template Literals',
    buggyLineHint: 2,
    points: 110,
    timeLimit: 90,
    functionName: 'formatAgentHUD',
    starterCode: `function formatAgentHUD(codename, sector) {
  return 'AGENT: \${codename} // SECTOR: \${sector}';
}`,
    correctCode: `function formatAgentHUD(codename, sector) {
  return \`AGENT: \${codename} // SECTOR: \${sector}\`;
}`,
    testCases: [
      { id: 't1', description: 'formats agent Alice in sector 7', args: ['Cipher', 'Sector-7'], expected: 'AGENT: Cipher // SECTOR: Sector-7' },
      { id: 't2', description: 'formats operative Zero', args: ['Zero', 'Core'], expected: 'AGENT: Zero // SECTOR: Core' },
    ],
    hints: [
      'Notice the single quotation marks around the string.',
      'Template expressions `${variable}` only interpolate inside backticks (`).',
      'Replace surrounding single quotes with backticks.'
    ],
    explanation: {
      summary: 'String interpolation `${}` only operates inside backtick (ES6 template literal) delimiters.',
      rootCause: 'Single quotes (\') treat `${variable}` as literal characters.',
      fixDetails: 'Changed surrounding single quotes to backticks: `` `AGENT: ${codename} // SECTOR: ${sector}` ``.',
      takeaway: 'Use backticks (`` ` ``) whenever you need expression interpolation in modern JavaScript.'
    }
  },
  {
    id: 'b5_const_reassignment',
    title: 'Port Allocator: Immutable Override Violation',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The stealth tunnel script throws `TypeError: Assignment to constant variable` during port switching. Switch to mutable declaration.',
    bugType: 'Reassigning a `const` Variable',
    buggyLineHint: 2,
    points: 110,
    timeLimit: 90,
    functionName: 'allocatePort',
    starterCode: `function allocatePort(initialPort, offset) {
  const port = initialPort;
  port = port + offset;
  return port;
}`,
    correctCode: `function allocatePort(initialPort, offset) {
  let port = initialPort;
  port = port + offset;
  return port;
}`,
    testCases: [
      { id: 't1', description: 'offsets standard HTTP port', args: [80, 8000], expected: 8080 },
      { id: 't2', description: 'offsets SSH port', args: [22, 100], expected: 122 },
      { id: 't3', description: 'zero offset', args: [3000, 0], expected: 3000 },
    ],
    hints: [
      'Check how `port` is declared on Line 2.',
      'Variables declared with `const` cannot be reassigned.',
      'Change `const port = initialPort;` to `let port = initialPort;`.'
    ],
    explanation: {
      summary: 'In JavaScript, variables declared with `const` cannot be reassigned.',
      rootCause: '`port` was declared with `const` on Line 2, but reassigned on Line 3.',
      fixDetails: 'Replaced `const` with `let` to allow reassignment.',
      takeaway: 'Use `let` for variables whose values change over time, and `const` for fixed bindings.'
    }
  },
  {
    id: 'b6_unclosed_object_bracket',
    title: 'Data Node: Structural Rupture',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The node registry serializer crashes with a unexpected token error when building the sensor object. Repair the bracket syntax.',
    bugType: 'Missing Closing Curly Brace in Object Return',
    buggyLineHint: 4,
    points: 120,
    timeLimit: 90,
    functionName: 'createSensorPacket',
    starterCode: `function createSensorPacket(id, temp) {
  return {
    id: id,
    temperature: temp
;
}`,
    correctCode: `function createSensorPacket(id, temp) {
  return {
    id: id,
    temperature: temp
  };
}`,
    testCases: [
      { id: 't1', description: 'creates telemetry packet', args: ['SENS-01', 24.5], expected: { id: 'SENS-01', temperature: 24.5 } },
      { id: 't2', description: 'creates subzero packet', args: ['ICE-9', -12], expected: { id: 'ICE-9', temperature: -12 } },
    ],
    hints: [
      'Look at Line 4 where the object property ends.',
      'The object opened on Line 2 with `{` is not properly closed before the semicolon.',
      'Replace Line 4 with `  };` to close the returned object.'
    ],
    explanation: {
      summary: 'Objects must have balanced opening `{` and closing `}` braces.',
      rootCause: 'The closing curly brace was missing before the semicolon on the return statement.',
      fixDetails: 'Closed the object literal with `};`.',
      takeaway: 'Always ensure balanced brackets and braces in complex object expressions.'
    },
    isBoss: true,
    bossName: 'Byte_Beast :: Syntax Corruptor'
  },

  // ==========================================
  // LEVEL 2: EASY (Conditionals, Operators, Comparisons)
  // ==========================================
  {
    id: 'e1_assignment_in_conditional',
    title: 'Access Gate: Accidental Grant',
    level: 2,
    difficulty: 'Easy',
    category: 'Conditionals & Booleans',
    story: 'The mainframe access gate is granting clearance to unauthorized unauthorized guest accounts! The security engineer suspects an assignment operator inside an `if` condition.',
    bugType: 'Single `=` Assignment Operator in `if` Condition',
    buggyLineHint: 2,
    points: 150,
    timeLimit: 100,
    functionName: 'checkClearance',
    starterCode: `function checkClearance(role) {
  if (role = "ADMIN") {
    return "ACCESS_GRANTED";
  }
  return "ACCESS_DENIED";
}`,
    correctCode: `function checkClearance(role) {
  if (role === "ADMIN") {
    return "ACCESS_GRANTED";
  }
  return "ACCESS_DENIED";
}`,
    testCases: [
      { id: 't1', description: 'grants access to ADMIN', args: ['ADMIN'], expected: 'ACCESS_GRANTED' },
      { id: 't2', description: 'denies access to GUEST', args: ['GUEST'], expected: 'ACCESS_DENIED' },
      { id: 't3', description: 'denies access to OPERATIVE', args: ['OPERATIVE'], expected: 'ACCESS_DENIED' },
    ],
    hints: [
      'Check the comparison operator on Line 2.',
      'A single `=` assigns the string "ADMIN" to `role`, which evaluates to truthy!',
      'Change `role = "ADMIN"` to `role === "ADMIN"`.'
    ],
    explanation: {
      summary: 'A single equals sign `=` assigns a value, whereas `===` tests for strict equality.',
      rootCause: '`role = "ADMIN"` assigned the string "ADMIN" to role, which is truthy, so the block always executed.',
      fixDetails: 'Changed assignment `=` to strict equality `===`.',
      takeaway: 'Always use strict equality (`===`) for comparisons in JavaScript.'
    }
  },
  {
    id: 'e2_off_by_one_boundary',
    title: 'Security Clearance: Strict Boundary Trap',
    level: 2,
    difficulty: 'Easy',
    category: 'Conditionals & Booleans',
    story: 'Agents with security clearance level 5 are supposed to be allowed into Vault B, but the system is blocking level 5 agents with an off-by-one comparison.',
    bugType: 'Strict Inequality (`>`) instead of Greater Than or Equal (`>=`)',
    buggyLineHint: 2,
    points: 150,
    timeLimit: 100,
    functionName: 'canAccessVault',
    starterCode: `function canAccessVault(securityLevel) {
  // Vault B requires clearance level 5 and above
  if (securityLevel > 5) {
    return true;
  }
  return false;
}`,
    correctCode: `function canAccessVault(securityLevel) {
  // Vault B requires clearance level 5 and above
  if (securityLevel >= 5) {
    return true;
  }
  return false;
}`,
    testCases: [
      { id: 't1', description: 'level 5 should have access', args: [5], expected: true },
      { id: 't2', description: 'level 7 has access', args: [7], expected: true },
      { id: 't3', description: 'level 4 is denied', args: [4], expected: false },
      { id: 't4', description: 'level 1 is denied', args: [1], expected: false },
    ],
    hints: [
      'Read the requirement comment: "requires clearance level 5 and above".',
      'What happens when `securityLevel` is exactly 5 with `> 5`?',
      'Change `>` to `>=` on Line 3.'
    ],
    explanation: {
      summary: 'Exclusive comparison `>` excludes the boundary value.',
      rootCause: '`5 > 5` evaluates to false, blocking users who meet the minimum required level.',
      fixDetails: 'Updated comparison operator to `>= 5`.',
      takeaway: 'Check boundary conditions carefully when implementing "N and above" rules.'
    }
  },
  {
    id: 'e3_logical_operator_inverted',
    title: 'Drone Sensor: Altitude Lock Violation',
    level: 2,
    difficulty: 'Easy',
    category: 'Conditionals & Booleans',
    story: 'The stealth drone is supposed to maintain safe altitude between 100m and 500m inclusive. But the condition uses `||` (OR) instead of `&&` (AND), returning safe altitude for every possible number!',
    bugType: 'Using `||` instead of `&&` for Range Checking',
    buggyLineHint: 2,
    points: 160,
    timeLimit: 100,
    functionName: 'isAltitudeSafe',
    starterCode: `function isAltitudeSafe(altitude) {
  // Safe between 100 and 500 meters inclusive
  if (altitude >= 100 || altitude <= 500) {
    return true;
  }
  return false;
}`,
    correctCode: `function isAltitudeSafe(altitude) {
  // Safe between 100 and 500 meters inclusive
  if (altitude >= 100 && altitude <= 500) {
    return true;
  }
  return false;
}`,
    testCases: [
      { id: 't1', description: 'safe midpoint altitude', args: [300], expected: true },
      { id: 't2', description: 'safe lower boundary', args: [100], expected: true },
      { id: 't3', description: 'safe upper boundary', args: [500], expected: true },
      { id: 't4', description: 'too low should be unsafe', args: [50], expected: false },
      { id: 't5', description: 'too high should be unsafe', args: [800], expected: false },
    ],
    hints: [
      'Any number is either >= 100 OR <= 500! For example, 50 is <= 500.',
      'To verify both conditions hold simultaneously, use the logical AND operator.',
      'Replace `||` with `&&` on Line 3.'
    ],
    explanation: {
      summary: 'Range checks require both bounds to be satisfied simultaneously with `&&`.',
      rootCause: 'Using `||` makes the condition tautological: every real number is either >= 100 or <= 500.',
      fixDetails: 'Replaced `||` with `&&`.',
      takeaway: 'Always use `&&` when validating that a numeric value lies within an interval `[min, max]`.'
    }
  },
  {
    id: 'e4_ternary_logic_inversion',
    title: 'Cyber Market: Inverted Discount Logic',
    level: 2,
    difficulty: 'Easy',
    category: 'Conditionals & Booleans',
    story: 'Operatives with member status are being charged full price while unregistered users receive the discount. Invert the ternary branches.',
    bugType: 'Inverted Ternary Conditional Branches',
    buggyLineHint: 2,
    points: 160,
    timeLimit: 100,
    functionName: 'calculateItemPrice',
    starterCode: `function calculateItemPrice(basePrice, isMember) {
  // Members get 20% discount (0.8x price), non-members pay full price
  return isMember ? basePrice : basePrice * 0.8;
}`,
    correctCode: `function calculateItemPrice(basePrice, isMember) {
  // Members get 20% discount (0.8x price), non-members pay full price
  return isMember ? basePrice * 0.8 : basePrice;
}`,
    testCases: [
      { id: 't1', description: 'members pay 80 for 100 item', args: [100, true], expected: 80 },
      { id: 't2', description: 'non-members pay full 100', args: [100, false], expected: 100 },
      { id: 't3', description: 'members pay 40 for 50 item', args: [50, true], expected: 40 },
    ],
    hints: [
      'In `condition ? truthyExpr : falsyExpr`, the first expression runs when condition is true.',
      'When `isMember` is true, the discount `basePrice * 0.8` should be applied.',
      'Swap `basePrice` and `basePrice * 0.8` in the ternary expression.'
    ],
    explanation: {
      summary: 'The ternary operator returns the first operand on truthy, second on falsy.',
      rootCause: 'The true branch returned full price instead of the discounted price.',
      fixDetails: 'Swapped `basePrice` and `basePrice * 0.8`.',
      takeaway: 'Check order of ternary operands: `condition ? ifTrue : ifFalse`.'
    }
  },
  {
    id: 'e5_switch_missing_break',
    title: 'Cipher Multiplier: Missing Switch Break',
    level: 2,
    difficulty: 'Easy',
    category: 'Conditionals & Booleans',
    story: 'The cipher key multiplier has a fallthrough bug in its switch statement. Selecting Tier A unexpectedly falls through into Tier C.',
    bugType: 'Missing `break` in Switch Statement',
    buggyLineHint: 5,
    points: 170,
    timeLimit: 100,
    functionName: 'getKeyMultiplier',
    starterCode: `function getKeyMultiplier(tier) {
  let multiplier = 1;
  switch (tier) {
    case 'ALPHA':
      multiplier = 10;
    case 'BETA':
      multiplier = 5;
      break;
    default:
      multiplier = 1;
  }
  return multiplier;
}`,
    correctCode: `function getKeyMultiplier(tier) {
  let multiplier = 1;
  switch (tier) {
    case 'ALPHA':
      multiplier = 10;
      break;
    case 'BETA':
      multiplier = 5;
      break;
    default:
      multiplier = 1;
  }
  return multiplier;
}`,
    testCases: [
      { id: 't1', description: 'ALPHA tier multiplier is 10', args: ['ALPHA'], expected: 10 },
      { id: 't2', description: 'BETA tier multiplier is 5', args: ['BETA'], expected: 5 },
      { id: 't3', description: 'unknown tier defaults to 1', args: ['GAMMA'], expected: 1 },
    ],
    hints: [
      'Notice what happens after `multiplier = 10;` is executed.',
      'Without a `break;` statement, execution falls through to the next case (`BETA`).',
      'Add `break;` right after `multiplier = 10;`.'
    ],
    explanation: {
      summary: 'Switch cases fall through to the next case unless terminated by `break` or `return`.',
      rootCause: 'Case `ALPHA` lacked a `break`, causing execution to cascade into `BETA` and overwrite multiplier with 5.',
      fixDetails: 'Added `break;` statement to case `ALPHA`.',
      takeaway: 'Always include `break;` (or early `return`) at the end of each switch case block unless intentional fallthrough is documented.'
    }
  },
  {
    id: 'e6_falsy_null_check',
    title: 'Telemetry Meter: The Zero Reading Null Trap',
    level: 2,
    difficulty: 'Easy',
    category: 'Conditionals & Booleans',
    story: 'The radiation sensor reports 0 rads in safe zones. But the fallback handler treats 0 as absent reading because `!reading` is true for zero!',
    bugType: 'Falsy Trap: treating numeric 0 as null or missing',
    buggyLineHint: 3,
    points: 180,
    timeLimit: 100,
    functionName: 'sanitizeReading',
    starterCode: `function sanitizeReading(reading) {
  // If reading is null or undefined, return default -1. Otherwise return reading.
  if (!reading) {
    return -1;
  }
  return reading;
}`,
    correctCode: `function sanitizeReading(reading) {
  // If reading is null or undefined, return default -1. Otherwise return reading.
  if (reading === null || reading === undefined) {
    return -1;
  }
  return reading;
}`,
    testCases: [
      { id: 't1', description: 'preserves valid positive reading', args: [42], expected: 42 },
      { id: 't2', description: 'preserves valid zero reading', args: [0], expected: 0 },
      { id: 't3', description: 'converts null to -1', args: [null], expected: -1 },
      { id: 't4', description: 'converts undefined to -1', args: [undefined], expected: -1 },
    ],
    hints: [
      'In JavaScript, `!0` evaluates to `true` because 0 is a falsy value.',
      'A reading of `0` is a valid number, not missing data.',
      'Check explicitly for `reading === null || reading === undefined` or use nullish coalescing.'
    ],
    explanation: {
      summary: 'In JavaScript, the number 0 is falsy, so `!0` is true.',
      rootCause: 'Using `!reading` incorrectly triggered default fallback on legitimate zero readings.',
      fixDetails: 'Replaced `!reading` with explicit check `reading === null || reading === undefined` (or `reading ?? -1`).',
      takeaway: 'Never use loose falsy checks (`!value`) on numbers where zero is a valid measurement.'
    },
    isBoss: true,
    bossName: 'Boolean Phantom :: Zero_Trap'
  },

  // ==========================================
  // LEVEL 3: INTERMEDIATE (Loops, Functions, Scope, Logical Errors)
  // ==========================================
  {
    id: 'i1_off_by_one_array_loop',
    title: 'Array Scanner: Index Out of Bounds',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Loops & Functions',
    story: 'The memory scanner encounters `NaN` because its loop counter runs one index past the end of the array, reading `arr[arr.length]` which is undefined.',
    bugType: 'Loop condition `<=` instead of `<` on `arr.length`',
    buggyLineHint: 3,
    points: 200,
    timeLimit: 120,
    functionName: 'sumMemoryBlocks',
    starterCode: `function sumMemoryBlocks(blocks) {
  let total = 0;
  for (let i = 0; i <= blocks.length; i++) {
    total += blocks[i];
  }
  return total;
}`,
    correctCode: `function sumMemoryBlocks(blocks) {
  let total = 0;
  for (let i = 0; i < blocks.length; i++) {
    total += blocks[i];
  }
  return total;
}`,
    testCases: [
      { id: 't1', description: 'sums small array', args: [[10, 20, 30]], expected: 60 },
      { id: 't2', description: 'sums single element', args: [[5]], expected: 5 },
      { id: 't3', description: 'handles empty array', args: [[]], expected: 0 },
    ],
    hints: [
      'Arrays are 0-indexed in JavaScript. For an array of length 3, valid indices are 0, 1, and 2.',
      'When `i === blocks.length`, `blocks[i]` is `undefined`, so `total + undefined` becomes `NaN`.',
      'Change `i <= blocks.length` to `i < blocks.length`.'
    ],
    explanation: {
      summary: 'Array indices range from 0 to length - 1.',
      rootCause: '`i <= blocks.length` caused an extra iteration where `blocks[length]` evaluated to `undefined`, making the sum `NaN`.',
      fixDetails: 'Changed `<=` to `<` in the loop condition.',
      takeaway: 'Always use `i < array.length` for standard 0-indexed forward loops.'
    }
  },
  {
    id: 'i2_infinite_while_loop',
    title: 'Subroutine Jam: Missing Counter Increment',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Loops & Functions',
    story: 'A background data ingestion loop freezes the browser tab. The counter variable is never updated inside the loop body, creating an infinite lock.',
    bugType: 'Missing Counter Increment in `while` loop',
    buggyLineHint: 5,
    points: 210,
    timeLimit: 120,
    functionName: 'generateIdSequence',
    starterCode: `function generateIdSequence(count) {
  const ids = [];
  let i = 1;
  while (i <= count) {
    ids.push("ID_" + i);
    // Counter never advances!
  }
  return ids;
}`,
    correctCode: `function generateIdSequence(count) {
  const ids = [];
  let i = 1;
  while (i <= count) {
    ids.push("ID_" + i);
    i++;
  }
  return ids;
}`,
    testCases: [
      { id: 't1', description: 'generates 3 IDs', args: [3], expected: ['ID_1', 'ID_2', 'ID_3'] },
      { id: 't2', description: 'generates 1 ID', args: [1], expected: ['ID_1'] },
      { id: 't3', description: 'zero count returns empty array', args: [0], expected: [] },
    ],
    hints: [
      'Look inside the `while` block. Does `i` ever change?',
      'If `i` stays at 1, `i <= count` will always remain true.',
      'Add `i++;` inside the while loop body after pushing to `ids`.'
    ],
    explanation: {
      summary: 'A `while` loop must ensure its condition eventually evaluates to false.',
      rootCause: 'Variable `i` was never incremented, causing the loop to never terminate.',
      fixDetails: 'Added `i++;` inside the loop body.',
      takeaway: 'Always advance your loop counters inside `while` constructs.'
    }
  },
  {
    id: 'i3_variable_shadowing_reset',
    title: 'Accumulator Glitch: Shadowed Local Variable',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Loops & Functions',
    story: 'The firewall token counter always returns 0 because an inner `let count` redeclaration shadows and resets the outer accumulator inside each loop pass.',
    bugType: 'Variable Shadowing / Redeclaration Inside Loop',
    buggyLineHint: 4,
    points: 220,
    timeLimit: 120,
    functionName: 'countMatchingPackets',
    starterCode: `function countMatchingPackets(packets, targetType) {
  let count = 0;
  for (let i = 0; i < packets.length; i++) {
    if (packets[i] === targetType) {
      let count = count + 1; // Shadows outer count!
    }
  }
  return count;
}`,
    correctCode: `function countMatchingPackets(packets, targetType) {
  let count = 0;
  for (let i = 0; i < packets.length; i++) {
    if (packets[i] === targetType) {
      count = count + 1;
    }
  }
  return count;
}`,
    testCases: [
      { id: 't1', description: 'counts matching SYN packets', args: [['SYN', 'ACK', 'SYN', 'SYN'], 'SYN'], expected: 3 },
      { id: 't2', description: 'zero matches', args: [['DATA', 'PING'], 'SYN'], expected: 0 },
      { id: 't3', description: 'empty packets list', args: [[], 'SYN'], expected: 0 },
    ],
    hints: [
      'Look at Line 5: `let count = count + 1;`.',
      'The `let` keyword creates a new local variable scoped only to that `if` block.',
      'Remove `let` on Line 5 so it mutates the outer `count` instead.'
    ],
    explanation: {
      summary: 'Declaring a variable with `let` inside a block creates a local variable that shadows the outer scope.',
      rootCause: '`let count = count + 1` created a new block-scoped variable discarded when the block ended.',
      fixDetails: 'Changed `let count = count + 1;` to `count++;` or `count += 1;`.',
      takeaway: 'Avoid re-declaring variables with the same name across nested scopes.'
    }
  },
  {
    id: 'i4_pass_by_reference_mutation',
    title: 'Stealth Infiltrator: Input Array Mutation Leak',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Loops & Functions',
    story: 'The clean logs filter is mutating the original security audit logs in place via `.reverse()`, causing side effects across other monitoring subsystems. Return a clean reversed copy without mutating the input.',
    bugType: 'In-place Array Mutation (`reverse()` mutates source)',
    buggyLineHint: 2,
    points: 230,
    timeLimit: 120,
    functionName: 'getReversedAuditLog',
    starterCode: `function getReversedAuditLog(logEntries) {
  // Must return a reversed copy WITHOUT mutating the input logEntries array
  return logEntries.reverse();
}`,
    correctCode: `function getReversedAuditLog(logEntries) {
  // Must return a reversed copy WITHOUT mutating the input logEntries array
  return [...logEntries].reverse();
}`,
    testCases: [
      { id: 't1', description: 'reverses copy properly', args: [['log1', 'log2', 'log3']], expected: ['log3', 'log2', 'log1'] },
      { id: 't2', description: 'handles single item', args: [['entry']], expected: ['entry'] },
      { id: 't3', description: 'handles empty log', args: [[]], expected: [] },
    ],
    hints: [
      'JavaScript `Array.prototype.reverse()` modifies the calling array directly.',
      'Create a shallow clone of the array first before reversing it.',
      'Use `[...logEntries].reverse()` or `logEntries.slice().reverse()`.'
    ],
    explanation: {
      summary: '`Array.prototype.reverse()` is a mutator method that modifies the original array in place.',
      rootCause: 'Calling `.reverse()` directly on `logEntries` corrupted the caller reference.',
      fixDetails: 'Cloned array with spread operator `[...logEntries].reverse()`.',
      takeaway: 'Always copy arrays with `[...arr]` or `.slice()` before applying mutator methods like `reverse()` or `sort()`.'
    }
  },
  {
    id: 'i5_string_split_join_delimiters',
    title: 'IP Sanitizer: Malformed Subnet Splitting',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Loops & Functions',
    story: 'The IP parser is splitting on empty string `""` instead of `"."`, resulting in individual character fragments instead of numeric octets.',
    bugType: 'Incorrect delimiter in `.split()`',
    buggyLineHint: 2,
    points: 220,
    timeLimit: 120,
    functionName: 'extractFirstOctet',
    starterCode: `function extractFirstOctet(ipAddress) {
  const parts = ipAddress.split("");
  return parts[0];
}`,
    correctCode: `function extractFirstOctet(ipAddress) {
  const parts = ipAddress.split(".");
  return parts[0];
}`,
    testCases: [
      { id: 't1', description: 'extracts 192 from 192.168.1.1', args: ['192.168.1.1'], expected: '192' },
      { id: 't2', description: 'extracts 10 from 10.0.0.1', args: ['10.0.0.1'], expected: '10' },
      { id: 't3', description: 'extracts 127 from 127.0.0.1', args: ['127.0.0.1'], expected: '127' },
    ],
    hints: [
      'Splitting by `""` breaks the string into every single character ("1", "9", "2", ...).',
      'An IP address is delimited by periods (`.`).',
      'Change `.split("")` to `.split(".")`.'
    ],
    explanation: {
      summary: '`.split("")` splits every character, while `.split(".")` splits on dots.',
      rootCause: 'Empty string delimiter split "192.168.1.1" into single digit characters, returning "1" instead of "192".',
      fixDetails: 'Changed `.split("")` to `.split(".")`.',
      takeaway: 'Specify the exact delimiter string or regex when splitting structured text.'
    }
  },
  {
    id: 'i6_function_scope_hoisting_misuse',
    title: 'Key Derivation: Variable Declaration Reordering',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Loops & Functions',
    story: 'The key derivation function attempts to read an uninitialized `let` variable before declaration, triggering the Temporal Dead Zone.',
    bugType: 'Temporal Dead Zone (Accessing `let` before initialization)',
    buggyLineHint: 2,
    points: 230,
    timeLimit: 120,
    functionName: 'deriveKey',
    starterCode: `function deriveKey(seed, rounds) {
  const finalKey = salt + seed + rounds;
  let salt = "CYBER_";
  return finalKey;
}`,
    correctCode: `function deriveKey(seed, rounds) {
  let salt = "CYBER_";
  const finalKey = salt + seed + rounds;
  return finalKey;
}`,
    testCases: [
      { id: 't1', description: 'derives key with rounds 3', args: ['ALPHA', 3], expected: 'CYBER_ALPHA3' },
      { id: 't2', description: 'derives key with rounds 10', args: ['OMEGA', 10], expected: 'CYBER_OMEGA10' },
    ],
    hints: [
      '`salt` is used on Line 2, but only declared on Line 3.',
      'Variables declared with `let` and `const` cannot be accessed before their declaration (TDZ).',
      'Move `let salt = "CYBER_";` before `const finalKey = ...`.'
    ],
    explanation: {
      summary: 'Variables declared with `let` and `const` are in a Temporal Dead Zone until initialized.',
      rootCause: 'Accessing `salt` prior to its declaration line throws ReferenceError.',
      fixDetails: 'Reordered variable declaration before its first usage.',
      takeaway: 'Always declare variables at the top of their enclosing block before reading their values.'
    },
    isBoss: true,
    bossName: 'Scope Leviathan :: Deadzone Daemon'
  },

  // ==========================================
  // LEVEL 4: ADVANCED (Arrays, Objects, Recursion, Algorithms)
  // ==========================================
  {
    id: 'a1_recursion_missing_base_case',
    title: 'Quantum Core: Infinite Recursive Stack Overflow',
    level: 4,
    difficulty: 'Advanced',
    category: 'Arrays & Objects',
    story: 'The quantum countdown recursive function crashes with `RangeError: Maximum call stack size exceeded`. The base condition checks `=== 0` but negative numbers loop forever.',
    bugType: 'Flawed Recursive Base Case Boundary (`n === 0` instead of `n <= 0`)',
    buggyLineHint: 2,
    points: 280,
    timeLimit: 140,
    functionName: 'recursiveFactorial',
    starterCode: `function recursiveFactorial(n) {
  // Factorial of 0 or 1 is 1. Should handle n <= 1 safely.
  if (n === 1) {
    return 1;
  }
  return n * recursiveFactorial(n - 1);
}`,
    correctCode: `function recursiveFactorial(n) {
  // Factorial of 0 or 1 is 1. Should handle n <= 1 safely.
  if (n <= 1) {
    return 1;
  }
  return n * recursiveFactorial(n - 1);
}`,
    testCases: [
      { id: 't1', description: 'factorial of 5 is 120', args: [5], expected: 120 },
      { id: 't2', description: 'factorial of 1 is 1', args: [1], expected: 1 },
      { id: 't3', description: 'factorial of 0 is 1', args: [0], expected: 1 },
      { id: 't4', description: 'factorial of 3 is 6', args: [3], expected: 6 },
    ],
    hints: [
      'What happens when `n === 0` is passed into this function?',
      'Since 0 !== 1, it calls `0 * recursiveFactorial(-1)`, recursing infinitely until stack overflow!',
      'Change the base case from `if (n === 1)` to `if (n <= 1)`.'
    ],
    explanation: {
      summary: 'Recursive functions must have robust base cases that cover all boundary inputs.',
      rootCause: 'Calling `recursiveFactorial(0)` skipped `n === 1`, descending into negative infinite recursion.',
      fixDetails: 'Changed base condition to `n <= 1`.',
      takeaway: 'Always design base cases using inequality checks (`<=`) to prevent recursive runaway on edge values.'
    }
  },
  {
    id: 'a2_shallow_copy_nested_mutation',
    title: 'Target Dossier: Nested Object Reference Leak',
    level: 4,
    difficulty: 'Advanced',
    category: 'Arrays & Objects',
    story: 'When cloning a hacker profile and updating its nested coordinates, the original profile coordinates are unexpectedly overwritten because the spread operator `...` only shallow-clones top-level keys.',
    bugType: 'Shallow copy does not clone nested objects',
    buggyLineHint: 4,
    points: 300,
    timeLimit: 140,
    functionName: 'updateAgentLocation',
    starterCode: `function updateAgentLocation(agent, newSector, newCity) {
  // Must return a new agent object WITHOUT mutating the original agent.location
  const updatedAgent = { ...agent };
  updatedAgent.location.sector = newSector;
  updatedAgent.location.city = newCity;
  return updatedAgent;
}`,
    correctCode: `function updateAgentLocation(agent, newSector, newCity) {
  // Must return a new agent object WITHOUT mutating the original agent.location
  const updatedAgent = {
    ...agent,
    location: {
      ...agent.location,
      sector: newSector,
      city: newCity
    }
  };
  return updatedAgent;
}`,
    testCases: [
      {
        id: 't1',
        description: 'updates sector and city in cloned location',
        args: [{ name: 'Neo', location: { sector: 'Alpha', city: 'Zion' } }, 'Beta', 'Matrix City'],
        expected: { name: 'Neo', location: { sector: 'Beta', city: 'Matrix City' } }
      },
      {
        id: 't2',
        description: 'updates operative Trinity',
        args: [{ name: 'Trinity', location: { sector: 'Dock', city: 'Megacity' } }, 'Sector-4', 'Cyberport'],
        expected: { name: 'Trinity', location: { sector: 'Sector-4', city: 'Cyberport' } }
      }
    ],
    hints: [
      'The object spread `{ ...agent }` only creates a shallow copy of the top-level keys.',
      '`updatedAgent.location` still points to the exact same nested object in memory as `agent.location`!',
      'Deeply copy the nested location: `location: { ...agent.location, sector: newSector, city: newCity }`.'
    ],
    explanation: {
      summary: 'Object spread `{ ...obj }` performs a shallow copy only.',
      rootCause: 'Mutating `updatedAgent.location.sector` mutated the original input because nested objects are copied by reference.',
      fixDetails: 'Constructed a new cloned `location` object using nested object spread.',
      takeaway: 'Remember that spread and `Object.assign` do not deep-clone nested objects.'
    }
  },
  {
    id: 'a3_binary_search_midpoint_integer',
    title: 'Vault Cracker: Non-Integer Midpoint Crash',
    level: 4,
    difficulty: 'Advanced',
    category: 'Arrays & Objects',
    story: 'The binary search algorithm index lookup fails because `(low + high) / 2` yields floating point decimals (e.g. 2.5), which look up `arr[2.5]` resulting in undefined.',
    bugType: 'Missing `Math.floor()` in Binary Search Midpoint',
    buggyLineHint: 5,
    points: 310,
    timeLimit: 140,
    functionName: 'binarySearch',
    starterCode: `function binarySearch(sortedArr, target) {
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    let mid = (low + high) / 2;
    if (sortedArr[mid] === target) {
      return mid;
    } else if (sortedArr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}`,
    correctCode: `function binarySearch(sortedArr, target) {
  let low = 0;
  let high = sortedArr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === target) {
      return mid;
    } else if (sortedArr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}`,
    testCases: [
      { id: 't1', description: 'finds target in odd length array', args: [[2, 5, 8, 12, 16, 23, 38], 16], expected: 4 },
      { id: 't2', description: 'finds target at start', args: [[10, 20, 30, 40], 10], expected: 0 },
      { id: 't3', description: 'returns -1 when not found', args: [[1, 3, 5, 7], 4], expected: -1 },
      { id: 't4', description: 'finds target in 2 element array', args: [[100, 200], 200], expected: 1 },
    ],
    hints: [
      'In JavaScript, dividing two integers can yield a floating point float (e.g. `(0 + 3) / 2 = 1.5`).',
      'Array indices must be integers. `arr[1.5]` evaluates to `undefined`.',
      'Wrap the midpoint calculation in `Math.floor(...)`.'
    ],
    explanation: {
      summary: 'JavaScript numbers are double-precision floats; division is not integer division by default.',
      rootCause: '`(low + high) / 2` resulted in float indices like 2.5, causing index lookups to fail.',
      fixDetails: 'Added `Math.floor((low + high) / 2)` to guarantee integer indices.',
      takeaway: 'In JavaScript algorithms, always use `Math.floor()` when calculating array indices.'
    }
  },
  {
    id: 'a4_reduce_missing_initial_value',
    title: 'Loot Collector: Missing Initial Accumulator',
    level: 4,
    difficulty: 'Advanced',
    category: 'Arrays & Objects',
    story: 'The tallying routine fails on empty loot caches with `TypeError: Reduce of empty array with no initial value`. Provide the initial zero accumulator.',
    bugType: 'Missing Initial Value in `.reduce()`',
    buggyLineHint: 4,
    points: 300,
    timeLimit: 140,
    functionName: 'tallyCredits',
    starterCode: `function tallyCredits(transactions) {
  // transactions is an array of objects: [{ amount: 50 }, { amount: 100 }]
  return transactions.reduce((sum, item) => {
    return sum + item.amount;
  });
}`,
    correctCode: `function tallyCredits(transactions) {
  // transactions is an array of objects: [{ amount: 50 }, { amount: 100 }]
  return transactions.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);
}`,
    testCases: [
      { id: 't1', description: 'sums transaction amounts', args: [[{ amount: 50 }, { amount: 120 }, { amount: 30 }]], expected: 200 },
      { id: 't2', description: 'handles single transaction', args: [[{ amount: 88 }]], expected: 88 },
      { id: 't3', description: 'handles empty transaction list', args: [[]], expected: 0 },
    ],
    hints: [
      'What happens when `.reduce()` is called on an array of objects without an initial value?',
      'Without an initial value, `sum` starts as the first object `item`, resulting in `[object Object] + item.amount`!',
      'Add `, 0` as the second argument to `.reduce(...)`.'
    ],
    explanation: {
      summary: 'When `.reduce()` has no initial value, the first item in the array is used as the initial accumulator.',
      rootCause: 'Without `0`, the first object was treated as the starting sum, yielding string concatenation `[object Object]120` or TypeError on empty arrays.',
      fixDetails: 'Passed `0` as the second parameter to `.reduce()`.',
      takeaway: 'Always supply an explicit initial accumulator to `.reduce()`, especially when transforming objects into numbers or arrays.'
    }
  },
  {
    id: 'a5_array_filter_callback_mutation',
    title: 'Port Firewall: Filter Callback Side Effect',
    level: 4,
    difficulty: 'Advanced',
    category: 'Arrays & Objects',
    story: 'The port filter uses `.filter()` but the callback executes `arr.push()` and returns undefined instead of returning a boolean test condition.',
    bugType: 'Incorrect usage of `.filter()` callback (treating it like `.forEach()`)',
    buggyLineHint: 4,
    points: 320,
    timeLimit: 140,
    functionName: 'filterSafePorts',
    starterCode: `function filterSafePorts(ports) {
  // Return only ports > 1024
  return ports.filter(port => {
    if (port > 1024) {
      true;
    }
  });
}`,
    correctCode: `function filterSafePorts(ports) {
  // Return only ports > 1024
  return ports.filter(port => {
    return port > 1024;
  });
}`,
    testCases: [
      { id: 't1', description: 'filters privileged ports under 1024', args: [[22, 80, 443, 3000, 8080]], expected: [3000, 8080] },
      { id: 't2', description: 'all safe ports', args: [[2000, 4000]], expected: [2000, 4000] },
      { id: 't3', description: 'no safe ports returns empty', args: [[21, 25, 53]], expected: [] },
    ],
    hints: [
      'The callback inside `.filter()` must return a boolean value.',
      'The expression `true;` inside the `if` block is not returned.',
      'Change the callback to simply `return port > 1024;`.'
    ],
    explanation: {
      summary: 'Array `.filter()` callbacks must return a boolean indicator.',
      rootCause: '`true;` was not returned, so the callback implicitly returned `undefined` (falsy) for every element, discarding all items.',
      fixDetails: 'Replaced with `return port > 1024;`.',
      takeaway: 'Always ensure your `.filter()` predicates return truthy or falsy boolean expressions.'
    }
  },
  {
    id: 'a6_palindrome_sanitization',
    title: 'Cryptographic Palindrome: Character Sanitization Defect',
    level: 4,
    difficulty: 'Advanced',
    category: 'Arrays & Objects',
    story: 'The passcode phrase validator fails on phrases with uppercase letters and spaces like "Race car" because it forgets to normalize casing and strip non-alphanumeric characters.',
    bugType: 'Missing lowercase normalization and regex replacement',
    buggyLineHint: 2,
    points: 330,
    timeLimit: 140,
    functionName: 'isCyberPalindrome',
    starterCode: `function isCyberPalindrome(str) {
  // Should ignore case and spaces/punctuation
  const cleaned = str;
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}`,
    correctCode: `function isCyberPalindrome(str) {
  // Should ignore case and spaces/punctuation
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}`,
    testCases: [
      { id: 't1', description: 'detects mixed case phrase', args: ['Race car'], expected: true },
      { id: 't2', description: 'detects alphanumeric palindrome with punctuation', args: ['A man, a plan, a canal: Panama'], expected: true },
      { id: 't3', description: 'correctly rejects non-palindrome', args: ['Cyber security'], expected: false },
      { id: 't4', description: 'detects simple word', args: ['radar'], expected: true },
    ],
    hints: [
      'Notice that "Race car" has an uppercase \'R\' and a space \' \'.',
      'The string must be converted to lowercase and have non-alphanumeric characters stripped.',
      'Use `str.toLowerCase().replace(/[^a-z0-9]/g, "")` on Line 3.'
    ],
    explanation: {
      summary: 'Palindrome detection requires string normalization.',
      rootCause: 'Comparing raw strings causes differences in case and punctuation to fail valid palindromes.',
      fixDetails: 'Applied `.toLowerCase().replace(/[^a-z0-9]/g, "")` to sanitize the input.',
      takeaway: 'Always sanitize and normalize user strings before performing structural comparisons.'
    },
    isBoss: true,
    bossName: 'Algorithmic Chimera :: Stack_Crusher'
  },

  // ==========================================
  // LEVEL 5: EXPERT (Multiple Bugs, Concurrency, Complex Algorithms)
  // ==========================================
  {
    id: 'x1_multi_bug_shopping_cart',
    title: 'Black Market Checkout: Compound Bug Matrix',
    level: 5,
    difficulty: 'Expert',
    category: 'Complex Debugging',
    story: 'The illicit marketplace checkout has THREE simultaneous bugs: 1) coupon discount is added instead of subtracted, 2) tax is calculated before discount, and 3) the final price is not rounded to 2 decimal places.',
    bugType: 'Multiple bugs: Inverted discount arithmetic, wrong order of operations, missing rounding',
    buggyLineHint: 3,
    points: 450,
    timeLimit: 180,
    functionName: 'computeFinalTotal',
    starterCode: `function computeFinalTotal(items, discountPercent, taxRate) {
  // 1. Calculate subtotal of items: sum of item.price * item.quantity
  // 2. Apply discount: subtotal - (subtotal * discountPercent / 100)
  // 3. Apply tax on discounted price: discountedPrice + (discountedPrice * taxRate / 100)
  // 4. Return number rounded to 2 decimal places: Number(final.toFixed(2))

  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].quantity;
  }

  // Bug 1: Adding discount instead of subtracting
  const discounted = subtotal + (subtotal * discountPercent / 100);

  // Bug 2: Missing tax or wrong formula
  const finalPrice = discounted * (1 + taxRate / 100);

  // Bug 3: Returning string or unrounded float
  return finalPrice;
}`,
    correctCode: `function computeFinalTotal(items, discountPercent, taxRate) {
  // 1. Calculate subtotal of items: sum of item.price * item.quantity
  // 2. Apply discount: subtotal - (subtotal * discountPercent / 100)
  // 3. Apply tax on discounted price: discountedPrice + (discountedPrice * taxRate / 100)
  // 4. Return number rounded to 2 decimal places: Number(final.toFixed(2))

  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].quantity;
  }

  const discounted = subtotal - (subtotal * discountPercent / 100);
  const finalPrice = discounted * (1 + taxRate / 100);

  return Number(finalPrice.toFixed(2));
}`,
    testCases: [
      {
        id: 't1',
        description: 'calculates 100 subtotal with 10% discount and 10% tax -> 99.00',
        args: [[{ price: 50, quantity: 2 }], 10, 10],
        expected: 99
      },
      {
        id: 't2',
        description: 'multiple items with 20% discount and 5% tax',
        args: [[{ price: 10, quantity: 2 }, { price: 20, quantity: 4 }], 20, 5],
        expected: 84
      },
      {
        id: 't3',
        description: 'zero discount with tax',
        args: [[{ price: 30, quantity: 1 }], 0, 8],
        expected: 32.4
      }
    ],
    hints: [
      'Bug 1: On Line 13, discount is being added `+` instead of subtracted `-`.',
      'Bug 2: The final price needs to be rounded to 2 decimal places as a number.',
      'Use `Number(finalPrice.toFixed(2))` on the return line.'
    ],
    explanation: {
      summary: 'Real-world business logic often contains compound calculation and formatting errors.',
      rootCause: 'Discount was added instead of subtracted, and the final price suffered from floating point precision issues without `Number(price.toFixed(2))`.',
      fixDetails: 'Fixed discount subtraction and added numeric rounding with `Number(finalPrice.toFixed(2))`.',
      takeaway: 'Break multi-step financial formulas into isolated verified stages and round at the final output boundary.'
    }
  },
  {
    id: 'x2_multi_bug_memoization',
    title: 'Neural Synthesizer: Corrupted Fibonacci Memoization',
    level: 5,
    difficulty: 'Expert',
    category: 'Complex Debugging',
    story: 'The fast Fibonacci sequence memoizer crashes and outputs wrong results. The cache lookup uses `memo[n]` without checking if 0 was cached, and the base cases return incorrect values.',
    bugType: 'Memoization falsy bug + off-by-one base case',
    buggyLineHint: 4,
    points: 460,
    timeLimit: 180,
    functionName: 'fibonacciMemo',
    starterCode: `function fibonacciMemo(n, memo = {}) {
  // Fib(0) = 0, Fib(1) = 1, Fib(2) = 1, Fib(3) = 2, Fib(4) = 3...
  if (memo[n]) { // Bug 1: 0 is falsy!
    return memo[n];
  }
  if (n <= 0) return 1; // Bug 2: Fib(0) should be 0!
  if (n === 1) return 1;

  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}`,
    correctCode: `function fibonacciMemo(n, memo = {}) {
  // Fib(0) = 0, Fib(1) = 1, Fib(2) = 1, Fib(3) = 2, Fib(4) = 3...
  if (n in memo) {
    return memo[n];
  }
  if (n <= 0) return 0;
  if (n === 1) return 1;

  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}`,
    testCases: [
      { id: 't1', description: 'Fib(0) is 0', args: [0], expected: 0 },
      { id: 't2', description: 'Fib(1) is 1', args: [1], expected: 1 },
      { id: 't3', description: 'Fib(6) is 8', args: [6], expected: 8 },
      { id: 't4', description: 'Fib(10) is 55', args: [10], expected: 55 },
    ],
    hints: [
      'Bug 1: `if (memo[n])` fails when `memo[n] === 0` because 0 is falsy. Use `if (n in memo)` or `if (memo[n] !== undefined)`.',
      'Bug 2: Look at Line 6: `if (n <= 0) return 1;`. The 0th Fibonacci number is 0, not 1.',
      'Fix both the cache check and the base case.'
    ],
    explanation: {
      summary: 'Checking memo caches with falsy checks fails when the cached result is 0 or false.',
      rootCause: '`memo[0]` is 0, which is falsy, causing redundant computation, and `n <= 0` returned 1 instead of 0.',
      fixDetails: 'Changed check to `if (n in memo)` and base case to `if (n <= 0) return 0;`.',
      takeaway: 'Always use `key in cache` or `cache.has(key)` rather than truthy checks when 0 or false are valid outputs.'
    }
  },
  {
    id: 'x3_deep_flatten_array',
    title: 'Archive Unpacker: Flawed Deep Array Flattening',
    level: 5,
    difficulty: 'Expert',
    category: 'Complex Debugging',
    story: 'The deep array flattening utility uses a broken recursive loop that fails on nested empty arrays and mutates the recursion accumulator incorrectly.',
    bugType: 'Recursion accumulator bug in deep array flattening',
    buggyLineHint: 5,
    points: 470,
    timeLimit: 180,
    functionName: 'flattenDeep',
    starterCode: `function flattenDeep(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // Bug: Pushing array directly instead of spreading recursive result
      result.push(flattenDeep(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}`,
    correctCode: `function flattenDeep(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...flattenDeep(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}`,
    testCases: [
      { id: 't1', description: 'flattens 2 levels', args: [[[1, 2], [3, [4, 5]]]], expected: [1, 2, 3, 4, 5] },
      { id: 't2', description: 'flattens deeply nested single values', args: [[[[[[10]]]]]], expected: [10] },
      { id: 't3', description: 'handles already flat array', args: [[1, 2, 3]], expected: [1, 2, 3] },
      { id: 't4', description: 'handles empty arrays inside', args: [[[], [1], [[2]]]], expected: [1, 2] },
    ],
    hints: [
      'When `flattenDeep(arr[i])` returns a flattened array, `result.push(...)` without spread puts an array inside `result`!',
      'To append all elements of an array into another array, use `result.push(...flattenDeep(arr[i]))`.',
      'Add the spread operator `...` before `flattenDeep(arr[i])`.'
    ],
    explanation: {
      summary: '`Array.push(array)` inserts the array as a single element, whereas `Array.push(...array)` flattens elements into the destination.',
      rootCause: 'Missing spread operator caused nested arrays to remain nested.',
      fixDetails: 'Added spread operator: `result.push(...flattenDeep(arr[i]));`.',
      takeaway: 'Use spread `...` with `push` or `.concat()` when combining recursive array results.'
    }
  },
  {
    id: 'x4_multi_bug_matrix_transpose',
    title: 'Hologram Projection: 2D Matrix Transposition Defect',
    level: 5,
    difficulty: 'Expert',
    category: 'Complex Debugging',
    story: 'The matrix transformation engine crashes with `TypeError: Cannot set properties of undefined (setting \'0\')`. The inner row arrays of the transposed matrix are never initialized before assignment.',
    bugType: 'Uninitialized nested row arrays in 2D matrix transposition',
    buggyLineHint: 5,
    points: 480,
    timeLimit: 180,
    functionName: 'transposeMatrix',
    starterCode: `function transposeMatrix(matrix) {
  if (!matrix || matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let c = 0; c < cols; c++) {
    // Bug: result[c] is not initialized as an empty array!
    for (let r = 0; r < rows; r++) {
      result[c][r] = matrix[r][c];
    }
  }
  return result;
}`,
    correctCode: `function transposeMatrix(matrix) {
  if (!matrix || matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let c = 0; c < cols; c++) {
    result[c] = [];
    for (let r = 0; r < rows; r++) {
      result[c][r] = matrix[r][c];
    }
  }
  return result;
}`,
    testCases: [
      {
        id: 't1',
        description: 'transposes 2x3 matrix to 3x2',
        args: [[[1, 2, 3], [4, 5, 6]]],
        expected: [[1, 4], [2, 5], [3, 6]]
      },
      {
        id: 't2',
        description: 'transposes 2x2 square matrix',
        args: [[[1, 2], [3, 4]]],
        expected: [[1, 3], [2, 4]]
      },
      {
        id: 't3',
        description: 'handles empty matrix',
        args: [[]],
        expected: []
      }
    ],
    hints: [
      'In JavaScript, multidimensional arrays must have their inner row arrays initialized.',
      'Before writing `result[c][r]`, what is the value of `result[c]`? It is `undefined`!',
      'Add `result[c] = [];` inside the outer `c` loop before entering the inner `r` loop.'
    ],
    explanation: {
      summary: 'JavaScript does not have native 2D arrays; they are arrays of arrays.',
      rootCause: 'Attempting to index `result[c][r]` when `result[c]` was undefined caused a fatal TypeError.',
      fixDetails: 'Initialized `result[c] = [];` at the start of each column iteration.',
      takeaway: 'Always initialize inner array containers before assigning into 2D grid structures.'
    }
  },
  {
    id: 'x5_rate_limiter_sliding_window',
    title: 'DDoS Sentinel: Leaky Sliding Window Counter',
    level: 5,
    difficulty: 'Expert',
    category: 'Complex Debugging',
    story: 'The rate limiter sentinel records request timestamps but checks the array length after pushing instead of pruning stale timestamps outside the window first.',
    bugType: 'Timestamp pruning order of operations in rate limiter',
    buggyLineHint: 4,
    points: 490,
    timeLimit: 180,
    functionName: 'isRateLimited',
    starterCode: `function isRateLimited(timestamps, currentTimestamp, windowSeconds, maxAllowed) {
  // timestamps is an array of past request timestamps in seconds
  // 1. Filter out timestamps older than (currentTimestamp - windowSeconds)
  // 2. If remaining count is >= maxAllowed, return true (is rate limited)
  // 3. Otherwise add currentTimestamp to array and return false

  // Bug: Not filtering timestamps properly before checking limit
  const active = timestamps.filter(t => t < currentTimestamp - windowSeconds);
  
  if (active.length >= maxAllowed) {
    return true;
  }
  return false;
}`,
    correctCode: `function isRateLimited(timestamps, currentTimestamp, windowSeconds, maxAllowed) {
  // timestamps is an array of past request timestamps in seconds
  // 1. Filter out timestamps older than (currentTimestamp - windowSeconds)
  // 2. If remaining count is >= maxAllowed, return true (is rate limited)
  // 3. Otherwise add currentTimestamp to array and return false

  const active = timestamps.filter(t => t >= currentTimestamp - windowSeconds);
  
  if (active.length >= maxAllowed) {
    return true;
  }
  return false;
}`,
    testCases: [
      {
        id: 't1',
        description: 'blocks when active count reaches maxAllowed (3 requests within 60s)',
        args: [[100, 110, 120], 130, 60, 3],
        expected: true
      },
      {
        id: 't2',
        description: 'allows when older requests expired outside window',
        args: [[10, 20, 30], 130, 60, 3],
        expected: false
      },
      {
        id: 't3',
        description: 'allows when under limit',
        args: [[120], 130, 60, 3],
        expected: false
      }
    ],
    hints: [
      'Check the filter condition on Line 8.',
      'Active timestamps inside the window should satisfy `t >= currentTimestamp - windowSeconds`, not `<`!',
      'Change `<` to `>=` in the filter condition.'
    ],
    explanation: {
      summary: 'Sliding window filters must keep timestamps that fall inside the window range `[now - window, now]`.',
      rootCause: 'The filter condition used `<` instead of `>=`, which kept only expired timestamps and threw away active ones.',
      fixDetails: 'Changed condition to `t >= currentTimestamp - windowSeconds`.',
      takeaway: 'Verify whether your filter predicate retains active records or prunes expired records.'
    }
  },
  {
    id: 'x6_multi_bug_jwt_payload',
    title: 'Terminal Breach: Token Header & Signature Desync',
    level: 5,
    difficulty: 'Expert',
    category: 'Complex Debugging',
    story: 'The authentication token parser splits on comma `,` instead of period `.`, fails to decode Base64, and fails when checking token expiration.',
    bugType: 'JWT token split delimiter and expiry validation logic',
    buggyLineHint: 3,
    points: 500,
    timeLimit: 180,
    functionName: 'validateMockToken',
    starterCode: `function validateMockToken(token, currentTimestamp) {
  // Mock JWT format: "HEADER.PAYLOAD.SIGNATURE"
  // Payload is JSON string like '{"user":"hacker","exp":1700000000}'
  // 1. Split token by "."
  // 2. If not exactly 3 parts, return "INVALID_STRUCTURE"
  // 3. Parse payload JSON
  // 4. If currentTimestamp > payload.exp, return "EXPIRED"
  // 5. Otherwise return "VALID"

  // Bug 1: Splitting by comma instead of dot
  const parts = token.split(",");
  if (parts.length !== 3) {
    return "INVALID_STRUCTURE";
  }

  const payload = JSON.parse(parts[1]);
  // Bug 2: Inverted expiry check
  if (currentTimestamp < payload.exp) {
    return "EXPIRED";
  }

  return "VALID";
}`,
    correctCode: `function validateMockToken(token, currentTimestamp) {
  // Mock JWT format: "HEADER.PAYLOAD.SIGNATURE"
  // Payload is JSON string like '{"user":"hacker","exp":1700000000}'
  // 1. Split token by "."
  // 2. If not exactly 3 parts, return "INVALID_STRUCTURE"
  // 3. Parse payload JSON
  // 4. If currentTimestamp > payload.exp, return "EXPIRED"
  // 5. Otherwise return "VALID"

  const parts = token.split(".");
  if (parts.length !== 3) {
    return "INVALID_STRUCTURE";
  }

  const payload = JSON.parse(parts[1]);
  if (currentTimestamp > payload.exp) {
    return "EXPIRED";
  }

  return "VALID";
}`,
    testCases: [
      {
        id: 't1',
        description: 'valid unexpired token',
        args: ['eyJhbGciOiJIUzI1NiJ9.{"user":"neo","exp":2000000000}.SIGNATURE', 1500000000],
        expected: 'VALID'
      },
      {
        id: 't2',
        description: 'expired token returns EXPIRED',
        args: ['eyJhbGciOiJIUzI1NiJ9.{"user":"trinity","exp":1000000000}.SIGNATURE', 1500000000],
        expected: 'EXPIRED'
      },
      {
        id: 't3',
        description: 'malformed structure missing parts returns INVALID_STRUCTURE',
        args: ['PART1.PART2', 1500000000],
        expected: 'INVALID_STRUCTURE'
      }
    ],
    hints: [
      'Bug 1: JWT tokens are delimited by dots (`.`), not commas (`,`).',
      'Bug 2: Look at the expiry check: if `currentTimestamp > payload.exp`, the token has passed its expiration time!',
      'Change `token.split(",")` to `token.split(".")` and `<` to `>` in the expiry check.'
    ],
    explanation: {
      summary: 'JWT tokens consist of three dot-separated components: Header, Payload, and Signature.',
      rootCause: 'Splitting on commas broke valid JWT tokens, and `<` inverted the expiration logic.',
      fixDetails: 'Changed delimiter to `.` and updated expiry condition to `currentTimestamp > payload.exp`.',
      takeaway: 'Tokens must be split with exact period delimiters, and timestamp checks must verify `now > exp`.'
    },
    isBoss: true,
    bossName: 'Matrix Arch-Daemon :: Chronos_Zero'
  },

  // ==========================================
  // DAILY DEBUGGING SPECIAL CHALLENGE
  // ==========================================
  {
    id: 'daily_special_quantum_hasher',
    title: 'Daily Operation: Quantum Hash Checksum Collision',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Loops & Functions',
    story: 'DAILY BUG HUNT: The automated network gateway hash validator fails because the accumulator multiplier is applied before the bitwise XOR operation instead of after.',
    bugType: 'Operator precedence in hash rolling checksum',
    buggyLineHint: 5,
    points: 250,
    timeLimit: 120,
    functionName: 'computeCyberHash',
    starterCode: `function computeCyberHash(str) {
  // Simple rolling hash: for each char code, hash = (hash * 31 + charCode) % 1000007
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // Bug: multiplying code instead of total hash
    hash = hash + code * 31 % 1000007;
  }
  return hash;
}`,
    correctCode: `function computeCyberHash(str) {
  // Simple rolling hash: for each char code, hash = (hash * 31 + charCode) % 1000007
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    hash = (hash * 31 + code) % 1000007;
  }
  return hash;
}`,
    testCases: [
      { id: 't1', description: 'hashes cyber string', args: ['hack'], expected: 194636 },
      { id: 't2', description: 'hashes single character', args: ['A'], expected: 65 },
      { id: 't3', description: 'hashes empty string', args: [''], expected: 0 },
    ],
    hints: [
      'Look at the formula: `hash = (hash * 31 + charCode) % 1000007`.',
      'The current code multiplies `code * 31` instead of `hash * 31`.',
      'Change Line 6 to `hash = (hash * 31 + code) % 1000007;`.'
    ],
    explanation: {
      summary: 'Rolling hashes multiply the previous accumulated hash by a prime base, then add the new character code.',
      rootCause: 'The previous hash was not scaled by 31, causing anagrams to produce collisions.',
      fixDetails: 'Restructured formula to `hash = (hash * 31 + code) % 1000007;`.',
      takeaway: 'Operator grouping parentheses are essential when implementing mathematical hashing algorithms.'
    },
    isDaily: true
  }
];

export const ALL_CHALLENGES: Challenge[] = [
  ...CORE_CHALLENGES,
  ...EXTENDED_CHALLENGES
];
