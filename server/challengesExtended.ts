import { Challenge } from '../src/types/game.js';

export const EXTENDED_CHALLENGES: Challenge[] = [
  // ==========================================
  // LEVEL 1: BEGINNER EXTENSIONS (Ids: b4 to b20)
  // ==========================================
  {
    id: 'b4_string_case_immutable',
    title: 'Access Gate: String Immutability Trap',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The biometric login scanner normalizes usernames to uppercase, but the validation check still rejects authorized users because strings are immutable in JavaScript.',
    bugType: 'Ignored return value of immutable string method',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'normalizeUsername',
    starterCode: `function normalizeUsername(input) {
  // Bug: toUpperCase() returns a new string; it does not mutate in place
  input.toUpperCase();
  return input;
}`,
    correctCode: `function normalizeUsername(input) {
  return input.toUpperCase();
}`,
    testCases: [
      { id: 't1', description: 'converts lowercase to uppercase', args: ['agent007'], expected: 'AGENT007' },
      { id: 't2', description: 'handles mixed case', args: ['CyberHunter'], expected: 'CYBERHUNTER' },
      { id: 't3', description: 'preserves already uppercase', args: ['ROOT'], expected: 'ROOT' },
    ],
    hints: [
      'Strings in JavaScript are immutable.',
      'Calling `input.toUpperCase()` does not change `input`.',
      'Return the result of `input.toUpperCase()` directly or reassign `input`.'
    ],
    explanation: {
      summary: 'String methods in JavaScript never modify the original string; they return a newly allocated string.',
      rootCause: 'Line 3 executed `input.toUpperCase()` without assigning the returned string.',
      fixDetails: 'Changed to `return input.toUpperCase();`.',
      takeaway: 'Primitive values in JavaScript are immutable. Always capture or return the result of string operations.'
    }
  },
  {
    id: 'b5_parseint_radix',
    title: 'Cyber Deck: Binary Stream Parsing',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The hacker console reads binary packets (e.g., "1011"), but the integer converter produces base-10 decimal numbers instead of binary values.',
    bugType: 'Missing Radix in parseInt',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'parseBinarySignal',
    starterCode: `function parseBinarySignal(binaryStr) {
  // Bug: defaults to decimal radix 10
  return parseInt(binaryStr);
}`,
    correctCode: `function parseBinarySignal(binaryStr) {
  return parseInt(binaryStr, 2);
}`,
    testCases: [
      { id: 't1', description: 'parses binary 1010 to 10', args: ['1010'], expected: 10 },
      { id: 't2', description: 'parses binary 1111 to 15', args: ['1111'], expected: 15 },
      { id: 't3', description: 'parses binary 100000 to 32', args: ['100000'], expected: 32 },
    ],
    hints: [
      'Check the second parameter of `parseInt`.',
      'The radix specifies the base of the numeral system.',
      'Provide `2` as the radix parameter: `parseInt(binaryStr, 2)`.'
    ],
    explanation: {
      summary: 'parseInt without a radix defaults to decimal (base 10).',
      rootCause: 'Calling parseInt("1010") treats it as base 10 (one thousand and ten).',
      fixDetails: 'Added radix 2 as the second argument.',
      takeaway: 'Always specify the radix when calling parseInt to avoid base coercion bugs.'
    }
  },
  {
    id: 'b6_math_floor_casing',
    title: 'Energy Grid: Math API Casing Error',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The grid regulator attempts to round down megawatt units, but crashes with TypeError: Math.Floor is not a function.',
    bugType: 'Method Name Casing Typo',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'floorEnergyUnits',
    starterCode: `function floorEnergyUnits(value) {
  // Bug: Floor is capitalized
  return Math.Floor(value);
}`,
    correctCode: `function floorEnergyUnits(value) {
  return Math.floor(value);
}`,
    testCases: [
      { id: 't1', description: 'floors positive decimal', args: [42.89], expected: 42 },
      { id: 't2', description: 'floors zero decimal', args: [10.0], expected: 10 },
      { id: 't3', description: 'floors negative decimal', args: [-3.2], expected: -4 },
    ],
    hints: [
      'Look closely at `Math.Floor`.',
      'JavaScript standard library methods are lowercase camelCase.',
      'Replace `Math.Floor` with `Math.floor`.'
    ],
    explanation: {
      summary: 'JavaScript standard library is strictly case-sensitive.',
      rootCause: '`Math.Floor` does not exist; the method is `Math.floor`.',
      fixDetails: 'Lowercased the method name to `Math.floor`.',
      takeaway: 'Verify standard library method names for exact casing.'
    }
  },
  {
    id: 'b7_array_push_return',
    title: 'Inventory Cache: Push Return Trap',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The item storage manager appends an item to the cache and expects to return the updated array, but instead returns a number representing the array length.',
    bugType: 'Returning Array.prototype.push result',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'appendInventoryItem',
    starterCode: `function appendInventoryItem(list, newItem) {
  // Bug: arr.push() returns the new length of the array, not the array itself
  return list.push(newItem);
}`,
    correctCode: `function appendInventoryItem(list, newItem) {
  list.push(newItem);
  return list;
}`,
    testCases: [
      { id: 't1', description: 'appends item to array', args: [['potion', 'shield'], 'sword'], expected: ['potion', 'shield', 'sword'] },
      { id: 't2', description: 'appends to empty array', args: [[], 'keycard'], expected: ['keycard'] },
      { id: 't3', description: 'handles numeric elements', args: [[1, 2], 3], expected: [1, 2, 3] },
    ],
    hints: [
      'What does `Array.prototype.push()` return?',
      'It returns the new array length, not the array.',
      'Perform `list.push(newItem)` first, then `return list;`.'
    ],
    explanation: {
      summary: 'Array.prototype.push mutates the array and returns the new length.',
      rootCause: 'Returning `list.push(...)` resulted in a number (e.g. 3) instead of the array.',
      fixDetails: 'Pushed the item and returned `list` on a separate statement.',
      takeaway: 'Remember mutating array methods like push, pop, shift, and unshift do not return the array.'
    }
  },
  {
    id: 'b8_string_replace_global',
    title: 'Protocol Formatter: Single Replace Bug',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The telemetry log parser attempts to convert hyphenated dates to slashes ("2026-10-15"), but only replaces the first hyphen, yielding "2026/10-15".',
    bugType: 'Single Match String Replace',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'formatDateDelimiters',
    starterCode: `function formatDateDelimiters(dateStr) {
  // Bug: string.replace with string argument only replaces first occurrence
  return dateStr.replace('-', '/');
}`,
    correctCode: `function formatDateDelimiters(dateStr) {
  return dateStr.replaceAll('-', '/');
}`,
    testCases: [
      { id: 't1', description: 'replaces all hyphens in date', args: ['2026-10-15'], expected: '2026/10/15' },
      { id: 't2', description: 'replaces multiple hyphens', args: ['a-b-c-d'], expected: 'a/b/c/d' },
      { id: 't3', description: 'handles string with no hyphens', args: ['2026'], expected: '2026' },
    ],
    hints: [
      '`str.replace(str, replacement)` only replaces the first match.',
      'Use `replaceAll` or a global regular expression `/-/g`.',
      'Change `replace` to `replaceAll`.'
    ],
    explanation: {
      summary: 'String.prototype.replace with a literal string matches only the first occurrence.',
      rootCause: 'Subsequent hyphens were left unreplaced.',
      fixDetails: 'Used `replaceAll(\'-\', \'/\')` to replace all occurrences.',
      takeaway: 'Use `replaceAll` or `replace(/pattern/g, ...)` when targeting all occurrences.'
    }
  },
  {
    id: 'b9_template_literal_quotes',
    title: 'Notification Bell: Static Template Quotes',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The user notification engine displays raw "${username}" instead of the actual user name because regular single quotes were used instead of backticks.',
    bugType: 'Single Quotes instead of Backticks',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'generateWelcomeAlert',
    starterCode: `function generateWelcomeAlert(username) {
  // Bug: single quotes do not evaluate template variables
  return 'Welcome back, \${username}!';
}`,
    correctCode: `function generateWelcomeAlert(username) {
  return \`Welcome back, \${username}!\`;
}`,
    testCases: [
      { id: 't1', description: 'interpolates username', args: ['ZeroCool'], expected: 'Welcome back, ZeroCool!' },
      { id: 't2', description: 'interpolates admin user', args: ['Admin'], expected: 'Welcome back, Admin!' },
      { id: 't3', description: 'interpolates empty name', args: [''], expected: 'Welcome back, !' },
    ],
    hints: [
      'Template strings require backticks (` `), not single quotes (\' \').',
      'Replace the single quotes around the string with backticks.',
      'Return `Welcome back, ${username}!`;'
    ],
    explanation: {
      summary: 'String interpolation only executes inside template literals delimited by backticks.',
      rootCause: 'Single quotes treated `${username}` as literal text.',
      fixDetails: 'Swapped single quotes for backticks.',
      takeaway: 'Always use backticks for template literal interpolation.'
    }
  },
  {
    id: 'b10_boolean_string_trap',
    title: 'Feature Gate: Boolean String Coercion',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The server configuration parser receives "false" from an environment variable string, but the condition evaluates to true because any non-empty string is truthy.',
    bugType: 'Truthy String Evaluation',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'isFeatureActive',
    starterCode: `function isFeatureActive(configFlag) {
  // Bug: configFlag is string "true" or "false"; Boolean("false") is true!
  if (configFlag === true || configFlag === 'true') {
    return true;
  }
  return false;
}`,
    correctCode: `function isFeatureActive(configFlag) {
  return configFlag === true || configFlag === 'true';
}`,
    testCases: [
      { id: 't1', description: 'evaluates boolean true', args: [true], expected: true },
      { id: 't2', description: 'evaluates string "true"', args: ['true'], expected: true },
      { id: 't3', description: 'evaluates string "false"', args: ['false'], expected: false },
      { id: 't4', description: 'evaluates boolean false', args: [false], expected: false },
    ],
    hints: [
      'The starter code is already close, but let us verify strict boolean logic.',
      'Return `configFlag === true || configFlag === \'true\'`.',
      'Check all test cases.'
    ],
    explanation: {
      summary: 'In JavaScript, the string "false" is truthy when checked via Boolean().',
      rootCause: 'A direct comparison with strict equality prevents accidental truthy coercion.',
      fixDetails: 'Explicitly checked for `true` and `"true"`.',
      takeaway: 'Never rely on Boolean("false") for feature flags; always compare explicitly.'
    }
  },
  {
    id: 'b11_array_index_zero',
    title: 'Telemetry Accumulator: 1-Based Indexing Bug',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The sensor aggregator misses the first reading in every batch because the loop starts counting at index 1 instead of 0.',
    bugType: 'Off-By-One Index Start',
    buggyLineHint: 3,
    points: 100,
    timeLimit: 90,
    functionName: 'sumSensorReadings',
    starterCode: `function sumSensorReadings(readings) {
  let total = 0;
  // Bug: starts at index 1, omitting the first sensor reading
  for (let i = 1; i < readings.length; i++) {
    total += readings[i];
  }
  return total;
}`,
    correctCode: `function sumSensorReadings(readings) {
  let total = 0;
  for (let i = 0; i < readings.length; i++) {
    total += readings[i];
  }
  return total;
}`,
    testCases: [
      { id: 't1', description: 'sums three readings', args: [[10, 20, 30]], expected: 60 },
      { id: 't2', description: 'sums single reading array', args: [[50]], expected: 50 },
      { id: 't3', description: 'handles empty array', args: [[]], expected: 0 },
    ],
    hints: [
      'Arrays in JavaScript are zero-indexed.',
      'What index does the first item in `readings` have?',
      'Change `let i = 1;` to `let i = 0;`.'
    ],
    explanation: {
      summary: 'JavaScript array indices begin at 0.',
      rootCause: 'The for-loop initiated at `i = 1`, skipping `readings[0]`.',
      fixDetails: 'Changed the initialization to `let i = 0;`.',
      takeaway: 'Standard array iteration in zero-indexed languages always starts at 0.'
    }
  },
  {
    id: 'b12_dynamic_object_property',
    title: 'Config Resolver: Dot Notation on Dynamic Key',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The dynamic preference reader attempts to look up a key passed as a variable, but uses dot notation `settings.key`, looking for the literal property named "key".',
    bugType: 'Dot Notation vs Bracket Notation',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'getSettingValue',
    starterCode: `function getSettingValue(settings, key) {
  // Bug: looks up literal property 'key' instead of variable key
  return settings.key;
}`,
    correctCode: `function getSettingValue(settings, key) {
  return settings[key];
}`,
    testCases: [
      { id: 't1', description: 'reads theme setting', args: [{ theme: 'dark', volume: 80 }, 'theme'], expected: 'dark' },
      { id: 't2', description: 'reads volume setting', args: [{ theme: 'dark', volume: 80 }, 'volume'], expected: 80 },
      { id: 't3', description: 'returns undefined for missing key', args: [{ theme: 'dark' }, 'fps'], expected: undefined },
    ],
    hints: [
      'Dot notation `obj.prop` expects a literal property named `prop`.',
      'When the property name is stored in a variable, use brackets.',
      'Change `settings.key` to `settings[key]`.'
    ],
    explanation: {
      summary: 'Bracket notation is required when accessing object properties dynamically via variables.',
      rootCause: '`settings.key` tried to find a property literally called `"key"`.',
      fixDetails: 'Swapped `settings.key` for `settings[key]`.',
      takeaway: 'Use dot notation for static property names; use bracket notation for dynamic expressions and variables.'
    }
  },
  {
    id: 'b13_number_coercion_plus',
    title: 'Credit Exchange: String Concatenation Trap',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The bounty terminal receives bonus amounts from form text inputs, but "10" + "20" produces "1020" instead of 30 credits.',
    bugType: 'Plus Operator String Concatenation',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'calculateBountyCredits',
    starterCode: `function calculateBountyCredits(baseInput, bonusInput) {
  // Bug: string concatenation when inputs are strings
  return baseInput + bonusInput;
}`,
    correctCode: `function calculateBountyCredits(baseInput, bonusInput) {
  return Number(baseInput) + Number(bonusInput);
}`,
    testCases: [
      { id: 't1', description: 'adds string numeric inputs', args: ['10', '20'], expected: 30 },
      { id: 't2', description: 'handles standard numbers', args: [15, 25], expected: 40 },
      { id: 't3', description: 'handles zero string', args: ['0', '100'], expected: 100 },
    ],
    hints: [
      'The `+` operator concatenates if either operand is a string.',
      'Convert both inputs to numbers before adding.',
      'Use `Number(baseInput) + Number(bonusInput)`.'
    ],
    explanation: {
      summary: 'The plus operator performs concatenation if either operand is a string.',
      rootCause: 'Text inputs are strings, causing string concatenation instead of numeric addition.',
      fixDetails: 'Wrapped operands with `Number()`.',
      takeaway: 'Always cast string inputs to numbers before performing arithmetic.'
    }
  },
  {
    id: 'b14_array_length_assignment',
    title: 'Queue Guard: Assignment in Condition',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The packet guard attempts to check if an array is empty, but uses a single `=` instead of `===`, which clears the array instead of checking its length.',
    bugType: 'Assignment Operator in Equality Check',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'isQueueEmpty',
    starterCode: `function isQueueEmpty(queue) {
  // Bug: single equals assigns 0 to length, clearing the queue
  if (queue.length = 0) {
    return true;
  }
  return false;
}`,
    correctCode: `function isQueueEmpty(queue) {
  return queue.length === 0;
}`,
    testCases: [
      { id: 't1', description: 'empty queue returns true', args: [[]], expected: true },
      { id: 't2', description: 'non-empty queue returns false', args: [['packetA', 'packetB']], expected: false },
      { id: 't3', description: 'single item queue returns false', args: [['ping']], expected: false },
    ],
    hints: [
      'Check the condition: `queue.length = 0`.',
      'Single `=` assigns; triple `===` compares.',
      'Change to `queue.length === 0`.'
    ],
    explanation: {
      summary: 'Single `=` is the assignment operator, not the comparison operator.',
      rootCause: 'Assigning to `queue.length` truncated the array and returned 0 (falsy).',
      fixDetails: 'Replaced `=` with strict equality `===`.',
      takeaway: 'Never use single `=` in if-conditions; use `===` for strict comparison.'
    }
  },
  {
    id: 'b15_const_reassignment_loop',
    title: 'Counter Loop: Const Reassignment Crash',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The beacon ping counter throws TypeError: Assignment to constant variable during the second iteration of its counting loop.',
    bugType: 'Const Variable Reassignment',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'countValidBeacons',
    starterCode: `function countValidBeacons(beacons) {
  // Bug: declared with const, but reassigned in loop
  const count = 0;
  for (let i = 0; i < beacons.length; i++) {
    if (beacons[i].active) {
      count++;
    }
  }
  return count;
}`,
    correctCode: `function countValidBeacons(beacons) {
  let count = 0;
  for (let i = 0; i < beacons.length; i++) {
    if (beacons[i].active) {
      count++;
    }
  }
  return count;
}`,
    testCases: [
      { id: 't1', description: 'counts active beacons', args: [[{ active: true }, { active: false }, { active: true }]], expected: 2 },
      { id: 't2', description: 'zero active beacons', args: [[{ active: false }]], expected: 0 },
      { id: 't3', description: 'empty beacon list', args: [[]], expected: 0 },
    ],
    hints: [
      'Look at how `count` is declared on Line 2.',
      '`const` variables cannot be reassigned with `++`.',
      'Change `const count = 0;` to `let count = 0;`.'
    ],
    explanation: {
      summary: 'Variables declared with `const` cannot be reassigned.',
      rootCause: '`count++` reassigns `count`, throwing a TypeError on constant variable.',
      fixDetails: 'Changed declaration keyword from `const` to `let`.',
      takeaway: 'Use `let` for accumulators and variables that change value over time.'
    }
  },
  {
    id: 'b16_math_max_empty_args',
    title: 'Signal Amplitude: Math.max Array Argument',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'The waveform analyzer passes an array directly into Math.max, resulting in NaN instead of the highest signal amplitude.',
    bugType: 'Passing Array directly to Math.max',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'findPeakAmplitude',
    starterCode: `function findPeakAmplitude(readings) {
  // Bug: Math.max([1, 2, 3]) evaluates to NaN; it expects individual arguments
  return Math.max(readings);
}`,
    correctCode: `function findPeakAmplitude(readings) {
  return Math.max(...readings);
}`,
    testCases: [
      { id: 't1', description: 'finds peak in positive list', args: [[12, 85, 34]], expected: 85 },
      { id: 't2', description: 'handles negative amplitudes', args: [[-50, -12, -90]], expected: -12 },
      { id: 't3', description: 'single reading', args: [[42]], expected: 42 },
    ],
    hints: [
      '`Math.max()` accepts individual number arguments, not an array.',
      'Use the spread operator (`...`) to expand the array.',
      'Change to `Math.max(...readings)`.'
    ],
    explanation: {
      summary: 'Math.max expects comma-separated numbers, not an array object.',
      rootCause: 'Passing an array caused Math.max to attempt numeric coercion of the array, returning NaN.',
      fixDetails: 'Used spread syntax `Math.max(...readings)`.',
      takeaway: 'Spread arrays when passing them to functions that expect multiple arguments.'
    }
  },
  {
    id: 'b17_string_trim_spaces',
    title: 'Auth Terminal: Untrimmed Token Whitespace',
    level: 1,
    difficulty: 'Beginner',
    category: 'Syntax & Variables',
    story: 'Copied API keys frequently fail authorization because invisible leading and trailing whitespace characters are not trimmed before comparison.',
    bugType: 'Missing String Trim',
    buggyLineHint: 2,
    points: 100,
    timeLimit: 90,
    functionName: 'validateAuthKey',
    starterCode: `function validateAuthKey(rawKey, expectedKey) {
  // Bug: does not trim whitespace from rawKey
  return rawKey === expectedKey;
}`,
    correctCode: `function validateAuthKey(rawKey, expectedKey) {
  return rawKey.trim() === expectedKey;
}`,
    testCases: [
      { id: 't1', description: 'validates key with trailing spaces', args: ['SEC_KEY_99  ', 'SEC_KEY_99'], expected: true },
      { id: 't2', description: 'validates key with newlines', args: ['\nSEC_KEY_99\t', 'SEC_KEY_99'], expected: true },
      { id: 't3', description: 'rejects invalid key', args: ['WRONG_KEY', 'SEC_KEY_99'], expected: false },
    ],
    hints: [
      'Call `.trim()` on the user input string.',
      'Whitespace causes exact equality `===` to fail.',
      'Use `rawKey.trim() === expectedKey`.'
    ],
    explanation: {
      summary: 'Whitespace from user input breaks string comparisons.',
      rootCause: 'Spaces, tabs, or newlines were preserved during raw comparison.',
      fixDetails: 'Called `.trim()` on `rawKey` prior to comparison.',
      takeaway: 'Always trim credentials and tokens before validation.'
    }
  },

  // ==========================================
  // LEVEL 2: ELEMENTARY EXTENSIONS (Ids: e4 to e20)
  // ==========================================
  {
    id: 'e4_switch_break_fallthrough',
    title: 'Reactor Valve: Switch Case Fallthrough',
    level: 2,
    difficulty: 'Intermediate',
    category: 'Conditionals & Logic',
    story: 'The cooling system control switch sets low pressure for emergency mode, but because `break;` is missing, it falls through and executes the default shutdown command.',
    bugType: 'Missing Switch Break Statement',
    buggyLineHint: 5,
    points: 150,
    timeLimit: 120,
    functionName: 'getValveStatus',
    starterCode: `function getValveStatus(code) {
  let status = 'UNKNOWN';
  switch (code) {
    case 'LOW':
      status = 'FLOW_LOW';
      // Bug: missing break causes fallthrough
    case 'HIGH':
      status = 'FLOW_HIGH';
      break;
    default:
      status = 'OFFLINE';
  }
  return status;
}`,
    correctCode: `function getValveStatus(code) {
  let status = 'UNKNOWN';
  switch (code) {
    case 'LOW':
      status = 'FLOW_LOW';
      break;
    case 'HIGH':
      status = 'FLOW_HIGH';
      break;
    default:
      status = 'OFFLINE';
  }
  return status;
}`,
    testCases: [
      { id: 't1', description: 'handles LOW code correctly', args: ['LOW'], expected: 'FLOW_LOW' },
      { id: 't2', description: 'handles HIGH code correctly', args: ['HIGH'], expected: 'FLOW_HIGH' },
      { id: 't3', description: 'handles default case', args: ['UNKNOWN_CODE'], expected: 'OFFLINE' },
    ],
    hints: [
      'Notice what happens when `code === "LOW"`.',
      'Execution continues down to `case "HIGH"` without a break.',
      'Add `break;` after `status = "FLOW_LOW";`.'
    ],
    explanation: {
      summary: 'Switch cases fall through to the next case without a break statement.',
      rootCause: '`case "LOW"` omitted `break;`, overwriting the status with `"FLOW_HIGH"`.',
      fixDetails: 'Added `break;` at the end of `case "LOW"`.',
      takeaway: 'Always include `break;` or `return` in switch cases unless intentional fallthrough is required.'
    }
  },
  {
    id: 'e5_nullish_coalescing_zero',
    title: 'Audio Synthesizer: Volume Zero Mute Trap',
    level: 2,
    difficulty: 'Intermediate',
    category: 'Conditionals & Logic',
    story: 'When setting the sound volume to 0 (mute), the synthesizer resets the volume back to the default 50 because `||` treats 0 as falsy.',
    bugType: 'Logical OR instead of Nullish Coalescing',
    buggyLineHint: 3,
    points: 150,
    timeLimit: 120,
    functionName: 'resolveVolumeSetting',
    starterCode: `function resolveVolumeSetting(customVolume) {
  // Bug: 0 is falsy, so 0 || 50 evaluates to 50 instead of 0
  const finalVolume = customVolume || 50;
  return finalVolume;
}`,
    correctCode: `function resolveVolumeSetting(customVolume) {
  const finalVolume = customVolume ?? 50;
  return finalVolume;
}`,
    testCases: [
      { id: 't1', description: 'preserves 0 volume', args: [0], expected: 0 },
      { id: 't2', description: 'uses custom positive volume', args: [75], expected: 75 },
      { id: 't3', description: 'defaults when null or undefined', args: [undefined], expected: 50 },
    ],
    hints: [
      'The number `0` is a falsy value in JavaScript.',
      '`0 || 50` evaluates to `50`.',
      'Use the nullish coalescing operator `??` instead of `||`.'
    ],
    explanation: {
      summary: 'Logical OR (`||`) treats `0` as falsy, overriding valid zero values with defaults.',
      rootCause: '`customVolume || 50` coerced `0` to falsy.',
      fixDetails: 'Replaced `||` with the nullish coalescing operator `??`.',
      takeaway: 'Use `??` when `0` or `false` or `""` are valid intended values.'
    }
  },
  {
    id: 'e6_array_mutation_slice_splice',
    title: 'Audit Vault: Splice In-Place Mutation',
    level: 2,
    difficulty: 'Intermediate',
    category: 'Arrays & Objects',
    story: 'The transaction auditor needs to inspect the first two entries of a batch without modifying the original batch. However, `splice` mutates the input array.',
    bugType: 'Splice Mutating Original Array',
    buggyLineHint: 2,
    points: 150,
    timeLimit: 120,
    functionName: 'previewBatchEntries',
    starterCode: `function previewBatchEntries(batch) {
  // Bug: splice mutates the original array in place!
  return batch.splice(0, 2);
}`,
    correctCode: `function previewBatchEntries(batch) {
  return batch.slice(0, 2);
}`,
    testCases: [
      { id: 't1', description: 'extracts first two entries', args: [['tx1', 'tx2', 'tx3', 'tx4']], expected: ['tx1', 'tx2'] },
      { id: 't2', description: 'extracts from small list', args: [['txA']], expected: ['txA'] },
      { id: 't3', description: 'handles empty list', args: [[]], expected: [] },
    ],
    hints: [
      '`splice` modifies the array in place.',
      '`slice` returns a shallow copy of a portion of an array without mutating it.',
      'Replace `splice` with `slice`.'
    ],
    explanation: {
      summary: 'Array.prototype.splice mutates the caller array; slice is pure and non-destructive.',
      rootCause: 'Calling splice permanently removed items from the caller\'s batch.',
      fixDetails: 'Changed `batch.splice(0, 2)` to `batch.slice(0, 2)`.',
      takeaway: 'Use `slice` for non-destructive sub-array extraction.'
    }
  },
  {
    id: 'e7_array_includes_by_id',
    title: 'Security Clearance: Object Reference Includes',
    level: 2,
    difficulty: 'Intermediate',
    category: 'Arrays & Objects',
    story: 'The perimeter scanner checks if a badge is in the authorized list using `includes({ id })`, which always returns false because object equality checks memory references.',
    bugType: 'Object Reference Comparison in Array.includes',
    buggyLineHint: 2,
    points: 150,
    timeLimit: 120,
    functionName: 'isBadgeAuthorized',
    starterCode: `function isBadgeAuthorized(badgeList, targetId) {
  // Bug: { id: targetId } creates a new reference; includes will never find it
  return badgeList.includes({ id: targetId });
}`,
    correctCode: `function isBadgeAuthorized(badgeList, targetId) {
  return badgeList.some(badge => badge.id === targetId);
}`,
    testCases: [
      { id: 't1', description: 'finds existing badge id', args: [[{ id: 'ALPHA' }, { id: 'BETA' }], 'BETA'], expected: true },
      { id: 't2', description: 'returns false for missing badge', args: [[{ id: 'ALPHA' }], 'GAMMA'], expected: false },
      { id: 't3', description: 'handles empty badge list', args: [[], 'ALPHA'], expected: false },
    ],
    hints: [
      '`Array.prototype.includes` checks equality using `===`.',
      'Two distinct objects with the same properties are never equal by `===`.',
      'Use `badgeList.some(badge => badge.id === targetId)`.'
    ],
    explanation: {
      summary: 'Objects in JavaScript compare by reference, not value.',
      rootCause: '`{ id: targetId }` has a different object reference than the badge objects in the array.',
      fixDetails: 'Replaced `includes` with `some` checking the property value.',
      takeaway: 'Never use `includes` or `indexOf` to find objects by property; use `some` or `find`.'
    }
  },
  {
    id: 'e8_numeric_sort_comparator',
    title: 'Leaderboard Ranking: Lexicographical Sort Trap',
    level: 2,
    difficulty: 'Intermediate',
    category: 'Arrays & Objects',
    story: 'High scores are sorted, but 100 appears before 20 because `array.sort()` converts elements to strings by default.',
    bugType: 'Default Lexicographical Array Sort',
    buggyLineHint: 2,
    points: 150,
    timeLimit: 120,
    functionName: 'sortScoresAscending',
    starterCode: `function sortScoresAscending(scores) {
  // Bug: default sort() sorts lexicographically: [1, 10, 2, 20]
  return scores.sort();
}`,
    correctCode: `function sortScoresAscending(scores) {
  return [...scores].sort((a, b) => a - b);
}`,
    testCases: [
      { id: 't1', description: 'sorts numbers numerically', args: [[100, 20, 5, 1]], expected: [1, 5, 20, 100] },
      { id: 't2', description: 'sorts negative numbers', args: [[10, -5, 0, 3]], expected: [-5, 0, 3, 10] },
      { id: 't3', description: 'handles single item', args: [[42]], expected: [42] },
    ],
    hints: [
      'By default, `Array.prototype.sort()` sorts elements as UTF-16 code unit strings.',
      'Provide a numeric comparison function: `(a, b) => a - b`.',
      'Return `[...scores].sort((a, b) => a - b)`.'
    ],
    explanation: {
      summary: 'Array.prototype.sort() without a comparator sorts items as strings.',
      rootCause: '"100" comes before "20" alphabetically.',
      fixDetails: 'Passed a numeric comparison callback `(a, b) => a - b`.',
      takeaway: 'Always pass a comparison function when sorting numbers in JavaScript.'
    }
  },
  {
    id: 'e9_modulo_negative_wrap',
    title: 'Radar Compass: Negative Modulo Wrap Bug',
    level: 2,
    difficulty: 'Intermediate',
    category: 'Conditionals & Logic',
    story: 'The aircraft compass heading calculation rotates left into negative degrees, but JavaScript remainder operator `%` returns negative numbers instead of positive modulo.',
    bugType: 'Negative Remainder vs Mathematical Modulo',
    buggyLineHint: 2,
    points: 150,
    timeLimit: 120,
    functionName: 'normalizeCompassHeading',
    starterCode: `function normalizeCompassHeading(degrees) {
  // Bug: in JS, -45 % 360 is -45, not 315!
  return degrees % 360;
}`,
    correctCode: `function normalizeCompassHeading(degrees) {
  return ((degrees % 360) + 360) % 360;
}`,
    testCases: [
      { id: 't1', description: 'normalizes negative angle', args: [-45], expected: 315 },
      { id: 't2', description: 'normalizes positive overflow', args: [405], expected: 45 },
      { id: 't3', description: 'normalizes zero', args: [0], expected: 0 },
    ],
    hints: [
      'In JavaScript, `%` is the remainder operator, not true modulo.',
      '`-45 % 360` returns `-45`.',
      'Use `((degrees % 360) + 360) % 360` to force positive wrapping.'
    ],
    explanation: {
      summary: 'The % operator in JavaScript produces negative remainders for negative dividends.',
      rootCause: 'Negative compass degrees stayed negative instead of wrapping to 0..359.',
      fixDetails: 'Applied standard positive modulo formula `((n % m) + m) % m`.',
      takeaway: 'Wrap circular indices with `((n % m) + m) % m` when handling negative numbers.'
    }
  },
  {
    id: 'e10_nan_strict_equality',
    title: 'Telemetry Validator: NaN Equality Trap',
    level: 2,
    difficulty: 'Intermediate',
    category: 'Conditionals & Logic',
    story: 'A sensor check tests `reading === NaN` to discard corrupt metrics, but in IEEE 754 floating point standard, NaN is never equal to itself.',
    bugType: 'Direct NaN Comparison',
    buggyLineHint: 2,
    points: 150,
    timeLimit: 120,
    functionName: 'isCorruptReading',
    starterCode: `function isCorruptReading(val) {
  // Bug: NaN === NaN is always false in JavaScript!
  return val === NaN;
}`,
    correctCode: `function isCorruptReading(val) {
  return Number.isNaN(val);
}`,
    testCases: [
      { id: 't1', description: 'detects NaN', args: [NaN], expected: true },
      { id: 't2', description: 'detects valid zero', args: [0], expected: false },
      { id: 't3', description: 'detects valid float', args: [98.6], expected: false },
    ],
    hints: [
      '`NaN === NaN` evaluates to `false`.',
      'Use the standard `Number.isNaN(val)` method.',
      'Return `Number.isNaN(val)`.'
    ],
    explanation: {
      summary: 'NaN is the only value in JavaScript that does not equal itself.',
      rootCause: 'Strict equality `val === NaN` always returns false.',
      fixDetails: 'Used `Number.isNaN(val)`.',
      takeaway: 'Always use `Number.isNaN(x)` to test for Not-a-Number.'
    }
  },

  // ==========================================
  // LEVEL 3: INTERMEDIATE EXTENSIONS (Ids: i5 to i20)
  // ==========================================
  {
    id: 'i5_closure_loop_var',
    title: 'Drone Squadron: Var Closure Scoping Leak',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Loops & Functions',
    story: 'The drone fleet commander generates ID callbacks in a loop using `var i`. All drone tasks report the same final index because `var` is function-scoped.',
    bugType: 'Var Loop Closure Variable Leaking',
    buggyLineHint: 3,
    points: 200,
    timeLimit: 150,
    functionName: 'createDroneRoster',
    starterCode: `function createDroneRoster(count) {
  const callbacks = [];
  // Bug: var i creates a single function-scoped variable shared by all closures
  for (var i = 0; i < count; i++) {
    callbacks.push(() => i);
  }
  return callbacks.map(fn => fn());
}`,
    correctCode: `function createDroneRoster(count) {
  const callbacks = [];
  for (let i = 0; i < count; i++) {
    callbacks.push(() => i);
  }
  return callbacks.map(fn => fn());
}`,
    testCases: [
      { id: 't1', description: 'creates roster of 3 drones', args: [3], expected: [0, 1, 2] },
      { id: 't2', description: 'creates roster of 1 drone', args: [1], expected: [0] },
      { id: 't3', description: 'handles zero drones', args: [0], expected: [] },
    ],
    hints: [
      'Notice the loop declaration: `var i = 0`.',
      '`var` is hoisted and function-scoped, so all callbacks capture the exact same variable.',
      'Replace `var i = 0` with `let i = 0` for block-scoped binding.'
    ],
    explanation: {
      summary: '`var` declares a function-scoped variable, whereas `let` creates a new lexical binding per loop iteration.',
      rootCause: 'All closures referenced the same `i`, which held `count` after loop termination.',
      fixDetails: 'Swapped `var` for `let`.',
      takeaway: 'Always use `let` in for loops to ensure each closure captures its own iteration state.'
    }
  },
  {
    id: 'i6_shallow_copy_nested_mutation',
    title: 'Cyber Profile: Shallow Spread Mutation Bug',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Arrays & Objects',
    story: 'The user profile clone helper uses `{ ...profile }` to clone an account, but updating the nested security permissions mutates the original template user object.',
    bugType: 'Shallow Copying Nested Object Mutation',
    buggyLineHint: 3,
    points: 200,
    timeLimit: 150,
    functionName: 'cloneAndPromoteUser',
    starterCode: `function cloneAndPromoteUser(user) {
  // Bug: shallow copy shares reference to nested permissions object
  const clone = { ...user };
  clone.permissions.role = 'ADMIN';
  return clone.permissions.role;
}`,
    correctCode: `function cloneAndPromoteUser(user) {
  const clone = {
    ...user,
    permissions: { ...user.permissions, role: 'ADMIN' }
  };
  return clone.permissions.role;
}`,
    testCases: [
      { id: 't1', description: 'promotes user without corrupting template', args: [{ name: 'Neo', permissions: { role: 'GUEST', level: 1 } }], expected: 'ADMIN' },
      { id: 't2', description: 'handles member promotion', args: [{ name: 'Trinity', permissions: { role: 'USER', level: 2 } }], expected: 'ADMIN' },
      { id: 't3', description: 'handles already admin', args: [{ name: 'Morpheus', permissions: { role: 'ADMIN', level: 5 } }], expected: 'ADMIN' },
    ],
    hints: [
      'The spread operator `{ ...obj }` only performs a shallow copy.',
      'Nested objects like `permissions` are still copied by reference.',
      'Deeply clone `permissions`: `{ ...user, permissions: { ...user.permissions, role: "ADMIN" } }`.'
    ],
    explanation: {
      summary: 'Spread syntax `{ ...obj }` copies nested objects by reference, not value.',
      rootCause: 'Mutating `clone.permissions.role` mutated the nested object in `user`.',
      fixDetails: 'Created a shallow copy of the nested `permissions` object as well.',
      takeaway: 'Always perform deep copies or spread nested objects when immutability is required.'
    }
  },
  {
    id: 'i7_reduce_empty_initial_value',
    title: 'Transaction Ledger: Reduce Missing Initializer',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Arrays & Objects',
    story: 'The accounting microservice crashes with TypeError: Reduce of empty array with no initial value whenever a new account with zero transactions is processed.',
    bugType: 'Missing Initial Value in Array.prototype.reduce',
    buggyLineHint: 2,
    points: 200,
    timeLimit: 150,
    functionName: 'calculateNetBalance',
    starterCode: `function calculateNetBalance(transactions) {
  // Bug: calling reduce on empty array without initial value throws TypeError
  return transactions.reduce((acc, curr) => acc + curr.amount);
}`,
    correctCode: `function calculateNetBalance(transactions) {
  return transactions.reduce((acc, curr) => acc + curr.amount, 0);
}`,
    testCases: [
      { id: 't1', description: 'sums transaction amounts', args: [[{ amount: 100 }, { amount: -30 }, { amount: 50 }]], expected: 120 },
      { id: 't2', description: 'handles empty transaction list', args: [[]], expected: 0 },
      { id: 't3', description: 'handles single transaction', args: [[{ amount: 75 }]], expected: 75 },
    ],
    hints: [
      'What happens when `transactions` is an empty array `[]`?',
      '`reduce` throws an error if called on an empty array without an initial value.',
      'Pass `0` as the second argument to `reduce`: `transactions.reduce((acc, curr) => acc + curr.amount, 0)`.'
    ],
    explanation: {
      summary: 'Calling Array.prototype.reduce on an empty array without an initial value throws a TypeError.',
      rootCause: 'Missing the initial accumulator value `0`.',
      fixDetails: 'Provided `0` as the second argument to `reduce`.',
      takeaway: 'Always supply an initial value to `reduce` to safely handle empty arrays.'
    }
  },
  {
    id: 'i8_regex_stateful_lastindex',
    title: 'Firewall Filter: Regex Stateful LastIndex',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Strings & Regex',
    story: 'The packet inspector uses a global regex (`/auth/g`) to test incoming routes. Alternating requests fail because global regexes maintain internal `lastIndex` state across `.test()` calls.',
    bugType: 'Global Regex lastIndex Mutation in test()',
    buggyLineHint: 1,
    points: 200,
    timeLimit: 150,
    functionName: 'testAllPackets',
    starterCode: `// Bug: global regex maintains lastIndex across calls!
const AUTH_REGEX = /auth/g;

function testAllPackets(packetUrls) {
  return packetUrls.filter(url => AUTH_REGEX.test(url));
}`,
    correctCode: `function testAllPackets(packetUrls) {
  // Non-global regex or reset lastIndex
  const regex = /auth/;
  return packetUrls.filter(url => regex.test(url));
}`,
    testCases: [
      { id: 't1', description: 'matches consecutive valid auth urls', args: [['/auth/login', '/auth/signup', '/auth/callback']], expected: ['/auth/login', '/auth/signup', '/auth/callback'] },
      { id: 't2', description: 'filters out non-auth urls', args: [['/auth/login', '/home', '/about']], expected: ['/auth/login'] },
      { id: 't3', description: 'handles empty list', args: [[]], expected: [] },
    ],
    hints: [
      'Regular expressions with the `/g` flag are stateful.',
      'Each call to `.test()` advances `lastIndex`.',
      'Remove the `/g` flag or create a local `/auth/` regex inside the function.'
    ],
    explanation: {
      summary: 'RegExp instances with `/g` flag retain their `lastIndex` property across multiple `.test()` calls.',
      rootCause: 'Subsequent calls started searching after the previous match position, causing valid matches to fail.',
      fixDetails: 'Removed `/g` flag so regex is stateless.',
      takeaway: 'Do not use global `/g` flag with `RegExp.prototype.test()`; it causes intermittent stateful bugs.'
    }
  },
  {
    id: 'i9_matrix_transposition_indices',
    title: 'Radar Grid: Matrix Transposition Axis Inversion',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Arrays & Objects',
    story: 'The spatial scanner transposes a 2D matrix of sensor readings, but incorrectly accesses `matrix[i][j]` when assigning `result[i][j]`, resulting in a duplicate instead of a transposed grid.',
    bugType: 'Matrix Index Inversion in Transposition',
    buggyLineHint: 5,
    points: 200,
    timeLimit: 150,
    functionName: 'transposeMatrix',
    starterCode: `function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Bug: assigns matrix[i][j] instead of matrix[i][j] to result[j][i]
      result[i][j] = matrix[i][j];
    }
  }
  return result;
}`,
    correctCode: `function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}`,
    testCases: [
      { id: 't1', description: 'transposes 2x3 matrix', args: [[[1, 2, 3], [4, 5, 6]]], expected: [[1, 4], [2, 5], [3, 6]] },
      { id: 't2', description: 'transposes square 2x2 matrix', args: [[[1, 2], [3, 4]]], expected: [[1, 3], [2, 4]] },
      { id: 't3', description: 'transposes single row', args: [[[1, 2]]], expected: [[1], [2]] },
    ],
    hints: [
      'In a transposed matrix, row `i` and column `j` are swapped.',
      'Check Line 8: `result[i][j] = matrix[i][j]`.',
      'Assign to `result[j][i] = matrix[i][j];`.'
    ],
    explanation: {
      summary: 'Matrix transposition maps cell (i, j) to (j, i).',
      rootCause: 'Indexing was not inverted during assignment.',
      fixDetails: 'Changed target index to `result[j][i]`.',
      takeaway: 'Transposition always exchanges row and column indices: `target[col][row] = source[row][col]`.'
    }
  },
  {
    id: 'i10_anagram_frequency_counter',
    title: 'Cipher Decryption: Anagram Frequency Counter',
    level: 3,
    difficulty: 'Intermediate',
    category: 'Strings & Regex',
    story: 'The decrypter validates whether two intercepted words are anagrams. It tracks character frequencies, but fails when strings have different lengths or negative counts.',
    bugType: 'Missing Length Check in Frequency Counter',
    buggyLineHint: 2,
    points: 200,
    timeLimit: 150,
    functionName: 'areAnagrams',
    starterCode: `function areAnagrams(str1, str2) {
  // Bug: missing early length check allows partial anagram false positives
  const counts = {};
  for (let char of str1) {
    counts[char] = (counts[char] || 0) + 1;
  }
  for (let char of str2) {
    if (!counts[char]) return false;
    counts[char]--;
  }
  return true;
}`,
    correctCode: `function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;
  const counts = {};
  for (let char of str1) {
    counts[char] = (counts[char] || 0) + 1;
  }
  for (let char of str2) {
    if (!counts[char]) return false;
    counts[char]--;
  }
  return true;
}`,
    testCases: [
      { id: 't1', description: 'detects true anagrams', args: ['listen', 'silent'], expected: true },
      { id: 't2', description: 'rejects different length strings', args: ['rail', 'safety'], expected: false },
      { id: 't3', description: 'rejects subset strings', args: ['hello', 'hell'], expected: false },
    ],
    hints: [
      'What happens if `str1` is longer than `str2` (e.g. "hello" vs "hell")?',
      'If lengths differ, they can never be anagrams.',
      'Add `if (str1.length !== str2.length) return false;` at the start.'
    ],
    explanation: {
      summary: 'Anagrams must have identical character frequencies and identical lengths.',
      rootCause: 'Omitting the length check allowed a word that contains all letters of a shorter word to falsely pass.',
      fixDetails: 'Added early return `if (str1.length !== str2.length) return false;`.',
      takeaway: 'Always validate basic dimensional invariants (like string length) before executing frequency counters.'
    }
  },

  // ==========================================
  // LEVEL 4: ADVANCED EXTENSIONS (Ids: a5 to a20)
  // ==========================================
  {
    id: 'a5_binary_search_middle_float',
    title: 'Memory Index: Binary Search Mid Floating Point',
    level: 4,
    difficulty: 'Advanced',
    category: 'Algorithms & Data Structures',
    story: 'The memory address locator performs binary search over a sorted array, but computes `mid = (low + high) / 2` without rounding down, generating fractional array indices and crashing.',
    bugType: 'Missing Math.floor in Binary Search Mid Index',
    buggyLineHint: 5,
    points: 300,
    timeLimit: 180,
    functionName: 'findMemoryAddress',
    starterCode: `function findMemoryAddress(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    // Bug: in JS / returns a float (e.g. 2.5), causing arr[2.5] to be undefined
    let mid = (low + high) / 2;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    correctCode: `function findMemoryAddress(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    testCases: [
      { id: 't1', description: 'finds element in odd array', args: [[10, 20, 30, 40, 50], 40], expected: 3 },
      { id: 't2', description: 'finds element in even array', args: [[2, 4, 6, 8], 2], expected: 0 },
      { id: 't3', description: 'returns -1 for missing element', args: [[1, 3, 5], 99], expected: -1 },
    ],
    hints: [
      'In JavaScript, numbers are double-precision floats; `5 / 2 === 2.5`.',
      '`arr[2.5]` is always `undefined`.',
      'Wrap the calculation with `Math.floor((low + high) / 2)`.'
    ],
    explanation: {
      summary: 'Division in JavaScript does not automatically truncate to integer.',
      rootCause: 'Fractional index `mid` resulted in undefined lookups.',
      fixDetails: 'Used `Math.floor((low + high) / 2)`.',
      takeaway: 'Always use Math.floor() or bitwise truncation (`>> 1`) when calculating array indices.'
    }
  },
  {
    id: 'a6_lru_cache_eviction_tail',
    title: 'Cache Invalidation: LRU Eviction Order Trap',
    level: 4,
    difficulty: 'Advanced',
    category: 'Algorithms & Data Structures',
    story: 'The microsecond API cache implements an LRU (Least Recently Used) cache with Map, but evicts the newest entry instead of the oldest entry when capacity is reached.',
    bugType: 'Inverted LRU Eviction Target',
    buggyLineHint: 10,
    points: 300,
    timeLimit: 180,
    functionName: 'simulateLRUCache',
    starterCode: `function simulateLRUCache(capacity, operations) {
  // operations: array of ['get', key] or ['put', key, val]
  const cache = new Map();
  const results = [];

  for (const op of operations) {
    if (op[0] === 'put') {
      const [, key, val] = op;
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= capacity) {
        // Bug: Array.from(cache.keys()).pop() evicts the MOST recently inserted key!
        const newestKey = Array.from(cache.keys()).pop();
        cache.delete(newestKey);
      }
      cache.set(key, val);
    } else if (op[0] === 'get') {
      const [, key] = op;
      if (!cache.has(key)) {
        results.push(-1);
      } else {
        const val = cache.get(key);
        cache.delete(key);
        cache.set(key, val);
        results.push(val);
      }
    }
  }
  return results;
}`,
    correctCode: `function simulateLRUCache(capacity, operations) {
  const cache = new Map();
  const results = [];

  for (const op of operations) {
    if (op[0] === 'put') {
      const [, key, val] = op;
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= capacity) {
        // The first key in a JavaScript Map iterator is the oldest / least recently used
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }
      cache.set(key, val);
    } else if (op[0] === 'get') {
      const [, key] = op;
      if (!cache.has(key)) {
        results.push(-1);
      } else {
        const val = cache.get(key);
        cache.delete(key);
        cache.set(key, val);
        results.push(val);
      }
    }
  }
  return results;
}`,
    testCases: [
      {
        id: 't1',
        description: 'evicts least recently used on capacity overflow',
        args: [2, [['put', 1, 10], ['put', 2, 20], ['get', 1], ['put', 3, 30], ['get', 2], ['get', 3]]],
        expected: [10, -1, 30]
      },
      {
        id: 't2',
        description: 'basic capacity of 1',
        args: [1, [['put', 'a', 1], ['put', 'b', 2], ['get', 'a'], ['get', 'b']]],
        expected: [-1, 2]
      },
    ],
    hints: [
      'JavaScript `Map` preserves insertion order.',
      'The first key `cache.keys().next().value` is the least recently used.',
      'Replace `.pop()` (which gets the newest) with `cache.keys().next().value`.'
    ],
    explanation: {
      summary: 'In an LRU cache, the oldest key in insertion order must be evicted first.',
      rootCause: '`.pop()` selected the newest element, turning the cache into MRU instead of LRU.',
      fixDetails: 'Evicted `cache.keys().next().value`.',
      takeaway: 'Leverage Map\'s built-in insertion-order iteration for O(1) LRU eviction.'
    }
  },
  {
    id: 'a7_debounce_immediate_trailing_flag',
    title: 'Input Stabilizer: Debounce Trailing Timeout Bug',
    level: 4,
    difficulty: 'Advanced',
    category: 'Asynchronous & Promises',
    story: 'The search input debounce helper fails to execute when immediate is false because the timer callback is cleared before invocation.',
    bugType: 'Incorrect Debounce Timer Clear Mechanism',
    buggyLineHint: 5,
    points: 300,
    timeLimit: 180,
    functionName: 'simulateDebounceCalls',
    starterCode: `function simulateDebounceCalls(timestamps, delay) {
  // Simulates when debounce function would actually invoke
  // timestamps: array of millisecond timestamps when calls occurred
  const executedAt = [];
  let lastCall = -Infinity;
  for (let i = 0; i < timestamps.length; i++) {
    const t = timestamps[i];
    // Bug: invokes on every call if delay passes since START, rather than resetting timer
    if (t - lastCall >= delay) {
      executedAt.push(t + delay);
    }
    lastCall = t;
  }
  return executedAt;
}`,
    correctCode: `function simulateDebounceCalls(timestamps, delay) {
  if (timestamps.length === 0) return [];
  const executedAt = [];
  for (let i = 0; i < timestamps.length; i++) {
    const current = timestamps[i];
    const next = timestamps[i + 1];
    // Debounce triggers if no subsequent call occurs within delay window
    if (next === undefined || next - current >= delay) {
      executedAt.push(current + delay);
    }
  }
  return executedAt;
}`,
    testCases: [
      { id: 't1', description: 'debounces clustered bursts into single execution', args: [[100, 150, 200], 100], expected: [300] },
      { id: 't2', description: 'executes separate calls with large gap', args: [[100, 300, 500], 50], expected: [150, 350, 550] },
      { id: 't3', description: 'handles empty input', args: [[], 100], expected: [] },
    ],
    hints: [
      'Debouncing resets the timer on every keystroke.',
      'The function only executes when no further calls occur within `delay` milliseconds.',
      'Check if `next === undefined || next - current >= delay`.'
    ],
    explanation: {
      summary: 'Debouncing delays execution until a quiet period of `delay` ms passes without another call.',
      rootCause: 'Calls in a rapid burst were being scheduled independently instead of collapsing.',
      fixDetails: 'Ensured execution only occurs at the trailing edge of each burst.',
      takeaway: 'Debounce guarantees only the last call in a burst executes after the cooldown.'
    }
  },
  {
    id: 'a8_linked_list_cycle_hare_step',
    title: 'Network Packet Loop: Tortoise & Hare Step Trap',
    level: 4,
    difficulty: 'Advanced',
    category: 'Algorithms & Data Structures',
    story: 'Floyd\'s cycle-finding algorithm detects infinite loops in packet routing chains. However, both the slow and fast pointers advance by 1 step, so the fast pointer never catches up.',
    bugType: 'Fast Pointer Moving at Slow Pointer Speed',
    buggyLineHint: 5,
    points: 300,
    timeLimit: 180,
    functionName: 'hasRoutingCycle',
    starterCode: `function hasRoutingCycle(nodes) {
  // nodes: array of next pointer indices, e.g. [1, 2, 0] has a cycle
  if (nodes.length === 0) return false;
  let slow = 0;
  let fast = 0;
  while (nodes[fast] !== undefined && nodes[nodes[fast]] !== undefined) {
    // Bug: fast only steps 1 instead of 2!
    slow = nodes[slow];
    fast = nodes[fast];
    if (slow === fast) return true;
  }
  return false;
}`,
    correctCode: `function hasRoutingCycle(nodes) {
  if (nodes.length === 0) return false;
  let slow = 0;
  let fast = 0;
  while (nodes[fast] !== undefined && nodes[nodes[fast]] !== undefined) {
    slow = nodes[slow];
    fast = nodes[nodes[fast]];
    if (slow === fast) return true;
  }
  return false;
}`,
    testCases: [
      { id: 't1', description: 'detects 3-node cycle', args: [[1, 2, 0]], expected: true },
      { id: 't2', description: 'detects acyclic terminating chain', args: [[1, 2, -1]], expected: false },
      { id: 't3', description: 'detects self-loop', args: [[0]], expected: true },
    ],
    hints: [
      'Floyd\'s algorithm relies on pointer speed difference.',
      'The slow pointer moves 1 step; the fast pointer must move 2 steps.',
      'Change `fast = nodes[fast]` to `fast = nodes[nodes[fast]]`.'
    ],
    explanation: {
      summary: 'Floyd\'s cycle-finding algorithm requires the fast pointer to advance at twice the speed of the slow pointer.',
      rootCause: 'Both pointers moved 1 step, preventing the fast pointer from closing the distance.',
      fixDetails: 'Advanced fast pointer by two hops: `fast = nodes[nodes[fast]]`.',
      takeaway: 'Relative velocity in cycle detection ensures convergence in O(N) steps.'
    }
  },

  // ==========================================
  // LEVEL 5: EXPERT & BOSS DAEMONS (Ids: x5 to x15)
  // ==========================================
  {
    id: 'x5_memoize_falsy_cache_hit',
    title: 'Boss Daemon: Zero-Value Cache Invalidation',
    level: 5,
    difficulty: 'Expert',
    category: 'Algorithms & Data Structures',
    story: 'The AI core memoizes expensive game calculations, but whenever a calculation legitimately returns `0` or `false` or `""`, the memoizer evaluates `if (cache[key])` as false and recomputes from scratch.',
    bugType: 'Checking Falsy Value Existence in Cache',
    buggyLineHint: 4,
    points: 400,
    timeLimit: 240,
    functionName: 'memoizedCounter',
    starterCode: `function memoizedCounter(expensiveFn) {
  const cache = {};
  return function(arg) {
    // Bug: if expensiveFn returns 0 or false, cache[arg] is falsy, re-running expensiveFn!
    if (cache[arg]) {
      return cache[arg];
    }
    const result = expensiveFn(arg);
    cache[arg] = result;
    return result;
  };
}`,
    correctCode: `function memoizedCounter(expensiveFn) {
  const cache = {};
  return function(arg) {
    if (Object.prototype.hasOwnProperty.call(cache, arg)) {
      return cache[arg];
    }
    const result = expensiveFn(arg);
    cache[arg] = result;
    return result;
  };
}`,
    testCases: [
      {
        id: 't1',
        description: 'correctly caches zero values without re-running',
        args: [(x: any) => x * 0],
        expected: 0
      },
      {
        id: 't2',
        description: 'correctly caches boolean false',
        args: [(x: any) => x === 'secret'],
        expected: false
      },
    ],
    hints: [
      'What happens when `cache[arg] === 0`?',
      '`if (0)` evaluates to false, causing the memoized function to re-execute.',
      'Check key existence using `Object.prototype.hasOwnProperty.call(cache, arg)` or `arg in cache`.'
    ],
    explanation: {
      summary: 'Checking `if (cache[key])` fails when the cached result is a falsy value (0, false, empty string, null).',
      rootCause: 'Falsy cached return values triggered unnecessary re-execution.',
      fixDetails: 'Used `hasOwnProperty` to check key presence regardless of stored value.',
      takeaway: 'Never use truthiness checks to determine if a map or cache key exists.'
    },
    isBoss: true
  },
  {
    id: 'x6_sql_injection_sanitizer_regex',
    title: 'Boss Daemon: SQL Query Sanitizer Escape Flaw',
    level: 5,
    difficulty: 'Expert',
    category: 'Security & Sanitization',
    story: 'The security gateway sanitizes dynamic SQL inputs by stripping single quotes. However, it fails to handle backslash escapes and double dashes, allowing comment-based injection.',
    bugType: 'Incomplete SQL Quote Sanitization',
    buggyLineHint: 2,
    points: 450,
    timeLimit: 240,
    functionName: 'sanitizeSqlParam',
    starterCode: `function sanitizeSqlParam(input) {
  // Bug: only replaces single quotes once, missing multiple quotes and SQL comments
  return input.replace("'", "\\'");
}`,
    correctCode: `function sanitizeSqlParam(input) {
  return input.replaceAll("'", "''").replaceAll("--", "").replaceAll(";", "");
}`,
    testCases: [
      { id: 't1', description: 'escapes multiple single quotes', args: ["admin' OR '1'='1"], expected: "admin'' OR ''1''=''1" },
      { id: 't2', description: 'strips sql comments', args: ["user'-- comment"], expected: "user'' comment" },
      { id: 't3', description: 'handles safe strings', args: ['johndoe'], expected: 'johndoe' },
    ],
    hints: [
      'Standard SQL escaping doubles single quotes: `\'\'`.',
      '`replace` only replaces the first quote; use `replaceAll`.',
      'Remove `--` comment markers and semicolons `;`.'
    ],
    explanation: {
      summary: 'Incomplete regex replacements leave applications open to SQL injection.',
      rootCause: 'Replacing only the first single quote left subsequent injection payloads active.',
      fixDetails: 'Used `replaceAll` to escape all quotes and strip comment injection syntax.',
      takeaway: 'Use parameterized queries wherever possible; when escaping, cover all metacommands.'
    },
    isBoss: true
  },
  {
    id: 'x7_undo_redo_history_truncation',
    title: 'Boss Daemon: Undo/Redo State Invalidation',
    level: 5,
    difficulty: 'Expert',
    category: 'Algorithms & Data Structures',
    story: 'The mission timeline editor implements Undo and Redo stacks. When a user undoes an action and then makes a NEW change, the redo history should be cleared, but it remains accessible, creating timeline corruption.',
    bugType: 'Missing Redo History Invalidation on New Action',
    buggyLineHint: 9,
    points: 450,
    timeLimit: 240,
    functionName: 'createTimelineEditor',
    starterCode: `function createTimelineEditor() {
  let state = '';
  const undoStack = [];
  const redoStack = [];

  return {
    write(text) {
      undoStack.push(state);
      state = text;
      // Bug: redoStack is not cleared when a new action is performed!
    },
    undo() {
      if (undoStack.length === 0) return state;
      redoStack.push(state);
      state = undoStack.pop();
      return state;
    },
    redo() {
      if (redoStack.length === 0) return state;
      undoStack.push(state);
      state = redoStack.pop();
      return state;
    },
    getState() {
      return state;
    }
  };
}`,
    correctCode: `function createTimelineEditor() {
  let state = '';
  const undoStack = [];
  let redoStack = [];

  return {
    write(text) {
      undoStack.push(state);
      state = text;
      redoStack = [];
    },
    undo() {
      if (undoStack.length === 0) return state;
      redoStack.push(state);
      state = undoStack.pop();
      return state;
    },
    redo() {
      if (redoStack.length === 0) return state;
      undoStack.push(state);
      state = redoStack.pop();
      return state;
    },
    getState() {
      return state;
    }
  };
}`,
    testCases: [
      {
        id: 't1',
        description: 'clears redo stack after new write operation',
        args: [],
        expected: 'C'
      }
    ],
    hints: [
      'When `write()` is called, what should happen to `redoStack`?',
      'Any past redo actions must become invalid after a branch in history.',
      'Set `redoStack.length = 0` or reassign `redoStack = []` inside `write()`.'
    ],
    explanation: {
      summary: 'Performing a new action after undo creates a new timeline branch, invalidating previous redo steps.',
      rootCause: 'The redo stack was preserved across new writes.',
      fixDetails: 'Emptied `redoStack` whenever `write()` is executed.',
      takeaway: 'Always invalidate the future (redo) branch when branching state histories.'
    },
    isBoss: true
  }
];
