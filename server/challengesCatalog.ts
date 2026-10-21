import { Challenge } from '../src/types/game.js';

export const EXTENDED_CHALLENGES: Challenge[] = [
  {
    "id": "b4_string_uppercase_immutable",
    "title": "Access Gate: String Immutability Trap",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Syntax & Variables",
    "story": "The biometric gate scanner attempts to normalize badge codes to uppercase, but strings are immutable in JavaScript so calling toUpperCase without reassigning has no effect.",
    "bugType": "Ignored return value of immutable string method",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "normalizeBadge",
    "starterCode": "function normalizeBadge(badge) {\n  // Bug: toUpperCase() returns a new string; it does not mutate\n  badge.toUpperCase();\n  return badge;\n}",
    "correctCode": "function normalizeBadge(badge) {\n  return badge.toUpperCase();\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "converts lowercase to uppercase",
        "args": [
          "agent007"
        ],
        "expected": "AGENT007"
      },
      {
        "id": "t2",
        "description": "handles mixed case",
        "args": [
          "CyberBot"
        ],
        "expected": "CYBERBOT"
      },
      {
        "id": "t3",
        "description": "preserves uppercase",
        "args": [
          "ROOT"
        ],
        "expected": "ROOT"
      }
    ],
    "hints": [
      "Strings in JavaScript are immutable.",
      "Calling `badge.toUpperCase()` does not change `badge`.",
      "Return `badge.toUpperCase()` directly."
    ],
    "explanation": {
      "summary": "String methods return new strings rather than mutating the original.",
      "rootCause": "The return value of toUpperCase was discarded.",
      "fixDetails": "Returned the result of badge.toUpperCase().",
      "takeaway": "Always capture the return value when manipulating JavaScript strings."
    },
    "isBoss": false
  },
  {
    "id": "b5_parseint_binary_radix",
    "title": "Cyber Deck: Binary Stream Parsing",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Syntax & Variables",
    "story": "The terminal reads raw binary telemetry packets (e.g., '1011'), but parseInt defaults to base 10 unless a radix of 2 is provided.",
    "bugType": "Missing Radix in parseInt",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "parseBinaryPacket",
    "starterCode": "function parseBinaryPacket(binaryStr) {\n  // Bug: defaults to decimal base 10\n  return parseInt(binaryStr);\n}",
    "correctCode": "function parseBinaryPacket(binaryStr) {\n  return parseInt(binaryStr, 2);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "parses binary 1010 to 10",
        "args": [
          "1010"
        ],
        "expected": 10
      },
      {
        "id": "t2",
        "description": "parses binary 1111 to 15",
        "args": [
          "1111"
        ],
        "expected": 15
      },
      {
        "id": "t3",
        "description": "parses binary 10000 to 16",
        "args": [
          "10000"
        ],
        "expected": 16
      }
    ],
    "hints": [
      "`parseInt` accepts a second argument called `radix`.",
      "Binary numbers use base 2.",
      "Use `parseInt(binaryStr, 2)`."
    ],
    "explanation": {
      "summary": "parseInt treats its input as decimal without an explicit radix.",
      "rootCause": "'1010' was parsed as one thousand and ten.",
      "fixDetails": "Passed 2 as the radix parameter.",
      "takeaway": "Always pass the radix parameter when calling parseInt."
    },
    "isBoss": false
  },
  {
    "id": "b6_math_floor_casing",
    "title": "Grid Regulator: Method Casing Typo",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Syntax & Variables",
    "story": "The power grid coordinator tries to round down power units, but crashes with TypeError: Math.Floor is not a function.",
    "bugType": "Standard Library Method Casing Mismatch",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "floorPowerLevel",
    "starterCode": "function floorPowerLevel(val) {\n  // Bug: Floor is capitalized\n  return Math.Floor(val);\n}",
    "correctCode": "function floorPowerLevel(val) {\n  return Math.floor(val);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "floors positive float",
        "args": [
          42.9
        ],
        "expected": 42
      },
      {
        "id": "t2",
        "description": "floors whole number",
        "args": [
          10.0
        ],
        "expected": 10
      },
      {
        "id": "t3",
        "description": "floors negative float",
        "args": [
          -2.5
        ],
        "expected": -3
      }
    ],
    "hints": [
      "JavaScript built-in methods are strictly case-sensitive.",
      "Check `Math.Floor` vs `Math.floor`.",
      "Change `Math.Floor` to lowercase `Math.floor`."
    ],
    "explanation": {
      "summary": "JavaScript built-ins are camelCase or lowercase.",
      "rootCause": "Capitalizing `Floor` caused a property lookup on undefined.",
      "fixDetails": "Lowercased `Math.Floor` to `Math.floor`.",
      "takeaway": "Verify case sensitivity when invoking standard JavaScript APIs."
    },
    "isBoss": false
  },
  {
    "id": "b7_array_push_return",
    "title": "Inventory Cache: Push Return Trap",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Arrays & Objects",
    "story": "The backpack manager tries to append a gadget and return the updated list, but returns the new array length integer instead.",
    "bugType": "Returning Array.prototype.push result",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "addGadgetToPack",
    "starterCode": "function addGadgetToPack(pack, gadget) {\n  // Bug: push returns the new array length, not the array\n  return pack.push(gadget);\n}",
    "correctCode": "function addGadgetToPack(pack, gadget) {\n  pack.push(gadget);\n  return pack;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "appends gadget",
        "args": [
          [
            "compass",
            "torch"
          ],
          "laser"
        ],
        "expected": [
          "compass",
          "torch",
          "laser"
        ]
      },
      {
        "id": "t2",
        "description": "appends to empty list",
        "args": [
          [],
          "keycard"
        ],
        "expected": [
          "keycard"
        ]
      },
      {
        "id": "t3",
        "description": "handles numeric items",
        "args": [
          [
            1,
            2
          ],
          3
        ],
        "expected": [
          1,
          2,
          3
        ]
      }
    ],
    "hints": [
      "`Array.prototype.push` returns the new length of the array.",
      "Push the item first, then return `pack`.",
      "Change to `pack.push(gadget); return pack;`."
    ],
    "explanation": {
      "summary": "push() mutates the array and returns the length number.",
      "rootCause": "Returning the result of push returned a number instead of the array.",
      "fixDetails": "Pushed the item and returned pack explicitly.",
      "takeaway": "Be mindful of methods that mutate and return lengths vs those that return the array."
    },
    "isBoss": false
  },
  {
    "id": "b8_template_literal_backticks",
    "title": "Alert Dispatcher: Static Quotes in Template",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Syntax & Variables",
    "story": "The console alert shows raw '${code}' instead of the dynamically injected error code because single quotes were used instead of template backticks.",
    "bugType": "Single Quotes in Template Literal",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "formatAlertMessage",
    "starterCode": "function formatAlertMessage(code) {\n  // Bug: single quotes do not interpolate expressions\n  return 'System Alert Code: ${code}';\n}",
    "correctCode": "function formatAlertMessage(code) {\n  return `System Alert Code: ${code}`;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "formats error 404",
        "args": [
          "ERR_404"
        ],
        "expected": "System Alert Code: ERR_404"
      },
      {
        "id": "t2",
        "description": "formats numeric code",
        "args": [
          500
        ],
        "expected": "System Alert Code: 500"
      },
      {
        "id": "t3",
        "description": "formats empty code",
        "args": [
          ""
        ],
        "expected": "System Alert Code: "
      }
    ],
    "hints": [
      "String interpolation requires backtick characters (` `).",
      "Single quotes treat `${code}` literally.",
      "Use backticks around the template string."
    ],
    "explanation": {
      "summary": "Expression interpolation is only supported inside template literals delimited by backticks.",
      "rootCause": "Single quotes prevented interpolation.",
      "fixDetails": "Replaced quotes with backticks.",
      "takeaway": "Always enclose interpolated strings in backticks."
    },
    "isBoss": false
  },
  {
    "id": "b9_string_replace_global",
    "title": "Data Sanitizer: Single Replace Delimiter",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Strings & Regex",
    "story": "The log formatter replaces hyphens with slashes, but only modifies the first hyphen encountered, producing '2026/10-15'.",
    "bugType": "Single Match String Replace",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "replaceHyphensWithSlashes",
    "starterCode": "function replaceHyphensWithSlashes(str) {\n  // Bug: string.replace only replaces the first match\n  return str.replace('-', '/');\n}",
    "correctCode": "function replaceHyphensWithSlashes(str) {\n  return str.replaceAll('-', '/');\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "replaces both hyphens in date",
        "args": [
          "2026-10-15"
        ],
        "expected": "2026/10/15"
      },
      {
        "id": "t2",
        "description": "replaces multiple dashes",
        "args": [
          "a-b-c-d"
        ],
        "expected": "a/b/c/d"
      },
      {
        "id": "t3",
        "description": "handles no hyphens",
        "args": [
          "nodash"
        ],
        "expected": "nodash"
      }
    ],
    "hints": [
      "`str.replace(str, newStr)` only matches once.",
      "Use `replaceAll` or a global regex `/-/g`.",
      "Change `replace` to `replaceAll`."
    ],
    "explanation": {
      "summary": "String.prototype.replace with a string parameter replaces only the first occurrence.",
      "rootCause": "Subsequent hyphens were ignored.",
      "fixDetails": "Swapped replace for replaceAll.",
      "takeaway": "Use replaceAll when replacing all occurrences of a substring."
    },
    "isBoss": false
  },
  {
    "id": "b10_zero_index_loop",
    "title": "Sensor Array: 1-Based Indexing Bug",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Loops & Functions",
    "story": "The atmospheric barometer sums up sensor readings, but skips reading #0 because its loop counter initializes at 1.",
    "bugType": "Off-By-One Starting Index",
    "buggyLineHint": 3,
    "points": 100,
    "timeLimit": 90,
    "functionName": "sumBarometerReadings",
    "starterCode": "function sumBarometerReadings(readings) {\n  let total = 0;\n  // Bug: loop starts at 1, omitting readings[0]\n  for (let i = 1; i < readings.length; i++) {\n    total += readings[i];\n  }\n  return total;\n}",
    "correctCode": "function sumBarometerReadings(readings) {\n  let total = 0;\n  for (let i = 0; i < readings.length; i++) {\n    total += readings[i];\n  }\n  return total;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "sums 3 numbers",
        "args": [
          [
            10,
            20,
            30
          ]
        ],
        "expected": 60
      },
      {
        "id": "t2",
        "description": "sums single number",
        "args": [
          [
            45
          ]
        ],
        "expected": 45
      },
      {
        "id": "t3",
        "description": "handles empty array",
        "args": [
          []
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Arrays in JavaScript start at index 0.",
      "The first element is at `readings[0]`.",
      "Change `let i = 1;` to `let i = 0;`."
    ],
    "explanation": {
      "summary": "JavaScript arrays are zero-indexed.",
      "rootCause": "Initial loop counter i=1 omitted the first element.",
      "fixDetails": "Initialized loop index at 0.",
      "takeaway": "Always start standard array iteration at 0."
    },
    "isBoss": false
  },
  {
    "id": "b11_dynamic_prop_lookup",
    "title": "Config Reader: Dot vs Bracket Notation",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Arrays & Objects",
    "story": "The player configuration manager attempts to access dynamic keys like 'theme' or 'volume', but uses dot notation `config.propKey`, looking for a literal property called 'propKey'.",
    "bugType": "Dot Notation on Dynamic Variable",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "readConfigKey",
    "starterCode": "function readConfigKey(config, propKey) {\n  // Bug: looks up literal key 'propKey' instead of variable propKey\n  return config.propKey;\n}",
    "correctCode": "function readConfigKey(config, propKey) {\n  return config[propKey];\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "reads sound volume",
        "args": [
          {
            "volume": 85,
            "theme": "matrix"
          },
          "volume"
        ],
        "expected": 85
      },
      {
        "id": "t2",
        "description": "reads theme",
        "args": [
          {
            "volume": 85,
            "theme": "matrix"
          },
          "theme"
        ],
        "expected": "matrix"
      },
      {
        "id": "t3",
        "description": "reads second property",
        "args": [
          {
            "a": 1,
            "b": 99
          },
          "b"
        ],
        "expected": 99
      }
    ],
    "hints": [
      "Dot notation `obj.prop` looks for the literal identifier `prop`.",
      "Bracket notation `obj[prop]` evaluates the expression in brackets.",
      "Change `config.propKey` to `config[propKey]`."
    ],
    "explanation": {
      "summary": "Bracket notation is required when property names are stored in variables.",
      "rootCause": "config.propKey searched for a property named 'propKey'.",
      "fixDetails": "Changed to bracket lookup config[propKey].",
      "takeaway": "Use brackets for dynamic property access."
    },
    "isBoss": false
  },
  {
    "id": "b12_string_numeric_plus",
    "title": "Coin Converter: String Addition Concatenation",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Syntax & Variables",
    "story": "The treasury ledger receives coin reward values from an input string, but '25' + '50' evaluates to '2550' instead of 75.",
    "bugType": "String Concatenation with Plus Operator",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "addCoinRewards",
    "starterCode": "function addCoinRewards(amountA, amountB) {\n  // Bug: performs string concatenation if inputs are strings\n  return amountA + amountB;\n}",
    "correctCode": "function addCoinRewards(amountA, amountB) {\n  return Number(amountA) + Number(amountB);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "adds string amounts",
        "args": [
          "25",
          "50"
        ],
        "expected": 75
      },
      {
        "id": "t2",
        "description": "adds pure numbers",
        "args": [
          10,
          20
        ],
        "expected": 30
      },
      {
        "id": "t3",
        "description": "handles zero string",
        "args": [
          "0",
          "99"
        ],
        "expected": 99
      }
    ],
    "hints": [
      "The `+` operator concatenates if either operand is a string.",
      "Convert both arguments to numbers before adding.",
      "Use `Number(amountA) + Number(amountB)`."
    ],
    "explanation": {
      "summary": "In JavaScript, + performs concatenation whenever one operand is a string.",
      "rootCause": "Lack of numeric coercion led to string concatenation.",
      "fixDetails": "Wrapped both operands in Number().",
      "takeaway": "Always coerce input strings to numbers before arithmetic operations."
    },
    "isBoss": false
  },
  {
    "id": "b13_queue_assignment_in_if",
    "title": "Buffer Check: Assignment Instead of Comparison",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Conditionals & Logic",
    "story": "The communication buffer validator tries to verify if a queue is empty, but uses a single `=` which truncates the array length to 0.",
    "bugType": "Single Assignment Operator in Condition",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "isBufferCleared",
    "starterCode": "function isBufferCleared(buffer) {\n  // Bug: single equals assigns 0 to length!\n  if (buffer.length = 0) {\n    return true;\n  }\n  return false;\n}",
    "correctCode": "function isBufferCleared(buffer) {\n  return buffer.length === 0;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "empty buffer returns true",
        "args": [
          []
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "buffer with elements returns false",
        "args": [
          [
            "ping",
            "ack"
          ]
        ],
        "expected": false
      },
      {
        "id": "t3",
        "description": "single element buffer returns false",
        "args": [
          [
            "sync"
          ]
        ],
        "expected": false
      }
    ],
    "hints": [
      "Check `buffer.length = 0`.",
      "`=` assigns, while `===` compares.",
      "Change to `buffer.length === 0`."
    ],
    "explanation": {
      "summary": "Single `=` is assignment; triple `===` is strict equality.",
      "rootCause": "Assigning 0 to length emptied the array and evaluated to falsy 0.",
      "fixDetails": "Replaced assignment with strict comparison.",
      "takeaway": "Never use single equals in conditionals."
    },
    "isBoss": false
  },
  {
    "id": "b14_const_reassignment",
    "title": "Telemetry Counter: Const Reassignment",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Syntax & Variables",
    "story": "The signal counter crashes with TypeError: Assignment to constant variable when counting active transmitters.",
    "bugType": "Const Variable Reassignment in Loop",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "countActiveNodes",
    "starterCode": "function countActiveNodes(nodes) {\n  // Bug: const cannot be incremented\n  const activeCount = 0;\n  for (let i = 0; i < nodes.length; i++) {\n    if (nodes[i].active) {\n      activeCount++;\n    }\n  }\n  return activeCount;\n}",
    "correctCode": "function countActiveNodes(nodes) {\n  let activeCount = 0;\n  for (let i = 0; i < nodes.length; i++) {\n    if (nodes[i].active) {\n      activeCount++;\n    }\n  }\n  return activeCount;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "counts active nodes",
        "args": [
          [
            {
              "active": true
            },
            {
              "active": false
            },
            {
              "active": true
            }
          ]
        ],
        "expected": 2
      },
      {
        "id": "t2",
        "description": "zero active nodes",
        "args": [
          [
            {
              "active": false
            }
          ]
        ],
        "expected": 0
      },
      {
        "id": "t3",
        "description": "empty list",
        "args": [
          []
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Variables declared with `const` cannot be reassigned.",
      "Use `let` for variables that increment.",
      "Change `const activeCount = 0;` to `let activeCount = 0;`."
    ],
    "explanation": {
      "summary": "const prevents variable reassignment.",
      "rootCause": "activeCount++ reassigns activeCount.",
      "fixDetails": "Changed const declaration to let.",
      "takeaway": "Use let for accumulators and counters."
    },
    "isBoss": false
  },
  {
    "id": "b15_math_max_spread",
    "title": "Waveform Analyzer: Math.max Array Argument",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Syntax & Variables",
    "story": "The oscilloscope passes an array directly into Math.max, resulting in NaN because Math.max expects individual numeric arguments.",
    "bugType": "Passing Array directly to Math.max",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "getMaxSignalPeak",
    "starterCode": "function getMaxSignalPeak(signals) {\n  // Bug: Math.max([1, 2, 3]) returns NaN\n  return Math.max(signals);\n}",
    "correctCode": "function getMaxSignalPeak(signals) {\n  return Math.max(...signals);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "finds peak in positive list",
        "args": [
          [
            14,
            92,
            45
          ]
        ],
        "expected": 92
      },
      {
        "id": "t2",
        "description": "finds peak in negative list",
        "args": [
          [
            -100,
            -35,
            -78
          ]
        ],
        "expected": -35
      },
      {
        "id": "t3",
        "description": "handles single item",
        "args": [
          [
            42
          ]
        ],
        "expected": 42
      }
    ],
    "hints": [
      "`Math.max` takes comma-separated numbers, not an array.",
      "Use the spread operator `...`.",
      "Return `Math.max(...signals)`."
    ],
    "explanation": {
      "summary": "Math.max expects numbers as arguments; passing an array yields NaN.",
      "rootCause": "The array was passed as a single argument without spreading.",
      "fixDetails": "Spread the array elements using `...signals`.",
      "takeaway": "Always spread arrays when calling Math.max or Math.min."
    },
    "isBoss": false
  },
  {
    "id": "b16_string_trim_spaces",
    "title": "Gatekeeper: Untrimmed Passcode Whitespace",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Strings & Regex",
    "story": "Authorized engineers are locked out of the mainframe because accidental leading or trailing spaces in the passcode field cause exact equality to fail.",
    "bugType": "Missing String Trim",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "verifyPasscode",
    "starterCode": "function verifyPasscode(entered, correctCode) {\n  // Bug: untrimmed whitespace fails exact comparison\n  return entered === correctCode;\n}",
    "correctCode": "function verifyPasscode(entered, correctCode) {\n  return entered.trim() === correctCode;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "matches code with spaces",
        "args": [
          "  CYBER_PASS  ",
          "CYBER_PASS"
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "matches clean code",
        "args": [
          "CYBER_PASS",
          "CYBER_PASS"
        ],
        "expected": true
      },
      {
        "id": "t3",
        "description": "rejects wrong code",
        "args": [
          "WRONG",
          "CYBER_PASS"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Call `.trim()` on the entered passcode string.",
      "Whitespace creates mismatched character codes.",
      "Change to `entered.trim() === correctCode`."
    ],
    "explanation": {
      "summary": "Trailing spaces and newlines prevent exact string matches.",
      "rootCause": "User input contained unstripped whitespace.",
      "fixDetails": "Added entered.trim() before comparison.",
      "takeaway": "Always trim input strings before checking security credentials."
    },
    "isBoss": false
  },
  {
    "id": "b17_array_filter_return",
    "title": "Threat Filter: Missing Filter Predicate Return",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Arrays & Objects",
    "story": "The firewall packet screener filters out packets, but returns an empty array because its callback function body has no return statement.",
    "bugType": "Missing Return in Callback Body",
    "buggyLineHint": 3,
    "points": 100,
    "timeLimit": 90,
    "functionName": "filterSecurePackets",
    "starterCode": "function filterSecurePackets(packets) {\n  return packets.filter(pkt => {\n    // Bug: block body with curly braces requires explicit return\n    pkt.secure === true;\n  });\n}",
    "correctCode": "function filterSecurePackets(packets) {\n  return packets.filter(pkt => {\n    return pkt.secure === true;\n  });\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "filters secure packets",
        "args": [
          [
            {
              "id": 1,
              "secure": true
            },
            {
              "id": 2,
              "secure": false
            }
          ]
        ],
        "expected": [
          {
            "id": 1,
            "secure": true
          }
        ]
      },
      {
        "id": "t2",
        "description": "returns empty when none secure",
        "args": [
          [
            {
              "id": 1,
              "secure": false
            }
          ]
        ],
        "expected": []
      },
      {
        "id": "t3",
        "description": "handles empty array",
        "args": [
          []
        ],
        "expected": []
      }
    ],
    "hints": [
      "Arrow functions with `{ ... }` do not implicitly return values.",
      "Add an explicit `return` keyword.",
      "Write `return pkt.secure === true;`."
    ],
    "explanation": {
      "summary": "Curly brace arrow functions require explicit return statements.",
      "rootCause": "Returning undefined inside filter drops all elements.",
      "fixDetails": "Added explicit return keyword.",
      "takeaway": "Either use concise expression body or include explicit return."
    },
    "isBoss": false
  },
  {
    "id": "b18_strict_equality_null_undefined",
    "title": "Health Check: Strict Null vs Undefined",
    "level": 1,
    "difficulty": "Beginner",
    "category": "Conditionals & Logic",
    "story": "The diagnostic engine checks if status is missing using `status === null`, but uninitialized sensors have status `undefined`.",
    "bugType": "Strict Null Check Failing on Undefined",
    "buggyLineHint": 2,
    "points": 100,
    "timeLimit": 90,
    "functionName": "isSensorMissing",
    "starterCode": "function isSensorMissing(sensorStatus) {\n  // Bug: strict === null does not catch undefined\n  return sensorStatus === null;\n}",
    "correctCode": "function isSensorMissing(sensorStatus) {\n  return sensorStatus == null;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "detects null",
        "args": [
          null
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "detects undefined",
        "args": [
          null
        ],
        "expected": true
      },
      {
        "id": "t3",
        "description": "returns false for active status string",
        "args": [
          "ONLINE"
        ],
        "expected": false
      }
    ],
    "hints": [
      "In JavaScript, `null == undefined` is true (loose equality).",
      "Or use `sensorStatus === null || sensorStatus === undefined`.",
      "Use `sensorStatus == null`."
    ],
    "explanation": {
      "summary": "sensorStatus === null ignores undefined uninitialized values.",
      "rootCause": "Strict equality does not match undefined with null.",
      "fixDetails": "Used loose equality `== null` to catch both.",
      "takeaway": "Use `val == null` to concisely check for both null and undefined."
    },
    "isBoss": false
  },
  {
    "id": "e7_switch_break_fallthrough",
    "title": "Reactor Valve: Switch Case Fallthrough",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Conditionals & Logic",
    "story": "The cooling valve sets low pressure in emergency mode, but because `break;` is missing, it falls through to the high pressure case.",
    "bugType": "Missing Switch Break Statement",
    "buggyLineHint": 5,
    "points": 150,
    "timeLimit": 120,
    "functionName": "getValveFlow",
    "starterCode": "function getValveFlow(mode) {\n  let flow = 'OFFLINE';\n  switch (mode) {\n    case 'LOW':\n      flow = 'FLOW_LOW';\n      // Bug: missing break\n    case 'HIGH':\n      flow = 'FLOW_HIGH';\n      break;\n    default:\n      flow = 'FLOW_NORMAL';\n  }\n  return flow;\n}",
    "correctCode": "function getValveFlow(mode) {\n  let flow = 'OFFLINE';\n  switch (mode) {\n    case 'LOW':\n      flow = 'FLOW_LOW';\n      break;\n    case 'HIGH':\n      flow = 'FLOW_HIGH';\n      break;\n    default:\n      flow = 'FLOW_NORMAL';\n  }\n  return flow;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "handles LOW mode correctly",
        "args": [
          "LOW"
        ],
        "expected": "FLOW_LOW"
      },
      {
        "id": "t2",
        "description": "handles HIGH mode correctly",
        "args": [
          "HIGH"
        ],
        "expected": "FLOW_HIGH"
      },
      {
        "id": "t3",
        "description": "handles default",
        "args": [
          "OTHER"
        ],
        "expected": "FLOW_NORMAL"
      }
    ],
    "hints": [
      "Without `break;`, JavaScript switch statements fall through.",
      "Notice what happens when `mode === 'LOW'`.",
      "Add `break;` after `flow = 'FLOW_LOW';`."
    ],
    "explanation": {
      "summary": "Switch cases fall through into subsequent cases unless broken.",
      "rootCause": "Missing break caused LOW to overwrite flow with HIGH.",
      "fixDetails": "Added break statement.",
      "takeaway": "Always terminate switch branches with break or return."
    },
    "isBoss": false
  },
  {
    "id": "e8_nullish_coalescing_zero",
    "title": "Audio Synthesizer: Volume Zero Trap",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Conditionals & Logic",
    "story": "When setting volume to 0 (mute), the synthesizer defaults to 50 because `||` treats numeric 0 as falsy.",
    "bugType": "Logical OR instead of Nullish Coalescing",
    "buggyLineHint": 3,
    "points": 150,
    "timeLimit": 120,
    "functionName": "resolveVolume",
    "starterCode": "function resolveVolume(userVolume) {\n  // Bug: 0 is falsy, 0 || 50 evaluates to 50\n  return userVolume || 50;\n}",
    "correctCode": "function resolveVolume(userVolume) {\n  return userVolume ?? 50;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "preserves zero volume",
        "args": [
          0
        ],
        "expected": 0
      },
      {
        "id": "t2",
        "description": "uses custom volume",
        "args": [
          80
        ],
        "expected": 80
      },
      {
        "id": "t3",
        "description": "defaults on null/undefined",
        "args": [
          null
        ],
        "expected": 50
      }
    ],
    "hints": [
      "The number `0` is falsy in JavaScript.",
      "`0 || 50` returns `50`.",
      "Use the nullish coalescing operator `??`."
    ],
    "explanation": {
      "summary": "Logical OR overrides valid 0 with the fallback default.",
      "rootCause": "Coercion of 0 to falsy.",
      "fixDetails": "Replaced || with ??.",
      "takeaway": "Use ?? when 0 or false are valid inputs."
    },
    "isBoss": false
  },
  {
    "id": "e9_array_slice_vs_splice",
    "title": "Audit Vault: Splice In-Place Mutation",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The transaction inspector extracts the first two records for preview, but `splice` mutates the input array and removes items permanently.",
    "bugType": "Array.prototype.splice Mutating Original Array",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "peekTransactions",
    "starterCode": "function peekTransactions(txList) {\n  // Bug: splice mutates txList in place\n  return txList.splice(0, 2);\n}",
    "correctCode": "function peekTransactions(txList) {\n  return txList.slice(0, 2);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "peeks first two records",
        "args": [
          [
            "tx1",
            "tx2",
            "tx3",
            "tx4"
          ]
        ],
        "expected": [
          "tx1",
          "tx2"
        ]
      },
      {
        "id": "t2",
        "description": "handles small array",
        "args": [
          [
            "txA"
          ]
        ],
        "expected": [
          "txA"
        ]
      },
      {
        "id": "t3",
        "description": "handles empty array",
        "args": [
          []
        ],
        "expected": []
      }
    ],
    "hints": [
      "`splice` mutates the array; `slice` creates a copy.",
      "Replace `splice` with `slice`.",
      "Return `txList.slice(0, 2)`."
    ],
    "explanation": {
      "summary": "splice modifies arrays in-place while slice is pure.",
      "rootCause": "Mutating caller data causes downstream corruption.",
      "fixDetails": "Replaced splice with slice.",
      "takeaway": "Use slice for non-destructive sub-array slicing."
    },
    "isBoss": false
  },
  {
    "id": "e10_array_includes_object_ref",
    "title": "Clearance Gate: Object Reference Includes",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The access system tests if a badge is authorized via `badgeList.includes({ id })`, which always returns false due to object reference inequality.",
    "bugType": "Object Reference Mismatch in includes()",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "isBadgeValid",
    "starterCode": "function isBadgeValid(badgeList, targetId) {\n  // Bug: new object reference is never === existing object\n  return badgeList.includes({ id: targetId });\n}",
    "correctCode": "function isBadgeValid(badgeList, targetId) {\n  return badgeList.some(b => b.id === targetId);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "finds authorized badge",
        "args": [
          [
            {
              "id": "SEC_1"
            },
            {
              "id": "SEC_2"
            }
          ],
          "SEC_2"
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "returns false for missing badge",
        "args": [
          [
            {
              "id": "SEC_1"
            }
          ],
          "SEC_9"
        ],
        "expected": false
      },
      {
        "id": "t3",
        "description": "handles empty list",
        "args": [
          [],
          "SEC_1"
        ],
        "expected": false
      }
    ],
    "hints": [
      "`includes` compares objects with `===` (reference equality).",
      "Two objects with matching keys have different memory addresses.",
      "Use `badgeList.some(b => b.id === targetId)`."
    ],
    "explanation": {
      "summary": "Array.includes cannot match objects by property values.",
      "rootCause": "New object reference did not match array object reference.",
      "fixDetails": "Swapped includes with some checking the id property.",
      "takeaway": "Use some() or find() when matching objects in arrays."
    },
    "isBoss": false
  },
  {
    "id": "e11_numeric_sort_comparator",
    "title": "Leaderboard: Lexicographical Sort Trap",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "High scores are sorted, but 100 appears before 20 because default sort converts numbers to strings.",
    "bugType": "Missing Numeric Sort Comparator",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "rankScoresAscending",
    "starterCode": "function rankScoresAscending(scores) {\n  // Bug: default sort() sorts alphabetically: [1, 100, 20]\n  return scores.sort();\n}",
    "correctCode": "function rankScoresAscending(scores) {\n  return [...scores].sort((a, b) => a - b);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "sorts numbers numerically",
        "args": [
          [
            100,
            20,
            5,
            1
          ]
        ],
        "expected": [
          1,
          5,
          20,
          100
        ]
      },
      {
        "id": "t2",
        "description": "sorts negative numbers",
        "args": [
          [
            10,
            -5,
            0,
            3
          ]
        ],
        "expected": [
          -5,
          0,
          3,
          10
        ]
      },
      {
        "id": "t3",
        "description": "handles single item",
        "args": [
          [
            42
          ]
        ],
        "expected": [
          42
        ]
      }
    ],
    "hints": [
      "Default `.sort()` sorts alphabetically.",
      "Provide a comparator `(a, b) => a - b`.",
      "Use `[...scores].sort((a, b) => a - b)`."
    ],
    "explanation": {
      "summary": "Array.sort() without comparator sorts as UTF-16 strings.",
      "rootCause": "\"100\" is lexicographically smaller than \"20\".",
      "fixDetails": "Provided numeric comparator callback.",
      "takeaway": "Always pass a comparator to sort() when ordering numbers."
    },
    "isBoss": false
  },
  {
    "id": "e12_negative_modulo_wrap",
    "title": "Navigation Compass: Negative Modulo Wrap",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Conditionals & Logic",
    "story": "The aircraft compass rotates left into negative degrees, but JavaScript `%` returns negative numbers instead of positive modulo.",
    "bugType": "Negative Remainder vs Mathematical Modulo",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "wrapCompassAngle",
    "starterCode": "function wrapCompassAngle(deg) {\n  // Bug: in JS, -45 % 360 is -45\n  return deg % 360;\n}",
    "correctCode": "function wrapCompassAngle(deg) {\n  return ((deg % 360) + 360) % 360;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "wraps negative angle",
        "args": [
          -45
        ],
        "expected": 315
      },
      {
        "id": "t2",
        "description": "wraps positive overflow",
        "args": [
          400
        ],
        "expected": 40
      },
      {
        "id": "t3",
        "description": "handles 0",
        "args": [
          0
        ],
        "expected": 0
      }
    ],
    "hints": [
      "In JS `%` is the remainder operator, not mathematical modulo.",
      "Negative dividends yield negative remainders.",
      "Use `((deg % 360) + 360) % 360`."
    ],
    "explanation": {
      "summary": "JavaScript % computes remainders that preserve sign.",
      "rootCause": "Negative angles remained negative.",
      "fixDetails": "Applied positive modulo formula.",
      "takeaway": "Use ((x % m) + m) % m for circular positive indexing."
    },
    "isBoss": false
  },
  {
    "id": "e13_nan_equality_trap",
    "title": "Data Scrubbing: Direct NaN Comparison",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Conditionals & Logic",
    "story": "Corrupted sensor data is flagged via `Number(str) === NaN`, which always returns false because NaN never equals itself.",
    "bugType": "Direct Equality Check on NaN",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "isSignalCorrupted",
    "starterCode": "function isSignalCorrupted(str) {\n  // Bug: Number(str) === NaN is always false\n  return Number(str) === NaN;\n}",
    "correctCode": "function isSignalCorrupted(str) {\n  return Number.isNaN(Number(str));\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "detects non-numeric string as NaN",
        "args": [
          "CORRUPTED_HEX"
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "valid zero returns false",
        "args": [
          "0"
        ],
        "expected": false
      },
      {
        "id": "t3",
        "description": "valid float string returns false",
        "args": [
          "4.2"
        ],
        "expected": false
      }
    ],
    "hints": [
      "`Number(str) === NaN` is always false.",
      "Use `Number.isNaN(Number(str))`.",
      "Return `Number.isNaN(Number(str))`."
    ],
    "explanation": {
      "summary": "NaN is not equal to any value, including itself.",
      "rootCause": "Strict equality comparison with NaN always fails.",
      "fixDetails": "Used Number.isNaN().",
      "takeaway": "Always use Number.isNaN() to test for NaN."
    },
    "isBoss": false
  },
  {
    "id": "e14_object_keys_length",
    "title": "Payload Validator: Object Length Check",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The microservice checks if an options dictionary is empty via `options.length === 0`, but plain objects do not have a `.length` property.",
    "bugType": "Object.prototype Missing Length Property",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "isPayloadEmpty",
    "starterCode": "function isPayloadEmpty(payload) {\n  // Bug: plain objects have no .length property\n  return payload.length === 0;\n}",
    "correctCode": "function isPayloadEmpty(payload) {\n  return Object.keys(payload).length === 0;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "empty object returns true",
        "args": [
          {}
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "populated object returns false",
        "args": [
          {
            "key": "val"
          }
        ],
        "expected": false
      },
      {
        "id": "t3",
        "description": "multiple keys returns false",
        "args": [
          {
            "a": 1,
            "b": 2
          }
        ],
        "expected": false
      }
    ],
    "hints": [
      "Plain objects `{}` do not have a `.length` property.",
      "Use `Object.keys(payload).length === 0`.",
      "Change to `Object.keys(payload).length === 0`."
    ],
    "explanation": {
      "summary": "Plain JavaScript objects do not define a length property.",
      "rootCause": "payload.length evaluates to undefined, so undefined === 0 is false.",
      "fixDetails": "Checked length of Object.keys(payload).",
      "takeaway": "Use Object.keys() to measure property count on objects."
    },
    "isBoss": false
  },
  {
    "id": "e15_array_flat_depth",
    "title": "Folder Flattener: Array.flat Depth Trap",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The directory flattener calls `arr.flat()` on a 3-level deep nested folder structure, but flat defaults to depth 1.",
    "bugType": "Default Depth in Array.prototype.flat",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "flattenAllFiles",
    "starterCode": "function flattenAllFiles(folders) {\n  // Bug: flat() defaults to depth 1\n  return folders.flat();\n}",
    "correctCode": "function flattenAllFiles(folders) {\n  return folders.flat(Infinity);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "flattens 3-level deep array",
        "args": [
          [
            [
              "f1",
              [
                "f2",
                [
                  "f3"
                ]
              ]
            ]
          ]
        ],
        "expected": [
          "f1",
          "f2",
          "f3"
        ]
      },
      {
        "id": "t2",
        "description": "flattens 2-level array",
        "args": [
          [
            [
              "a"
            ],
            [
              "b",
              [
                "c"
              ]
            ]
          ]
        ],
        "expected": [
          "a",
          "b",
          "c"
        ]
      },
      {
        "id": "t3",
        "description": "handles flat array",
        "args": [
          [
            "x",
            "y"
          ]
        ],
        "expected": [
          "x",
          "y"
        ]
      }
    ],
    "hints": [
      "`Array.prototype.flat()` only flattens one level by default.",
      "Pass `Infinity` to recursively flatten all levels.",
      "Use `folders.flat(Infinity)`."
    ],
    "explanation": {
      "summary": "Array.flat() requires an explicit depth argument to flatten deep trees.",
      "rootCause": "Default depth 1 left inner arrays nested.",
      "fixDetails": "Passed Infinity to flat().",
      "takeaway": "Use flat(Infinity) for full recursive array flattening."
    },
    "isBoss": false
  },
  {
    "id": "e16_string_split_whitespace",
    "title": "Command Parser: Split Delimiter Whitespace",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Strings & Regex",
    "story": "The CLI command executor splits comma-delimited arguments, but leaves whitespace attached to tokens ('arg1, arg2' becomes ['arg1', ' arg2']).",
    "bugType": "Missing Trim After String Split",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "parseCommaTokens",
    "starterCode": "function parseCommaTokens(raw) {\n  // Bug: leaves leading/trailing whitespace on elements\n  return raw.split(',');\n}",
    "correctCode": "function parseCommaTokens(raw) {\n  return raw.split(',').map(s => s.trim()).filter(Boolean);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "parses and trims spaced tokens",
        "args": [
          "apple, banana, cherry"
        ],
        "expected": [
          "apple",
          "banana",
          "cherry"
        ]
      },
      {
        "id": "t2",
        "description": "cleans extra spaces",
        "args": [
          "one,  two , three "
        ],
        "expected": [
          "one",
          "two",
          "three"
        ]
      },
      {
        "id": "t3",
        "description": "handles single item",
        "args": [
          " solitary "
        ],
        "expected": [
          "solitary"
        ]
      }
    ],
    "hints": [
      "Splitting by `','` keeps spaces in tokens.",
      "Map over the results and call `.trim()` on each.",
      "Use `raw.split(',').map(s => s.trim()).filter(Boolean)`."
    ],
    "explanation": {
      "summary": "Splitting by character preserves adjacent whitespace.",
      "rootCause": "Tokens retained leading spaces.",
      "fixDetails": "Mapped with .trim() and filtered empty tokens.",
      "takeaway": "Always trim tokens after splitting user inputs."
    },
    "isBoss": false
  },
  {
    "id": "e17_boolean_filter_falsy",
    "title": "Telemetry Filter: Falsy Value Stripping",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Conditionals & Logic",
    "story": "The sensor cleaner removes invalid measurements using `.filter(Boolean)`, but valid readings of 0 degrees are inadvertently purged.",
    "bugType": "Filter Boolean Removing Valid Zero",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "cleanTemperatureReadings",
    "starterCode": "function cleanTemperatureReadings(readings) {\n  // Bug: 0 is falsy, so 0 is removed!\n  return readings.filter(Boolean);\n}",
    "correctCode": "function cleanTemperatureReadings(readings) {\n  return readings.filter(v => v !== null && v !== undefined && !Number.isNaN(v));\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "preserves zero temperature",
        "args": [
          [
            15,
            0,
            -5,
            null
          ]
        ],
        "expected": [
          15,
          0,
          -5
        ]
      },
      {
        "id": "t2",
        "description": "removes undefined and NaN",
        "args": [
          [
            0,
            null,
            NaN,
            22
          ]
        ],
        "expected": [
          0,
          22
        ]
      },
      {
        "id": "t3",
        "description": "handles clean array",
        "args": [
          [
            0,
            1,
            2
          ]
        ],
        "expected": [
          0,
          1,
          2
        ]
      }
    ],
    "hints": [
      "`Boolean(0)` evaluates to `false`.",
      "Using `.filter(Boolean)` drops zeros.",
      "Filter explicitly: `v => v != null && !Number.isNaN(v)`."
    ],
    "explanation": {
      "summary": ".filter(Boolean) purges all falsy values, including valid numeric 0.",
      "rootCause": "0 was coerced to false.",
      "fixDetails": "Explicitly checked for null, undefined, and NaN.",
      "takeaway": "Do not use .filter(Boolean) when 0 or false are legitimate data."
    },
    "isBoss": false
  },
  {
    "id": "e18_json_parse_reviver_dates",
    "title": "Message Queue: JSON Date String Deserialization",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Strings & Regex",
    "story": "The queue consumer parses incoming JSON messages, but ISO date strings remain strings rather than Date objects.",
    "bugType": "JSON.parse Leaving Date Strings Unparsed",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "parseJsonWithDate",
    "starterCode": "function parseJsonWithDate(jsonStr) {\n  // Bug: JSON.parse does not convert ISO strings to Date instances\n  return JSON.parse(jsonStr);\n}",
    "correctCode": "function parseJsonWithDate(jsonStr) {\n  return JSON.parse(jsonStr, (key, value) => {\n    if (key === 'timestamp' && typeof value === 'string') {\n      return new Date(value).toISOString();\n    }\n    return value;\n  });\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "parses and normalizes timestamp",
        "args": [
          "{\"id\":101,\"timestamp\":\"2026-10-15T00:00:00.000Z\"}"
        ],
        "expected": {
          "id": 101,
          "timestamp": "2026-10-15T00:00:00.000Z"
        }
      },
      {
        "id": "t2",
        "description": "handles payload without date",
        "args": [
          "{\"name\":\"Alpha\"}"
        ],
        "expected": {
          "name": "Alpha"
        }
      }
    ],
    "hints": [
      "JSON has no native Date data type.",
      "Use the reviver callback parameter of `JSON.parse`.",
      "Convert date fields inside the reviver function."
    ],
    "explanation": {
      "summary": "JSON.parse produces string primitives for dates.",
      "rootCause": "Missing reviver function during parsing.",
      "fixDetails": "Used reviver callback in JSON.parse.",
      "takeaway": "Use revivers to transform ISO strings to rich representations."
    },
    "isBoss": false
  },
  {
    "id": "e19_object_assign_target_mutation",
    "title": "State Manager: Object.assign Target Mutation",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The redux-style state updater calls `Object.assign(state, update)`, modifying the previous state object directly instead of creating a fresh copy.",
    "bugType": "Mutating First Argument in Object.assign",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "mergeStateImmutably",
    "starterCode": "function mergeStateImmutably(state, update) {\n  // Bug: mutates state directly\n  return Object.assign(state, update);\n}",
    "correctCode": "function mergeStateImmutably(state, update) {\n  return Object.assign({}, state, update);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "creates merged state without mutating target",
        "args": [
          {
            "theme": "dark"
          },
          {
            "volume": 90
          }
        ],
        "expected": {
          "theme": "dark",
          "volume": 90
        }
      },
      {
        "id": "t2",
        "description": "overwrites keys",
        "args": [
          {
            "a": 1,
            "b": 2
          },
          {
            "b": 99
          }
        ],
        "expected": {
          "a": 1,
          "b": 99
        }
      }
    ],
    "hints": [
      "`Object.assign(target, ...sources)` mutates `target`.",
      "Pass `{}` as the first argument.",
      "Use `Object.assign({}, state, update)`."
    ],
    "explanation": {
      "summary": "Object.assign modifies its first argument in place.",
      "rootCause": "Original state was passed as the mutation target.",
      "fixDetails": "Passed an empty object literal `{}` as target.",
      "takeaway": "Always supply an empty `{}` as target for immutable Object.assign."
    },
    "isBoss": false
  },
  {
    "id": "e20_array_some_predicate_return",
    "title": "Permission Guard: Array.some Predicate Typo",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The security scanner tests if any roles have admin access, but uses `=` inside the `.some()` callback, assigning instead of checking.",
    "bugType": "Assignment in Array.some Predicate",
    "buggyLineHint": 2,
    "points": 150,
    "timeLimit": 120,
    "functionName": "hasAdminRole",
    "starterCode": "function hasAdminRole(roles) {\n  // Bug: single equals assigns 'ADMIN'\n  return roles.some(r => r = 'ADMIN');\n}",
    "correctCode": "function hasAdminRole(roles) {\n  return roles.some(r => r === 'ADMIN');\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "detects admin in list",
        "args": [
          [
            "USER",
            "ADMIN",
            "EDITOR"
          ]
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "returns false when no admin",
        "args": [
          [
            "USER",
            "GUEST"
          ]
        ],
        "expected": false
      },
      {
        "id": "t3",
        "description": "handles empty list",
        "args": [
          []
        ],
        "expected": false
      }
    ],
    "hints": [
      "Look at `r = 'ADMIN'` inside the callback.",
      "Single `=` assigns; use `===`.",
      "Change to `roles.some(r => r === 'ADMIN')`."
    ],
    "explanation": {
      "summary": "Assignment inside some() callback always returns truthy 'ADMIN'.",
      "rootCause": "Every non-empty array triggered a false positive.",
      "fixDetails": "Replaced assignment with strict equality.",
      "takeaway": "Watch out for single = inside arrow functions."
    },
    "isBoss": false
  },
  {
    "id": "e21_boss_circuit_breaker",
    "title": "Zone 02 Boss: Circuit Breaker Flapping Loop",
    "level": 2,
    "difficulty": "Intermediate",
    "category": "Conditionals & Logic",
    "story": "BOSS DAEMON: The electrical substation breaker monitors failure counts. When failures reach threshold, it trips to OPEN, but on the next check it resets to CLOSED without a cooldown timer.",
    "bugType": "Circuit Breaker State Transition Flapping",
    "buggyLineHint": 5,
    "points": 250,
    "timeLimit": 150,
    "functionName": "evaluateBreakerState",
    "starterCode": "function evaluateBreakerState(currentState, failureCount, threshold, hasCooledDown) {\n  // Bug: resets to CLOSED when failures drop without checking hasCooledDown\n  if (failureCount >= threshold) {\n    return 'OPEN';\n  }\n  return 'CLOSED';\n}",
    "correctCode": "function evaluateBreakerState(currentState, failureCount, threshold, hasCooledDown) {\n  if (currentState === 'OPEN') {\n    return hasCooledDown ? 'HALF_OPEN' : 'OPEN';\n  }\n  if (failureCount >= threshold) {\n    return 'OPEN';\n  }\n  return 'CLOSED';\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "trips open on threshold",
        "args": [
          "CLOSED",
          5,
          5,
          false
        ],
        "expected": "OPEN"
      },
      {
        "id": "t2",
        "description": "maintains OPEN before cooldown",
        "args": [
          "OPEN",
          2,
          5,
          false
        ],
        "expected": "OPEN"
      },
      {
        "id": "t3",
        "description": "transitions to HALF_OPEN after cooldown",
        "args": [
          "OPEN",
          1,
          5,
          true
        ],
        "expected": "HALF_OPEN"
      }
    ],
    "hints": [
      "A circuit breaker in state 'OPEN' should not instantly reset.",
      "Check `currentState === 'OPEN'` before evaluating failure count.",
      "Return 'HALF_OPEN' if cooled down, else 'OPEN'."
    ],
    "explanation": {
      "summary": "Circuit breakers must respect cooldown states to avoid rapid flapping.",
      "rootCause": "The breaker reverted to CLOSED while still hot.",
      "fixDetails": "Implemented proper FSM transitions for OPEN and HALF_OPEN.",
      "takeaway": "Model state transitions explicitly when designing circuit breakers."
    },
    "isBoss": true
  },
  {
    "id": "i8_closure_loop_var",
    "title": "Drone Squadron: Var Closure Scoping Leak",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Loops & Functions",
    "story": "The drone fleet generates ID callbacks in a loop using `var i`. All callbacks return the same final index because `var` is function-scoped.",
    "bugType": "Var Loop Closure Variable Leaking",
    "buggyLineHint": 3,
    "points": 200,
    "timeLimit": 150,
    "functionName": "createDroneRoster",
    "starterCode": "function createDroneRoster(count) {\n  const callbacks = [];\n  // Bug: var i creates a single function-scoped variable\n  for (var i = 0; i < count; i++) {\n    callbacks.push(() => i);\n  }\n  return callbacks.map(fn => fn());\n}",
    "correctCode": "function createDroneRoster(count) {\n  const callbacks = [];\n  for (let i = 0; i < count; i++) {\n    callbacks.push(() => i);\n  }\n  return callbacks.map(fn => fn());\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "creates roster of 3 drones",
        "args": [
          3
        ],
        "expected": [
          0,
          1,
          2
        ]
      },
      {
        "id": "t2",
        "description": "creates roster of 1 drone",
        "args": [
          1
        ],
        "expected": [
          0
        ]
      },
      {
        "id": "t3",
        "description": "handles zero drones",
        "args": [
          0
        ],
        "expected": []
      }
    ],
    "hints": [
      "Notice `var i = 0` in the loop header.",
      "`var` is hoisted and shared across iterations.",
      "Change `var i = 0` to `let i = 0`."
    ],
    "explanation": {
      "summary": "var declares a function-scoped variable, whereas let binds per iteration.",
      "rootCause": "All closures shared the final value of i.",
      "fixDetails": "Replaced var with let.",
      "takeaway": "Always use let in loops when capturing loop indices in closures."
    },
    "isBoss": false
  },
  {
    "id": "i9_shallow_copy_nested",
    "title": "Cyber Profile: Shallow Spread Mutation",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The user profile cloner uses `{ ...user }` to duplicate an account, but updating nested security roles mutates the original template user object.",
    "bugType": "Shallow Copying Nested Object Mutation",
    "buggyLineHint": 3,
    "points": 200,
    "timeLimit": 150,
    "functionName": "promoteClonedUser",
    "starterCode": "function promoteClonedUser(user) {\n  // Bug: shallow copy shares reference to nested permissions\n  const clone = { ...user };\n  clone.permissions.role = 'ADMIN';\n  return clone.permissions.role;\n}",
    "correctCode": "function promoteClonedUser(user) {\n  const clone = { ...user, permissions: { ...user.permissions, role: 'ADMIN' } };\n  return clone.permissions.role;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "promotes user immutably",
        "args": [
          {
            "name": "Neo",
            "permissions": {
              "role": "USER"
            }
          }
        ],
        "expected": "ADMIN"
      },
      {
        "id": "t2",
        "description": "handles guest promotion",
        "args": [
          {
            "name": "Trinity",
            "permissions": {
              "role": "GUEST"
            }
          }
        ],
        "expected": "ADMIN"
      }
    ],
    "hints": [
      "Spread operator `{ ...obj }` is shallow.",
      "Nested objects are still copied by reference.",
      "Clone `permissions`: `{ ...user, permissions: { ...user.permissions, role: 'ADMIN' } }`."
    ],
    "explanation": {
      "summary": "Shallow copying does not duplicate nested child objects.",
      "rootCause": "Mutating clone.permissions mutated the caller object.",
      "fixDetails": "Spread nested permissions object as well.",
      "takeaway": "Always clone nested object properties when mutating."
    },
    "isBoss": false
  },
  {
    "id": "i10_reduce_empty_initial",
    "title": "Ledger Auditor: Reduce Missing Initializer",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The financial audit microservice crashes with TypeError: Reduce of empty array with no initial value when auditing new accounts with zero transactions.",
    "bugType": "Missing Initial Value in reduce()",
    "buggyLineHint": 2,
    "points": 200,
    "timeLimit": 150,
    "functionName": "calculateTotalLedger",
    "starterCode": "function calculateTotalLedger(transactions) {\n  // Bug: reduce on empty array throws TypeError\n  return transactions.reduce((acc, curr) => acc + curr.amount);\n}",
    "correctCode": "function calculateTotalLedger(transactions) {\n  return transactions.reduce((acc, curr) => acc + curr.amount, 0);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "sums transaction amounts",
        "args": [
          [
            {
              "amount": 100
            },
            {
              "amount": -30
            },
            {
              "amount": 50
            }
          ]
        ],
        "expected": 120
      },
      {
        "id": "t2",
        "description": "handles empty array safely",
        "args": [
          []
        ],
        "expected": 0
      },
      {
        "id": "t3",
        "description": "handles single item",
        "args": [
          [
            {
              "amount": 42
            }
          ]
        ],
        "expected": 42
      }
    ],
    "hints": [
      "What happens if `transactions` is `[]`?",
      "`reduce` requires an initial value to handle empty arrays.",
      "Pass `0` as second argument: `reduce((acc, c) => acc + c.amount, 0)`."
    ],
    "explanation": {
      "summary": "Array.reduce without an initial value throws on empty arrays.",
      "rootCause": "Empty arrays provide no initial accumulator.",
      "fixDetails": "Supplied 0 as the initial value.",
      "takeaway": "Always provide an initial value to reduce()."
    },
    "isBoss": false
  },
  {
    "id": "i11_regex_stateful_lastindex",
    "title": "Firewall Filter: Regex Stateful LastIndex",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Strings & Regex",
    "story": "The packet inspector uses a global regex (`/auth/g`) to test routes. Alternating requests fail because global regexes maintain internal `lastIndex` state.",
    "bugType": "Global Regex lastIndex Mutation in test()",
    "buggyLineHint": 1,
    "points": 200,
    "timeLimit": 150,
    "functionName": "filterAuthEndpoints",
    "starterCode": "const AUTH_REGEX = /auth/g;\nfunction filterAuthEndpoints(endpoints) {\n  // Bug: global regex advances lastIndex on every test()\n  return endpoints.filter(e => AUTH_REGEX.test(e));\n}",
    "correctCode": "function filterAuthEndpoints(endpoints) {\n  const regex = /auth/;\n  return endpoints.filter(e => regex.test(e));\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "matches consecutive valid auth endpoints",
        "args": [
          [
            "/auth/login",
            "/auth/signup",
            "/auth/token"
          ]
        ],
        "expected": [
          "/auth/login",
          "/auth/signup",
          "/auth/token"
        ]
      },
      {
        "id": "t2",
        "description": "filters non-auth endpoints",
        "args": [
          [
            "/auth/login",
            "/home",
            "/about"
          ]
        ],
        "expected": [
          "/auth/login"
        ]
      },
      {
        "id": "t3",
        "description": "handles empty list",
        "args": [
          []
        ],
        "expected": []
      }
    ],
    "hints": [
      "Regular expressions with `/g` flag maintain state.",
      "Each call to `.test()` updates `lastIndex`.",
      "Remove the `/g` flag or use a local `/auth/` regex."
    ],
    "explanation": {
      "summary": "Global RegExp objects are stateful across multiple test() invocations.",
      "rootCause": "lastIndex advanced past matches on subsequent calls.",
      "fixDetails": "Removed /g flag to make regex stateless.",
      "takeaway": "Do not reuse global regexes with test()."
    },
    "isBoss": false
  },
  {
    "id": "i12_matrix_transposition",
    "title": "Radar Grid: Matrix Axis Inversion",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The spatial radar transposes a 2D matrix of sensor points, but assigns `result[i][j] = matrix[i][j]`, resulting in a duplicate instead of a transposed grid.",
    "bugType": "Matrix Index Inversion in Transposition",
    "buggyLineHint": 5,
    "points": 200,
    "timeLimit": 150,
    "functionName": "transposeRadarGrid",
    "starterCode": "function transposeRadarGrid(matrix) {\n  const rows = matrix.length;\n  const cols = matrix[0].length;\n  const result = Array.from({ length: cols }, () => Array(rows).fill(0));\n  for (let i = 0; i < rows; i++) {\n    for (let j = 0; j < cols; j++) {\n      // Bug: assigns matrix[i][j] to result[i][j]\n      result[i][j] = matrix[i][j];\n    }\n  }\n  return result;\n}",
    "correctCode": "function transposeRadarGrid(matrix) {\n  const rows = matrix.length;\n  const cols = matrix[0].length;\n  const result = Array.from({ length: cols }, () => Array(rows).fill(0));\n  for (let i = 0; i < rows; i++) {\n    for (let j = 0; j < cols; j++) {\n      result[j][i] = matrix[i][j];\n    }\n  }\n  return result;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "transposes 2x3 matrix",
        "args": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ]
          ]
        ],
        "expected": [
          [
            1,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            6
          ]
        ]
      },
      {
        "id": "t2",
        "description": "transposes 2x2 matrix",
        "args": [
          [
            [
              1,
              2
            ],
            [
              3,
              4
            ]
          ]
        ],
        "expected": [
          [
            1,
            3
          ],
          [
            2,
            4
          ]
        ]
      }
    ],
    "hints": [
      "In matrix transposition, row `i` and col `j` are swapped.",
      "Change `result[i][j]` to `result[j][i]`.",
      "Write `result[j][i] = matrix[i][j];`."
    ],
    "explanation": {
      "summary": "Transposition maps element (i, j) to (j, i).",
      "rootCause": "Indices were not swapped during assignment.",
      "fixDetails": "Assigned to result[j][i].",
      "takeaway": "Always swap indices when computing matrix transpositions."
    },
    "isBoss": false
  },
  {
    "id": "i13_anagram_length_check",
    "title": "Cipher Decryption: Anagram Length Guard",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Strings & Regex",
    "story": "The decrypter validates anagrams using a character count dictionary, but fails to check if lengths match, causing subset words ('hell' and 'hello') to pass.",
    "bugType": "Missing Length Check in Anagram Validator",
    "buggyLineHint": 2,
    "points": 200,
    "timeLimit": 150,
    "functionName": "validateAnagramPair",
    "starterCode": "function validateAnagramPair(a, b) {\n  // Bug: missing early length comparison\n  const counts = {};\n  for (let ch of a) counts[ch] = (counts[ch] || 0) + 1;\n  for (let ch of b) {\n    if (!counts[ch]) return false;\n    counts[ch]--;\n  }\n  return true;\n}",
    "correctCode": "function validateAnagramPair(a, b) {\n  if (a.length !== b.length) return false;\n  const counts = {};\n  for (let ch of a) counts[ch] = (counts[ch] || 0) + 1;\n  for (let ch of b) {\n    if (!counts[ch]) return false;\n    counts[ch]--;\n  }\n  return true;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "validates genuine anagrams",
        "args": [
          "listen",
          "silent"
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "rejects different length words",
        "args": [
          "hello",
          "hell"
        ],
        "expected": false
      },
      {
        "id": "t3",
        "description": "rejects anagram mismatches",
        "args": [
          "rat",
          "car"
        ],
        "expected": false
      }
    ],
    "hints": [
      "If `a.length !== b.length`, they can never be anagrams.",
      "Add an early return check at the start.",
      "Write `if (a.length !== b.length) return false;`."
    ],
    "explanation": {
      "summary": "Anagrams must have identical length and identical character counts.",
      "rootCause": "Subset strings exhausted counts without checking residual characters.",
      "fixDetails": "Added early length check.",
      "takeaway": "Always enforce dimension equality before frequency counting."
    },
    "isBoss": false
  },
  {
    "id": "i14_array_chunking_remainder",
    "title": "Batch Processor: Array Chunking Remainder Drop",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The queue chunker divides array items into chunks of size K, but drops the last chunk if the array length is not evenly divisible by K.",
    "bugType": "Dropped Final Remainder Chunk",
    "buggyLineHint": 4,
    "points": 200,
    "timeLimit": 150,
    "functionName": "chunkTelemetryBatches",
    "starterCode": "function chunkTelemetryBatches(items, size) {\n  const chunks = [];\n  // Bug: i + size <= items.length stops before the last uneven chunk!\n  for (let i = 0; i + size <= items.length; i += size) {\n    chunks.push(items.slice(i, i + size));\n  }\n  return chunks;\n}",
    "correctCode": "function chunkTelemetryBatches(items, size) {\n  const chunks = [];\n  for (let i = 0; i < items.length; i += size) {\n    chunks.push(items.slice(i, i + size));\n  }\n  return chunks;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "chunks with remainder",
        "args": [
          [
            1,
            2,
            3,
            4,
            5
          ],
          2
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            3,
            4
          ],
          [
            5
          ]
        ]
      },
      {
        "id": "t2",
        "description": "chunks evenly divisible array",
        "args": [
          [
            1,
            2,
            3,
            4
          ],
          2
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            3,
            4
          ]
        ]
      },
      {
        "id": "t3",
        "description": "handles empty array",
        "args": [
          []
        ],
        "expected": []
      }
    ],
    "hints": [
      "`slice(i, i + size)` safely handles lengths beyond the array bound.",
      "The loop condition should simply be `i < items.length`.",
      "Change loop condition to `i < items.length`."
    ],
    "explanation": {
      "summary": "Loop condition `i + size <= items.length` dropped remainder slices.",
      "rootCause": "Terminating early when remainder < size.",
      "fixDetails": "Changed condition to `i < items.length`.",
      "takeaway": "Array.slice automatically clamps to array length, so iterate until `i < length`."
    },
    "isBoss": false
  },
  {
    "id": "i15_set_dedup_object_ref",
    "title": "Telemetry Registry: Set Object Reference Trap",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The registry attempts to deduplicate sensor events by passing an array of objects into `new Set()`, which fails because distinct object references are never deduplicated.",
    "bugType": "Set() Reference Equality on Objects",
    "buggyLineHint": 2,
    "points": 200,
    "timeLimit": 150,
    "functionName": "dedupSensorsById",
    "starterCode": "function dedupSensorsById(sensors) {\n  // Bug: new Set(objects) does not compare by property id\n  return Array.from(new Set(sensors));\n}",
    "correctCode": "function dedupSensorsById(sensors) {\n  const seen = new Set();\n  return sensors.filter(s => {\n    if (seen.has(s.id)) return false;\n    seen.add(s.id);\n    return true;\n  });\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "deduplicates by id",
        "args": [
          [
            {
              "id": 1,
              "name": "A"
            },
            {
              "id": 1,
              "name": "A"
            },
            {
              "id": 2,
              "name": "B"
            }
          ]
        ],
        "expected": [
          {
            "id": 1,
            "name": "A"
          },
          {
            "id": 2,
            "name": "B"
          }
        ]
      },
      {
        "id": "t2",
        "description": "handles unique items",
        "args": [
          [
            {
              "id": 1
            },
            {
              "id": 2
            }
          ]
        ],
        "expected": [
          {
            "id": 1
          },
          {
            "id": 2
          }
        ]
      }
    ],
    "hints": [
      "`new Set()` checks object reference equality.",
      "Track unique `s.id` in a separate `Set`.",
      "Filter with `seen.has(s.id)`."
    ],
    "explanation": {
      "summary": "Set cannot perform deep property equality comparisons.",
      "rootCause": "Objects with identical keys had distinct memory addresses.",
      "fixDetails": "Maintained a Set of seen IDs during filtering.",
      "takeaway": "Deduplicate object arrays by unique key rather than whole objects."
    },
    "isBoss": false
  },
  {
    "id": "i16_binary_search_infinite_loop",
    "title": "Address Lookup: Binary Search Low Bound Loop",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Algorithms & Data Structures",
    "story": "The memory lookup runs an infinite loop when the target is greater than mid because `low = mid` fails to advance on 2-element arrays.",
    "bugType": "Binary Search Infinite Loop with low = mid",
    "buggyLineHint": 5,
    "points": 200,
    "timeLimit": 150,
    "functionName": "binarySearchAddress",
    "starterCode": "function binarySearchAddress(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  let guard = 0;\n  while (low <= high) {\n    if (++guard > 50) return -999;\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    // Bug: low = mid causes infinite loop when low and high differ by 1\n    if (arr[mid] < target) low = mid;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    "correctCode": "function binarySearchAddress(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "finds target in 2-element array",
        "args": [
          [
            10,
            20
          ],
          20
        ],
        "expected": 1
      },
      {
        "id": "t2",
        "description": "finds first element",
        "args": [
          [
            10,
            20
          ],
          10
        ],
        "expected": 0
      },
      {
        "id": "t3",
        "description": "returns -1 when missing",
        "args": [
          [
            10,
            20
          ],
          30
        ],
        "expected": -1
      }
    ],
    "hints": [
      "When `low = mid`, if `mid === low`, the search window never shrinks.",
      "Always advance past mid: `low = mid + 1`.",
      "Change `low = mid` to `low = mid + 1`."
    ],
    "explanation": {
      "summary": "Binary search must strictly reduce search bounds each cycle.",
      "rootCause": "low = mid resulted in an invariant low value.",
      "fixDetails": "Updated bound to low = mid + 1.",
      "takeaway": "Always advance low = mid + 1 and high = mid - 1 in binary search."
    },
    "isBoss": false
  },
  {
    "id": "i17_string_regex_metachar_escape",
    "title": "Route Matcher: Unescaped Dot in Regex",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Strings & Regex",
    "story": "The domain validator checks if URLs end in '.com', but the dot is unescaped in the regex, matching 'xcom' and 'ycom'.",
    "bugType": "Unescaped Dot Wildcard in RegExp",
    "buggyLineHint": 2,
    "points": 200,
    "timeLimit": 150,
    "functionName": "isValidComDomain",
    "starterCode": "function isValidComDomain(domain) {\n  // Bug: unescaped . matches ANY character\n  return /\\.com$/.test(domain);\n}",
    "correctCode": "function isValidComDomain(domain) {\n  return /\\.com$/.test(domain);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "matches valid .com",
        "args": [
          "example.com"
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "rejects xcom false match",
        "args": [
          "examplexcom"
        ],
        "expected": false
      }
    ],
    "hints": [
      "In regex, `.` is a wildcard matching any single character.",
      "Escape the dot with a backslash `\\.` to match literal period.",
      "Ensure the pattern is `\\.com$`."
    ],
    "explanation": {
      "summary": "An unescaped period in regular expressions matches any single character.",
      "rootCause": "Dot matched alphanumeric characters instead of literal period.",
      "fixDetails": "Escaped period with backslash.",
      "takeaway": "Always escape regex metacharacters when matching literals."
    },
    "isBoss": false
  },
  {
    "id": "i18_deep_merge_overwrite",
    "title": "Config Store: Deep Merge Object Overwrite",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Arrays & Objects",
    "story": "The configuration merger attempts to deep merge options, but completely overwrites nested objects instead of recursively merging their keys.",
    "bugType": "Shallow Overwrite in Deep Merge",
    "buggyLineHint": 5,
    "points": 200,
    "timeLimit": 150,
    "functionName": "deepMergeConfig",
    "starterCode": "function deepMergeConfig(base, override) {\n  const result = { ...base };\n  for (let key in override) {\n    // Bug: directly assigns override[key], destroying nested base properties\n    result[key] = override[key];\n  }\n  return result;\n}",
    "correctCode": "function deepMergeConfig(base, override) {\n  const result = { ...base };\n  for (let key in override) {\n    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {\n      result[key] = deepMergeConfig(base[key] || {}, override[key]);\n    } else {\n      result[key] = override[key];\n    }\n  }\n  return result;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "merges nested properties preserving siblings",
        "args": [
          {
            "ui": {
              "theme": "dark",
              "fontSize": 14
            }
          },
          {
            "ui": {
              "fontSize": 18
            }
          }
        ],
        "expected": {
          "ui": {
            "theme": "dark",
            "fontSize": 18
          }
        }
      },
      {
        "id": "t2",
        "description": "merges root level properties",
        "args": [
          {
            "a": 1
          },
          {
            "b": 2
          }
        ],
        "expected": {
          "a": 1,
          "b": 2
        }
      }
    ],
    "hints": [
      "If `override[key]` is an object, recursively merge it with `base[key]`.",
      "Check `typeof override[key] === 'object'`.",
      "Recursively call `deepMergeConfig` for nested objects."
    ],
    "explanation": {
      "summary": "Shallow property assignment replaces entire child objects.",
      "rootCause": "Nested properties in base were obliterated.",
      "fixDetails": "Added recursive descent for plain objects.",
      "takeaway": "Recursively merge object trees to preserve unmentioned sibling properties."
    },
    "isBoss": false
  },
  {
    "id": "i19_fibonacci_memo_cache_key",
    "title": "Generator: Memoization Cache Collision",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Algorithms & Data Structures",
    "story": "A two-argument pathfinder memoizes results using `cache[a + b]`. This causes '1' + '23' and '12' + '3' to collide and return wrong answers.",
    "bugType": "String Concatenation Cache Key Collision",
    "buggyLineHint": 3,
    "points": 200,
    "timeLimit": 150,
    "functionName": "computeGridPaths",
    "starterCode": "function computeGridPaths(x, y) {\n  const cache = {};\n  function helper(r, c) {\n    // Bug: r + '' + c collides (e.g., 1, 23 vs 12, 3)\n    const key = r + '' + c;\n    if (key in cache) return cache[key];\n    if (r === 1 || c === 1) return 1;\n    cache[key] = helper(r - 1, c) + helper(r, c - 1);\n    return cache[key];\n  }\n  return helper(x, y);\n}",
    "correctCode": "function computeGridPaths(x, y) {\n  const cache = {};\n  function helper(r, c) {\n    const key = `${r}:${c}`;\n    if (key in cache) return cache[key];\n    if (r === 1 || c === 1) return 1;\n    cache[key] = helper(r - 1, c) + helper(r, c - 1);\n    return cache[key];\n  }\n  return helper(x, y);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "computes 2x2 grid paths",
        "args": [
          2,
          2
        ],
        "expected": 2
      },
      {
        "id": "t2",
        "description": "computes 3x3 grid paths",
        "args": [
          3,
          3
        ],
        "expected": 6
      },
      {
        "id": "t3",
        "description": "computes 1x5 grid paths",
        "args": [
          1,
          5
        ],
        "expected": 1
      }
    ],
    "hints": [
      "Separate arguments with a delimiter like `:`.",
      "Use `${r}:${c}` as the cache key.",
      "Replace `r + '' + c` with `${r}:${c}`."
    ],
    "explanation": {
      "summary": "Undelimited key concatenation produces hash key collisions.",
      "rootCause": "Coordinates (1, 2) and (12, ) could map to ambiguous keys.",
      "fixDetails": "Delimited arguments with a colon.",
      "takeaway": "Always separate composite key components with an unambiguous delimiter."
    },
    "isBoss": false
  },
  {
    "id": "i20_generator_early_return",
    "title": "Quantum Stream: Generator Early Return",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Loops & Functions",
    "story": "The quantum telemetry generator uses `return val` instead of `yield val` inside its loop, terminating the stream after the very first item.",
    "bugType": "Using return instead of yield in Generator",
    "buggyLineHint": 4,
    "points": 200,
    "timeLimit": 150,
    "functionName": "simulateStreamConsumer",
    "starterCode": "function simulateStreamConsumer(items) {\n  function* streamGen() {\n    for (const item of items) {\n      // Bug: return exits the generator immediately!\n      return item;\n    }\n  }\n  const gen = streamGen();\n  const results = [];\n  let next = gen.next();\n  while (!next.done) {\n    results.push(next.value);\n    next = gen.next();\n  }\n  return results;\n}",
    "correctCode": "function simulateStreamConsumer(items) {\n  function* streamGen() {\n    for (const item of items) {\n      yield item;\n    }\n  }\n  const gen = streamGen();\n  const results = [];\n  let next = gen.next();\n  while (!next.done) {\n    results.push(next.value);\n    next = gen.next();\n  }\n  return results;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "streams all items",
        "args": [
          [
            "p1",
            "p2",
            "p3"
          ]
        ],
        "expected": [
          "p1",
          "p2",
          "p3"
        ]
      },
      {
        "id": "t2",
        "description": "streams single item",
        "args": [
          [
            "pA"
          ]
        ],
        "expected": [
          "pA"
        ]
      },
      {
        "id": "t3",
        "description": "handles empty stream",
        "args": [
          []
        ],
        "expected": []
      }
    ],
    "hints": [
      "Inside a generator (`function*`), use `yield` to emit values.",
      "`return` halts the generator immediately.",
      "Change `return item;` to `yield item;`."
    ],
    "explanation": {
      "summary": "The return statement ends generator iteration immediately.",
      "rootCause": "return terminated after the first element.",
      "fixDetails": "Replaced return with yield.",
      "takeaway": "Use yield to produce intermediate generator sequences."
    },
    "isBoss": false
  },
  {
    "id": "i21_promise_executor_throw",
    "title": "Async Gateway: Safe JSON Parser Fallback",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Asynchronous & Promises",
    "story": "The gateway parses tokens without catching JSON syntax errors, causing unhandled exceptions rather than returning the safe fallback object.",
    "bugType": "Uncaught Exception in JSON Parsing",
    "buggyLineHint": 3,
    "points": 200,
    "timeLimit": 150,
    "functionName": "safeParseJsonWithFallback",
    "starterCode": "function safeParseJsonWithFallback(rawJson, fallback) {\n  // Bug: JSON.parse throws uncaught error on invalid input\n  return JSON.parse(rawJson);\n}",
    "correctCode": "function safeParseJsonWithFallback(rawJson, fallback) {\n  try {\n    return JSON.parse(rawJson);\n  } catch (err) {\n    return fallback;\n  }\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "parses valid JSON",
        "args": [
          "{\"role\":\"admin\"}",
          {
            "role": "guest"
          }
        ],
        "expected": {
          "role": "admin"
        }
      },
      {
        "id": "t2",
        "description": "returns fallback on syntax error",
        "args": [
          "corrupt{json",
          {
            "role": "guest"
          }
        ],
        "expected": {
          "role": "guest"
        }
      },
      {
        "id": "t3",
        "description": "parses primitive number JSON",
        "args": [
          "123",
          0
        ],
        "expected": 123
      }
    ],
    "hints": [
      "Wrap `JSON.parse` in a `try...catch` block.",
      "Return `fallback` in the catch block.",
      "Return parsed data inside try."
    ],
    "explanation": {
      "summary": "Handling parsing errors gracefully requires explicit try/catch boundaries.",
      "rootCause": "Raw throws broke execution.",
      "fixDetails": "Wrapped in try/catch and returned fallback.",
      "takeaway": "Always guard JSON.parse with try/catch and fallbacks."
    },
    "isBoss": false
  },
  {
    "id": "i22_boss_canyon_swarm",
    "title": "Zone 03 Boss: Particle Swarm Velocity Dampening",
    "level": 3,
    "difficulty": "Intermediate",
    "category": "Algorithms & Data Structures",
    "story": "BOSS DAEMON: The canyon drone swarm coordinator computes velocity vector dampening. However, it applies friction multiplication to position instead of velocity, causing the swarm to collapse.",
    "bugType": "Applying Friction to Coordinate Instead of Velocity",
    "buggyLineHint": 5,
    "points": 300,
    "timeLimit": 180,
    "functionName": "simulateSwarmStep",
    "starterCode": "function simulateSwarmStep(position, velocity, friction) {\n  // Bug: multiplies position by friction instead of velocity\n  const nextPos = (position * friction) + velocity;\n  const nextVel = velocity;\n  return { pos: Math.round(nextPos), vel: Math.round(nextVel) };\n}",
    "correctCode": "function simulateSwarmStep(position, velocity, friction) {\n  const nextVel = velocity * friction;\n  const nextPos = position + nextVel;\n  return { pos: Math.round(nextPos), vel: Math.round(nextVel) };\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "dampens velocity and advances position",
        "args": [
          10,
          4,
          0.5
        ],
        "expected": {
          "pos": 12,
          "vel": 2
        }
      },
      {
        "id": "t2",
        "description": "handles zero velocity",
        "args": [
          5,
          0,
          0.8
        ],
        "expected": {
          "pos": 5,
          "vel": 0
        }
      }
    ],
    "hints": [
      "Friction dampens velocity: `nextVel = velocity * friction`.",
      "Position updates by adding new velocity: `nextPos = position + nextVel`.",
      "Correct the physics formula."
    ],
    "explanation": {
      "summary": "Friction coefficients scale velocity vectors, not spatial coordinates.",
      "rootCause": "Position was decayed by friction, shrinking world coordinates.",
      "fixDetails": "Multiplied velocity by friction and added to position.",
      "takeaway": "Verify kinematic equations apply decay to derivatives, not coordinates."
    },
    "isBoss": true
  },
  {
    "id": "a7_binary_search_float",
    "title": "Memory Address: Midpoint Fractional Index",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The binary search address finder calculates `mid = (low + high) / 2` without rounding down. In JavaScript, this yields floats like 2.5, causing `arr[2.5]` to return undefined.",
    "bugType": "Missing Math.floor in Binary Search Mid Index",
    "buggyLineHint": 4,
    "points": 300,
    "timeLimit": 180,
    "functionName": "findAddressOffset",
    "starterCode": "function findAddressOffset(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high) {\n    // Bug: in JS / produces float\n    let mid = (low + high) / 2;\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    "correctCode": "function findAddressOffset(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "finds target in odd length array",
        "args": [
          [
            10,
            20,
            30,
            40,
            50
          ],
          40
        ],
        "expected": 3
      },
      {
        "id": "t2",
        "description": "finds target in even length array",
        "args": [
          [
            2,
            4,
            6,
            8
          ],
          2
        ],
        "expected": 0
      },
      {
        "id": "t3",
        "description": "returns -1 when missing",
        "args": [
          [
            1,
            3,
            5
          ],
          99
        ],
        "expected": -1
      }
    ],
    "hints": [
      "Division `/` produces floats in JavaScript.",
      "`arr[2.5]` is always undefined.",
      "Wrap with `Math.floor((low + high) / 2)`."
    ],
    "explanation": {
      "summary": "JavaScript numbers are floating point; division does not truncate integers.",
      "rootCause": "Fractional mid resulted in undefined array access.",
      "fixDetails": "Used Math.floor() on midpoint calculation.",
      "takeaway": "Always truncate index calculations with Math.floor()."
    },
    "isBoss": false
  },
  {
    "id": "a8_lru_cache_tail_eviction",
    "title": "Cache Invalidation: LRU Eviction Order Inversion",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The memory cache implements an LRU (Least Recently Used) cache with Map, but evicts the newest entry instead of the oldest entry when capacity is reached.",
    "bugType": "Inverted LRU Eviction Target",
    "buggyLineHint": 7,
    "points": 300,
    "timeLimit": 180,
    "functionName": "simulateLRU",
    "starterCode": "function simulateLRU(capacity, operations) {\n  const cache = new Map();\n  const results = [];\n  for (const op of operations) {\n    if (op[0] === 'put') {\n      const [, key, val] = op;\n      if (cache.has(key)) cache.delete(key);\n      else if (cache.size >= capacity) {\n        // Bug: Array.from(cache.keys()).pop() evicts the NEWEST key!\n        const newest = Array.from(cache.keys()).pop();\n        cache.delete(newest);\n      }\n      cache.set(key, val);\n    } else if (op[0] === 'get') {\n      const [, key] = op;\n      if (!cache.has(key)) results.push(-1);\n      else {\n        const val = cache.get(key);\n        cache.delete(key);\n        cache.set(key, val);\n        results.push(val);\n      }\n    }\n  }\n  return results;\n}",
    "correctCode": "function simulateLRU(capacity, operations) {\n  const cache = new Map();\n  const results = [];\n  for (const op of operations) {\n    if (op[0] === 'put') {\n      const [, key, val] = op;\n      if (cache.has(key)) cache.delete(key);\n      else if (cache.size >= capacity) {\n        const oldest = cache.keys().next().value;\n        cache.delete(oldest);\n      }\n      cache.set(key, val);\n    } else if (op[0] === 'get') {\n      const [, key] = op;\n      if (!cache.has(key)) results.push(-1);\n      else {\n        const val = cache.get(key);\n        cache.delete(key);\n        cache.set(key, val);\n        results.push(val);\n      }\n    }\n  }\n  return results;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "evicts least recently used on capacity overflow",
        "args": [
          2,
          [
            [
              "put",
              1,
              10
            ],
            [
              "put",
              2,
              20
            ],
            [
              "get",
              1
            ],
            [
              "put",
              3,
              30
            ],
            [
              "get",
              2
            ],
            [
              "get",
              3
            ]
          ]
        ],
        "expected": [
          10,
          -1,
          30
        ]
      },
      {
        "id": "t2",
        "description": "handles capacity 1",
        "args": [
          1,
          [
            [
              "put",
              "a",
              1
            ],
            [
              "put",
              "b",
              2
            ],
            [
              "get",
              "a"
            ],
            [
              "get",
              "b"
            ]
          ]
        ],
        "expected": [
          -1,
          2
        ]
      }
    ],
    "hints": [
      "JavaScript Maps maintain insertion order.",
      "The first key `cache.keys().next().value` is the oldest (LRU).",
      "Replace `.pop()` with `cache.keys().next().value`."
    ],
    "explanation": {
      "summary": "LRU caches must evict the least recently accessed item.",
      "rootCause": "Using pop() evicted the newest entry instead of the oldest.",
      "fixDetails": "Evicted cache.keys().next().value.",
      "takeaway": "Map iterator yields items in insertion order; first is oldest."
    },
    "isBoss": false
  },
  {
    "id": "a9_debounce_timer_trailing",
    "title": "Input Stabilizer: Debounce Burst Collapsing",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Asynchronous & Promises",
    "story": "The search keystroke debouncer should collapse a rapid burst of inputs into a single execution at the end, but schedules individual calls on every keystroke.",
    "bugType": "Burst Keystrokes Not Collapsing in Debounce",
    "buggyLineHint": 5,
    "points": 300,
    "timeLimit": 180,
    "functionName": "simulateDebounceSchedule",
    "starterCode": "function simulateDebounceSchedule(timestamps, delay) {\n  // Bug: schedules execution on every call instead of postponing\n  const scheduled = [];\n  for (let t of timestamps) {\n    scheduled.push(t + delay);\n  }\n  return scheduled;\n}",
    "correctCode": "function simulateDebounceSchedule(timestamps, delay) {\n  if (timestamps.length === 0) return [];\n  const scheduled = [];\n  for (let i = 0; i < timestamps.length; i++) {\n    const curr = timestamps[i];\n    const next = timestamps[i + 1];\n    if (next === undefined || next - curr >= delay) {\n      scheduled.push(curr + delay);\n    }\n  }\n  return scheduled;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "collapses burst into single trailing call",
        "args": [
          [
            100,
            150,
            200
          ],
          100
        ],
        "expected": [
          300
        ]
      },
      {
        "id": "t2",
        "description": "executes separate calls when quiet period elapses",
        "args": [
          [
            100,
            300,
            500
          ],
          50
        ],
        "expected": [
          150,
          350,
          550
        ]
      },
      {
        "id": "t3",
        "description": "handles empty array",
        "args": [
          [],
          50
        ],
        "expected": []
      }
    ],
    "hints": [
      "Debouncing resets the timer on each keystroke.",
      "Only the final keystroke of a burst executes after the cooldown.",
      "Trigger execution when `next === undefined || next - curr >= delay`."
    ],
    "explanation": {
      "summary": "Debouncing postpones execution until quiet periods.",
      "rootCause": "All keystrokes scheduled individual timers.",
      "fixDetails": "Only scheduled trailing edge executions.",
      "takeaway": "Debouncing collapses burst sequences into solitary executions."
    },
    "isBoss": false
  },
  {
    "id": "a10_floyd_cycle_hare_speed",
    "title": "Packet Loop: Tortoise & Hare Step Trap",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "Floyd's cycle-finding algorithm detects infinite loops in packet routing chains. However, both pointers advance by 1 step, so the fast pointer never catches up.",
    "bugType": "Fast Pointer Advancing at Same Speed as Slow",
    "buggyLineHint": 4,
    "points": 300,
    "timeLimit": 180,
    "functionName": "hasNetworkRoutingCycle",
    "starterCode": "function hasNetworkRoutingCycle(nextPointers) {\n  if (nextPointers.length === 0) return false;\n  let slow = 0;\n  let fast = 0;\n  let guard = 0;\n  while (nextPointers[fast] !== undefined && nextPointers[nextPointers[fast]] !== undefined) {\n    if (++guard > 50) return false;\n    // Bug: fast moves 1 step instead of 2\n    slow = nextPointers[slow];\n    fast = nextPointers[fast];\n    if (slow === fast) return true;\n  }\n  return false;\n}",
    "correctCode": "function hasNetworkRoutingCycle(nextPointers) {\n  if (nextPointers.length === 0) return false;\n  let slow = 0;\n  let fast = 0;\n  while (nextPointers[fast] !== undefined && nextPointers[nextPointers[fast]] !== undefined) {\n    slow = nextPointers[slow];\n    fast = nextPointers[nextPointers[fast]];\n    if (slow === fast) return true;\n  }\n  return false;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "detects 3-node cycle",
        "args": [
          [
            1,
            2,
            0
          ]
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "detects terminating chain",
        "args": [
          [
            1,
            2,
            -1
          ]
        ],
        "expected": false
      },
      {
        "id": "t3",
        "description": "detects self loop",
        "args": [
          [
            0
          ]
        ],
        "expected": true
      }
    ],
    "hints": [
      "The slow pointer steps 1; the fast pointer must step 2.",
      "Change `fast = nextPointers[fast]` to `fast = nextPointers[nextPointers[fast]]`.",
      "Check relative speeds."
    ],
    "explanation": {
      "summary": "Floyd's algorithm depends on differing pointer velocities.",
      "rootCause": "Equal velocities prevented fast pointer convergence.",
      "fixDetails": "Advanced fast pointer by two steps.",
      "takeaway": "Relative velocity guarantees loop detection in O(N)."
    },
    "isBoss": false
  },
  {
    "id": "a11_bst_lowest_common_ancestor",
    "title": "Tree Navigator: BST Lowest Common Ancestor",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The binary search tree navigator finds the lowest common ancestor of two nodes, but traverses left when both targets are greater than the current node.",
    "bugType": "Inverted Comparison Direction in BST LCA",
    "buggyLineHint": 4,
    "points": 300,
    "timeLimit": 180,
    "functionName": "findLowestCommonAncestor",
    "starterCode": "function findLowestCommonAncestor(root, p, q) {\n  let curr = root;\n  while (curr) {\n    // Bug: traverses left when both are GREATER\n    if (p > curr.val && q > curr.val) curr = curr.left;\n    else if (p < curr.val && q < curr.val) curr = curr.right;\n    else return curr.val;\n  }\n  return -1;\n}",
    "correctCode": "function findLowestCommonAncestor(root, p, q) {\n  let curr = root;\n  while (curr) {\n    if (p > curr.val && q > curr.val) curr = curr.right;\n    else if (p < curr.val && q < curr.val) curr = curr.left;\n    else return curr.val;\n  }\n  return -1;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "finds LCA of sibling nodes",
        "args": [
          {
            "val": 6,
            "left": {
              "val": 2,
              "left": {
                "val": 0,
                "left": null,
                "right": null
              },
              "right": {
                "val": 4,
                "left": null,
                "right": null
              }
            },
            "right": {
              "val": 8,
              "left": null,
              "right": null
            }
          },
          2,
          8
        ],
        "expected": 6
      },
      {
        "id": "t2",
        "description": "finds LCA in left subtree",
        "args": [
          {
            "val": 6,
            "left": {
              "val": 2,
              "left": {
                "val": 0,
                "left": null,
                "right": null
              },
              "right": {
                "val": 4,
                "left": null,
                "right": null
              }
            },
            "right": {
              "val": 8,
              "left": null,
              "right": null
            }
          },
          0,
          4
        ],
        "expected": 2
      }
    ],
    "hints": [
      "In a BST, values greater than current node live in the right subtree.",
      "Traverse `curr = curr.right` when both `p, q > curr.val`.",
      "Swap left/right traversal branches."
    ],
    "explanation": {
      "summary": "BST invariant: left is smaller, right is greater.",
      "rootCause": "Branches were inverted during subtree descent.",
      "fixDetails": "Navigated right for greater values and left for smaller values.",
      "takeaway": "Maintain the BST ordering property during binary search tree traversals."
    },
    "isBoss": false
  },
  {
    "id": "a12_curry_arity_collector",
    "title": "Functional Pipeline: Currying Argument Arity",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Loops & Functions",
    "story": "The function currying utility attempts to collect arguments across invocations, but evaluates immediately on the first call regardless of arity.",
    "bugType": "Immediate Invocation without Collecting Arity",
    "buggyLineHint": 2,
    "points": 300,
    "timeLimit": 180,
    "functionName": "currySum3",
    "starterCode": "function currySum3(a, b, c) {\n  // Bug: returns partial sum\n  return a + b;\n}",
    "correctCode": "function currySum3(a, b, c) {\n  return a + b + c;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "sums 3 numbers",
        "args": [
          1,
          2,
          3
        ],
        "expected": 6
      },
      {
        "id": "t2",
        "description": "handles zeros",
        "args": [
          0,
          5,
          0
        ],
        "expected": 5
      }
    ],
    "hints": [
      "A curried pipeline computes total sum.",
      "Check returned addition.",
      "Return `a + b + c`."
    ],
    "explanation": {
      "summary": "Currying accumulates arguments until target function arity is satisfied.",
      "rootCause": "Function invoked before required argument count was reached.",
      "fixDetails": "Returned complete sum.",
      "takeaway": "Currying transforms multi-arg pipelines."
    },
    "isBoss": false
  },
  {
    "id": "a13_exponential_backoff_rate",
    "title": "Retry Daemon: Linear Backoff Trap",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The connection retry supervisor is supposed to implement exponential backoff (100ms, 200ms, 400ms, 800ms), but multiplies attempt linearly (100 * attempt).",
    "bugType": "Linear Multiplication instead of 2^attempt",
    "buggyLineHint": 3,
    "points": 300,
    "timeLimit": 180,
    "functionName": "calculateBackoffDelays",
    "starterCode": "function calculateBackoffDelays(baseDelay, maxRetries) {\n  const delays = [];\n  for (let i = 0; i < maxRetries; i++) {\n    // Bug: linear multiplication i * baseDelay\n    delays.push(baseDelay * i);\n  }\n  return delays;\n}",
    "correctCode": "function calculateBackoffDelays(baseDelay, maxRetries) {\n  const delays = [];\n  for (let i = 0; i < maxRetries; i++) {\n    delays.push(baseDelay * Math.pow(2, i));\n  }\n  return delays;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "computes exponential delays",
        "args": [
          100,
          4
        ],
        "expected": [
          100,
          200,
          400,
          800
        ]
      },
      {
        "id": "t2",
        "description": "handles single retry",
        "args": [
          50,
          1
        ],
        "expected": [
          50
        ]
      },
      {
        "id": "t3",
        "description": "handles 0 retries",
        "args": [
          100,
          0
        ],
        "expected": []
      }
    ],
    "hints": [
      "Exponential backoff doubles each iteration: `base * 2^i`.",
      "Use `Math.pow(2, i)` or `baseDelay * (2 ** i)`.",
      "Replace `baseDelay * i` with `baseDelay * (2 ** i)`."
    ],
    "explanation": {
      "summary": "Exponential backoff mitigates server storms by doubling delay.",
      "rootCause": "Linear multiplication caused retries to bunch together.",
      "fixDetails": "Used exponential factor Math.pow(2, i).",
      "takeaway": "Always use power-of-two scaling for distributed retry backoffs."
    },
    "isBoss": false
  },
  {
    "id": "a14_min_heap_heapify_down",
    "title": "Priority Dispatcher: Min-Heap Single Child Check",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The min-heap priority queue extracts the root and sinks down, but only compares against the left child, ignoring a smaller right child.",
    "bugType": "Heap Sink Ignoring Smaller Right Child",
    "buggyLineHint": 6,
    "points": 300,
    "timeLimit": 180,
    "functionName": "simulateMinHeapSink",
    "starterCode": "function simulateMinHeapSink(heap) {\n  let idx = 0;\n  const length = heap.length;\n  while (idx * 2 + 1 < length) {\n    let left = idx * 2 + 1;\n    let smallest = left;\n    if (heap[smallest] < heap[idx]) {\n      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];\n      idx = smallest;\n    } else break;\n  }\n  return heap;\n}",
    "correctCode": "function simulateMinHeapSink(heap) {\n  let idx = 0;\n  const length = heap.length;\n  while (idx * 2 + 1 < length) {\n    let left = idx * 2 + 1;\n    let right = idx * 2 + 2;\n    let smallest = left;\n    if (right < length && heap[right] < heap[left]) {\n      smallest = right;\n    }\n    if (heap[smallest] < heap[idx]) {\n      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];\n      idx = smallest;\n    } else break;\n  }\n  return heap;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "sinks down picking smaller right child",
        "args": [
          [
            10,
            5,
            2
          ]
        ],
        "expected": [
          2,
          5,
          10
        ]
      },
      {
        "id": "t2",
        "description": "sinks down picking smaller left child",
        "args": [
          [
            10,
            2,
            5
          ]
        ],
        "expected": [
          2,
          10,
          5
        ]
      }
    ],
    "hints": [
      "Compare `heap[left]` and `heap[right]` to find the smaller child.",
      "Swap with the smaller of both children.",
      "Select `smallest = (right < length && heap[right] < heap[left]) ? right : left`."
    ],
    "explanation": {
      "summary": "Min-heap sink-down must swap with the minimum of both children.",
      "rootCause": "Left child bias violated the min-heap invariant.",
      "fixDetails": "Selected the smaller of left and right children before swapping.",
      "takeaway": "Always examine both children when heapifying downward."
    },
    "isBoss": false
  },
  {
    "id": "a15_trie_prefix_search",
    "title": "Autocomplete Dictionary: Prefix Search Traversal",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The autocomplete engine traverses a Trie to find all words with a given prefix, but returns the root node boolean instead of collecting matching suffixes.",
    "bugType": "Returning Root Instead of Traversing Suffixes",
    "buggyLineHint": 3,
    "points": 300,
    "timeLimit": 180,
    "functionName": "searchTriePrefix",
    "starterCode": "function searchTriePrefix(trieRoot, prefix) {\n  // Bug: returns root.isWord instead of traversing to prefix node\n  return trieRoot.isWord === true;\n}",
    "correctCode": "function searchTriePrefix(trieRoot, prefix) {\n  let node = trieRoot;\n  for (let ch of prefix) {\n    if (!node.children || !node.children[ch]) return false;\n    node = node.children[ch];\n  }\n  return true;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "finds existing prefix in trie",
        "args": [
          {
            "children": {
              "c": {
                "children": {
                  "a": {
                    "children": {
                      "t": {
                        "children": {},
                        "isWord": true
                      }
                    },
                    "isWord": false
                  }
                },
                "isWord": false
              }
            }
          },
          "cat"
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "rejects missing prefix",
        "args": [
          {
            "children": {
              "c": {
                "children": {},
                "isWord": false
              }
            }
          },
          "dog"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Iterate through each character in `prefix`.",
      "Descend `node = node.children[ch]`.",
      "Return `false` if a character branch is missing."
    ],
    "explanation": {
      "summary": "Trie prefix searches must descend sequentially through child nodes.",
      "rootCause": "Root node was checked without traversal.",
      "fixDetails": "Traversed tree along prefix character path.",
      "takeaway": "Trie operations navigate character-by-character along child edges."
    },
    "isBoss": false
  },
  {
    "id": "a16_matrix_spiral_traversal",
    "title": "Spatial Probe: Spiral Matrix Boundary Overrun",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The probe scans a 2D matrix in spiral order, but on single-row matrices, it re-traverses bottom and left boundaries, duplicating elements.",
    "bugType": "Boundary Overrun in Spiral Matrix Traversal",
    "buggyLineHint": 8,
    "points": 300,
    "timeLimit": 180,
    "functionName": "spiralOrderScan",
    "starterCode": "function spiralOrderScan(matrix) {\n  if (matrix.length === 0) return [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  const result = [];\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) result.push(matrix[top][c]);\n    top++;\n    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);\n    right--;\n    // Bug: missing top <= bottom guard before traversing left\n    for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);\n    bottom--;\n    for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);\n    left++;\n  }\n  return result;\n}",
    "correctCode": "function spiralOrderScan(matrix) {\n  if (matrix.length === 0) return [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  const result = [];\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) result.push(matrix[top][c]);\n    top++;\n    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);\n    right--;\n    if (top <= bottom) {\n      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);\n      left++;\n    }\n  }\n  return result;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "spirals 3x3 matrix",
        "args": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ],
            [
              7,
              8,
              9
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3,
          6,
          9,
          8,
          7,
          4,
          5
        ]
      },
      {
        "id": "t2",
        "description": "spirals 1x3 single row matrix without duplication",
        "args": [
          [
            [
              1,
              2,
              3
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3
        ]
      }
    ],
    "hints": [
      "After incrementing `top`, verify `top <= bottom` before scanning left.",
      "After decrementing `right`, verify `left <= right` before scanning up.",
      "Add guards `if (top <= bottom)` and `if (left <= right)`."
    ],
    "explanation": {
      "summary": "Single-row or single-column matrices require boundary verification before reverse traversal.",
      "rootCause": "Bottom and left loops executed after row/column limits crossed.",
      "fixDetails": "Added guard checks before reverse passes.",
      "takeaway": "Always re-check loop invariant boundaries after updating offsets in multi-step loops."
    },
    "isBoss": false
  },
  {
    "id": "a17_token_bucket_overflow",
    "title": "Rate Limiter: Token Bucket Integer Overflow",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The API rate limiter replenishes tokens based on elapsed milliseconds, but does not cap the tokens at maximum capacity.",
    "bugType": "Uncapped Token Accumulation",
    "buggyLineHint": 4,
    "points": 300,
    "timeLimit": 180,
    "functionName": "refillTokenBucket",
    "starterCode": "function refillTokenBucket(currentTokens, capacity, elapsedSec, refillRatePerSec) {\n  // Bug: fails to clamp tokens at max capacity\n  const added = elapsedSec * refillRatePerSec;\n  return currentTokens + added;\n}",
    "correctCode": "function refillTokenBucket(currentTokens, capacity, elapsedSec, refillRatePerSec) {\n  const added = elapsedSec * refillRatePerSec;\n  return Math.min(capacity, currentTokens + added);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "caps replenished tokens at capacity",
        "args": [
          5,
          10,
          10,
          2
        ],
        "expected": 10
      },
      {
        "id": "t2",
        "description": "adds partial tokens without exceeding capacity",
        "args": [
          2,
          10,
          2,
          2
        ],
        "expected": 6
      },
      {
        "id": "t3",
        "description": "preserves already full bucket",
        "args": [
          10,
          10,
          5,
          1
        ],
        "expected": 10
      }
    ],
    "hints": [
      "Token buckets cannot store more tokens than their burst `capacity`.",
      "Use `Math.min(capacity, currentTokens + added)`.",
      "Clamp the result with Math.min."
    ],
    "explanation": {
      "summary": "Token bucket algorithms must cap accumulated tokens at capacity.",
      "rootCause": "Tokens grew indefinitely during idle periods.",
      "fixDetails": "Capped return value using Math.min(capacity, ...).",
      "takeaway": "Always enforce resource saturation bounds in rate limiters."
    },
    "isBoss": false
  },
  {
    "id": "a18_deep_clone_circular_ref",
    "title": "Memory Cloner: Circular Reference Stack Overflow",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The deep cloner copies nested object trees, but throws `RangeError: Maximum call stack size exceeded` when encountering self-referential or circular objects.",
    "bugType": "Missing WeakMap in Deep Clone for Circular References",
    "buggyLineHint": 3,
    "points": 300,
    "timeLimit": 180,
    "functionName": "cloneWithCircularRefs",
    "starterCode": "function cloneWithCircularRefs(obj) {\n  // Bug: recursion without tracking visited objects crashes on circular refs\n  if (obj === null || typeof obj !== 'object') return obj;\n  const copy = Array.isArray(obj) ? [] : {};\n  for (let k in obj) {\n    copy[k] = cloneWithCircularRefs(obj[k]);\n  }\n  return copy;\n}",
    "correctCode": "function cloneWithCircularRefs(obj, map = new WeakMap()) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (map.has(obj)) return map.get(obj);\n  const copy = Array.isArray(obj) ? [] : {};\n  map.set(obj, copy);\n  for (let k in obj) {\n    copy[k] = cloneWithCircularRefs(obj[k], map);\n  }\n  return copy;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "deep clones tree structures",
        "args": [
          {
            "a": 1,
            "b": {
              "c": 2
            }
          }
        ],
        "expected": {
          "a": 1,
          "b": {
            "c": 2
          }
        }
      },
      {
        "id": "t2",
        "description": "clones primitives and arrays",
        "args": [
          [
            1,
            [
              2,
              3
            ]
          ]
        ],
        "expected": [
          1,
          [
            2,
            3
          ]
        ]
      }
    ],
    "hints": [
      "Pass a `WeakMap` parameter to track already cloned object instances.",
      "If `map.has(obj)`, return `map.get(obj)` immediately.",
      "Store `map.set(obj, copy)` before recursing into child keys."
    ],
    "explanation": {
      "summary": "Circular references cause infinite recursive loops unless tracked.",
      "rootCause": "Unvisited cycles repeatedly invoked deepClone.",
      "fixDetails": "Used a WeakMap to memoize previously encountered object references.",
      "takeaway": "Always pass a memoization map when traversing cyclical graph structures."
    },
    "isBoss": false
  },
  {
    "id": "a19_event_emitter_leak",
    "title": "Event Hub: Unbounded Listener Accumulation",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The telemetry dispatcher adds callback listeners on every connection attempt without removing previous listeners, causing a memory leak.",
    "bugType": "Missing Off/RemoveListener in Event Dispatcher",
    "buggyLineHint": 3,
    "points": 300,
    "timeLimit": 180,
    "functionName": "testEmitterUnsubscribe",
    "starterCode": "function testEmitterUnsubscribe(dummy) {\n  const listeners = {};\n  function on(event, fn) {\n    if (!listeners[event]) listeners[event] = [];\n    listeners[event].push(fn);\n  }\n  // Bug: off does not remove the callback\n  function off(event, fn) {}\n  function emit(event, data) {\n    return (listeners[event] || []).map(fn => fn(data));\n  }\n  let count = 0;\n  const cb = () => { count++; };\n  on('ping', cb);\n  emit('ping');\n  off('ping', cb);\n  emit('ping');\n  return count;\n}",
    "correctCode": "function testEmitterUnsubscribe(dummy) {\n  const listeners = {};\n  function on(event, fn) {\n    if (!listeners[event]) listeners[event] = [];\n    listeners[event].push(fn);\n  }\n  function off(event, fn) {\n    if (!listeners[event]) return;\n    listeners[event] = listeners[event].filter(cb => cb !== fn);\n  }\n  function emit(event, data) {\n    return (listeners[event] || []).map(fn => fn(data));\n  }\n  let count = 0;\n  const cb = () => { count++; };\n  on('ping', cb);\n  emit('ping');\n  off('ping', cb);\n  emit('ping');\n  return count;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "unsubscribes listener so it triggers only once",
        "args": [
          1
        ],
        "expected": 1
      }
    ],
    "hints": [
      "In `off(event, fn)`, filter out `fn` from `listeners[event]`.",
      "Write `listeners[event] = listeners[event].filter(cb => cb !== fn);`.",
      "Implement listener removal."
    ],
    "explanation": {
      "summary": "Event emitters require unsubscription to prevent listener memory leaks.",
      "rootCause": "off() was a no-op.",
      "fixDetails": "Filtered out the matching callback from the listener array.",
      "takeaway": "Always pair event subscription with unsubscription mechanisms."
    },
    "isBoss": false
  },
  {
    "id": "a20_topological_sort_indegree",
    "title": "Dependency Resolver: Topo Sort Cycle Detection",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "The build orchestrator sorts package dependencies using Kahn's algorithm, but fails to detect cyclic deadlocks, returning partial incomplete graphs.",
    "bugType": "Missing Cycle Detection in Topological Sort",
    "buggyLineHint": 8,
    "points": 300,
    "timeLimit": 180,
    "functionName": "resolveBuildOrder",
    "starterCode": "function resolveBuildOrder(numTasks, edges) {\n  // edges: [task, dependency]\n  const inDegree = Array(numTasks).fill(0);\n  const adj = Array.from({ length: numTasks }, () => []);\n  for (let [u, v] of edges) {\n    adj[v].push(u);\n    inDegree[u]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numTasks; i++) if (inDegree[i] === 0) queue.push(i);\n  const order = [];\n  while (queue.length > 0) {\n    const node = queue.shift();\n    order.push(node);\n    for (let neighbor of adj[node]) {\n      inDegree[neighbor]--;\n      if (inDegree[neighbor] === 0) queue.push(neighbor);\n    }\n  }\n  // Bug: returns partial order even if cycle exists!\n  return order;\n}",
    "correctCode": "function resolveBuildOrder(numTasks, edges) {\n  const inDegree = Array(numTasks).fill(0);\n  const adj = Array.from({ length: numTasks }, () => []);\n  for (let [u, v] of edges) {\n    adj[v].push(u);\n    inDegree[u]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numTasks; i++) if (inDegree[i] === 0) queue.push(i);\n  const order = [];\n  while (queue.length > 0) {\n    const node = queue.shift();\n    order.push(node);\n    for (let neighbor of adj[node]) {\n      inDegree[neighbor]--;\n      if (inDegree[neighbor] === 0) queue.push(neighbor);\n    }\n  }\n  return order.length === numTasks ? order : [];\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "resolves valid DAG build order",
        "args": [
          2,
          [
            [
              1,
              0
            ]
          ]
        ],
        "expected": [
          0,
          1
        ]
      },
      {
        "id": "t2",
        "description": "detects cyclic dependency and returns empty list",
        "args": [
          2,
          [
            [
              1,
              0
            ],
            [
              0,
              1
            ]
          ]
        ],
        "expected": []
      }
    ],
    "hints": [
      "If `order.length !== numTasks`, a cycle prevented all nodes from being visited.",
      "Return `[]` when a cycle is detected.",
      "Return `order.length === numTasks ? order : []`."
    ],
    "explanation": {
      "summary": "Kahn's algorithm visits every node if and only if the graph is a DAG.",
      "rootCause": "Cyclic graphs returned an incomplete order without error signaling.",
      "fixDetails": "Checked order.length against numTasks.",
      "takeaway": "Validate that topological sort processes every node in the graph."
    },
    "isBoss": false
  },
  {
    "id": "a21_boss_canopy_hydra",
    "title": "Zone 04 Boss: Concurrent Task Pool Starvation",
    "level": 4,
    "difficulty": "Advanced",
    "category": "Algorithms & Data Structures",
    "story": "BOSS DAEMON: The canopy task scheduler maintains a maximum concurrency limit of K tasks. When tasks complete, it forgets to dequeue pending tasks, causing the pipeline to starve.",
    "bugType": "Worker Pool Missing Dequeue on Task Completion",
    "buggyLineHint": 7,
    "points": 350,
    "timeLimit": 200,
    "functionName": "simulateTaskScheduler",
    "starterCode": "function simulateTaskScheduler(maxConcurrency, taskDurations) {\n  let active = 0;\n  const completed = [];\n  const queue = [...taskDurations];\n  // Bug: processes initial batch up to concurrency, but never drains remaining queue!\n  while (active < maxConcurrency && queue.length > 0) {\n    completed.push(queue.shift());\n    active++;\n  }\n  return completed.length;\n}",
    "correctCode": "function simulateTaskScheduler(maxConcurrency, taskDurations) {\n  let completedCount = 0;\n  const queue = [...taskDurations];\n  while (queue.length > 0) {\n    queue.shift();\n    completedCount++;\n  }\n  return completedCount;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "processes all tasks through pool",
        "args": [
          2,
          [
            10,
            20,
            30,
            40
          ]
        ],
        "expected": 4
      },
      {
        "id": "t2",
        "description": "handles empty task list",
        "args": [
          2,
          []
        ],
        "expected": 0
      }
    ],
    "hints": [
      "The worker pool must continuously drain the queue until empty.",
      "When a task finishes, next tasks must be scheduled.",
      "Drain all tasks from the queue."
    ],
    "explanation": {
      "summary": "Thread and worker pools must dequeue tasks as running jobs complete.",
      "rootCause": "The worker pool exited after the initial fill.",
      "fixDetails": "Processed all queue tasks until exhaustion.",
      "takeaway": "Always hook task completion to dequeue the next waiting job."
    },
    "isBoss": true
  },
  {
    "id": "x7_memoize_falsy_cache_hit",
    "title": "Boss Daemon: Zero-Value Cache Invalidation",
    "level": 5,
    "difficulty": "Expert",
    "category": "Algorithms & Data Structures",
    "story": "The AI calculation core memoizes expensive evaluations, but whenever an evaluation returns `0` or `false`, `if (cache[key])` evaluates to false and recomputes.",
    "bugType": "Checking Falsy Value Existence with Truthiness",
    "buggyLineHint": 4,
    "points": 400,
    "timeLimit": 240,
    "functionName": "computeCachedOffset",
    "starterCode": "function computeCachedOffset(x) {\n  const cache = {};\n  // Bug: if x - x is 0, cache check fails\n  const key = String(x);\n  if (cache[key]) return cache[key];\n  const val = 0;\n  cache[key] = val;\n  return val;\n}",
    "correctCode": "function computeCachedOffset(x) {\n  const cache = {};\n  const key = String(x);\n  if (Object.prototype.hasOwnProperty.call(cache, key)) return cache[key];\n  const val = 0;\n  cache[key] = val;\n  return val;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "preserves zero values in cache",
        "args": [
          42
        ],
        "expected": 0
      }
    ],
    "hints": [
      "`cache[key]` evaluates to false when cached value is `0`.",
      "Use `Object.prototype.hasOwnProperty.call(cache, key)`.",
      "Replace truthiness check with key existence check."
    ],
    "explanation": {
      "summary": "Using truthiness to check cache hits fails for valid falsy returns.",
      "rootCause": "0 was recomputed repeatedly.",
      "fixDetails": "Checked key membership with hasOwnProperty.",
      "takeaway": "Never use truthiness checks to determine map key presence."
    },
    "isBoss": false
  },
  {
    "id": "x8_sql_sanitizer_escape",
    "title": "Security Gate: SQL Parameter Sanitizer Escape",
    "level": 5,
    "difficulty": "Expert",
    "category": "Security & Sanitization",
    "story": "The query gateway sanitizes dynamic SQL parameters by stripping quotes. However, it only replaces the first quote, allowing SQL injection via trailing quotes.",
    "bugType": "Incomplete Single Quote SQL Replacement",
    "buggyLineHint": 2,
    "points": 450,
    "timeLimit": 240,
    "functionName": "sanitizeSqlParam",
    "starterCode": "function sanitizeSqlParam(input) {\n  // Bug: replace only escapes first single quote\n  return input.replace(\"'\", \"''\");\n}",
    "correctCode": "function sanitizeSqlParam(input) {\n  return input.replaceAll(\"'\", \"''\");\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "escapes all single quotes",
        "args": [
          "admin' OR '1'='1"
        ],
        "expected": "admin'' OR ''1''=''1"
      },
      {
        "id": "t2",
        "description": "handles string with no quotes",
        "args": [
          "valid_user"
        ],
        "expected": "valid_user"
      }
    ],
    "hints": [
      "`input.replace` only replaces the first occurrence.",
      "Use `replaceAll` to escape all single quotes: `input.replaceAll(\"'\", \"''\")`.",
      "Change replace to replaceAll."
    ],
    "explanation": {
      "summary": "Incomplete sanitization leaves subsequent injection payloads unescaped.",
      "rootCause": "Single replace left remaining single quotes in the string.",
      "fixDetails": "Used replaceAll to double all single quotes.",
      "takeaway": "Escape all instances of delimiter characters when sanitizing."
    },
    "isBoss": false
  },
  {
    "id": "x9_undo_redo_history_truncation",
    "title": "Mission Editor: Redo History Branch Invalidation",
    "level": 5,
    "difficulty": "Expert",
    "category": "Algorithms & Data Structures",
    "story": "The mission timeline editor implements Undo and Redo stacks. When a user undoes an action and performs a NEW edit, the redo stack is not cleared, corrupting the timeline.",
    "bugType": "Preserving Redo Stack Across New History Branches",
    "buggyLineHint": 6,
    "points": 450,
    "timeLimit": 240,
    "functionName": "simulateTimelineBranch",
    "starterCode": "function simulateTimelineBranch(actions) {\n  // actions: array of ['write', val], ['undo'], ['redo']\n  let state = '';\n  const undoStack = [];\n  const redoStack = [];\n  for (let act of actions) {\n    if (act[0] === 'write') {\n      undoStack.push(state);\n      state = act[1];\n      // Bug: redoStack is not cleared on new write!\n    } else if (act[0] === 'undo' && undoStack.length > 0) {\n      redoStack.push(state);\n      state = undoStack.pop();\n    } else if (act[0] === 'redo' && redoStack.length > 0) {\n      undoStack.push(state);\n      state = redoStack.pop();\n    }\n  }\n  return state;\n}",
    "correctCode": "function simulateTimelineBranch(actions) {\n  let state = '';\n  const undoStack = [];\n  let redoStack = [];\n  for (let act of actions) {\n    if (act[0] === 'write') {\n      undoStack.push(state);\n      state = act[1];\n      redoStack = [];\n    } else if (act[0] === 'undo' && undoStack.length > 0) {\n      redoStack.push(state);\n      state = undoStack.pop();\n    } else if (act[0] === 'redo' && redoStack.length > 0) {\n      undoStack.push(state);\n      state = redoStack.pop();\n    }\n  }\n  return state;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "clears redo on new write action",
        "args": [
          [
            [
              "write",
              "A"
            ],
            [
              "write",
              "B"
            ],
            [
              "undo"
            ],
            [
              "write",
              "C"
            ],
            [
              "redo"
            ]
          ]
        ],
        "expected": "C"
      }
    ],
    "hints": [
      "When a user writes after an undo, previous redo history is invalid.",
      "Clear the `redoStack = []` on every write operation.",
      "Reset redoStack inside `act[0] === 'write'`."
    ],
    "explanation": {
      "summary": "Performing an action after undo branches history, invalidating past redos.",
      "rootCause": "Redo stack was retained across new branches.",
      "fixDetails": "Emptied redoStack on new write actions.",
      "takeaway": "Always truncate the redo stack upon writing a new state."
    },
    "isBoss": false
  },
  {
    "id": "x10_jwt_expiry_seconds_millis",
    "title": "Auth Service: JWT Expiry Timestamp Scale",
    "level": 5,
    "difficulty": "Expert",
    "category": "Security & Sanitization",
    "story": "The authentication gateway validates JWT token expiration. JWT `exp` claims are stored in seconds, but JavaScript compares against `Date.now()` which returns milliseconds.",
    "bugType": "Comparing Epoch Seconds with Epoch Milliseconds",
    "buggyLineHint": 2,
    "points": 450,
    "timeLimit": 240,
    "functionName": "isJwtExpired",
    "starterCode": "function isJwtExpired(expSeconds, currentMillis) {\n  // Bug: comparing seconds directly to milliseconds causes tokens to immediately look expired!\n  return expSeconds < currentMillis;\n}",
    "correctCode": "function isJwtExpired(expSeconds, currentMillis) {\n  return (expSeconds * 1000) < currentMillis;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "validates future token as not expired",
        "args": [
          1792195200,
          1792195100000
        ],
        "expected": false
      },
      {
        "id": "t2",
        "description": "flags past token as expired",
        "args": [
          1700000000,
          1792195100000
        ],
        "expected": true
      }
    ],
    "hints": [
      "JWT `exp` is in UNIX epoch seconds.",
      "`Date.now()` is in milliseconds.",
      "Multiply `expSeconds * 1000` before comparing."
    ],
    "explanation": {
      "summary": "UNIX epoch seconds must be scaled by 1000 to match millisecond timestamps.",
      "rootCause": "Direct comparison mismatched magnitude by 1000x.",
      "fixDetails": "Multiplied expSeconds by 1000.",
      "takeaway": "Always verify whether timestamps are in seconds or milliseconds."
    },
    "isBoss": false
  },
  {
    "id": "x11_concurrency_pool_drain",
    "title": "Cluster Manager: Concurrency Semaphore Underflow",
    "level": 5,
    "difficulty": "Expert",
    "category": "Algorithms & Data Structures",
    "story": "The task pool manages concurrent workers. When a worker completes, the semaphore counter decrements, but does not allow new tasks to fill the empty slot.",
    "bugType": "Worker Semaphore Missing Release Trigger",
    "buggyLineHint": 5,
    "points": 450,
    "timeLimit": 240,
    "functionName": "simulateSemaphoreSchedule",
    "starterCode": "function simulateSemaphoreSchedule(tasks, maxConcurrent) {\n  let active = 0;\n  let finished = 0;\n  for (let t of tasks) {\n    if (active < maxConcurrent) {\n      active++;\n      finished++;\n      // Bug: active is never decremented when job finishes!\n    }\n  }\n  return finished;\n}",
    "correctCode": "function simulateSemaphoreSchedule(tasks, maxConcurrent) {\n  return tasks.length;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "drains all tasks through pool",
        "args": [
          [
            1,
            2,
            3,
            4
          ],
          2
        ],
        "expected": 4
      }
    ],
    "hints": [
      "When a worker finishes, decrement `active--` or schedule the next job.",
      "Ensure all tasks in `tasks` are processed.",
      "Return `tasks.length`."
    ],
    "explanation": {
      "summary": "Semaphores must release permits upon task completion.",
      "rootCause": "Active permit was never returned to the pool.",
      "fixDetails": "Released active slot for subsequent tasks.",
      "takeaway": "Always pair acquire() with release() in concurrency semaphores."
    },
    "isBoss": false
  },
  {
    "id": "x12_fsm_illegal_transition",
    "title": "Protocol FSM: Illegal State Transition Bypass",
    "level": 5,
    "difficulty": "Expert",
    "category": "Architecture & Systems",
    "story": "The communication finite state machine transitions from DISCONNECTED directly to TRANSMITTING without undergoing AUTHENTICATED handshake.",
    "bugType": "Missing State Transition Validation Matrix",
    "buggyLineHint": 3,
    "points": 450,
    "timeLimit": 240,
    "functionName": "transitionFSM",
    "starterCode": "function transitionFSM(currentState, nextState) {\n  // Bug: allows arbitrary state jumps without validating allowed transitions\n  return nextState;\n}",
    "correctCode": "function transitionFSM(currentState, nextState) {\n  const allowed = {\n    'DISCONNECTED': ['CONNECTING'],\n    'CONNECTING': ['AUTHENTICATED', 'DISCONNECTED'],\n    'AUTHENTICATED': ['TRANSMITTING', 'DISCONNECTED'],\n    'TRANSMITTING': ['AUTHENTICATED', 'DISCONNECTED']\n  };\n  if (allowed[currentState] && allowed[currentState].includes(nextState)) {\n    return nextState;\n  }\n  return currentState;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "allows valid transition",
        "args": [
          "DISCONNECTED",
          "CONNECTING"
        ],
        "expected": "CONNECTING"
      },
      {
        "id": "t2",
        "description": "rejects illegal state skip",
        "args": [
          "DISCONNECTED",
          "TRANSMITTING"
        ],
        "expected": "DISCONNECTED"
      }
    ],
    "hints": [
      "Define an allowed transitions dictionary.",
      "Verify that `allowed[currentState].includes(nextState)`.",
      "Return `currentState` if transition is forbidden."
    ],
    "explanation": {
      "summary": "State machines must enforce a transition table to prevent illegal states.",
      "rootCause": "Unrestricted assignment bypassed protocol handshakes.",
      "fixDetails": "Validated nextState against allowed transitions map.",
      "takeaway": "Model state transitions with an explicit transition matrix."
    },
    "isBoss": false
  },
  {
    "id": "x13_dijkstra_visited_revisit",
    "title": "Network Graph: Dijkstra Visited Edge Relaxation",
    "level": 5,
    "difficulty": "Expert",
    "category": "Algorithms & Data Structures",
    "story": "The router runs Dijkstra's algorithm to compute shortest paths. However, it continues relaxing edges for nodes that have already been finalized, wasting CPU cycles and failing on negative cycles.",
    "bugType": "Relaxing Edges on Already Finalized Nodes",
    "buggyLineHint": 5,
    "points": 450,
    "timeLimit": 240,
    "functionName": "dijkstraShortestPath",
    "starterCode": "function dijkstraShortestPath(numNodes, edges, startNode) {\n  const dist = Array(numNodes).fill(Infinity);\n  dist[startNode] = 0;\n  const visited = new Set();\n  for (let i = 0; i < numNodes; i++) {\n    let u = -1;\n    for (let j = 0; j < numNodes; j++) {\n      if (!visited.has(j) && (u === -1 || dist[j] < dist[u])) u = j;\n    }\n    if (dist[u] === Infinity) break;\n    visited.add(u);\n    for (let [from, to, weight] of edges) {\n      if (from === u) {\n        // Bug: relaxes edges even if destination is already visited!\n        if (dist[u] + weight < dist[to]) {\n          dist[to] = dist[u] + weight;\n        }\n      }\n    }\n  }\n  return dist;\n}",
    "correctCode": "function dijkstraShortestPath(numNodes, edges, startNode) {\n  const dist = Array(numNodes).fill(Infinity);\n  dist[startNode] = 0;\n  const visited = new Set();\n  for (let i = 0; i < numNodes; i++) {\n    let u = -1;\n    for (let j = 0; j < numNodes; j++) {\n      if (!visited.has(j) && (u === -1 || dist[j] < dist[u])) u = j;\n    }\n    if (dist[u] === Infinity) break;\n    visited.add(u);\n    for (let [from, to, weight] of edges) {\n      if (from === u && !visited.has(to)) {\n        if (dist[u] + weight < dist[to]) {\n          dist[to] = dist[u] + weight;\n        }\n      }\n    }\n  }\n  return dist;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "computes shortest paths from start",
        "args": [
          3,
          [
            [
              0,
              1,
              4
            ],
            [
              0,
              2,
              2
            ],
            [
              2,
              1,
              1
            ]
          ],
          0
        ],
        "expected": [
          0,
          3,
          2
        ]
      }
    ],
    "hints": [
      "Do not relax edges to nodes that are already in `visited`.",
      "Add `&& !visited.has(to)`.",
      "Prevent re-relaxing finalized nodes."
    ],
    "explanation": {
      "summary": "Dijkstra's algorithm guarantees finalized shortest distance once a node is visited.",
      "rootCause": "Re-relaxing visited nodes breached greedy optimality.",
      "fixDetails": "Guarded relaxation with !visited.has(to).",
      "takeaway": "Never re-relax nodes already in the closed set."
    },
    "isBoss": false
  },
  {
    "id": "x14_circular_ring_buffer",
    "title": "Audio Stream: Circular Buffer Read Pointer Lag",
    "level": 5,
    "difficulty": "Expert",
    "category": "Algorithms & Data Structures",
    "story": "The audio buffer implements a fixed-size circular ring buffer. When write operations overwrite unread slots, the read pointer is not advanced, producing corrupted chronological output.",
    "bugType": "Missing Read Pointer Advancement on Overwrite",
    "buggyLineHint": 6,
    "points": 450,
    "timeLimit": 240,
    "functionName": "simulateRingBuffer",
    "starterCode": "function simulateRingBuffer(capacity, items) {\n  const buffer = Array(capacity);\n  let write = 0, read = 0, count = 0;\n  for (let item of items) {\n    buffer[write] = item;\n    write = (write + 1) % capacity;\n    if (count < capacity) count++;\n    // Bug: read pointer is not advanced when writing over unread data!\n  }\n  const result = [];\n  for (let i = 0; i < count; i++) {\n    result.push(buffer[(read + i) % capacity]);\n  }\n  return result;\n}",
    "correctCode": "function simulateRingBuffer(capacity, items) {\n  const buffer = Array(capacity);\n  let write = 0, read = 0, count = 0;\n  for (let item of items) {\n    if (count === capacity) {\n      read = (read + 1) % capacity;\n    } else {\n      count++;\n    }\n    buffer[write] = item;\n    write = (write + 1) % capacity;\n  }\n  const result = [];\n  for (let i = 0; i < count; i++) {\n    result.push(buffer[(read + i) % capacity]);\n  }\n  return result;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "advances read pointer on overwrite",
        "args": [
          3,
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": [
          2,
          3,
          4
        ]
      },
      {
        "id": "t2",
        "description": "handles non-full buffer",
        "args": [
          3,
          [
            1,
            2
          ]
        ],
        "expected": [
          1,
          2
        ]
      }
    ],
    "hints": [
      "When `count === capacity`, advancing `write` overwrites the oldest element at `read`.",
      "Advance `read = (read + 1) % capacity` when full.",
      "Keep read and write pointers in sync."
    ],
    "explanation": {
      "summary": "Writing to a full circular buffer overwrites the head element.",
      "rootCause": "Read pointer remained stationary while oldest data was overwritten.",
      "fixDetails": "Advanced read pointer whenever capacity was exceeded.",
      "takeaway": "Always advance the read pointer when overwriting circular ring buffers."
    },
    "isBoss": false
  },
  {
    "id": "x15_css_specificity_math",
    "title": "Layout Engine: CSS Specificity Tuple Calculation",
    "level": 5,
    "difficulty": "Expert",
    "category": "Architecture & Systems",
    "story": "The CSS styling engine computes selector specificity, but combines ID, class, and element counts into a single decimal number `(id*100 + class*10 + tag)`, allowing 11 class names to override an ID selector.",
    "bugType": "Decimal Specificity Addition Allowing Overflow",
    "buggyLineHint": 3,
    "points": 450,
    "timeLimit": 240,
    "functionName": "compareCssSpecificity",
    "starterCode": "function compareCssSpecificity(specA, specB) {\n  // spec: [ids, classes, tags]\n  // Bug: base-10 addition allows 11 classes to beat 1 ID!\n  const scoreA = specA[0] * 100 + specA[1] * 10 + specA[2];\n  const scoreB = specB[0] * 100 + specB[1] * 10 + specB[2];\n  return scoreA > scoreB ? 'A' : scoreA < scoreB ? 'B' : 'EQUAL';\n}",
    "correctCode": "function compareCssSpecificity(specA, specB) {\n  if (specA[0] !== specB[0]) return specA[0] > specB[0] ? 'A' : 'B';\n  if (specA[1] !== specB[1]) return specA[1] > specB[1] ? 'A' : 'B';\n  if (specA[2] !== specB[2]) return specA[2] > specB[2] ? 'A' : 'B';\n  return 'EQUAL';\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "ID selector beats 15 class selectors",
        "args": [
          [
            1,
            0,
            0
          ],
          [
            0,
            15,
            0
          ]
        ],
        "expected": "A"
      },
      {
        "id": "t2",
        "description": "Class selector beats element selectors",
        "args": [
          [
            0,
            1,
            0
          ],
          [
            0,
            0,
            20
          ]
        ],
        "expected": "A"
      },
      {
        "id": "t3",
        "description": "Equal specificity",
        "args": [
          [
            1,
            2,
            3
          ],
          [
            1,
            2,
            3
          ]
        ],
        "expected": "EQUAL"
      }
    ],
    "hints": [
      "CSS specificity is a 3-tuple (A, B, C), not a base-10 decimal.",
      "Compare IDs first; if equal, compare classes; if equal, compare tags.",
      "Perform lexicographical tuple comparison."
    ],
    "explanation": {
      "summary": "CSS specificity is non-concatenative; no number of lower-order selectors beats a higher-order one.",
      "rootCause": "Base-10 math allowed lower-tier counts to bleed into higher columns.",
      "fixDetails": "Implemented lexicographical tuple comparison.",
      "takeaway": "Model multi-tiered hierarchical priorities as tuples, not integers."
    },
    "isBoss": false
  },
  {
    "id": "x16_ast_escape_splitter",
    "title": "Compiler Parser: Escaped Quote Token Boundary",
    "level": 5,
    "difficulty": "Expert",
    "category": "Architecture & Systems",
    "story": "The code tokenizer splits string literals on quotes, but splits on escaped quotes `\\\"`, breaking tokens like `\"Hello \\\"World\\\"\"` into invalid fragments.",
    "bugType": "Splitting on Escaped Quotes in String Tokenizer",
    "buggyLineHint": 2,
    "points": 450,
    "timeLimit": 240,
    "functionName": "tokenizeStringLiteral",
    "starterCode": "function tokenizeStringLiteral(input) {\n  // Bug: splits on every quote, even if preceded by backslash\n  return input.split('\"').filter(Boolean);\n}",
    "correctCode": "function tokenizeStringLiteral(input) {\n  const matches = input.match(/\"([^\"\\\\]*(\\\\.[^\"\\\\]*)*)\"/g);\n  return matches ? matches.map(s => s.slice(1, -1)) : [];\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "parses string with escaped quote",
        "args": [
          "\"Hello \\\"World\\\"\""
        ],
        "expected": [
          "Hello \\\"World\\\""
        ]
      },
      {
        "id": "t2",
        "description": "parses plain string",
        "args": [
          "\"CyberDeck\""
        ],
        "expected": [
          "CyberDeck"
        ]
      }
    ],
    "hints": [
      "Do not split on quotes that are escaped with backslash.",
      "Use a regular expression that handles escape sequences: `/\"([^\"\\\\]*(\\\\.[^\"\\\\]*)*)\"/g`.",
      "Parse the complete string literal."
    ],
    "explanation": {
      "summary": "Grammar parsers must recognize backslash escape states.",
      "rootCause": "Raw split ignored preceding escape character context.",
      "fixDetails": "Used regex with escaped-character handling.",
      "takeaway": "Always track escape state when tokenizing structured text."
    },
    "isBoss": false
  },
  {
    "id": "x17_bloom_filter_saturation",
    "title": "Cache Filter: Bloom Filter Single Hash Saturation",
    "level": 5,
    "difficulty": "Expert",
    "category": "Algorithms & Data Structures",
    "story": "The bloom filter uses only a single modulo hash function, causing 100% false positive saturation after a small number of insertions.",
    "bugType": "Single Hash Function in Bloom Filter",
    "buggyLineHint": 4,
    "points": 450,
    "timeLimit": 240,
    "functionName": "simulateBloomFilterCheck",
    "starterCode": "function simulateBloomFilterCheck(filterSize, keysToInsert, queryKey) {\n  const bitset = Array(filterSize).fill(0);\n  // Bug: single naive hash function causes rapid hash collisions\n  function hash1(str) {\n    let h = 0;\n    for (let c of str) h = (h * 31 + c.charCodeAt(0)) % filterSize;\n    return h;\n  }\n  for (let k of keysToInsert) bitset[hash1(k)] = 1;\n  return bitset[hash1(queryKey)] === 1;\n}",
    "correctCode": "function simulateBloomFilterCheck(filterSize, keysToInsert, queryKey) {\n  const bitset = Array(filterSize).fill(0);\n  function hash1(str) {\n    let h = 0;\n    for (let c of str) h = (h * 31 + c.charCodeAt(0)) % filterSize;\n    return h;\n  }\n  function hash2(str) {\n    let h = 0;\n    for (let c of str) h = (h * 17 + c.charCodeAt(0)) % filterSize;\n    return h;\n  }\n  for (let k of keysToInsert) {\n    bitset[hash1(k)] = 1;\n    bitset[hash2(k)] = 1;\n  }\n  return bitset[hash1(queryKey)] === 1 && bitset[hash2(queryKey)] === 1;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "detects inserted key",
        "args": [
          100,
          [
            "alpha",
            "beta"
          ],
          "alpha"
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "correctly rejects non-member using multi-hash",
        "args": [
          100,
          [
            "alpha"
          ],
          "non_member_123"
        ],
        "expected": false
      }
    ],
    "hints": [
      "Bloom filters use multiple independent hash functions (k >= 2).",
      "Add a second hash function `hash2`.",
      "Verify `bitset[hash1(query)] === 1 && bitset[hash2(query)] === 1`."
    ],
    "explanation": {
      "summary": "Bloom filters require multiple independent hash functions to suppress false positives.",
      "rootCause": "A single hash bit saturated under minimal load.",
      "fixDetails": "Added a second hash function to verify membership.",
      "takeaway": "Multiple hash functions exponentially reduce bloom filter collision probability."
    },
    "isBoss": false
  },
  {
    "id": "x18_diff_patch_offset_inversion",
    "title": "Version Control: Text Diff Patch Offset Inversion",
    "level": 5,
    "difficulty": "Expert",
    "category": "Architecture & Systems",
    "story": "The text delta patcher applies insertions from the beginning of the file to the end, causing earlier insertions to shift the offsets of later insertions.",
    "bugType": "Applying Patch Changesets Left-to-Right Shifting Offsets",
    "buggyLineHint": 4,
    "points": 450,
    "timeLimit": 240,
    "functionName": "applyTextPatches",
    "starterCode": "function applyTextPatches(original, patches) {\n  // patches: array of { index, insertText }\n  let text = original;\n  // Bug: applying left-to-right changes later indices\n  for (let p of patches) {\n    text = text.slice(0, p.index) + p.insertText + text.slice(p.index);\n  }\n  return text;\n}",
    "correctCode": "function applyTextPatches(original, patches) {\n  let text = original;\n  const sorted = [...patches].sort((a, b) => b.index - a.index);\n  for (let p of sorted) {\n    text = text.slice(0, p.index) + p.insertText + text.slice(p.index);\n  }\n  return text;\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "applies multiple patches in reverse order without offset shift",
        "args": [
          "012345",
          [
            {
              "index": 2,
              "insertText": "[A]"
            },
            {
              "index": 4,
              "insertText": "[B]"
            }
          ]
        ],
        "expected": "01[A]23[B]45"
      }
    ],
    "hints": [
      "Sort patches in descending order by `index` (`b.index - a.index`).",
      "Applying patches from right to left preserves earlier character positions.",
      "Sort patches with `[...patches].sort((a, b) => b.index - a.index)`."
    ],
    "explanation": {
      "summary": "Applying string insertions shifts downstream character positions.",
      "rootCause": "Left-to-right insertion shifted target positions of subsequent patches.",
      "fixDetails": "Sorted patches in descending order of index.",
      "takeaway": "Apply text mutations from tail to head to preserve earlier coordinate references."
    },
    "isBoss": false
  },
  {
    "id": "x19_two_phase_commit_abort",
    "title": "Distributed DB: 2PC Coordinator Abort Broadcast",
    "level": 5,
    "difficulty": "Expert",
    "category": "Architecture & Systems",
    "story": "The distributed two-phase commit coordinator asks all cohorts to prepare. When one cohort votes NO, it terminates without sending ROLLBACK to the other cohorts.",
    "bugType": "Missing Rollback Broadcast on Cohort Abort",
    "buggyLineHint": 6,
    "points": 450,
    "timeLimit": 240,
    "functionName": "coordinate2PC",
    "starterCode": "function coordinate2PC(cohortVotes) {\n  // cohortVotes: array of booleans\n  for (let vote of cohortVotes) {\n    if (!vote) {\n      // Bug: returns ABORT without rolling back\n      return 'ABORTED';\n    }\n  }\n  return 'COMMITTED';\n}",
    "correctCode": "function coordinate2PC(cohortVotes) {\n  const allPrepared = cohortVotes.every(v => v === true);\n  return allPrepared ? 'COMMITTED' : 'ROLLED_BACK';\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "commits when all cohorts vote yes",
        "args": [
          [
            true,
            true,
            true
          ]
        ],
        "expected": "COMMITTED"
      },
      {
        "id": "t2",
        "description": "rolls back if any cohort votes no",
        "args": [
          [
            true,
            false,
            true
          ]
        ],
        "expected": "ROLLED_BACK"
      }
    ],
    "hints": [
      "If any cohort votes false, return 'ROLLED_BACK'.",
      "If all cohorts vote true, return 'COMMITTED'.",
      "Use `cohortVotes.every(v => v === true) ? 'COMMITTED' : 'ROLLED_BACK'`."
    ],
    "explanation": {
      "summary": "Two-phase commit requires atomic all-or-nothing consensus.",
      "rootCause": "Cohort failures left system in uncoordinated state.",
      "fixDetails": "Explicitly transitioned to ROLLED_BACK on any negative vote.",
      "takeaway": "Distributed atomic transactions must guarantee unambiguous rollback on partial failure."
    },
    "isBoss": false
  },
  {
    "id": "x20_raft_split_brain_quorum",
    "title": "Distributed Consensus: Split-Brain Quorum Check",
    "level": 5,
    "difficulty": "Expert",
    "category": "Architecture & Systems",
    "story": "The Raft consensus node grants leadership when it receives `votes >= nodes / 2`, allowing 2 nodes in a 4-node cluster to simultaneously claim leadership.",
    "bugType": "Missing Strict Majority in Quorum Calculation",
    "buggyLineHint": 3,
    "points": 450,
    "timeLimit": 240,
    "functionName": "hasLeaderQuorum",
    "starterCode": "function hasLeaderQuorum(votesGranted, totalClusterNodes) {\n  // Bug: >= total / 2 allows 2 nodes in a 4-node cluster to claim quorum!\n  return votesGranted >= totalClusterNodes / 2;\n}",
    "correctCode": "function hasLeaderQuorum(votesGranted, totalClusterNodes) {\n  return votesGranted > Math.floor(totalClusterNodes / 2);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "grants leadership on strict majority",
        "args": [
          3,
          4
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "rejects split 2/4 tie",
        "args": [
          2,
          4
        ],
        "expected": false
      },
      {
        "id": "t3",
        "description": "grants majority on 5-node cluster",
        "args": [
          3,
          5
        ],
        "expected": true
      }
    ],
    "hints": [
      "A quorum requires a STRICT majority: `votes > Math.floor(total / 2)`.",
      "In a 4-node cluster, 2 is a tie, not a majority.",
      "Change `>=` to `>` or use `Math.floor(total / 2) + 1`."
    ],
    "explanation": {
      "summary": "Distributed consensus quorums require a strict majority (> N / 2) to prevent split-brain.",
      "rootCause": "Allowing 50% ties permitted dual leaders simultaneously.",
      "fixDetails": "Enforced strict majority votesGranted > Math.floor(total / 2).",
      "takeaway": "Quorum must always exceed 50% to mathematically eliminate split-brain."
    },
    "isBoss": false
  },
  {
    "id": "x21_boss_volcano_core_daemon",
    "title": "Zone 05 Final Boss: Distributed Consensus Split-Brain Quorum",
    "level": 5,
    "difficulty": "Expert",
    "category": "Architecture & Systems",
    "story": "FINAL BOSS: The Volcano Core AI Daemon orchestrates multi-datacenter consensus. During a network partition, both partitions elect leaders because the quorum threshold evaluates against local alive nodes instead of the full cluster configuration.",
    "bugType": "Dynamic Partition Sizing Causing Split-Brain",
    "buggyLineHint": 4,
    "points": 500,
    "timeLimit": 240,
    "functionName": "evaluatePartitionConsensus",
    "starterCode": "function evaluatePartitionConsensus(aliveInPartition, totalConfiguredCluster) {\n  // Bug: checks aliveInPartition > aliveInPartition / 2, which is ALWAYS true!\n  return aliveInPartition > aliveInPartition / 2;\n}",
    "correctCode": "function evaluatePartitionConsensus(aliveInPartition, totalConfiguredCluster) {\n  return aliveInPartition > Math.floor(totalConfiguredCluster / 2);\n}",
    "testCases": [
      {
        "id": "t1",
        "description": "majority partition maintains quorum",
        "args": [
          3,
          5
        ],
        "expected": true
      },
      {
        "id": "t2",
        "description": "minority partition loses quorum",
        "args": [
          2,
          5
        ],
        "expected": false
      }
    ],
    "hints": [
      "Quorum must be evaluated against `totalConfiguredCluster`.",
      "A partition can only commit if `aliveInPartition > Math.floor(totalConfiguredCluster / 2)`.",
      "Compare against totalConfiguredCluster."
    ],
    "explanation": {
      "summary": "Partitioned clusters must evaluate quorums against the static cluster membership.",
      "rootCause": "Checking against local partition count allowed both partitions to think they had quorum.",
      "fixDetails": "Measured against totalConfiguredCluster.",
      "takeaway": "Never use partitioned view size to establish absolute distributed quorum."
    },
    "isBoss": true
  }
];
