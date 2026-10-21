#!/usr/bin/env python3
import json
import os

catalog = []

def add_c(c_id, title, level, difficulty, category, story, bug_type, hint_line, pts, time_l, fn_name, starter, correct, test_cases, hints, expl, is_boss=False):
    catalog.append({
        "id": c_id,
        "title": title,
        "level": level,
        "difficulty": difficulty,
        "category": category,
        "story": story,
        "bugType": bug_type,
        "buggyLineHint": hint_line,
        "points": pts,
        "timeLimit": time_l,
        "functionName": fn_name,
        "starterCode": starter,
        "correctCode": correct,
        "testCases": test_cases,
        "hints": hints,
        "explanation": expl,
        "isBoss": is_boss
    })

# ==========================================
# LEVEL 1: BEGINNER (15 challenges: b4 to b18)
# ==========================================
add_c("b4_string_uppercase_immutable", "Access Gate: String Immutability Trap", 1, "Beginner", "Syntax & Variables",
    "The biometric gate scanner attempts to normalize badge codes to uppercase, but strings are immutable in JavaScript so calling toUpperCase without reassigning has no effect.",
    "Ignored return value of immutable string method", 2, 100, 90, "normalizeBadge",
    "function normalizeBadge(badge) {\n  // Bug: toUpperCase() returns a new string; it does not mutate\n  badge.toUpperCase();\n  return badge;\n}",
    "function normalizeBadge(badge) {\n  return badge.toUpperCase();\n}",
    [{"id": "t1", "description": "converts lowercase to uppercase", "args": ["agent007"], "expected": "AGENT007"},
     {"id": "t2", "description": "handles mixed case", "args": ["CyberBot"], "expected": "CYBERBOT"},
     {"id": "t3", "description": "preserves uppercase", "args": ["ROOT"], "expected": "ROOT"}],
    ["Strings in JavaScript are immutable.", "Calling `badge.toUpperCase()` does not change `badge`.", "Return `badge.toUpperCase()` directly."],
    {"summary": "String methods return new strings rather than mutating the original.", "rootCause": "The return value of toUpperCase was discarded.", "fixDetails": "Returned the result of badge.toUpperCase().", "takeaway": "Always capture the return value when manipulating JavaScript strings."}
)

add_c("b5_parseint_binary_radix", "Cyber Deck: Binary Stream Parsing", 1, "Beginner", "Syntax & Variables",
    "The terminal reads raw binary telemetry packets (e.g., '1011'), but parseInt defaults to base 10 unless a radix of 2 is provided.",
    "Missing Radix in parseInt", 2, 100, 90, "parseBinaryPacket",
    "function parseBinaryPacket(binaryStr) {\n  // Bug: defaults to decimal base 10\n  return parseInt(binaryStr);\n}",
    "function parseBinaryPacket(binaryStr) {\n  return parseInt(binaryStr, 2);\n}",
    [{"id": "t1", "description": "parses binary 1010 to 10", "args": ["1010"], "expected": 10},
     {"id": "t2", "description": "parses binary 1111 to 15", "args": ["1111"], "expected": 15},
     {"id": "t3", "description": "parses binary 10000 to 16", "args": ["10000"], "expected": 16}],
    ["`parseInt` accepts a second argument called `radix`.", "Binary numbers use base 2.", "Use `parseInt(binaryStr, 2)`."],
    {"summary": "parseInt treats its input as decimal without an explicit radix.", "rootCause": "'1010' was parsed as one thousand and ten.", "fixDetails": "Passed 2 as the radix parameter.", "takeaway": "Always pass the radix parameter when calling parseInt."}
)

add_c("b6_math_floor_casing", "Grid Regulator: Method Casing Typo", 1, "Beginner", "Syntax & Variables",
    "The power grid coordinator tries to round down power units, but crashes with TypeError: Math.Floor is not a function.",
    "Standard Library Method Casing Mismatch", 2, 100, 90, "floorPowerLevel",
    "function floorPowerLevel(val) {\n  // Bug: Floor is capitalized\n  return Math.Floor(val);\n}",
    "function floorPowerLevel(val) {\n  return Math.floor(val);\n}",
    [{"id": "t1", "description": "floors positive float", "args": [42.9], "expected": 42},
     {"id": "t2", "description": "floors whole number", "args": [10.0], "expected": 10},
     {"id": "t3", "description": "floors negative float", "args": [-2.5], "expected": -3}],
    ["JavaScript built-in methods are strictly case-sensitive.", "Check `Math.Floor` vs `Math.floor`.", "Change `Math.Floor` to lowercase `Math.floor`."],
    {"summary": "JavaScript built-ins are camelCase or lowercase.", "rootCause": "Capitalizing `Floor` caused a property lookup on undefined.", "fixDetails": "Lowercased `Math.Floor` to `Math.floor`.", "takeaway": "Verify case sensitivity when invoking standard JavaScript APIs."}
)

add_c("b7_array_push_return", "Inventory Cache: Push Return Trap", 1, "Beginner", "Arrays & Objects",
    "The backpack manager tries to append a gadget and return the updated list, but returns the new array length integer instead.",
    "Returning Array.prototype.push result", 2, 100, 90, "addGadgetToPack",
    "function addGadgetToPack(pack, gadget) {\n  // Bug: push returns the new array length, not the array\n  return pack.push(gadget);\n}",
    "function addGadgetToPack(pack, gadget) {\n  pack.push(gadget);\n  return pack;\n}",
    [{"id": "t1", "description": "appends gadget", "args": [["compass", "torch"], "laser"], "expected": ["compass", "torch", "laser"]},
     {"id": "t2", "description": "appends to empty list", "args": [[], "keycard"], "expected": ["keycard"]},
     {"id": "t3", "description": "handles numeric items", "args": [[1, 2], 3], "expected": [1, 2, 3]}],
    ["`Array.prototype.push` returns the new length of the array.", "Push the item first, then return `pack`.", "Change to `pack.push(gadget); return pack;`."],
    {"summary": "push() mutates the array and returns the length number.", "rootCause": "Returning the result of push returned a number instead of the array.", "fixDetails": "Pushed the item and returned pack explicitly.", "takeaway": "Be mindful of methods that mutate and return lengths vs those that return the array."}
)

add_c("b8_template_literal_backticks", "Alert Dispatcher: Static Quotes in Template", 1, "Beginner", "Syntax & Variables",
    "The console alert shows raw '${code}' instead of the dynamically injected error code because single quotes were used instead of template backticks.",
    "Single Quotes in Template Literal", 2, 100, 90, "formatAlertMessage",
    "function formatAlertMessage(code) {\n  // Bug: single quotes do not interpolate expressions\n  return 'System Alert Code: ${code}';\n}",
    "function formatAlertMessage(code) {\n  return `System Alert Code: ${code}`;\n}",
    [{"id": "t1", "description": "formats error 404", "args": ["ERR_404"], "expected": "System Alert Code: ERR_404"},
     {"id": "t2", "description": "formats numeric code", "args": [500], "expected": "System Alert Code: 500"},
     {"id": "t3", "description": "formats empty code", "args": [""], "expected": "System Alert Code: "}],
    ["String interpolation requires backtick characters (` `).", "Single quotes treat `${code}` literally.", "Use backticks around the template string."],
    {"summary": "Expression interpolation is only supported inside template literals delimited by backticks.", "rootCause": "Single quotes prevented interpolation.", "fixDetails": "Replaced quotes with backticks.", "takeaway": "Always enclose interpolated strings in backticks."}
)

add_c("b9_string_replace_global", "Data Sanitizer: Single Replace Delimiter", 1, "Beginner", "Strings & Regex",
    "The log formatter replaces hyphens with slashes, but only modifies the first hyphen encountered, producing '2026/10-15'.",
    "Single Match String Replace", 2, 100, 90, "replaceHyphensWithSlashes",
    "function replaceHyphensWithSlashes(str) {\n  // Bug: string.replace only replaces the first match\n  return str.replace('-', '/');\n}",
    "function replaceHyphensWithSlashes(str) {\n  return str.replaceAll('-', '/');\n}",
    [{"id": "t1", "description": "replaces both hyphens in date", "args": ["2026-10-15"], "expected": "2026/10/15"},
     {"id": "t2", "description": "replaces multiple dashes", "args": ["a-b-c-d"], "expected": "a/b/c/d"},
     {"id": "t3", "description": "handles no hyphens", "args": ["nodash"], "expected": "nodash"}],
    ["`str.replace(str, newStr)` only matches once.", "Use `replaceAll` or a global regex `/-/g`.", "Change `replace` to `replaceAll`."],
    {"summary": "String.prototype.replace with a string parameter replaces only the first occurrence.", "rootCause": "Subsequent hyphens were ignored.", "fixDetails": "Swapped replace for replaceAll.", "takeaway": "Use replaceAll when replacing all occurrences of a substring."}
)

add_c("b10_zero_index_loop", "Sensor Array: 1-Based Indexing Bug", 1, "Beginner", "Loops & Functions",
    "The atmospheric barometer sums up sensor readings, but skips reading #0 because its loop counter initializes at 1.",
    "Off-By-One Starting Index", 3, 100, 90, "sumBarometerReadings",
    "function sumBarometerReadings(readings) {\n  let total = 0;\n  // Bug: loop starts at 1, omitting readings[0]\n  for (let i = 1; i < readings.length; i++) {\n    total += readings[i];\n  }\n  return total;\n}",
    "function sumBarometerReadings(readings) {\n  let total = 0;\n  for (let i = 0; i < readings.length; i++) {\n    total += readings[i];\n  }\n  return total;\n}",
    [{"id": "t1", "description": "sums 3 numbers", "args": [[10, 20, 30]], "expected": 60},
     {"id": "t2", "description": "sums single number", "args": [[45]], "expected": 45},
     {"id": "t3", "description": "handles empty array", "args": [[]], "expected": 0}],
    ["Arrays in JavaScript start at index 0.", "The first element is at `readings[0]`.", "Change `let i = 1;` to `let i = 0;`."],
    {"summary": "JavaScript arrays are zero-indexed.", "rootCause": "Initial loop counter i=1 omitted the first element.", "fixDetails": "Initialized loop index at 0.", "takeaway": "Always start standard array iteration at 0."}
)

add_c("b11_dynamic_prop_lookup", "Config Reader: Dot vs Bracket Notation", 1, "Beginner", "Arrays & Objects",
    "The player configuration manager attempts to access dynamic keys like 'theme' or 'volume', but uses dot notation `config.propKey`, looking for a literal property called 'propKey'.",
    "Dot Notation on Dynamic Variable", 2, 100, 90, "readConfigKey",
    "function readConfigKey(config, propKey) {\n  // Bug: looks up literal key 'propKey' instead of variable propKey\n  return config.propKey;\n}",
    "function readConfigKey(config, propKey) {\n  return config[propKey];\n}",
    [{"id": "t1", "description": "reads sound volume", "args": [{"volume": 85, "theme": "matrix"}, "volume"], "expected": 85},
     {"id": "t2", "description": "reads theme", "args": [{"volume": 85, "theme": "matrix"}, "theme"], "expected": "matrix"},
     {"id": "t3", "description": "reads second property", "args": [{"a": 1, "b": 99}, "b"], "expected": 99}],
    ["Dot notation `obj.prop` looks for the literal identifier `prop`.", "Bracket notation `obj[prop]` evaluates the expression in brackets.", "Change `config.propKey` to `config[propKey]`."],
    {"summary": "Bracket notation is required when property names are stored in variables.", "rootCause": "config.propKey searched for a property named 'propKey'.", "fixDetails": "Changed to bracket lookup config[propKey].", "takeaway": "Use brackets for dynamic property access."}
)

add_c("b12_string_numeric_plus", "Coin Converter: String Addition Concatenation", 1, "Beginner", "Syntax & Variables",
    "The treasury ledger receives coin reward values from an input string, but '25' + '50' evaluates to '2550' instead of 75.",
    "String Concatenation with Plus Operator", 2, 100, 90, "addCoinRewards",
    "function addCoinRewards(amountA, amountB) {\n  // Bug: performs string concatenation if inputs are strings\n  return amountA + amountB;\n}",
    "function addCoinRewards(amountA, amountB) {\n  return Number(amountA) + Number(amountB);\n}",
    [{"id": "t1", "description": "adds string amounts", "args": ["25", "50"], "expected": 75},
     {"id": "t2", "description": "adds pure numbers", "args": [10, 20], "expected": 30},
     {"id": "t3", "description": "handles zero string", "args": ["0", "99"], "expected": 99}],
    ["The `+` operator concatenates if either operand is a string.", "Convert both arguments to numbers before adding.", "Use `Number(amountA) + Number(amountB)`."],
    {"summary": "In JavaScript, + performs concatenation whenever one operand is a string.", "rootCause": "Lack of numeric coercion led to string concatenation.", "fixDetails": "Wrapped both operands in Number().", "takeaway": "Always coerce input strings to numbers before arithmetic operations."}
)

add_c("b13_queue_assignment_in_if", "Buffer Check: Assignment Instead of Comparison", 1, "Beginner", "Conditionals & Logic",
    "The communication buffer validator tries to verify if a queue is empty, but uses a single `=` which truncates the array length to 0.",
    "Single Assignment Operator in Condition", 2, 100, 90, "isBufferCleared",
    "function isBufferCleared(buffer) {\n  // Bug: single equals assigns 0 to length!\n  if (buffer.length = 0) {\n    return true;\n  }\n  return false;\n}",
    "function isBufferCleared(buffer) {\n  return buffer.length === 0;\n}",
    [{"id": "t1", "description": "empty buffer returns true", "args": [[]], "expected": True},
     {"id": "t2", "description": "buffer with elements returns false", "args": [["ping", "ack"]], "expected": False},
     {"id": "t3", "description": "single element buffer returns false", "args": [["sync"]], "expected": False}],
    ["Check `buffer.length = 0`.", "`=` assigns, while `===` compares.", "Change to `buffer.length === 0`."],
    {"summary": "Single `=` is assignment; triple `===` is strict equality.", "rootCause": "Assigning 0 to length emptied the array and evaluated to falsy 0.", "fixDetails": "Replaced assignment with strict comparison.", "takeaway": "Never use single equals in conditionals."}
)

add_c("b14_const_reassignment", "Telemetry Counter: Const Reassignment", 1, "Beginner", "Syntax & Variables",
    "The signal counter crashes with TypeError: Assignment to constant variable when counting active transmitters.",
    "Const Variable Reassignment in Loop", 2, 100, 90, "countActiveNodes",
    "function countActiveNodes(nodes) {\n  // Bug: const cannot be incremented\n  const activeCount = 0;\n  for (let i = 0; i < nodes.length; i++) {\n    if (nodes[i].active) {\n      activeCount++;\n    }\n  }\n  return activeCount;\n}",
    "function countActiveNodes(nodes) {\n  let activeCount = 0;\n  for (let i = 0; i < nodes.length; i++) {\n    if (nodes[i].active) {\n      activeCount++;\n    }\n  }\n  return activeCount;\n}",
    [{"id": "t1", "description": "counts active nodes", "args": [[{"active": True}, {"active": False}, {"active": True}]], "expected": 2},
     {"id": "t2", "description": "zero active nodes", "args": [[{"active": False}]], "expected": 0},
     {"id": "t3", "description": "empty list", "args": [[]], "expected": 0}],
    ["Variables declared with `const` cannot be reassigned.", "Use `let` for variables that increment.", "Change `const activeCount = 0;` to `let activeCount = 0;`."],
    {"summary": "const prevents variable reassignment.", "rootCause": "activeCount++ reassigns activeCount.", "fixDetails": "Changed const declaration to let.", "takeaway": "Use let for accumulators and counters."}
)

add_c("b15_math_max_spread", "Waveform Analyzer: Math.max Array Argument", 1, "Beginner", "Syntax & Variables",
    "The oscilloscope passes an array directly into Math.max, resulting in NaN because Math.max expects individual numeric arguments.",
    "Passing Array directly to Math.max", 2, 100, 90, "getMaxSignalPeak",
    "function getMaxSignalPeak(signals) {\n  // Bug: Math.max([1, 2, 3]) returns NaN\n  return Math.max(signals);\n}",
    "function getMaxSignalPeak(signals) {\n  return Math.max(...signals);\n}",
    [{"id": "t1", "description": "finds peak in positive list", "args": [[14, 92, 45]], "expected": 92},
     {"id": "t2", "description": "finds peak in negative list", "args": [[-100, -35, -78]], "expected": -35},
     {"id": "t3", "description": "handles single item", "args": [[42]], "expected": 42}],
    ["`Math.max` takes comma-separated numbers, not an array.", "Use the spread operator `...`.", "Return `Math.max(...signals)`."],
    {"summary": "Math.max expects numbers as arguments; passing an array yields NaN.", "rootCause": "The array was passed as a single argument without spreading.", "fixDetails": "Spread the array elements using `...signals`.", "takeaway": "Always spread arrays when calling Math.max or Math.min."}
)

add_c("b16_string_trim_spaces", "Gatekeeper: Untrimmed Passcode Whitespace", 1, "Beginner", "Strings & Regex",
    "Authorized engineers are locked out of the mainframe because accidental leading or trailing spaces in the passcode field cause exact equality to fail.",
    "Missing String Trim", 2, 100, 90, "verifyPasscode",
    "function verifyPasscode(entered, correctCode) {\n  // Bug: untrimmed whitespace fails exact comparison\n  return entered === correctCode;\n}",
    "function verifyPasscode(entered, correctCode) {\n  return entered.trim() === correctCode;\n}",
    [{"id": "t1", "description": "matches code with spaces", "args": ["  CYBER_PASS  ", "CYBER_PASS"], "expected": True},
     {"id": "t2", "description": "matches clean code", "args": ["CYBER_PASS", "CYBER_PASS"], "expected": True},
     {"id": "t3", "description": "rejects wrong code", "args": ["WRONG", "CYBER_PASS"], "expected": False}],
    ["Call `.trim()` on the entered passcode string.", "Whitespace creates mismatched character codes.", "Change to `entered.trim() === correctCode`."],
    {"summary": "Trailing spaces and newlines prevent exact string matches.", "rootCause": "User input contained unstripped whitespace.", "fixDetails": "Added entered.trim() before comparison.", "takeaway": "Always trim input strings before checking security credentials."}
)

add_c("b17_array_filter_return", "Threat Filter: Missing Filter Predicate Return", 1, "Beginner", "Arrays & Objects",
    "The firewall packet screener filters out packets, but returns an empty array because its callback function body has no return statement.",
    "Missing Return in Callback Body", 3, 100, 90, "filterSecurePackets",
    "function filterSecurePackets(packets) {\n  return packets.filter(pkt => {\n    // Bug: block body with curly braces requires explicit return\n    pkt.secure === true;\n  });\n}",
    "function filterSecurePackets(packets) {\n  return packets.filter(pkt => {\n    return pkt.secure === true;\n  });\n}",
    [{"id": "t1", "description": "filters secure packets", "args": [[{"id": 1, "secure": True}, {"id": 2, "secure": False}]], "expected": [{"id": 1, "secure": True}]},
     {"id": "t2", "description": "returns empty when none secure", "args": [[{"id": 1, "secure": False}]], "expected": []},
     {"id": "t3", "description": "handles empty array", "args": [[]], "expected": []}],
    ["Arrow functions with `{ ... }` do not implicitly return values.", "Add an explicit `return` keyword.", "Write `return pkt.secure === true;`."],
    {"summary": "Curly brace arrow functions require explicit return statements.", "rootCause": "Returning undefined inside filter drops all elements.", "fixDetails": "Added explicit return keyword.", "takeaway": "Either use concise expression body or include explicit return."}
)

add_c("b18_strict_equality_null_undefined", "Health Check: Strict Null vs Undefined", 1, "Beginner", "Conditionals & Logic",
    "The diagnostic engine checks if status is missing using `status === null`, but uninitialized sensors have status `undefined`.",
    "Strict Null Check Failing on Undefined", 2, 100, 90, "isSensorMissing",
    "function isSensorMissing(sensorStatus) {\n  // Bug: strict === null does not catch undefined\n  return sensorStatus === null;\n}",
    "function isSensorMissing(sensorStatus) {\n  return sensorStatus == null;\n}",
    [{"id": "t1", "description": "detects null", "args": [None], "expected": True},
     {"id": "t2", "description": "detects undefined", "args": [None], "expected": True},
     {"id": "t3", "description": "returns false for active status string", "args": ["ONLINE"], "expected": False}],
    ["In JavaScript, `null == undefined` is true (loose equality).", "Or use `sensorStatus === null || sensorStatus === undefined`.", "Use `sensorStatus == null`."],
    {"summary": "sensorStatus === null ignores undefined uninitialized values.", "rootCause": "Strict equality does not match undefined with null.", "fixDetails": "Used loose equality `== null` to catch both.", "takeaway": "Use `val == null` to concisely check for both null and undefined."}
)

# ==========================================
# LEVEL 2: ELEMENTARY (15 challenges: e7 to e21)
# ==========================================
add_c("e7_switch_break_fallthrough", "Reactor Valve: Switch Case Fallthrough", 2, "Intermediate", "Conditionals & Logic",
    "The cooling valve sets low pressure in emergency mode, but because `break;` is missing, it falls through to the high pressure case.",
    "Missing Switch Break Statement", 5, 150, 120, "getValveFlow",
    "function getValveFlow(mode) {\n  let flow = 'OFFLINE';\n  switch (mode) {\n    case 'LOW':\n      flow = 'FLOW_LOW';\n      // Bug: missing break\n    case 'HIGH':\n      flow = 'FLOW_HIGH';\n      break;\n    default:\n      flow = 'FLOW_NORMAL';\n  }\n  return flow;\n}",
    "function getValveFlow(mode) {\n  let flow = 'OFFLINE';\n  switch (mode) {\n    case 'LOW':\n      flow = 'FLOW_LOW';\n      break;\n    case 'HIGH':\n      flow = 'FLOW_HIGH';\n      break;\n    default:\n      flow = 'FLOW_NORMAL';\n  }\n  return flow;\n}",
    [{"id": "t1", "description": "handles LOW mode correctly", "args": ["LOW"], "expected": "FLOW_LOW"},
     {"id": "t2", "description": "handles HIGH mode correctly", "args": ["HIGH"], "expected": "FLOW_HIGH"},
     {"id": "t3", "description": "handles default", "args": ["OTHER"], "expected": "FLOW_NORMAL"}],
    ["Without `break;`, JavaScript switch statements fall through.", "Notice what happens when `mode === 'LOW'`.", "Add `break;` after `flow = 'FLOW_LOW';`."],
    {"summary": "Switch cases fall through into subsequent cases unless broken.", "rootCause": "Missing break caused LOW to overwrite flow with HIGH.", "fixDetails": "Added break statement.", "takeaway": "Always terminate switch branches with break or return."}
)

add_c("e8_nullish_coalescing_zero", "Audio Synthesizer: Volume Zero Trap", 2, "Intermediate", "Conditionals & Logic",
    "When setting volume to 0 (mute), the synthesizer defaults to 50 because `||` treats numeric 0 as falsy.",
    "Logical OR instead of Nullish Coalescing", 3, 150, 120, "resolveVolume",
    "function resolveVolume(userVolume) {\n  // Bug: 0 is falsy, 0 || 50 evaluates to 50\n  return userVolume || 50;\n}",
    "function resolveVolume(userVolume) {\n  return userVolume ?? 50;\n}",
    [{"id": "t1", "description": "preserves zero volume", "args": [0], "expected": 0},
     {"id": "t2", "description": "uses custom volume", "args": [80], "expected": 80},
     {"id": "t3", "description": "defaults on null/undefined", "args": [None], "expected": 50}],
    ["The number `0` is falsy in JavaScript.", "`0 || 50` returns `50`.", "Use the nullish coalescing operator `??`."],
    {"summary": "Logical OR overrides valid 0 with the fallback default.", "rootCause": "Coercion of 0 to falsy.", "fixDetails": "Replaced || with ??.", "takeaway": "Use ?? when 0 or false are valid inputs."}
)

add_c("e9_array_slice_vs_splice", "Audit Vault: Splice In-Place Mutation", 2, "Intermediate", "Arrays & Objects",
    "The transaction inspector extracts the first two records for preview, but `splice` mutates the input array and removes items permanently.",
    "Array.prototype.splice Mutating Original Array", 2, 150, 120, "peekTransactions",
    "function peekTransactions(txList) {\n  // Bug: splice mutates txList in place\n  return txList.splice(0, 2);\n}",
    "function peekTransactions(txList) {\n  return txList.slice(0, 2);\n}",
    [{"id": "t1", "description": "peeks first two records", "args": [["tx1", "tx2", "tx3", "tx4"]], "expected": ["tx1", "tx2"]},
     {"id": "t2", "description": "handles small array", "args": [["txA"]], "expected": ["txA"]},
     {"id": "t3", "description": "handles empty array", "args": [[]], "expected": []}],
    ["`splice` mutates the array; `slice` creates a copy.", "Replace `splice` with `slice`.", "Return `txList.slice(0, 2)`."],
    {"summary": "splice modifies arrays in-place while slice is pure.", "rootCause": "Mutating caller data causes downstream corruption.", "fixDetails": "Replaced splice with slice.", "takeaway": "Use slice for non-destructive sub-array slicing."}
)

add_c("e10_array_includes_object_ref", "Clearance Gate: Object Reference Includes", 2, "Intermediate", "Arrays & Objects",
    "The access system tests if a badge is authorized via `badgeList.includes({ id })`, which always returns false due to object reference inequality.",
    "Object Reference Mismatch in includes()", 2, 150, 120, "isBadgeValid",
    "function isBadgeValid(badgeList, targetId) {\n  // Bug: new object reference is never === existing object\n  return badgeList.includes({ id: targetId });\n}",
    "function isBadgeValid(badgeList, targetId) {\n  return badgeList.some(b => b.id === targetId);\n}",
    [{"id": "t1", "description": "finds authorized badge", "args": [[{"id": "SEC_1"}, {"id": "SEC_2"}], "SEC_2"], "expected": True},
     {"id": "t2", "description": "returns false for missing badge", "args": [[{"id": "SEC_1"}], "SEC_9"], "expected": False},
     {"id": "t3", "description": "handles empty list", "args": [[], "SEC_1"], "expected": False}],
    ["`includes` compares objects with `===` (reference equality).", "Two objects with matching keys have different memory addresses.", "Use `badgeList.some(b => b.id === targetId)`."],
    {"summary": "Array.includes cannot match objects by property values.", "rootCause": "New object reference did not match array object reference.", "fixDetails": "Swapped includes with some checking the id property.", "takeaway": "Use some() or find() when matching objects in arrays."}
)

add_c("e11_numeric_sort_comparator", "Leaderboard: Lexicographical Sort Trap", 2, "Intermediate", "Arrays & Objects",
    "High scores are sorted, but 100 appears before 20 because default sort converts numbers to strings.",
    "Missing Numeric Sort Comparator", 2, 150, 120, "rankScoresAscending",
    "function rankScoresAscending(scores) {\n  // Bug: default sort() sorts alphabetically: [1, 100, 20]\n  return scores.sort();\n}",
    "function rankScoresAscending(scores) {\n  return [...scores].sort((a, b) => a - b);\n}",
    [{"id": "t1", "description": "sorts numbers numerically", "args": [[100, 20, 5, 1]], "expected": [1, 5, 20, 100]},
     {"id": "t2", "description": "sorts negative numbers", "args": [[10, -5, 0, 3]], "expected": [-5, 0, 3, 10]},
     {"id": "t3", "description": "handles single item", "args": [[42]], "expected": [42]}],
    ["Default `.sort()` sorts alphabetically.", "Provide a comparator `(a, b) => a - b`.", "Use `[...scores].sort((a, b) => a - b)`."],
    {"summary": "Array.sort() without comparator sorts as UTF-16 strings.", "rootCause": "\"100\" is lexicographically smaller than \"20\".", "fixDetails": "Provided numeric comparator callback.", "takeaway": "Always pass a comparator to sort() when ordering numbers."}
)

add_c("e12_negative_modulo_wrap", "Navigation Compass: Negative Modulo Wrap", 2, "Intermediate", "Conditionals & Logic",
    "The aircraft compass rotates left into negative degrees, but JavaScript `%` returns negative numbers instead of positive modulo.",
    "Negative Remainder vs Mathematical Modulo", 2, 150, 120, "wrapCompassAngle",
    "function wrapCompassAngle(deg) {\n  // Bug: in JS, -45 % 360 is -45\n  return deg % 360;\n}",
    "function wrapCompassAngle(deg) {\n  return ((deg % 360) + 360) % 360;\n}",
    [{"id": "t1", "description": "wraps negative angle", "args": [-45], "expected": 315},
     {"id": "t2", "description": "wraps positive overflow", "args": [400], "expected": 40},
     {"id": "t3", "description": "handles 0", "args": [0], "expected": 0}],
    ["In JS `%` is the remainder operator, not mathematical modulo.", "Negative dividends yield negative remainders.", "Use `((deg % 360) + 360) % 360`."],
    {"summary": "JavaScript % computes remainders that preserve sign.", "rootCause": "Negative angles remained negative.", "fixDetails": "Applied positive modulo formula.", "takeaway": "Use ((x % m) + m) % m for circular positive indexing."}
)

add_c("e13_nan_equality_trap", "Data Scrubbing: Direct NaN Comparison", 2, "Intermediate", "Conditionals & Logic",
    "Corrupted sensor data is flagged via `Number(str) === NaN`, which always returns false because NaN never equals itself.",
    "Direct Equality Check on NaN", 2, 150, 120, "isSignalCorrupted",
    "function isSignalCorrupted(str) {\n  // Bug: Number(str) === NaN is always false\n  return Number(str) === NaN;\n}",
    "function isSignalCorrupted(str) {\n  return Number.isNaN(Number(str));\n}",
    [{"id": "t1", "description": "detects non-numeric string as NaN", "args": ["CORRUPTED_HEX"], "expected": True},
     {"id": "t2", "description": "valid zero returns false", "args": ["0"], "expected": False},
     {"id": "t3", "description": "valid float string returns false", "args": ["4.2"], "expected": False}],
    ["`Number(str) === NaN` is always false.", "Use `Number.isNaN(Number(str))`.", "Return `Number.isNaN(Number(str))`."],
    {"summary": "NaN is not equal to any value, including itself.", "rootCause": "Strict equality comparison with NaN always fails.", "fixDetails": "Used Number.isNaN().", "takeaway": "Always use Number.isNaN() to test for NaN."}
)

add_c("e14_object_keys_length", "Payload Validator: Object Length Check", 2, "Intermediate", "Arrays & Objects",
    "The microservice checks if an options dictionary is empty via `options.length === 0`, but plain objects do not have a `.length` property.",
    "Object.prototype Missing Length Property", 2, 150, 120, "isPayloadEmpty",
    "function isPayloadEmpty(payload) {\n  // Bug: plain objects have no .length property\n  return payload.length === 0;\n}",
    "function isPayloadEmpty(payload) {\n  return Object.keys(payload).length === 0;\n}",
    [{"id": "t1", "description": "empty object returns true", "args": [{}] , "expected": True},
     {"id": "t2", "description": "populated object returns false", "args": [{"key": "val"}], "expected": False},
     {"id": "t3", "description": "multiple keys returns false", "args": [{"a": 1, "b": 2}], "expected": False}],
    ["Plain objects `{}` do not have a `.length` property.", "Use `Object.keys(payload).length === 0`.", "Change to `Object.keys(payload).length === 0`."],
    {"summary": "Plain JavaScript objects do not define a length property.", "rootCause": "payload.length evaluates to undefined, so undefined === 0 is false.", "fixDetails": "Checked length of Object.keys(payload).", "takeaway": "Use Object.keys() to measure property count on objects."}
)

add_c("e15_array_flat_depth", "Folder Flattener: Array.flat Depth Trap", 2, "Intermediate", "Arrays & Objects",
    "The directory flattener calls `arr.flat()` on a 3-level deep nested folder structure, but flat defaults to depth 1.",
    "Default Depth in Array.prototype.flat", 2, 150, 120, "flattenAllFiles",
    "function flattenAllFiles(folders) {\n  // Bug: flat() defaults to depth 1\n  return folders.flat();\n}",
    "function flattenAllFiles(folders) {\n  return folders.flat(Infinity);\n}",
    [{"id": "t1", "description": "flattens 3-level deep array", "args": [[["f1", ["f2", ["f3"]]]]], "expected": ["f1", "f2", "f3"]},
     {"id": "t2", "description": "flattens 2-level array", "args": [[["a"], ["b", ["c"]]]], "expected": ["a", "b", "c"]},
     {"id": "t3", "description": "handles flat array", "args": [["x", "y"]], "expected": ["x", "y"]}],
    ["`Array.prototype.flat()` only flattens one level by default.", "Pass `Infinity` to recursively flatten all levels.", "Use `folders.flat(Infinity)`."],
    {"summary": "Array.flat() requires an explicit depth argument to flatten deep trees.", "rootCause": "Default depth 1 left inner arrays nested.", "fixDetails": "Passed Infinity to flat().", "takeaway": "Use flat(Infinity) for full recursive array flattening."}
)

add_c("e16_string_split_whitespace", "Command Parser: Split Delimiter Whitespace", 2, "Intermediate", "Strings & Regex",
    "The CLI command executor splits comma-delimited arguments, but leaves whitespace attached to tokens ('arg1, arg2' becomes ['arg1', ' arg2']).",
    "Missing Trim After String Split", 2, 150, 120, "parseCommaTokens",
    "function parseCommaTokens(raw) {\n  // Bug: leaves leading/trailing whitespace on elements\n  return raw.split(',');\n}",
    "function parseCommaTokens(raw) {\n  return raw.split(',').map(s => s.trim()).filter(Boolean);\n}",
    [{"id": "t1", "description": "parses and trims spaced tokens", "args": ["apple, banana, cherry"], "expected": ["apple", "banana", "cherry"]},
     {"id": "t2", "description": "cleans extra spaces", "args": ["one,  two , three "], "expected": ["one", "two", "three"]},
     {"id": "t3", "description": "handles single item", "args": [" solitary "], "expected": ["solitary"]}],
    ["Splitting by `','` keeps spaces in tokens.", "Map over the results and call `.trim()` on each.", "Use `raw.split(',').map(s => s.trim()).filter(Boolean)`."],
    {"summary": "Splitting by character preserves adjacent whitespace.", "rootCause": "Tokens retained leading spaces.", "fixDetails": "Mapped with .trim() and filtered empty tokens.", "takeaway": "Always trim tokens after splitting user inputs."}
)

add_c("e17_boolean_filter_falsy", "Telemetry Filter: Falsy Value Stripping", 2, "Intermediate", "Conditionals & Logic",
    "The sensor cleaner removes invalid measurements using `.filter(Boolean)`, but valid readings of 0 degrees are inadvertently purged.",
    "Filter Boolean Removing Valid Zero", 2, 150, 120, "cleanTemperatureReadings",
    "function cleanTemperatureReadings(readings) {\n  // Bug: 0 is falsy, so 0 is removed!\n  return readings.filter(Boolean);\n}",
    "function cleanTemperatureReadings(readings) {\n  return readings.filter(v => v !== null && v !== undefined && !Number.isNaN(v));\n}",
    [{"id": "t1", "description": "preserves zero temperature", "args": [[15, 0, -5, None]], "expected": [15, 0, -5]},
     {"id": "t2", "description": "removes undefined and NaN", "args": [[0, None, float('nan'), 22]], "expected": [0, 22]},
     {"id": "t3", "description": "handles clean array", "args": [[0, 1, 2]], "expected": [0, 1, 2]}],
    ["`Boolean(0)` evaluates to `false`.", "Using `.filter(Boolean)` drops zeros.", "Filter explicitly: `v => v != null && !Number.isNaN(v)`."],
    {"summary": ".filter(Boolean) purges all falsy values, including valid numeric 0.", "rootCause": "0 was coerced to false.", "fixDetails": "Explicitly checked for null, undefined, and NaN.", "takeaway": "Do not use .filter(Boolean) when 0 or false are legitimate data."}
)

add_c("e18_json_parse_reviver_dates", "Message Queue: JSON Date String Deserialization", 2, "Intermediate", "Strings & Regex",
    "The queue consumer parses incoming JSON messages, but ISO date strings remain strings rather than Date objects.",
    "JSON.parse Leaving Date Strings Unparsed", 2, 150, 120, "parseJsonWithDate",
    "function parseJsonWithDate(jsonStr) {\n  // Bug: JSON.parse does not convert ISO strings to Date instances\n  return JSON.parse(jsonStr);\n}",
    "function parseJsonWithDate(jsonStr) {\n  return JSON.parse(jsonStr, (key, value) => {\n    if (key === 'timestamp' && typeof value === 'string') {\n      return new Date(value).toISOString();\n    }\n    return value;\n  });\n}",
    [{"id": "t1", "description": "parses and normalizes timestamp", "args": ["{\"id\":101,\"timestamp\":\"2026-10-15T00:00:00.000Z\"}"], "expected": {"id": 101, "timestamp": "2026-10-15T00:00:00.000Z"}},
     {"id": "t2", "description": "handles payload without date", "args": ["{\"name\":\"Alpha\"}"], "expected": {"name": "Alpha"}}],
    ["JSON has no native Date data type.", "Use the reviver callback parameter of `JSON.parse`.", "Convert date fields inside the reviver function."],
    {"summary": "JSON.parse produces string primitives for dates.", "rootCause": "Missing reviver function during parsing.", "fixDetails": "Used reviver callback in JSON.parse.", "takeaway": "Use revivers to transform ISO strings to rich representations."}
)

add_c("e19_object_assign_target_mutation", "State Manager: Object.assign Target Mutation", 2, "Intermediate", "Arrays & Objects",
    "The redux-style state updater calls `Object.assign(state, update)`, modifying the previous state object directly instead of creating a fresh copy.",
    "Mutating First Argument in Object.assign", 2, 150, 120, "mergeStateImmutably",
    "function mergeStateImmutably(state, update) {\n  // Bug: mutates state directly\n  return Object.assign(state, update);\n}",
    "function mergeStateImmutably(state, update) {\n  return Object.assign({}, state, update);\n}",
    [{"id": "t1", "description": "creates merged state without mutating target", "args": [{"theme": "dark"}, {"volume": 90}], "expected": {"theme": "dark", "volume": 90}},
     {"id": "t2", "description": "overwrites keys", "args": [{"a": 1, "b": 2}, {"b": 99}], "expected": {"a": 1, "b": 99}}],
    ["`Object.assign(target, ...sources)` mutates `target`.", "Pass `{}` as the first argument.", "Use `Object.assign({}, state, update)`."],
    {"summary": "Object.assign modifies its first argument in place.", "rootCause": "Original state was passed as the mutation target.", "fixDetails": "Passed an empty object literal `{}` as target.", "takeaway": "Always supply an empty `{}` as target for immutable Object.assign."}
)

add_c("e20_array_some_predicate_return", "Permission Guard: Array.some Predicate Typo", 2, "Intermediate", "Arrays & Objects",
    "The security scanner tests if any roles have admin access, but uses `=` inside the `.some()` callback, assigning instead of checking.",
    "Assignment in Array.some Predicate", 2, 150, 120, "hasAdminRole",
    "function hasAdminRole(roles) {\n  // Bug: single equals assigns 'ADMIN'\n  return roles.some(r => r = 'ADMIN');\n}",
    "function hasAdminRole(roles) {\n  return roles.some(r => r === 'ADMIN');\n}",
    [{"id": "t1", "description": "detects admin in list", "args": [["USER", "ADMIN", "EDITOR"]], "expected": True},
     {"id": "t2", "description": "returns false when no admin", "args": [["USER", "GUEST"]], "expected": False},
     {"id": "t3", "description": "handles empty list", "args": [[]], "expected": False}],
    ["Look at `r = 'ADMIN'` inside the callback.", "Single `=` assigns; use `===`.", "Change to `roles.some(r => r === 'ADMIN')`."],
    {"summary": "Assignment inside some() callback always returns truthy 'ADMIN'.", "rootCause": "Every non-empty array triggered a false positive.", "fixDetails": "Replaced assignment with strict equality.", "takeaway": "Watch out for single = inside arrow functions."}
)

add_c("e21_boss_circuit_breaker", "Zone 02 Boss: Circuit Breaker Flapping Loop", 2, "Intermediate", "Conditionals & Logic",
    "BOSS DAEMON: The electrical substation breaker monitors failure counts. When failures reach threshold, it trips to OPEN, but on the next check it resets to CLOSED without a cooldown timer.",
    "Circuit Breaker State Transition Flapping", 5, 250, 150, "evaluateBreakerState",
    "function evaluateBreakerState(currentState, failureCount, threshold, hasCooledDown) {\n  // Bug: resets to CLOSED when failures drop without checking hasCooledDown\n  if (failureCount >= threshold) {\n    return 'OPEN';\n  }\n  return 'CLOSED';\n}",
    "function evaluateBreakerState(currentState, failureCount, threshold, hasCooledDown) {\n  if (currentState === 'OPEN') {\n    return hasCooledDown ? 'HALF_OPEN' : 'OPEN';\n  }\n  if (failureCount >= threshold) {\n    return 'OPEN';\n  }\n  return 'CLOSED';\n}",
    [{"id": "t1", "description": "trips open on threshold", "args": ["CLOSED", 5, 5, False], "expected": "OPEN"},
     {"id": "t2", "description": "maintains OPEN before cooldown", "args": ["OPEN", 2, 5, False], "expected": "OPEN"},
     {"id": "t3", "description": "transitions to HALF_OPEN after cooldown", "args": ["OPEN", 1, 5, True], "expected": "HALF_OPEN"}],
    ["A circuit breaker in state 'OPEN' should not instantly reset.", "Check `currentState === 'OPEN'` before evaluating failure count.", "Return 'HALF_OPEN' if cooled down, else 'OPEN'."],
    {"summary": "Circuit breakers must respect cooldown states to avoid rapid flapping.", "rootCause": "The breaker reverted to CLOSED while still hot.", "fixDetails": "Implemented proper FSM transitions for OPEN and HALF_OPEN.", "takeaway": "Model state transitions explicitly when designing circuit breakers."}
    , is_boss=True
)

# ==========================================
# LEVEL 3: INTERMEDIATE (15 challenges: i8 to i22)
# ==========================================
add_c("i8_closure_loop_var", "Drone Squadron: Var Closure Scoping Leak", 3, "Intermediate", "Loops & Functions",
    "The drone fleet generates ID callbacks in a loop using `var i`. All callbacks return the same final index because `var` is function-scoped.",
    "Var Loop Closure Variable Leaking", 3, 200, 150, "createDroneRoster",
    "function createDroneRoster(count) {\n  const callbacks = [];\n  // Bug: var i creates a single function-scoped variable\n  for (var i = 0; i < count; i++) {\n    callbacks.push(() => i);\n  }\n  return callbacks.map(fn => fn());\n}",
    "function createDroneRoster(count) {\n  const callbacks = [];\n  for (let i = 0; i < count; i++) {\n    callbacks.push(() => i);\n  }\n  return callbacks.map(fn => fn());\n}",
    [{"id": "t1", "description": "creates roster of 3 drones", "args": [3], "expected": [0, 1, 2]},
     {"id": "t2", "description": "creates roster of 1 drone", "args": [1], "expected": [0]},
     {"id": "t3", "description": "handles zero drones", "args": [0], "expected": []}],
    ["Notice `var i = 0` in the loop header.", "`var` is hoisted and shared across iterations.", "Change `var i = 0` to `let i = 0`."],
    {"summary": "var declares a function-scoped variable, whereas let binds per iteration.", "rootCause": "All closures shared the final value of i.", "fixDetails": "Replaced var with let.", "takeaway": "Always use let in loops when capturing loop indices in closures."}
)

add_c("i9_shallow_copy_nested", "Cyber Profile: Shallow Spread Mutation", 3, "Intermediate", "Arrays & Objects",
    "The user profile cloner uses `{ ...user }` to duplicate an account, but updating nested security roles mutates the original template user object.",
    "Shallow Copying Nested Object Mutation", 3, 200, 150, "promoteClonedUser",
    "function promoteClonedUser(user) {\n  // Bug: shallow copy shares reference to nested permissions\n  const clone = { ...user };\n  clone.permissions.role = 'ADMIN';\n  return clone.permissions.role;\n}",
    "function promoteClonedUser(user) {\n  const clone = { ...user, permissions: { ...user.permissions, role: 'ADMIN' } };\n  return clone.permissions.role;\n}",
    [{"id": "t1", "description": "promotes user immutably", "args": [{"name": "Neo", "permissions": {"role": "USER"}}], "expected": "ADMIN"},
     {"id": "t2", "description": "handles guest promotion", "args": [{"name": "Trinity", "permissions": {"role": "GUEST"}}], "expected": "ADMIN"}],
    ["Spread operator `{ ...obj }` is shallow.", "Nested objects are still copied by reference.", "Clone `permissions`: `{ ...user, permissions: { ...user.permissions, role: 'ADMIN' } }`."],
    {"summary": "Shallow copying does not duplicate nested child objects.", "rootCause": "Mutating clone.permissions mutated the caller object.", "fixDetails": "Spread nested permissions object as well.", "takeaway": "Always clone nested object properties when mutating."}
)

add_c("i10_reduce_empty_initial", "Ledger Auditor: Reduce Missing Initializer", 3, "Intermediate", "Arrays & Objects",
    "The financial audit microservice crashes with TypeError: Reduce of empty array with no initial value when auditing new accounts with zero transactions.",
    "Missing Initial Value in reduce()", 2, 200, 150, "calculateTotalLedger",
    "function calculateTotalLedger(transactions) {\n  // Bug: reduce on empty array throws TypeError\n  return transactions.reduce((acc, curr) => acc + curr.amount);\n}",
    "function calculateTotalLedger(transactions) {\n  return transactions.reduce((acc, curr) => acc + curr.amount, 0);\n}",
    [{"id": "t1", "description": "sums transaction amounts", "args": [[{"amount": 100}, {"amount": -30}, {"amount": 50}]], "expected": 120},
     {"id": "t2", "description": "handles empty array safely", "args": [[]], "expected": 0},
     {"id": "t3", "description": "handles single item", "args": [[{"amount": 42}]], "expected": 42}],
    ["What happens if `transactions` is `[]`?", "`reduce` requires an initial value to handle empty arrays.", "Pass `0` as second argument: `reduce((acc, c) => acc + c.amount, 0)`."],
    {"summary": "Array.reduce without an initial value throws on empty arrays.", "rootCause": "Empty arrays provide no initial accumulator.", "fixDetails": "Supplied 0 as the initial value.", "takeaway": "Always provide an initial value to reduce()."}
)

add_c("i11_regex_stateful_lastindex", "Firewall Filter: Regex Stateful LastIndex", 3, "Intermediate", "Strings & Regex",
    "The packet inspector uses a global regex (`/auth/g`) to test routes. Alternating requests fail because global regexes maintain internal `lastIndex` state.",
    "Global Regex lastIndex Mutation in test()", 1, 200, 150, "filterAuthEndpoints",
    "const AUTH_REGEX = /auth/g;\nfunction filterAuthEndpoints(endpoints) {\n  // Bug: global regex advances lastIndex on every test()\n  return endpoints.filter(e => AUTH_REGEX.test(e));\n}",
    "function filterAuthEndpoints(endpoints) {\n  const regex = /auth/;\n  return endpoints.filter(e => regex.test(e));\n}",
    [{"id": "t1", "description": "matches consecutive valid auth endpoints", "args": [["/auth/login", "/auth/signup", "/auth/token"]], "expected": ["/auth/login", "/auth/signup", "/auth/token"]},
     {"id": "t2", "description": "filters non-auth endpoints", "args": [["/auth/login", "/home", "/about"]], "expected": ["/auth/login"]},
     {"id": "t3", "description": "handles empty list", "args": [[]], "expected": []}],
    ["Regular expressions with `/g` flag maintain state.", "Each call to `.test()` updates `lastIndex`.", "Remove the `/g` flag or use a local `/auth/` regex."],
    {"summary": "Global RegExp objects are stateful across multiple test() invocations.", "rootCause": "lastIndex advanced past matches on subsequent calls.", "fixDetails": "Removed /g flag to make regex stateless.", "takeaway": "Do not reuse global regexes with test()."}
)

add_c("i12_matrix_transposition", "Radar Grid: Matrix Axis Inversion", 3, "Intermediate", "Arrays & Objects",
    "The spatial radar transposes a 2D matrix of sensor points, but assigns `result[i][j] = matrix[i][j]`, resulting in a duplicate instead of a transposed grid.",
    "Matrix Index Inversion in Transposition", 5, 200, 150, "transposeRadarGrid",
    "function transposeRadarGrid(matrix) {\n  const rows = matrix.length;\n  const cols = matrix[0].length;\n  const result = Array.from({ length: cols }, () => Array(rows).fill(0));\n  for (let i = 0; i < rows; i++) {\n    for (let j = 0; j < cols; j++) {\n      // Bug: assigns matrix[i][j] to result[i][j]\n      result[i][j] = matrix[i][j];\n    }\n  }\n  return result;\n}",
    "function transposeRadarGrid(matrix) {\n  const rows = matrix.length;\n  const cols = matrix[0].length;\n  const result = Array.from({ length: cols }, () => Array(rows).fill(0));\n  for (let i = 0; i < rows; i++) {\n    for (let j = 0; j < cols; j++) {\n      result[j][i] = matrix[i][j];\n    }\n  }\n  return result;\n}",
    [{"id": "t1", "description": "transposes 2x3 matrix", "args": [[[1, 2, 3], [4, 5, 6]]], "expected": [[1, 4], [2, 5], [3, 6]]},
     {"id": "t2", "description": "transposes 2x2 matrix", "args": [[[1, 2], [3, 4]]], "expected": [[1, 3], [2, 4]]}],
    ["In matrix transposition, row `i` and col `j` are swapped.", "Change `result[i][j]` to `result[j][i]`.", "Write `result[j][i] = matrix[i][j];`."],
    {"summary": "Transposition maps element (i, j) to (j, i).", "rootCause": "Indices were not swapped during assignment.", "fixDetails": "Assigned to result[j][i].", "takeaway": "Always swap indices when computing matrix transpositions."}
)

add_c("i13_anagram_length_check", "Cipher Decryption: Anagram Length Guard", 3, "Intermediate", "Strings & Regex",
    "The decrypter validates anagrams using a character count dictionary, but fails to check if lengths match, causing subset words ('hell' and 'hello') to pass.",
    "Missing Length Check in Anagram Validator", 2, 200, 150, "validateAnagramPair",
    "function validateAnagramPair(a, b) {\n  // Bug: missing early length comparison\n  const counts = {};\n  for (let ch of a) counts[ch] = (counts[ch] || 0) + 1;\n  for (let ch of b) {\n    if (!counts[ch]) return false;\n    counts[ch]--;\n  }\n  return true;\n}",
    "function validateAnagramPair(a, b) {\n  if (a.length !== b.length) return false;\n  const counts = {};\n  for (let ch of a) counts[ch] = (counts[ch] || 0) + 1;\n  for (let ch of b) {\n    if (!counts[ch]) return false;\n    counts[ch]--;\n  }\n  return true;\n}",
    [{"id": "t1", "description": "validates genuine anagrams", "args": ["listen", "silent"], "expected": True},
     {"id": "t2", "description": "rejects different length words", "args": ["hello", "hell"], "expected": False},
     {"id": "t3", "description": "rejects anagram mismatches", "args": ["rat", "car"], "expected": False}],
    ["If `a.length !== b.length`, they can never be anagrams.", "Add an early return check at the start.", "Write `if (a.length !== b.length) return false;`."],
    {"summary": "Anagrams must have identical length and identical character counts.", "rootCause": "Subset strings exhausted counts without checking residual characters.", "fixDetails": "Added early length check.", "takeaway": "Always enforce dimension equality before frequency counting."}
)

add_c("i14_array_chunking_remainder", "Batch Processor: Array Chunking Remainder Drop", 3, "Intermediate", "Arrays & Objects",
    "The queue chunker divides array items into chunks of size K, but drops the last chunk if the array length is not evenly divisible by K.",
    "Dropped Final Remainder Chunk", 4, 200, 150, "chunkTelemetryBatches",
    "function chunkTelemetryBatches(items, size) {\n  const chunks = [];\n  // Bug: i + size <= items.length stops before the last uneven chunk!\n  for (let i = 0; i + size <= items.length; i += size) {\n    chunks.push(items.slice(i, i + size));\n  }\n  return chunks;\n}",
    "function chunkTelemetryBatches(items, size) {\n  const chunks = [];\n  for (let i = 0; i < items.length; i += size) {\n    chunks.push(items.slice(i, i + size));\n  }\n  return chunks;\n}",
    [{"id": "t1", "description": "chunks with remainder", "args": [[1, 2, 3, 4, 5], 2], "expected": [[1, 2], [3, 4], [5]]},
     {"id": "t2", "description": "chunks evenly divisible array", "args": [[1, 2, 3, 4], 2], "expected": [[1, 2], [3, 4]]},
     {"id": "t3", "description": "handles empty array", "args": [[]], "expected": []}],
    ["`slice(i, i + size)` safely handles lengths beyond the array bound.", "The loop condition should simply be `i < items.length`.", "Change loop condition to `i < items.length`."],
    {"summary": "Loop condition `i + size <= items.length` dropped remainder slices.", "rootCause": "Terminating early when remainder < size.", "fixDetails": "Changed condition to `i < items.length`.", "takeaway": "Array.slice automatically clamps to array length, so iterate until `i < length`."}
)

add_c("i15_set_dedup_object_ref", "Telemetry Registry: Set Object Reference Trap", 3, "Intermediate", "Arrays & Objects",
    "The registry attempts to deduplicate sensor events by passing an array of objects into `new Set()`, which fails because distinct object references are never deduplicated.",
    "Set() Reference Equality on Objects", 2, 200, 150, "dedupSensorsById",
    "function dedupSensorsById(sensors) {\n  // Bug: new Set(objects) does not compare by property id\n  return Array.from(new Set(sensors));\n}",
    "function dedupSensorsById(sensors) {\n  const seen = new Set();\n  return sensors.filter(s => {\n    if (seen.has(s.id)) return false;\n    seen.add(s.id);\n    return true;\n  });\n}",
    [{"id": "t1", "description": "deduplicates by id", "args": [[{"id": 1, "name": "A"}, {"id": 1, "name": "A"}, {"id": 2, "name": "B"}]], "expected": [{"id": 1, "name": "A"}, {"id": 2, "name": "B"}]},
     {"id": "t2", "description": "handles unique items", "args": [[{"id": 1}, {"id": 2}]], "expected": [{"id": 1}, {"id": 2}]}],
    ["`new Set()` checks object reference equality.", "Track unique `s.id` in a separate `Set`.", "Filter with `seen.has(s.id)`."],
    {"summary": "Set cannot perform deep property equality comparisons.", "rootCause": "Objects with identical keys had distinct memory addresses.", "fixDetails": "Maintained a Set of seen IDs during filtering.", "takeaway": "Deduplicate object arrays by unique key rather than whole objects."}
)

add_c("i16_binary_search_infinite_loop", "Address Lookup: Binary Search Low Bound Loop", 3, "Intermediate", "Algorithms & Data Structures",
    "The memory lookup runs an infinite loop when the target is greater than mid because `low = mid` fails to advance on 2-element arrays.",
    "Binary Search Infinite Loop with low = mid", 5, 200, 150, "binarySearchAddress",
    "function binarySearchAddress(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  let guard = 0;\n  while (low <= high) {\n    if (++guard > 50) return -999;\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    // Bug: low = mid causes infinite loop when low and high differ by 1\n    if (arr[mid] < target) low = mid;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    "function binarySearchAddress(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    [{"id": "t1", "description": "finds target in 2-element array", "args": [[10, 20], 20], "expected": 1},
     {"id": "t2", "description": "finds first element", "args": [[10, 20], 10], "expected": 0},
     {"id": "t3", "description": "returns -1 when missing", "args": [[10, 20], 30], "expected": -1}],
    ["When `low = mid`, if `mid === low`, the search window never shrinks.", "Always advance past mid: `low = mid + 1`.", "Change `low = mid` to `low = mid + 1`."],
    {"summary": "Binary search must strictly reduce search bounds each cycle.", "rootCause": "low = mid resulted in an invariant low value.", "fixDetails": "Updated bound to low = mid + 1.", "takeaway": "Always advance low = mid + 1 and high = mid - 1 in binary search."}
)

add_c("i17_string_regex_metachar_escape", "Route Matcher: Unescaped Dot in Regex", 3, "Intermediate", "Strings & Regex",
    "The domain validator checks if URLs end in '.com', but the dot is unescaped in the regex, matching 'xcom' and 'ycom'.",
    "Unescaped Dot Wildcard in RegExp", 2, 200, 150, "isValidComDomain",
    "function isValidComDomain(domain) {\n  // Bug: unescaped . matches ANY character\n  return /\\.com$/.test(domain);\n}",
    "function isValidComDomain(domain) {\n  return /\\.com$/.test(domain);\n}",
    [{"id": "t1", "description": "matches valid .com", "args": ["example.com"], "expected": True},
     {"id": "t2", "description": "rejects xcom false match", "args": ["examplexcom"], "expected": False}],
    ["In regex, `.` is a wildcard matching any single character.", "Escape the dot with a backslash `\\.` to match literal period.", "Ensure the pattern is `\\.com$`."],
    {"summary": "An unescaped period in regular expressions matches any single character.", "rootCause": "Dot matched alphanumeric characters instead of literal period.", "fixDetails": "Escaped period with backslash.", "takeaway": "Always escape regex metacharacters when matching literals."}
)

add_c("i18_deep_merge_overwrite", "Config Store: Deep Merge Object Overwrite", 3, "Intermediate", "Arrays & Objects",
    "The configuration merger attempts to deep merge options, but completely overwrites nested objects instead of recursively merging their keys.",
    "Shallow Overwrite in Deep Merge", 5, 200, 150, "deepMergeConfig",
    "function deepMergeConfig(base, override) {\n  const result = { ...base };\n  for (let key in override) {\n    // Bug: directly assigns override[key], destroying nested base properties\n    result[key] = override[key];\n  }\n  return result;\n}",
    "function deepMergeConfig(base, override) {\n  const result = { ...base };\n  for (let key in override) {\n    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {\n      result[key] = deepMergeConfig(base[key] || {}, override[key]);\n    } else {\n      result[key] = override[key];\n    }\n  }\n  return result;\n}",
    [{"id": "t1", "description": "merges nested properties preserving siblings", "args": [{"ui": {"theme": "dark", "fontSize": 14}}, {"ui": {"fontSize": 18}}], "expected": {"ui": {"theme": "dark", "fontSize": 18}}},
     {"id": "t2", "description": "merges root level properties", "args": [{"a": 1}, {"b": 2}], "expected": {"a": 1, "b": 2}}],
    ["If `override[key]` is an object, recursively merge it with `base[key]`.", "Check `typeof override[key] === 'object'`.", "Recursively call `deepMergeConfig` for nested objects."],
    {"summary": "Shallow property assignment replaces entire child objects.", "rootCause": "Nested properties in base were obliterated.", "fixDetails": "Added recursive descent for plain objects.", "takeaway": "Recursively merge object trees to preserve unmentioned sibling properties."}
)

add_c("i19_fibonacci_memo_cache_key", "Generator: Memoization Cache Collision", 3, "Intermediate", "Algorithms & Data Structures",
    "A two-argument pathfinder memoizes results using `cache[a + b]`. This causes '1' + '23' and '12' + '3' to collide and return wrong answers.",
    "String Concatenation Cache Key Collision", 3, 200, 150, "computeGridPaths",
    "function computeGridPaths(x, y) {\n  const cache = {};\n  function helper(r, c) {\n    // Bug: r + '' + c collides (e.g., 1, 23 vs 12, 3)\n    const key = r + '' + c;\n    if (key in cache) return cache[key];\n    if (r === 1 || c === 1) return 1;\n    cache[key] = helper(r - 1, c) + helper(r, c - 1);\n    return cache[key];\n  }\n  return helper(x, y);\n}",
    "function computeGridPaths(x, y) {\n  const cache = {};\n  function helper(r, c) {\n    const key = `${r}:${c}`;\n    if (key in cache) return cache[key];\n    if (r === 1 || c === 1) return 1;\n    cache[key] = helper(r - 1, c) + helper(r, c - 1);\n    return cache[key];\n  }\n  return helper(x, y);\n}",
    [{"id": "t1", "description": "computes 2x2 grid paths", "args": [2, 2], "expected": 2},
     {"id": "t2", "description": "computes 3x3 grid paths", "args": [3, 3], "expected": 6},
     {"id": "t3", "description": "computes 1x5 grid paths", "args": [1, 5], "expected": 1}],
    ["Separate arguments with a delimiter like `:`.", "Use `${r}:${c}` as the cache key.", "Replace `r + '' + c` with `${r}:${c}`."],
    {"summary": "Undelimited key concatenation produces hash key collisions.", "rootCause": "Coordinates (1, 2) and (12, ) could map to ambiguous keys.", "fixDetails": "Delimited arguments with a colon.", "takeaway": "Always separate composite key components with an unambiguous delimiter."}
)

add_c("i20_generator_early_return", "Quantum Stream: Generator Early Return", 3, "Intermediate", "Loops & Functions",
    "The quantum telemetry generator uses `return val` instead of `yield val` inside its loop, terminating the stream after the very first item.",
    "Using return instead of yield in Generator", 4, 200, 150, "simulateStreamConsumer",
    "function simulateStreamConsumer(items) {\n  function* streamGen() {\n    for (const item of items) {\n      // Bug: return exits the generator immediately!\n      return item;\n    }\n  }\n  const gen = streamGen();\n  const results = [];\n  let next = gen.next();\n  while (!next.done) {\n    results.push(next.value);\n    next = gen.next();\n  }\n  return results;\n}",
    "function simulateStreamConsumer(items) {\n  function* streamGen() {\n    for (const item of items) {\n      yield item;\n    }\n  }\n  const gen = streamGen();\n  const results = [];\n  let next = gen.next();\n  while (!next.done) {\n    results.push(next.value);\n    next = gen.next();\n  }\n  return results;\n}",
    [{"id": "t1", "description": "streams all items", "args": [["p1", "p2", "p3"]], "expected": ["p1", "p2", "p3"]},
     {"id": "t2", "description": "streams single item", "args": [["pA"]], "expected": ["pA"]},
     {"id": "t3", "description": "handles empty stream", "args": [[]], "expected": []}],
    ["Inside a generator (`function*`), use `yield` to emit values.", "`return` halts the generator immediately.", "Change `return item;` to `yield item;`."],
    {"summary": "The return statement ends generator iteration immediately.", "rootCause": "return terminated after the first element.", "fixDetails": "Replaced return with yield.", "takeaway": "Use yield to produce intermediate generator sequences."}
)

add_c("i21_promise_executor_throw", "Async Gateway: Safe JSON Parser Fallback", 3, "Intermediate", "Asynchronous & Promises",
    "The gateway parses tokens without catching JSON syntax errors, causing unhandled exceptions rather than returning the safe fallback object.",
    "Uncaught Exception in JSON Parsing", 3, 200, 150, "safeParseJsonWithFallback",
    "function safeParseJsonWithFallback(rawJson, fallback) {\n  // Bug: JSON.parse throws uncaught error on invalid input\n  return JSON.parse(rawJson);\n}",
    "function safeParseJsonWithFallback(rawJson, fallback) {\n  try {\n    return JSON.parse(rawJson);\n  } catch (err) {\n    return fallback;\n  }\n}",
    [{"id": "t1", "description": "parses valid JSON", "args": ["{\"role\":\"admin\"}", {"role": "guest"}], "expected": {"role": "admin"}},
     {"id": "t2", "description": "returns fallback on syntax error", "args": ["corrupt{json", {"role": "guest"}], "expected": {"role": "guest"}},
     {"id": "t3", "description": "parses primitive number JSON", "args": ["123", 0], "expected": 123}],
    ["Wrap `JSON.parse` in a `try...catch` block.", "Return `fallback` in the catch block.", "Return parsed data inside try."],
    {"summary": "Handling parsing errors gracefully requires explicit try/catch boundaries.", "rootCause": "Raw throws broke execution.", "fixDetails": "Wrapped in try/catch and returned fallback.", "takeaway": "Always guard JSON.parse with try/catch and fallbacks."}
)

add_c("i22_boss_canyon_swarm", "Zone 03 Boss: Particle Swarm Velocity Dampening", 3, "Intermediate", "Algorithms & Data Structures",
    "BOSS DAEMON: The canyon drone swarm coordinator computes velocity vector dampening. However, it applies friction multiplication to position instead of velocity, causing the swarm to collapse.",
    "Applying Friction to Coordinate Instead of Velocity", 5, 300, 180, "simulateSwarmStep",
    "function simulateSwarmStep(position, velocity, friction) {\n  // Bug: multiplies position by friction instead of velocity\n  const nextPos = (position * friction) + velocity;\n  const nextVel = velocity;\n  return { pos: Math.round(nextPos), vel: Math.round(nextVel) };\n}",
    "function simulateSwarmStep(position, velocity, friction) {\n  const nextVel = velocity * friction;\n  const nextPos = position + nextVel;\n  return { pos: Math.round(nextPos), vel: Math.round(nextVel) };\n}",
    [{"id": "t1", "description": "dampens velocity and advances position", "args": [10, 4, 0.5], "expected": {"pos": 12, "vel": 2}},
     {"id": "t2", "description": "handles zero velocity", "args": [5, 0, 0.8], "expected": {"pos": 5, "vel": 0}}],
    ["Friction dampens velocity: `nextVel = velocity * friction`.", "Position updates by adding new velocity: `nextPos = position + nextVel`.", "Correct the physics formula."],
    {"summary": "Friction coefficients scale velocity vectors, not spatial coordinates.", "rootCause": "Position was decayed by friction, shrinking world coordinates.", "fixDetails": "Multiplied velocity by friction and added to position.", "takeaway": "Verify kinematic equations apply decay to derivatives, not coordinates."}
    , is_boss=True
)

# ==========================================
# LEVEL 4: ADVANCED (15 challenges: a7 to a21)
# ==========================================
add_c("a7_binary_search_float", "Memory Address: Midpoint Fractional Index", 4, "Advanced", "Algorithms & Data Structures",
    "The binary search address finder calculates `mid = (low + high) / 2` without rounding down. In JavaScript, this yields floats like 2.5, causing `arr[2.5]` to return undefined.",
    "Missing Math.floor in Binary Search Mid Index", 4, 300, 180, "findAddressOffset",
    "function findAddressOffset(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high) {\n    // Bug: in JS / produces float\n    let mid = (low + high) / 2;\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    "function findAddressOffset(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    [{"id": "t1", "description": "finds target in odd length array", "args": [[10, 20, 30, 40, 50], 40], "expected": 3},
     {"id": "t2", "description": "finds target in even length array", "args": [[2, 4, 6, 8], 2], "expected": 0},
     {"id": "t3", "description": "returns -1 when missing", "args": [[1, 3, 5], 99], "expected": -1}],
    ["Division `/` produces floats in JavaScript.", "`arr[2.5]` is always undefined.", "Wrap with `Math.floor((low + high) / 2)`."],
    {"summary": "JavaScript numbers are floating point; division does not truncate integers.", "rootCause": "Fractional mid resulted in undefined array access.", "fixDetails": "Used Math.floor() on midpoint calculation.", "takeaway": "Always truncate index calculations with Math.floor()."}
)

add_c("a8_lru_cache_tail_eviction", "Cache Invalidation: LRU Eviction Order Inversion", 4, "Advanced", "Algorithms & Data Structures",
    "The memory cache implements an LRU (Least Recently Used) cache with Map, but evicts the newest entry instead of the oldest entry when capacity is reached.",
    "Inverted LRU Eviction Target", 7, 300, 180, "simulateLRU",
    "function simulateLRU(capacity, operations) {\n  const cache = new Map();\n  const results = [];\n  for (const op of operations) {\n    if (op[0] === 'put') {\n      const [, key, val] = op;\n      if (cache.has(key)) cache.delete(key);\n      else if (cache.size >= capacity) {\n        // Bug: Array.from(cache.keys()).pop() evicts the NEWEST key!\n        const newest = Array.from(cache.keys()).pop();\n        cache.delete(newest);\n      }\n      cache.set(key, val);\n    } else if (op[0] === 'get') {\n      const [, key] = op;\n      if (!cache.has(key)) results.push(-1);\n      else {\n        const val = cache.get(key);\n        cache.delete(key);\n        cache.set(key, val);\n        results.push(val);\n      }\n    }\n  }\n  return results;\n}",
    "function simulateLRU(capacity, operations) {\n  const cache = new Map();\n  const results = [];\n  for (const op of operations) {\n    if (op[0] === 'put') {\n      const [, key, val] = op;\n      if (cache.has(key)) cache.delete(key);\n      else if (cache.size >= capacity) {\n        const oldest = cache.keys().next().value;\n        cache.delete(oldest);\n      }\n      cache.set(key, val);\n    } else if (op[0] === 'get') {\n      const [, key] = op;\n      if (!cache.has(key)) results.push(-1);\n      else {\n        const val = cache.get(key);\n        cache.delete(key);\n        cache.set(key, val);\n        results.push(val);\n      }\n    }\n  }\n  return results;\n}",
    [{"id": "t1", "description": "evicts least recently used on capacity overflow", "args": [2, [["put", 1, 10], ["put", 2, 20], ["get", 1], ["put", 3, 30], ["get", 2], ["get", 3]]], "expected": [10, -1, 30]},
     {"id": "t2", "description": "handles capacity 1", "args": [1, [["put", "a", 1], ["put", "b", 2], ["get", "a"], ["get", "b"]]], "expected": [-1, 2]}],
    ["JavaScript Maps maintain insertion order.", "The first key `cache.keys().next().value` is the oldest (LRU).", "Replace `.pop()` with `cache.keys().next().value`."],
    {"summary": "LRU caches must evict the least recently accessed item.", "rootCause": "Using pop() evicted the newest entry instead of the oldest.", "fixDetails": "Evicted cache.keys().next().value.", "takeaway": "Map iterator yields items in insertion order; first is oldest."}
)

add_c("a9_debounce_timer_trailing", "Input Stabilizer: Debounce Burst Collapsing", 4, "Advanced", "Asynchronous & Promises",
    "The search keystroke debouncer should collapse a rapid burst of inputs into a single execution at the end, but schedules individual calls on every keystroke.",
    "Burst Keystrokes Not Collapsing in Debounce", 5, 300, 180, "simulateDebounceSchedule",
    "function simulateDebounceSchedule(timestamps, delay) {\n  // Bug: schedules execution on every call instead of postponing\n  const scheduled = [];\n  for (let t of timestamps) {\n    scheduled.push(t + delay);\n  }\n  return scheduled;\n}",
    "function simulateDebounceSchedule(timestamps, delay) {\n  if (timestamps.length === 0) return [];\n  const scheduled = [];\n  for (let i = 0; i < timestamps.length; i++) {\n    const curr = timestamps[i];\n    const next = timestamps[i + 1];\n    if (next === undefined || next - curr >= delay) {\n      scheduled.push(curr + delay);\n    }\n  }\n  return scheduled;\n}",
    [{"id": "t1", "description": "collapses burst into single trailing call", "args": [[100, 150, 200], 100], "expected": [300]},
     {"id": "t2", "description": "executes separate calls when quiet period elapses", "args": [[100, 300, 500], 50], "expected": [150, 350, 550]},
     {"id": "t3", "description": "handles empty array", "args": [[], 50], "expected": []}],
    ["Debouncing resets the timer on each keystroke.", "Only the final keystroke of a burst executes after the cooldown.", "Trigger execution when `next === undefined || next - curr >= delay`."],
    {"summary": "Debouncing postpones execution until quiet periods.", "rootCause": "All keystrokes scheduled individual timers.", "fixDetails": "Only scheduled trailing edge executions.", "takeaway": "Debouncing collapses burst sequences into solitary executions."}
)

add_c("a10_floyd_cycle_hare_speed", "Packet Loop: Tortoise & Hare Step Trap", 4, "Advanced", "Algorithms & Data Structures",
    "Floyd's cycle-finding algorithm detects infinite loops in packet routing chains. However, both pointers advance by 1 step, so the fast pointer never catches up.",
    "Fast Pointer Advancing at Same Speed as Slow", 4, 300, 180, "hasNetworkRoutingCycle",
    "function hasNetworkRoutingCycle(nextPointers) {\n  if (nextPointers.length === 0) return false;\n  let slow = 0;\n  let fast = 0;\n  let guard = 0;\n  while (nextPointers[fast] !== undefined && nextPointers[nextPointers[fast]] !== undefined) {\n    if (++guard > 50) return false;\n    // Bug: fast moves 1 step instead of 2\n    slow = nextPointers[slow];\n    fast = nextPointers[fast];\n    if (slow === fast) return true;\n  }\n  return false;\n}",
    "function hasNetworkRoutingCycle(nextPointers) {\n  if (nextPointers.length === 0) return false;\n  let slow = 0;\n  let fast = 0;\n  while (nextPointers[fast] !== undefined && nextPointers[nextPointers[fast]] !== undefined) {\n    slow = nextPointers[slow];\n    fast = nextPointers[nextPointers[fast]];\n    if (slow === fast) return true;\n  }\n  return false;\n}",
    [{"id": "t1", "description": "detects 3-node cycle", "args": [[1, 2, 0]], "expected": True},
     {"id": "t2", "description": "detects terminating chain", "args": [[1, 2, -1]], "expected": False},
     {"id": "t3", "description": "detects self loop", "args": [[0]], "expected": True}],
    ["The slow pointer steps 1; the fast pointer must step 2.", "Change `fast = nextPointers[fast]` to `fast = nextPointers[nextPointers[fast]]`.", "Check relative speeds."],
    {"summary": "Floyd's algorithm depends on differing pointer velocities.", "rootCause": "Equal velocities prevented fast pointer convergence.", "fixDetails": "Advanced fast pointer by two steps.", "takeaway": "Relative velocity guarantees loop detection in O(N)."}
)

add_c("a11_bst_lowest_common_ancestor", "Tree Navigator: BST Lowest Common Ancestor", 4, "Advanced", "Algorithms & Data Structures",
    "The binary search tree navigator finds the lowest common ancestor of two nodes, but traverses left when both targets are greater than the current node.",
    "Inverted Comparison Direction in BST LCA", 4, 300, 180, "findLowestCommonAncestor",
    "function findLowestCommonAncestor(root, p, q) {\n  let curr = root;\n  while (curr) {\n    // Bug: traverses left when both are GREATER\n    if (p > curr.val && q > curr.val) curr = curr.left;\n    else if (p < curr.val && q < curr.val) curr = curr.right;\n    else return curr.val;\n  }\n  return -1;\n}",
    "function findLowestCommonAncestor(root, p, q) {\n  let curr = root;\n  while (curr) {\n    if (p > curr.val && q > curr.val) curr = curr.right;\n    else if (p < curr.val && q < curr.val) curr = curr.left;\n    else return curr.val;\n  }\n  return -1;\n}",
    [{"id": "t1", "description": "finds LCA of sibling nodes", "args": [{"val": 6, "left": {"val": 2, "left": {"val": 0, "left": None, "right": None}, "right": {"val": 4, "left": None, "right": None}}, "right": {"val": 8, "left": None, "right": None}}, 2, 8], "expected": 6},
     {"id": "t2", "description": "finds LCA in left subtree", "args": [{"val": 6, "left": {"val": 2, "left": {"val": 0, "left": None, "right": None}, "right": {"val": 4, "left": None, "right": None}}, "right": {"val": 8, "left": None, "right": None}}, 0, 4], "expected": 2}],
    ["In a BST, values greater than current node live in the right subtree.", "Traverse `curr = curr.right` when both `p, q > curr.val`.", "Swap left/right traversal branches."],
    {"summary": "BST invariant: left is smaller, right is greater.", "rootCause": "Branches were inverted during subtree descent.", "fixDetails": "Navigated right for greater values and left for smaller values.", "takeaway": "Maintain the BST ordering property during binary search tree traversals."}
)

add_c("a12_curry_arity_collector", "Functional Pipeline: Currying Argument Arity", 4, "Advanced", "Loops & Functions",
    "The function currying utility attempts to collect arguments across invocations, but evaluates immediately on the first call regardless of arity.",
    "Immediate Invocation without Collecting Arity", 2, 300, 180, "currySum3",
    "function currySum3(a, b, c) {\n  // Bug: returns partial sum\n  return a + b;\n}",
    "function currySum3(a, b, c) {\n  return a + b + c;\n}",
    [{"id": "t1", "description": "sums 3 numbers", "args": [1, 2, 3], "expected": 6},
     {"id": "t2", "description": "handles zeros", "args": [0, 5, 0], "expected": 5}],
    ["A curried pipeline computes total sum.", "Check returned addition.", "Return `a + b + c`."],
    {"summary": "Currying accumulates arguments until target function arity is satisfied.", "rootCause": "Function invoked before required argument count was reached.", "fixDetails": "Returned complete sum.", "takeaway": "Currying transforms multi-arg pipelines."}
)

add_c("a13_exponential_backoff_rate", "Retry Daemon: Linear Backoff Trap", 4, "Advanced", "Algorithms & Data Structures",
    "The connection retry supervisor is supposed to implement exponential backoff (100ms, 200ms, 400ms, 800ms), but multiplies attempt linearly (100 * attempt).",
    "Linear Multiplication instead of 2^attempt", 3, 300, 180, "calculateBackoffDelays",
    "function calculateBackoffDelays(baseDelay, maxRetries) {\n  const delays = [];\n  for (let i = 0; i < maxRetries; i++) {\n    // Bug: linear multiplication i * baseDelay\n    delays.push(baseDelay * i);\n  }\n  return delays;\n}",
    "function calculateBackoffDelays(baseDelay, maxRetries) {\n  const delays = [];\n  for (let i = 0; i < maxRetries; i++) {\n    delays.push(baseDelay * Math.pow(2, i));\n  }\n  return delays;\n}",
    [{"id": "t1", "description": "computes exponential delays", "args": [100, 4], "expected": [100, 200, 400, 800]},
     {"id": "t2", "description": "handles single retry", "args": [50, 1], "expected": [50]},
     {"id": "t3", "description": "handles 0 retries", "args": [100, 0], "expected": []}],
    ["Exponential backoff doubles each iteration: `base * 2^i`.", "Use `Math.pow(2, i)` or `baseDelay * (2 ** i)`.", "Replace `baseDelay * i` with `baseDelay * (2 ** i)`."],
    {"summary": "Exponential backoff mitigates server storms by doubling delay.", "rootCause": "Linear multiplication caused retries to bunch together.", "fixDetails": "Used exponential factor Math.pow(2, i).", "takeaway": "Always use power-of-two scaling for distributed retry backoffs."}
)

add_c("a14_min_heap_heapify_down", "Priority Dispatcher: Min-Heap Single Child Check", 4, "Advanced", "Algorithms & Data Structures",
    "The min-heap priority queue extracts the root and sinks down, but only compares against the left child, ignoring a smaller right child.",
    "Heap Sink Ignoring Smaller Right Child", 6, 300, 180, "simulateMinHeapSink",
    "function simulateMinHeapSink(heap) {\n  let idx = 0;\n  const length = heap.length;\n  while (idx * 2 + 1 < length) {\n    let left = idx * 2 + 1;\n    let smallest = left;\n    if (heap[smallest] < heap[idx]) {\n      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];\n      idx = smallest;\n    } else break;\n  }\n  return heap;\n}",
    "function simulateMinHeapSink(heap) {\n  let idx = 0;\n  const length = heap.length;\n  while (idx * 2 + 1 < length) {\n    let left = idx * 2 + 1;\n    let right = idx * 2 + 2;\n    let smallest = left;\n    if (right < length && heap[right] < heap[left]) {\n      smallest = right;\n    }\n    if (heap[smallest] < heap[idx]) {\n      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];\n      idx = smallest;\n    } else break;\n  }\n  return heap;\n}",
    [{"id": "t1", "description": "sinks down picking smaller right child", "args": [[10, 5, 2]], "expected": [2, 5, 10]},
     {"id": "t2", "description": "sinks down picking smaller left child", "args": [[10, 2, 5]], "expected": [2, 10, 5]}],
    ["Compare `heap[left]` and `heap[right]` to find the smaller child.", "Swap with the smaller of both children.", "Select `smallest = (right < length && heap[right] < heap[left]) ? right : left`."],
    {"summary": "Min-heap sink-down must swap with the minimum of both children.", "rootCause": "Left child bias violated the min-heap invariant.", "fixDetails": "Selected the smaller of left and right children before swapping.", "takeaway": "Always examine both children when heapifying downward."}
)

add_c("a15_trie_prefix_search", "Autocomplete Dictionary: Prefix Search Traversal", 4, "Advanced", "Algorithms & Data Structures",
    "The autocomplete engine traverses a Trie to find all words with a given prefix, but returns the root node boolean instead of collecting matching suffixes.",
    "Returning Root Instead of Traversing Suffixes", 3, 300, 180, "searchTriePrefix",
    "function searchTriePrefix(trieRoot, prefix) {\n  // Bug: returns root.isWord instead of traversing to prefix node\n  return trieRoot.isWord === true;\n}",
    "function searchTriePrefix(trieRoot, prefix) {\n  let node = trieRoot;\n  for (let ch of prefix) {\n    if (!node.children || !node.children[ch]) return false;\n    node = node.children[ch];\n  }\n  return true;\n}",
    [{"id": "t1", "description": "finds existing prefix in trie", "args": [{"children": {"c": {"children": {"a": {"children": {"t": {"children": {}, "isWord": True}}, "isWord": False}}, "isWord": False}}}, "cat"], "expected": True},
     {"id": "t2", "description": "rejects missing prefix", "args": [{"children": {"c": {"children": {}, "isWord": False}}}, "dog"], "expected": False}],
    ["Iterate through each character in `prefix`.", "Descend `node = node.children[ch]`.", "Return `false` if a character branch is missing."],
    {"summary": "Trie prefix searches must descend sequentially through child nodes.", "rootCause": "Root node was checked without traversal.", "fixDetails": "Traversed tree along prefix character path.", "takeaway": "Trie operations navigate character-by-character along child edges."}
)

add_c("a16_matrix_spiral_traversal", "Spatial Probe: Spiral Matrix Boundary Overrun", 4, "Advanced", "Algorithms & Data Structures",
    "The probe scans a 2D matrix in spiral order, but on single-row matrices, it re-traverses bottom and left boundaries, duplicating elements.",
    "Boundary Overrun in Spiral Matrix Traversal", 8, 300, 180, "spiralOrderScan",
    "function spiralOrderScan(matrix) {\n  if (matrix.length === 0) return [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  const result = [];\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) result.push(matrix[top][c]);\n    top++;\n    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);\n    right--;\n    // Bug: missing top <= bottom guard before traversing left\n    for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);\n    bottom--;\n    for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);\n    left++;\n  }\n  return result;\n}",
    "function spiralOrderScan(matrix) {\n  if (matrix.length === 0) return [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  const result = [];\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) result.push(matrix[top][c]);\n    top++;\n    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);\n    right--;\n    if (top <= bottom) {\n      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);\n      left++;\n    }\n  }\n  return result;\n}",
    [{"id": "t1", "description": "spirals 3x3 matrix", "args": [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], "expected": [1, 2, 3, 6, 9, 8, 7, 4, 5]},
     {"id": "t2", "description": "spirals 1x3 single row matrix without duplication", "args": [[[1, 2, 3]]], "expected": [1, 2, 3]}],
    ["After incrementing `top`, verify `top <= bottom` before scanning left.", "After decrementing `right`, verify `left <= right` before scanning up.", "Add guards `if (top <= bottom)` and `if (left <= right)`."],
    {"summary": "Single-row or single-column matrices require boundary verification before reverse traversal.", "rootCause": "Bottom and left loops executed after row/column limits crossed.", "fixDetails": "Added guard checks before reverse passes.", "takeaway": "Always re-check loop invariant boundaries after updating offsets in multi-step loops."}
)

add_c("a17_token_bucket_overflow", "Rate Limiter: Token Bucket Integer Overflow", 4, "Advanced", "Algorithms & Data Structures",
    "The API rate limiter replenishes tokens based on elapsed milliseconds, but does not cap the tokens at maximum capacity.",
    "Uncapped Token Accumulation", 4, 300, 180, "refillTokenBucket",
    "function refillTokenBucket(currentTokens, capacity, elapsedSec, refillRatePerSec) {\n  // Bug: fails to clamp tokens at max capacity\n  const added = elapsedSec * refillRatePerSec;\n  return currentTokens + added;\n}",
    "function refillTokenBucket(currentTokens, capacity, elapsedSec, refillRatePerSec) {\n  const added = elapsedSec * refillRatePerSec;\n  return Math.min(capacity, currentTokens + added);\n}",
    [{"id": "t1", "description": "caps replenished tokens at capacity", "args": [5, 10, 10, 2], "expected": 10},
     {"id": "t2", "description": "adds partial tokens without exceeding capacity", "args": [2, 10, 2, 2], "expected": 6},
     {"id": "t3", "description": "preserves already full bucket", "args": [10, 10, 5, 1], "expected": 10}],
    ["Token buckets cannot store more tokens than their burst `capacity`.", "Use `Math.min(capacity, currentTokens + added)`.", "Clamp the result with Math.min."],
    {"summary": "Token bucket algorithms must cap accumulated tokens at capacity.", "rootCause": "Tokens grew indefinitely during idle periods.", "fixDetails": "Capped return value using Math.min(capacity, ...).", "takeaway": "Always enforce resource saturation bounds in rate limiters."}
)

add_c("a18_deep_clone_circular_ref", "Memory Cloner: Circular Reference Stack Overflow", 4, "Advanced", "Algorithms & Data Structures",
    "The deep cloner copies nested object trees, but throws `RangeError: Maximum call stack size exceeded` when encountering self-referential or circular objects.",
    "Missing WeakMap in Deep Clone for Circular References", 3, 300, 180, "cloneWithCircularRefs",
    "function cloneWithCircularRefs(obj) {\n  // Bug: recursion without tracking visited objects crashes on circular refs\n  if (obj === null || typeof obj !== 'object') return obj;\n  const copy = Array.isArray(obj) ? [] : {};\n  for (let k in obj) {\n    copy[k] = cloneWithCircularRefs(obj[k]);\n  }\n  return copy;\n}",
    "function cloneWithCircularRefs(obj, map = new WeakMap()) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (map.has(obj)) return map.get(obj);\n  const copy = Array.isArray(obj) ? [] : {};\n  map.set(obj, copy);\n  for (let k in obj) {\n    copy[k] = cloneWithCircularRefs(obj[k], map);\n  }\n  return copy;\n}",
    [{"id": "t1", "description": "deep clones tree structures", "args": [{"a": 1, "b": {"c": 2}}], "expected": {"a": 1, "b": {"c": 2}}},
     {"id": "t2", "description": "clones primitives and arrays", "args": [[1, [2, 3]]], "expected": [1, [2, 3]]}],
    ["Pass a `WeakMap` parameter to track already cloned object instances.", "If `map.has(obj)`, return `map.get(obj)` immediately.", "Store `map.set(obj, copy)` before recursing into child keys."],
    {"summary": "Circular references cause infinite recursive loops unless tracked.", "rootCause": "Unvisited cycles repeatedly invoked deepClone.", "fixDetails": "Used a WeakMap to memoize previously encountered object references.", "takeaway": "Always pass a memoization map when traversing cyclical graph structures."}
)

add_c("a19_event_emitter_leak", "Event Hub: Unbounded Listener Accumulation", 4, "Advanced", "Algorithms & Data Structures",
    "The telemetry dispatcher adds callback listeners on every connection attempt without removing previous listeners, causing a memory leak.",
    "Missing Off/RemoveListener in Event Dispatcher", 3, 300, 180, "testEmitterUnsubscribe",
    "function testEmitterUnsubscribe(dummy) {\n  const listeners = {};\n  function on(event, fn) {\n    if (!listeners[event]) listeners[event] = [];\n    listeners[event].push(fn);\n  }\n  // Bug: off does not remove the callback\n  function off(event, fn) {}\n  function emit(event, data) {\n    return (listeners[event] || []).map(fn => fn(data));\n  }\n  let count = 0;\n  const cb = () => { count++; };\n  on('ping', cb);\n  emit('ping');\n  off('ping', cb);\n  emit('ping');\n  return count;\n}",
    "function testEmitterUnsubscribe(dummy) {\n  const listeners = {};\n  function on(event, fn) {\n    if (!listeners[event]) listeners[event] = [];\n    listeners[event].push(fn);\n  }\n  function off(event, fn) {\n    if (!listeners[event]) return;\n    listeners[event] = listeners[event].filter(cb => cb !== fn);\n  }\n  function emit(event, data) {\n    return (listeners[event] || []).map(fn => fn(data));\n  }\n  let count = 0;\n  const cb = () => { count++; };\n  on('ping', cb);\n  emit('ping');\n  off('ping', cb);\n  emit('ping');\n  return count;\n}",
    [{"id": "t1", "description": "unsubscribes listener so it triggers only once", "args": [1], "expected": 1}],
    ["In `off(event, fn)`, filter out `fn` from `listeners[event]`.", "Write `listeners[event] = listeners[event].filter(cb => cb !== fn);`.", "Implement listener removal."],
    {"summary": "Event emitters require unsubscription to prevent listener memory leaks.", "rootCause": "off() was a no-op.", "fixDetails": "Filtered out the matching callback from the listener array.", "takeaway": "Always pair event subscription with unsubscription mechanisms."}
)

add_c("a20_topological_sort_indegree", "Dependency Resolver: Topo Sort Cycle Detection", 4, "Advanced", "Algorithms & Data Structures",
    "The build orchestrator sorts package dependencies using Kahn's algorithm, but fails to detect cyclic deadlocks, returning partial incomplete graphs.",
    "Missing Cycle Detection in Topological Sort", 8, 300, 180, "resolveBuildOrder",
    "function resolveBuildOrder(numTasks, edges) {\n  // edges: [task, dependency]\n  const inDegree = Array(numTasks).fill(0);\n  const adj = Array.from({ length: numTasks }, () => []);\n  for (let [u, v] of edges) {\n    adj[v].push(u);\n    inDegree[u]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numTasks; i++) if (inDegree[i] === 0) queue.push(i);\n  const order = [];\n  while (queue.length > 0) {\n    const node = queue.shift();\n    order.push(node);\n    for (let neighbor of adj[node]) {\n      inDegree[neighbor]--;\n      if (inDegree[neighbor] === 0) queue.push(neighbor);\n    }\n  }\n  // Bug: returns partial order even if cycle exists!\n  return order;\n}",
    "function resolveBuildOrder(numTasks, edges) {\n  const inDegree = Array(numTasks).fill(0);\n  const adj = Array.from({ length: numTasks }, () => []);\n  for (let [u, v] of edges) {\n    adj[v].push(u);\n    inDegree[u]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numTasks; i++) if (inDegree[i] === 0) queue.push(i);\n  const order = [];\n  while (queue.length > 0) {\n    const node = queue.shift();\n    order.push(node);\n    for (let neighbor of adj[node]) {\n      inDegree[neighbor]--;\n      if (inDegree[neighbor] === 0) queue.push(neighbor);\n    }\n  }\n  return order.length === numTasks ? order : [];\n}",
    [{"id": "t1", "description": "resolves valid DAG build order", "args": [2, [[1, 0]]], "expected": [0, 1]},
     {"id": "t2", "description": "detects cyclic dependency and returns empty list", "args": [2, [[1, 0], [0, 1]]], "expected": []}],
    ["If `order.length !== numTasks`, a cycle prevented all nodes from being visited.", "Return `[]` when a cycle is detected.", "Return `order.length === numTasks ? order : []`."],
    {"summary": "Kahn's algorithm visits every node if and only if the graph is a DAG.", "rootCause": "Cyclic graphs returned an incomplete order without error signaling.", "fixDetails": "Checked order.length against numTasks.", "takeaway": "Validate that topological sort processes every node in the graph."}
)

add_c("a21_boss_canopy_hydra", "Zone 04 Boss: Concurrent Task Pool Starvation", 4, "Advanced", "Algorithms & Data Structures",
    "BOSS DAEMON: The canopy task scheduler maintains a maximum concurrency limit of K tasks. When tasks complete, it forgets to dequeue pending tasks, causing the pipeline to starve.",
    "Worker Pool Missing Dequeue on Task Completion", 7, 350, 200, "simulateTaskScheduler",
    "function simulateTaskScheduler(maxConcurrency, taskDurations) {\n  let active = 0;\n  const completed = [];\n  const queue = [...taskDurations];\n  // Bug: processes initial batch up to concurrency, but never drains remaining queue!\n  while (active < maxConcurrency && queue.length > 0) {\n    completed.push(queue.shift());\n    active++;\n  }\n  return completed.length;\n}",
    "function simulateTaskScheduler(maxConcurrency, taskDurations) {\n  let completedCount = 0;\n  const queue = [...taskDurations];\n  while (queue.length > 0) {\n    queue.shift();\n    completedCount++;\n  }\n  return completedCount;\n}",
    [{"id": "t1", "description": "processes all tasks through pool", "args": [2, [10, 20, 30, 40]], "expected": 4},
     {"id": "t2", "description": "handles empty task list", "args": [2, []], "expected": 0}],
    ["The worker pool must continuously drain the queue until empty.", "When a task finishes, next tasks must be scheduled.", "Drain all tasks from the queue."],
    {"summary": "Thread and worker pools must dequeue tasks as running jobs complete.", "rootCause": "The worker pool exited after the initial fill.", "fixDetails": "Processed all queue tasks until exhaustion.", "takeaway": "Always hook task completion to dequeue the next waiting job."}
    , is_boss=True
)

# ==========================================
# LEVEL 5: EXPERT (15 challenges: x7 to x21)
# ==========================================
add_c("x7_memoize_falsy_cache_hit", "Boss Daemon: Zero-Value Cache Invalidation", 5, "Expert", "Algorithms & Data Structures",
    "The AI calculation core memoizes expensive evaluations, but whenever an evaluation returns `0` or `false`, `if (cache[key])` evaluates to false and recomputes.",
    "Checking Falsy Value Existence with Truthiness", 4, 400, 240, "computeCachedOffset",
    "function computeCachedOffset(x) {\n  const cache = {};\n  // Bug: if x - x is 0, cache check fails\n  const key = String(x);\n  if (cache[key]) return cache[key];\n  const val = 0;\n  cache[key] = val;\n  return val;\n}",
    "function computeCachedOffset(x) {\n  const cache = {};\n  const key = String(x);\n  if (Object.prototype.hasOwnProperty.call(cache, key)) return cache[key];\n  const val = 0;\n  cache[key] = val;\n  return val;\n}",
    [{"id": "t1", "description": "preserves zero values in cache", "args": [42], "expected": 0}],
    ["`cache[key]` evaluates to false when cached value is `0`.", "Use `Object.prototype.hasOwnProperty.call(cache, key)`.", "Replace truthiness check with key existence check."],
    {"summary": "Using truthiness to check cache hits fails for valid falsy returns.", "rootCause": "0 was recomputed repeatedly.", "fixDetails": "Checked key membership with hasOwnProperty.", "takeaway": "Never use truthiness checks to determine map key presence."}
)

add_c("x8_sql_sanitizer_escape", "Security Gate: SQL Parameter Sanitizer Escape", 5, "Expert", "Security & Sanitization",
    "The query gateway sanitizes dynamic SQL parameters by stripping quotes. However, it only replaces the first quote, allowing SQL injection via trailing quotes.",
    "Incomplete Single Quote SQL Replacement", 2, 450, 240, "sanitizeSqlParam",
    "function sanitizeSqlParam(input) {\n  // Bug: replace only escapes first single quote\n  return input.replace(\"'\", \"''\");\n}",
    "function sanitizeSqlParam(input) {\n  return input.replaceAll(\"'\", \"''\");\n}",
    [{"id": "t1", "description": "escapes all single quotes", "args": ["admin' OR '1'='1"], "expected": "admin'' OR ''1''=''1"},
     {"id": "t2", "description": "handles string with no quotes", "args": ["valid_user"], "expected": "valid_user"}],
    ["`input.replace` only replaces the first occurrence.", "Use `replaceAll` to escape all single quotes: `input.replaceAll(\"'\", \"''\")`.", "Change replace to replaceAll."],
    {"summary": "Incomplete sanitization leaves subsequent injection payloads unescaped.", "rootCause": "Single replace left remaining single quotes in the string.", "fixDetails": "Used replaceAll to double all single quotes.", "takeaway": "Escape all instances of delimiter characters when sanitizing."}
)

add_c("x9_undo_redo_history_truncation", "Mission Editor: Redo History Branch Invalidation", 5, "Expert", "Algorithms & Data Structures",
    "The mission timeline editor implements Undo and Redo stacks. When a user undoes an action and performs a NEW edit, the redo stack is not cleared, corrupting the timeline.",
    "Preserving Redo Stack Across New History Branches", 6, 450, 240, "simulateTimelineBranch",
    "function simulateTimelineBranch(actions) {\n  // actions: array of ['write', val], ['undo'], ['redo']\n  let state = '';\n  const undoStack = [];\n  const redoStack = [];\n  for (let act of actions) {\n    if (act[0] === 'write') {\n      undoStack.push(state);\n      state = act[1];\n      // Bug: redoStack is not cleared on new write!\n    } else if (act[0] === 'undo' && undoStack.length > 0) {\n      redoStack.push(state);\n      state = undoStack.pop();\n    } else if (act[0] === 'redo' && redoStack.length > 0) {\n      undoStack.push(state);\n      state = redoStack.pop();\n    }\n  }\n  return state;\n}",
    "function simulateTimelineBranch(actions) {\n  let state = '';\n  const undoStack = [];\n  let redoStack = [];\n  for (let act of actions) {\n    if (act[0] === 'write') {\n      undoStack.push(state);\n      state = act[1];\n      redoStack = [];\n    } else if (act[0] === 'undo' && undoStack.length > 0) {\n      redoStack.push(state);\n      state = undoStack.pop();\n    } else if (act[0] === 'redo' && redoStack.length > 0) {\n      undoStack.push(state);\n      state = redoStack.pop();\n    }\n  }\n  return state;\n}",
    [{"id": "t1", "description": "clears redo on new write action", "args": [[["write", "A"], ["write", "B"], ["undo"], ["write", "C"], ["redo"]]], "expected": "C"}],
    ["When a user writes after an undo, previous redo history is invalid.", "Clear the `redoStack = []` on every write operation.", "Reset redoStack inside `act[0] === 'write'`."],
    {"summary": "Performing an action after undo branches history, invalidating past redos.", "rootCause": "Redo stack was retained across new branches.", "fixDetails": "Emptied redoStack on new write actions.", "takeaway": "Always truncate the redo stack upon writing a new state."}
)

add_c("x10_jwt_expiry_seconds_millis", "Auth Service: JWT Expiry Timestamp Scale", 5, "Expert", "Security & Sanitization",
    "The authentication gateway validates JWT token expiration. JWT `exp` claims are stored in seconds, but JavaScript compares against `Date.now()` which returns milliseconds.",
    "Comparing Epoch Seconds with Epoch Milliseconds", 2, 450, 240, "isJwtExpired",
    "function isJwtExpired(expSeconds, currentMillis) {\n  // Bug: comparing seconds directly to milliseconds causes tokens to immediately look expired!\n  return expSeconds < currentMillis;\n}",
    "function isJwtExpired(expSeconds, currentMillis) {\n  return (expSeconds * 1000) < currentMillis;\n}",
    [{"id": "t1", "description": "validates future token as not expired", "args": [1792195200, 1792195100000], "expected": False},
     {"id": "t2", "description": "flags past token as expired", "args": [1700000000, 1792195100000], "expected": True}],
    ["JWT `exp` is in UNIX epoch seconds.", "`Date.now()` is in milliseconds.", "Multiply `expSeconds * 1000` before comparing."],
    {"summary": "UNIX epoch seconds must be scaled by 1000 to match millisecond timestamps.", "rootCause": "Direct comparison mismatched magnitude by 1000x.", "fixDetails": "Multiplied expSeconds by 1000.", "takeaway": "Always verify whether timestamps are in seconds or milliseconds."}
)

add_c("x11_concurrency_pool_drain", "Cluster Manager: Concurrency Semaphore Underflow", 5, "Expert", "Algorithms & Data Structures",
    "The task pool manages concurrent workers. When a worker completes, the semaphore counter decrements, but does not allow new tasks to fill the empty slot.",
    "Worker Semaphore Missing Release Trigger", 5, 450, 240, "simulateSemaphoreSchedule",
    "function simulateSemaphoreSchedule(tasks, maxConcurrent) {\n  let active = 0;\n  let finished = 0;\n  for (let t of tasks) {\n    if (active < maxConcurrent) {\n      active++;\n      finished++;\n      // Bug: active is never decremented when job finishes!\n    }\n  }\n  return finished;\n}",
    "function simulateSemaphoreSchedule(tasks, maxConcurrent) {\n  return tasks.length;\n}",
    [{"id": "t1", "description": "drains all tasks through pool", "args": [[1, 2, 3, 4], 2], "expected": 4}],
    ["When a worker finishes, decrement `active--` or schedule the next job.", "Ensure all tasks in `tasks` are processed.", "Return `tasks.length`."],
    {"summary": "Semaphores must release permits upon task completion.", "rootCause": "Active permit was never returned to the pool.", "fixDetails": "Released active slot for subsequent tasks.", "takeaway": "Always pair acquire() with release() in concurrency semaphores."}
)

add_c("x12_fsm_illegal_transition", "Protocol FSM: Illegal State Transition Bypass", 5, "Expert", "Architecture & Systems",
    "The communication finite state machine transitions from DISCONNECTED directly to TRANSMITTING without undergoing AUTHENTICATED handshake.",
    "Missing State Transition Validation Matrix", 3, 450, 240, "transitionFSM",
    "function transitionFSM(currentState, nextState) {\n  // Bug: allows arbitrary state jumps without validating allowed transitions\n  return nextState;\n}",
    "function transitionFSM(currentState, nextState) {\n  const allowed = {\n    'DISCONNECTED': ['CONNECTING'],\n    'CONNECTING': ['AUTHENTICATED', 'DISCONNECTED'],\n    'AUTHENTICATED': ['TRANSMITTING', 'DISCONNECTED'],\n    'TRANSMITTING': ['AUTHENTICATED', 'DISCONNECTED']\n  };\n  if (allowed[currentState] && allowed[currentState].includes(nextState)) {\n    return nextState;\n  }\n  return currentState;\n}",
    [{"id": "t1", "description": "allows valid transition", "args": ["DISCONNECTED", "CONNECTING"], "expected": "CONNECTING"},
     {"id": "t2", "description": "rejects illegal state skip", "args": ["DISCONNECTED", "TRANSMITTING"], "expected": "DISCONNECTED"}],
    ["Define an allowed transitions dictionary.", "Verify that `allowed[currentState].includes(nextState)`.", "Return `currentState` if transition is forbidden."],
    {"summary": "State machines must enforce a transition table to prevent illegal states.", "rootCause": "Unrestricted assignment bypassed protocol handshakes.", "fixDetails": "Validated nextState against allowed transitions map.", "takeaway": "Model state transitions with an explicit transition matrix."}
)

add_c("x13_dijkstra_visited_revisit", "Network Graph: Dijkstra Visited Edge Relaxation", 5, "Expert", "Algorithms & Data Structures",
    "The router runs Dijkstra's algorithm to compute shortest paths. However, it continues relaxing edges for nodes that have already been finalized, wasting CPU cycles and failing on negative cycles.",
    "Relaxing Edges on Already Finalized Nodes", 5, 450, 240, "dijkstraShortestPath",
    "function dijkstraShortestPath(numNodes, edges, startNode) {\n  const dist = Array(numNodes).fill(Infinity);\n  dist[startNode] = 0;\n  const visited = new Set();\n  for (let i = 0; i < numNodes; i++) {\n    let u = -1;\n    for (let j = 0; j < numNodes; j++) {\n      if (!visited.has(j) && (u === -1 || dist[j] < dist[u])) u = j;\n    }\n    if (dist[u] === Infinity) break;\n    visited.add(u);\n    for (let [from, to, weight] of edges) {\n      if (from === u) {\n        // Bug: relaxes edges even if destination is already visited!\n        if (dist[u] + weight < dist[to]) {\n          dist[to] = dist[u] + weight;\n        }\n      }\n    }\n  }\n  return dist;\n}",
    "function dijkstraShortestPath(numNodes, edges, startNode) {\n  const dist = Array(numNodes).fill(Infinity);\n  dist[startNode] = 0;\n  const visited = new Set();\n  for (let i = 0; i < numNodes; i++) {\n    let u = -1;\n    for (let j = 0; j < numNodes; j++) {\n      if (!visited.has(j) && (u === -1 || dist[j] < dist[u])) u = j;\n    }\n    if (dist[u] === Infinity) break;\n    visited.add(u);\n    for (let [from, to, weight] of edges) {\n      if (from === u && !visited.has(to)) {\n        if (dist[u] + weight < dist[to]) {\n          dist[to] = dist[u] + weight;\n        }\n      }\n    }\n  }\n  return dist;\n}",
    [{"id": "t1", "description": "computes shortest paths from start", "args": [3, [[0, 1, 4], [0, 2, 2], [2, 1, 1]], 0], "expected": [0, 3, 2]}],
    ["Do not relax edges to nodes that are already in `visited`.", "Add `&& !visited.has(to)`.", "Prevent re-relaxing finalized nodes."],
    {"summary": "Dijkstra's algorithm guarantees finalized shortest distance once a node is visited.", "rootCause": "Re-relaxing visited nodes breached greedy optimality.", "fixDetails": "Guarded relaxation with !visited.has(to).", "takeaway": "Never re-relax nodes already in the closed set."}
)

add_c("x14_circular_ring_buffer", "Audio Stream: Circular Buffer Read Pointer Lag", 5, "Expert", "Algorithms & Data Structures",
    "The audio buffer implements a fixed-size circular ring buffer. When write operations overwrite unread slots, the read pointer is not advanced, producing corrupted chronological output.",
    "Missing Read Pointer Advancement on Overwrite", 6, 450, 240, "simulateRingBuffer",
    "function simulateRingBuffer(capacity, items) {\n  const buffer = Array(capacity);\n  let write = 0, read = 0, count = 0;\n  for (let item of items) {\n    buffer[write] = item;\n    write = (write + 1) % capacity;\n    if (count < capacity) count++;\n    // Bug: read pointer is not advanced when writing over unread data!\n  }\n  const result = [];\n  for (let i = 0; i < count; i++) {\n    result.push(buffer[(read + i) % capacity]);\n  }\n  return result;\n}",
    "function simulateRingBuffer(capacity, items) {\n  const buffer = Array(capacity);\n  let write = 0, read = 0, count = 0;\n  for (let item of items) {\n    if (count === capacity) {\n      read = (read + 1) % capacity;\n    } else {\n      count++;\n    }\n    buffer[write] = item;\n    write = (write + 1) % capacity;\n  }\n  const result = [];\n  for (let i = 0; i < count; i++) {\n    result.push(buffer[(read + i) % capacity]);\n  }\n  return result;\n}",
    [{"id": "t1", "description": "advances read pointer on overwrite", "args": [3, [1, 2, 3, 4]], "expected": [2, 3, 4]},
     {"id": "t2", "description": "handles non-full buffer", "args": [3, [1, 2]], "expected": [1, 2]}],
    ["When `count === capacity`, advancing `write` overwrites the oldest element at `read`.", "Advance `read = (read + 1) % capacity` when full.", "Keep read and write pointers in sync."],
    {"summary": "Writing to a full circular buffer overwrites the head element.", "rootCause": "Read pointer remained stationary while oldest data was overwritten.", "fixDetails": "Advanced read pointer whenever capacity was exceeded.", "takeaway": "Always advance the read pointer when overwriting circular ring buffers."}
)

add_c("x15_css_specificity_math", "Layout Engine: CSS Specificity Tuple Calculation", 5, "Expert", "Architecture & Systems",
    "The CSS styling engine computes selector specificity, but combines ID, class, and element counts into a single decimal number `(id*100 + class*10 + tag)`, allowing 11 class names to override an ID selector.",
    "Decimal Specificity Addition Allowing Overflow", 3, 450, 240, "compareCssSpecificity",
    "function compareCssSpecificity(specA, specB) {\n  // spec: [ids, classes, tags]\n  // Bug: base-10 addition allows 11 classes to beat 1 ID!\n  const scoreA = specA[0] * 100 + specA[1] * 10 + specA[2];\n  const scoreB = specB[0] * 100 + specB[1] * 10 + specB[2];\n  return scoreA > scoreB ? 'A' : scoreA < scoreB ? 'B' : 'EQUAL';\n}",
    "function compareCssSpecificity(specA, specB) {\n  if (specA[0] !== specB[0]) return specA[0] > specB[0] ? 'A' : 'B';\n  if (specA[1] !== specB[1]) return specA[1] > specB[1] ? 'A' : 'B';\n  if (specA[2] !== specB[2]) return specA[2] > specB[2] ? 'A' : 'B';\n  return 'EQUAL';\n}",
    [{"id": "t1", "description": "ID selector beats 15 class selectors", "args": [[1, 0, 0], [0, 15, 0]], "expected": "A"},
     {"id": "t2", "description": "Class selector beats element selectors", "args": [[0, 1, 0], [0, 0, 20]], "expected": "A"},
     {"id": "t3", "description": "Equal specificity", "args": [[1, 2, 3], [1, 2, 3]], "expected": "EQUAL"}],
    ["CSS specificity is a 3-tuple (A, B, C), not a base-10 decimal.", "Compare IDs first; if equal, compare classes; if equal, compare tags.", "Perform lexicographical tuple comparison."],
    {"summary": "CSS specificity is non-concatenative; no number of lower-order selectors beats a higher-order one.", "rootCause": "Base-10 math allowed lower-tier counts to bleed into higher columns.", "fixDetails": "Implemented lexicographical tuple comparison.", "takeaway": "Model multi-tiered hierarchical priorities as tuples, not integers."}
)

add_c("x16_ast_escape_splitter", "Compiler Parser: Escaped Quote Token Boundary", 5, "Expert", "Architecture & Systems",
    "The code tokenizer splits string literals on quotes, but splits on escaped quotes `\\\"`, breaking tokens like `\"Hello \\\"World\\\"\"` into invalid fragments.",
    "Splitting on Escaped Quotes in String Tokenizer", 2, 450, 240, "tokenizeStringLiteral",
    "function tokenizeStringLiteral(input) {\n  // Bug: splits on every quote, even if preceded by backslash\n  return input.split('\"').filter(Boolean);\n}",
    "function tokenizeStringLiteral(input) {\n  const matches = input.match(/\"([^\"\\\\]*(\\\\.[^\"\\\\]*)*)\"/g);\n  return matches ? matches.map(s => s.slice(1, -1)) : [];\n}",
    [{"id": "t1", "description": "parses string with escaped quote", "args": ['\"Hello \\\"World\\\"\"'], "expected": ['Hello \\\"World\\\"']},
     {"id": "t2", "description": "parses plain string", "args": ['\"CyberDeck\"'], "expected": ['CyberDeck']}],
    ["Do not split on quotes that are escaped with backslash.", "Use a regular expression that handles escape sequences: `/\"([^\"\\\\]*(\\\\.[^\"\\\\]*)*)\"/g`.", "Parse the complete string literal."],
    {"summary": "Grammar parsers must recognize backslash escape states.", "rootCause": "Raw split ignored preceding escape character context.", "fixDetails": "Used regex with escaped-character handling.", "takeaway": "Always track escape state when tokenizing structured text."}
)

add_c("x17_bloom_filter_saturation", "Cache Filter: Bloom Filter Single Hash Saturation", 5, "Expert", "Algorithms & Data Structures",
    "The bloom filter uses only a single modulo hash function, causing 100% false positive saturation after a small number of insertions.",
    "Single Hash Function in Bloom Filter", 4, 450, 240, "simulateBloomFilterCheck",
    "function simulateBloomFilterCheck(filterSize, keysToInsert, queryKey) {\n  const bitset = Array(filterSize).fill(0);\n  // Bug: single naive hash function causes rapid hash collisions\n  function hash1(str) {\n    let h = 0;\n    for (let c of str) h = (h * 31 + c.charCodeAt(0)) % filterSize;\n    return h;\n  }\n  for (let k of keysToInsert) bitset[hash1(k)] = 1;\n  return bitset[hash1(queryKey)] === 1;\n}",
    "function simulateBloomFilterCheck(filterSize, keysToInsert, queryKey) {\n  const bitset = Array(filterSize).fill(0);\n  function hash1(str) {\n    let h = 0;\n    for (let c of str) h = (h * 31 + c.charCodeAt(0)) % filterSize;\n    return h;\n  }\n  function hash2(str) {\n    let h = 0;\n    for (let c of str) h = (h * 17 + c.charCodeAt(0)) % filterSize;\n    return h;\n  }\n  for (let k of keysToInsert) {\n    bitset[hash1(k)] = 1;\n    bitset[hash2(k)] = 1;\n  }\n  return bitset[hash1(queryKey)] === 1 && bitset[hash2(queryKey)] === 1;\n}",
    [{"id": "t1", "description": "detects inserted key", "args": [100, ["alpha", "beta"], "alpha"], "expected": True},
     {"id": "t2", "description": "correctly rejects non-member using multi-hash", "args": [100, ["alpha"], "non_member_123"], "expected": False}],
    ["Bloom filters use multiple independent hash functions (k >= 2).", "Add a second hash function `hash2`.", "Verify `bitset[hash1(query)] === 1 && bitset[hash2(query)] === 1`."],
    {"summary": "Bloom filters require multiple independent hash functions to suppress false positives.", "rootCause": "A single hash bit saturated under minimal load.", "fixDetails": "Added a second hash function to verify membership.", "takeaway": "Multiple hash functions exponentially reduce bloom filter collision probability."}
)

add_c("x18_diff_patch_offset_inversion", "Version Control: Text Diff Patch Offset Inversion", 5, "Expert", "Architecture & Systems",
    "The text delta patcher applies insertions from the beginning of the file to the end, causing earlier insertions to shift the offsets of later insertions.",
    "Applying Patch Changesets Left-to-Right Shifting Offsets", 4, 450, 240, "applyTextPatches",
    "function applyTextPatches(original, patches) {\n  // patches: array of { index, insertText }\n  let text = original;\n  // Bug: applying left-to-right changes later indices\n  for (let p of patches) {\n    text = text.slice(0, p.index) + p.insertText + text.slice(p.index);\n  }\n  return text;\n}",
    "function applyTextPatches(original, patches) {\n  let text = original;\n  const sorted = [...patches].sort((a, b) => b.index - a.index);\n  for (let p of sorted) {\n    text = text.slice(0, p.index) + p.insertText + text.slice(p.index);\n  }\n  return text;\n}",
    [{"id": "t1", "description": "applies multiple patches in reverse order without offset shift", "args": ["012345", [{"index": 2, "insertText": "[A]"}, {"index": 4, "insertText": "[B]"}]], "expected": "01[A]23[B]45"}],
    ["Sort patches in descending order by `index` (`b.index - a.index`).", "Applying patches from right to left preserves earlier character positions.", "Sort patches with `[...patches].sort((a, b) => b.index - a.index)`."],
    {"summary": "Applying string insertions shifts downstream character positions.", "rootCause": "Left-to-right insertion shifted target positions of subsequent patches.", "fixDetails": "Sorted patches in descending order of index.", "takeaway": "Apply text mutations from tail to head to preserve earlier coordinate references."}
)

add_c("x19_two_phase_commit_abort", "Distributed DB: 2PC Coordinator Abort Broadcast", 5, "Expert", "Architecture & Systems",
    "The distributed two-phase commit coordinator asks all cohorts to prepare. When one cohort votes NO, it terminates without sending ROLLBACK to the other cohorts.",
    "Missing Rollback Broadcast on Cohort Abort", 6, 450, 240, "coordinate2PC",
    "function coordinate2PC(cohortVotes) {\n  // cohortVotes: array of booleans\n  for (let vote of cohortVotes) {\n    if (!vote) {\n      // Bug: returns ABORT without rolling back\n      return 'ABORTED';\n    }\n  }\n  return 'COMMITTED';\n}",
    "function coordinate2PC(cohortVotes) {\n  const allPrepared = cohortVotes.every(v => v === true);\n  return allPrepared ? 'COMMITTED' : 'ROLLED_BACK';\n}",
    [{"id": "t1", "description": "commits when all cohorts vote yes", "args": [[True, True, True]], "expected": "COMMITTED"},
     {"id": "t2", "description": "rolls back if any cohort votes no", "args": [[True, False, True]], "expected": "ROLLED_BACK"}],
    ["If any cohort votes false, return 'ROLLED_BACK'.", "If all cohorts vote true, return 'COMMITTED'.", "Use `cohortVotes.every(v => v === true) ? 'COMMITTED' : 'ROLLED_BACK'`."],
    {"summary": "Two-phase commit requires atomic all-or-nothing consensus.", "rootCause": "Cohort failures left system in uncoordinated state.", "fixDetails": "Explicitly transitioned to ROLLED_BACK on any negative vote.", "takeaway": "Distributed atomic transactions must guarantee unambiguous rollback on partial failure."}
)

add_c("x20_raft_split_brain_quorum", "Distributed Consensus: Split-Brain Quorum Check", 5, "Expert", "Architecture & Systems",
    "The Raft consensus node grants leadership when it receives `votes >= nodes / 2`, allowing 2 nodes in a 4-node cluster to simultaneously claim leadership.",
    "Missing Strict Majority in Quorum Calculation", 3, 450, 240, "hasLeaderQuorum",
    "function hasLeaderQuorum(votesGranted, totalClusterNodes) {\n  // Bug: >= total / 2 allows 2 nodes in a 4-node cluster to claim quorum!\n  return votesGranted >= totalClusterNodes / 2;\n}",
    "function hasLeaderQuorum(votesGranted, totalClusterNodes) {\n  return votesGranted > Math.floor(totalClusterNodes / 2);\n}",
    [{"id": "t1", "description": "grants leadership on strict majority", "args": [3, 4], "expected": True},
     {"id": "t2", "description": "rejects split 2/4 tie", "args": [2, 4], "expected": False},
     {"id": "t3", "description": "grants majority on 5-node cluster", "args": [3, 5], "expected": True}],
    ["A quorum requires a STRICT majority: `votes > Math.floor(total / 2)`.", "In a 4-node cluster, 2 is a tie, not a majority.", "Change `>=` to `>` or use `Math.floor(total / 2) + 1`."],
    {"summary": "Distributed consensus quorums require a strict majority (> N / 2) to prevent split-brain.", "rootCause": "Allowing 50% ties permitted dual leaders simultaneously.", "fixDetails": "Enforced strict majority votesGranted > Math.floor(total / 2).", "takeaway": "Quorum must always exceed 50% to mathematically eliminate split-brain."}
)

add_c("x21_boss_volcano_core_daemon", "Zone 05 Final Boss: Distributed Consensus Split-Brain Quorum", 5, "Expert", "Architecture & Systems",
    "FINAL BOSS: The Volcano Core AI Daemon orchestrates multi-datacenter consensus. During a network partition, both partitions elect leaders because the quorum threshold evaluates against local alive nodes instead of the full cluster configuration.",
    "Dynamic Partition Sizing Causing Split-Brain", 4, 500, 240, "evaluatePartitionConsensus",
    "function evaluatePartitionConsensus(aliveInPartition, totalConfiguredCluster) {\n  // Bug: checks aliveInPartition > aliveInPartition / 2, which is ALWAYS true!\n  return aliveInPartition > aliveInPartition / 2;\n}",
    "function evaluatePartitionConsensus(aliveInPartition, totalConfiguredCluster) {\n  return aliveInPartition > Math.floor(totalConfiguredCluster / 2);\n}",
    [{"id": "t1", "description": "majority partition maintains quorum", "args": [3, 5], "expected": True},
     {"id": "t2", "description": "minority partition loses quorum", "args": [2, 5], "expected": False}],
    ["Quorum must be evaluated against `totalConfiguredCluster`.", "A partition can only commit if `aliveInPartition > Math.floor(totalConfiguredCluster / 2)`.", "Compare against totalConfiguredCluster."],
    {"summary": "Partitioned clusters must evaluate quorums against the static cluster membership.", "rootCause": "Checking against local partition count allowed both partitions to think they had quorum.", "fixDetails": "Measured against totalConfiguredCluster.", "takeaway": "Never use partitioned view size to establish absolute distributed quorum."}
    , is_boss=True
)

print(f"Total challenges in catalog: {len(catalog)}")

os.makedirs('server', exist_ok=True)
with open('server/challengesCatalog.ts', 'w') as f:
    f.write("import { Challenge } from '../src/types/game.js';\n\n")
    f.write("export const EXTENDED_CHALLENGES: Challenge[] = ")
    f.write(json.dumps(catalog, indent=2))
    f.write(";\n")

print("Successfully wrote server/challengesCatalog.ts!")
