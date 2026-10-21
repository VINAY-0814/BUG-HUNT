# Python script to generate extended challenges and compile server/challengesMaster.ts
import json
import re

new_challenges = [
    # ----------------------------------------------------
    # LEVEL 1: BEGINNER (15 new challenges: b4 to b18)
    # ----------------------------------------------------
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
            {"id": "t1", "description": "converts lowercase to uppercase", "args": ["agent007"], "expected": "AGENT007"},
            {"id": "t2", "description": "handles mixed case", "args": ["CyberBot"], "expected": "CYBERBOT"},
            {"id": "t3", "description": "preserves uppercase", "args": ["ROOT"], "expected": "ROOT"}
        ],
        "hints": ["Strings in JavaScript are immutable.", "Calling `badge.toUpperCase()` does not change `badge`.", "Return `badge.toUpperCase()` directly."],
        "explanation": {
            "summary": "String methods return new strings rather than mutating the original.",
            "rootCause": "The return value of toUpperCase was discarded.",
            "fixDetails": "Returned the result of badge.toUpperCase().",
            "takeaway": "Always capture the return value when manipulating JavaScript strings."
        }
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
            {"id": "t1", "description": "parses binary 1010 to 10", "args": ["1010"], "expected": 10},
            {"id": "t2", "description": "parses binary 1111 to 15", "args": ["1111"], "expected": 15},
            {"id": "t3", "description": "parses binary 10000 to 16", "args": ["10000"], "expected": 16}
        ],
        "hints": ["`parseInt` accepts a second argument called `radix`.", "Binary numbers use base 2.", "Use `parseInt(binaryStr, 2)`."],
        "explanation": {
            "summary": "parseInt treats its input as decimal without an explicit radix.",
            "rootCause": "'1010' was parsed as one thousand and ten.",
            "fixDetails": "Passed 2 as the radix parameter.",
            "takeaway": "Always pass the radix parameter when calling parseInt."
        }
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
            {"id": "t1", "description": "floors positive float", "args": [42.9], "expected": 42},
            {"id": "t2", "description": "floors whole number", "args": [10.0], "expected": 10},
            {"id": "t3", "description": "floors negative float", "args": [-2.5], "expected": -3}
        ],
        "hints": ["JavaScript built-in methods are strictly case-sensitive.", "Check `Math.Floor` vs `Math.floor`.", "Change `Math.Floor` to lowercase `Math.floor`."],
        "explanation": {
            "summary": "JavaScript built-ins are camelCase or lowercase.",
            "rootCause": "Capitalizing `Floor` caused a property lookup on undefined.",
            "fixDetails": "Lowercased `Math.Floor` to `Math.floor`.",
            "takeaway": "Verify case sensitivity when invoking standard JavaScript APIs."
        }
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
            {"id": "t1", "description": "appends gadget", "args": [["compass", "torch"], "laser"], "expected": ["compass", "torch", "laser"]},
            {"id": "t2", "description": "appends to empty list", "args": [[], "keycard"], "expected": ["keycard"]},
            {"id": "t3", "description": "handles numeric items", "args": [[1, 2], 3], "expected": [1, 2, 3]}
        ],
        "hints": ["`Array.prototype.push` returns the new length of the array.", "Push the item first, then return `pack`.", "Change to `pack.push(gadget); return pack;`."],
        "explanation": {
            "summary": "push() mutates the array and returns the length number.",
            "rootCause": "Returning the result of push returned a number instead of the array.",
            "fixDetails": "Pushed the item and returned pack explicitly.",
            "takeaway": "Be mindful of methods that mutate and return lengths vs those that return the array."
        }
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
        "starterCode": "function formatAlertMessage(code) {\n  // Bug: single quotes do not interpolate expressions\n  return 'System Alert Code: \${code}';\n}",
        "correctCode": "function formatAlertMessage(code) {\n  return `System Alert Code: ${code}`;\n}",
        "testCases": [
            {"id": "t1", "description": "formats error 404", "args": ["ERR_404"], "expected": "System Alert Code: ERR_404"},
            {"id": "t2", "description": "formats numeric code", "args": [500], "expected": "System Alert Code: 500"},
            {"id": "t3", "description": "formats empty code", "args": [""], "expected": "System Alert Code: "}
        ],
        "hints": ["String interpolation requires backtick characters (` `).", "Single quotes treat `${code}` literally.", "Use backticks around the template string."],
        "explanation": {
            "summary": "Expression interpolation is only supported inside template literals delimited by backticks.",
            "rootCause": "Single quotes prevented interpolation.",
            "fixDetails": "Replaced quotes with backticks.",
            "takeaway": "Always enclose interpolated strings in backticks."
        }
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
            {"id": "t1", "description": "replaces both hyphens in date", "args": ["2026-10-15"], "expected": "2026/10/15"},
            {"id": "t2", "description": "replaces multiple dashes", "args": ["a-b-c-d"], "expected": "a/b/c/d"},
            {"id": "t3", "description": "handles no hyphens", "args": ["nodash"], "expected": "nodash"}
        ],
        "hints": ["`str.replace(str, newStr)` only matches once.", "Use `replaceAll` or a global regex `/-/g`.", "Change `replace` to `replaceAll`."],
        "explanation": {
            "summary": "String.prototype.replace with a string parameter replaces only the first occurrence.",
            "rootCause": "Subsequent hyphens were ignored.",
            "fixDetails": "Swapped replace for replaceAll.",
            "takeaway": "Use replaceAll when replacing all occurrences of a substring."
        }
    },
    {
        "id": "b10_zero_index_loop",
        "title": "Sensor Array: 1-Based Indexing Bug",
        "level": 1,
        "difficulty": "Beginner",
        "category": "Loops & Functions",
        "story": "The atmospheric barometer sums up sensor readings, but skips reading #0 because its loop counter initializes at 1.",
        "bugType": "Off-By-One Starting Index",
        "buggyLineHint: 3": 3,
        "buggyLineHint": 3,
        "points": 100,
        "timeLimit": 90,
        "functionName": "sumBarometerReadings",
        "starterCode": "function sumBarometerReadings(readings) {\n  let total = 0;\n  // Bug: loop starts at 1, omitting readings[0]\n  for (let i = 1; i < readings.length; i++) {\n    total += readings[i];\n  }\n  return total;\n}",
        "correctCode": "function sumBarometerReadings(readings) {\n  let total = 0;\n  for (let i = 0; i < readings.length; i++) {\n    total += readings[i];\n  }\n  return total;\n}",
        "testCases": [
            {"id": "t1", "description": "sums 3 numbers", "args": [[10, 20, 30]], "expected": 60},
            {"id": "t2", "description": "sums single number", "args": [[45]], "expected": 45},
            {"id": "t3", "description": "handles empty array", "args": [[]], "expected": 0}
        ],
        "hints": ["Arrays in JavaScript start at index 0.", "The first element is at `readings[0]`.", "Change `let i = 1;` to `let i = 0;`."],
        "explanation": {
            "summary": "JavaScript arrays are zero-indexed.",
            "rootCause": "Initial loop counter i=1 omitted the first element.",
            "fixDetails": "Initialized loop index at 0.",
            "takeaway": "Always start standard array iteration at 0."
        }
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
            {"id": "t1", "description": "reads sound volume", "args": [{"volume": 85, "theme": "matrix"}, "volume"], "expected": 85},
            {"id": "t2", "description": "reads theme", "args": [{"volume": 85, "theme": "matrix"}, "theme"], "expected": "matrix"},
            {"id": "t3", "description": "returns undefined for missing property", "args": [{"a": 1}, "b"], "expected": None}
        ],
        "hints": ["Dot notation `obj.prop` looks for the literal identifier `prop`.", "Bracket notation `obj[prop]` evaluates the expression in brackets.", "Change `config.propKey` to `config[propKey]`."],
        "explanation": {
            "summary": "Bracket notation is required when property names are stored in variables.",
            "rootCause": "config.propKey searched for a property named 'propKey'.",
            "fixDetails": "Changed to bracket lookup config[propKey].",
            "takeaway": "Use brackets for dynamic property access."
        }
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
            {"id": "t1", "description": "adds string amounts", "args": ["25", "50"], "expected": 75},
            {"id": "t2", "description": "adds pure numbers", "args": [10, 20], "expected": 30},
            {"id": "t3", "description": "handles zero string", "args": ["0", "99"], "expected": 99}
        ],
        "hints": ["The `+` operator concatenates if either operand is a string.", "Convert both arguments to numbers before adding.", "Use `Number(amountA) + Number(amountB)`."],
        "explanation": {
            "summary": "In JavaScript, + performs concatenation whenever one operand is a string.",
            "rootCause": "Lack of numeric coercion led to string concatenation.",
            "fixDetails": "Wrapped both operands in Number().",
            "takeaway": "Always coerce input strings to numbers before arithmetic operations."
        }
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
            {"id": "t1", "description": "empty buffer returns true", "args": [[]], "expected": True},
            {"id": "t2", "description": "buffer with elements returns false", "args": [["ping", "ack"]], "expected": False},
            {"id": "t3", "description": "single element buffer returns false", "args": [["sync"]], "expected": False}
        ],
        "hints": ["Check `buffer.length = 0`.", "`=` assigns, while `===` compares.", "Change to `buffer.length === 0`."],
        "explanation": {
            "summary": "Single `=` is assignment; triple `===` is strict equality.",
            "rootCause": "Assigning 0 to length emptied the array and evaluated to falsy 0.",
            "fixDetails": "Replaced assignment with strict comparison.",
            "takeaway": "Never use single equals in conditionals."
        }
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
            {"id": "t1", "description": "counts active nodes", "args": [[{"active": True}, {"active": False}, {"active": True}]], "expected": 2},
            {"id": "t2", "description": "zero active nodes", "args": [[{"active": False}]], "expected": 0},
            {"id": "t3", "description": "empty list", "args": [[]], "expected": 0}
        ],
        "hints": ["Variables declared with `const` cannot be reassigned.", "Use `let` for variables that increment.", "Change `const activeCount = 0;` to `let activeCount = 0;`."],
        "explanation": {
            "summary": "const prevents variable reassignment.",
            "rootCause": "activeCount++ reassigns activeCount.",
            "fixDetails": "Changed const declaration to let.",
            "takeaway": "Use let for accumulators and counters."
        }
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
            {"id": "t1", "description": "finds peak in positive list", "args": [[14, 92, 45]], "expected": 92},
            {"id": "t2", "description": "finds peak in negative list", "args": [[-100, -35, -78]], "expected": -35},
            {"id": "t3", "description": "handles single item", "args": [[42]], "expected": 42}
        ],
        "hints": ["`Math.max` takes comma-separated numbers, not an array.", "Use the spread operator `...`.", "Return `Math.max(...signals)`."],
        "explanation": {
            "summary": "Math.max expects numbers as arguments; passing an array yields NaN.",
            "rootCause": "The array was passed as a single argument without spreading.",
            "fixDetails": "Spread the array elements using `...signals`.",
            "takeaway": "Always spread arrays when calling Math.max or Math.min."
        }
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
            {"id": "t1", "description": "matches code with spaces", "args": ["  CYBER_PASS  ", "CYBER_PASS"], "expected": True},
            {"id": "t2", "description": "matches clean code", "args": ["CYBER_PASS", "CYBER_PASS"], "expected": True},
            {"id": "t3", "description": "rejects wrong code", "args": ["WRONG", "CYBER_PASS"], "expected": False}
        ],
        "hints": ["Call `.trim()` on the entered passcode string.", "Whitespace creates mismatched character codes.", "Change to `entered.trim() === correctCode`."],
        "explanation": {
            "summary": "Trailing spaces and newlines prevent exact string matches.",
            "rootCause": "User input contained unstripped whitespace.",
            "fixDetails": "Added entered.trim() before comparison.",
            "takeaway": "Always trim input strings before checking security credentials."
        }
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
            {"id": "t1", "description": "filters secure packets", "args": [[{"id": 1, "secure": True}, {"id": 2, "secure": False}]], "expected": [{"id": 1, "secure": True}]},
            {"id": "t2", "description": "returns empty when none secure", "args": [[{"id": 1, "secure": False}]], "expected": []},
            {"id": "t3", "description": "handles empty array", "args": [[]], "expected": []}
        ],
        "hints": ["Arrow functions with `{ ... }` do not implicitly return values.", "Add an explicit `return` keyword.", "Write `return pkt.secure === true;`."],
        "explanation": {
            "summary": "Curly brace arrow functions require explicit return statements.",
            "rootCause": "Returning undefined inside filter drops all elements.",
            "fixDetails": "Added explicit return keyword.",
            "takeaway": "Either use concise expression body or include explicit return."
        }
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
            {"id": "t1", "description": "detects null", "args": [None], "expected": True},
            {"id": "t2", "description": "detects undefined", "args": [None], "expected": True},
            {"id": "t3", "description": "returns false for active status string", "args": ["ONLINE"], "expected": False}
        ],
        "hints": ["In JavaScript, `null == undefined` is true (loose equality).", "Or use `sensorStatus === null || sensorStatus === undefined`.", "Use `sensorStatus == null`."],
        "explanation": {
            "summary": "sensorStatus === null ignores undefined uninitialized values.",
            "rootCause": "Strict equality does not match undefined with null.",
            "fixDetails": "Used loose equality `== null` to catch both.",
            "takeaway": "Use `val == null` to concisely check for both null and undefined."
        }
    }
]

print(f"Loaded {len(new_challenges)} beginner extensions.")
