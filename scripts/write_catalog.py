#!/usr/bin/env python3
import json

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

# ----------------------------------------------------------------------
# LEVEL 1: BEGINNER (15 challenges: b4 to b18)
# ----------------------------------------------------------------------
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
     {"id": "t3", "description": "returns undefined for missing property", "args": [{"a": 1}, "b"], "expected": None}],
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

# ----------------------------------------------------------------------
# LEVEL 2: ELEMENTARY (15 challenges: e7 to e21)
# ----------------------------------------------------------------------
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
    "Corrupted sensor data is flagged via `val === NaN`, which always returns false because NaN never equals itself.",
    "Direct Equality Check on NaN", 2, 150, 120, "isSignalCorrupted",
    "function isSignalCorrupted(val) {\n  // Bug: NaN === NaN is false\n  return val === NaN;\n}",
    "function isSignalCorrupted(val) {\n  return Number.isNaN(val);\n}",
    [{"id": "t1", "description": "detects NaN", "args": [float('nan')], "expected": True},
     {"id": "t2", "description": "valid zero returns false", "args": [0], "expected": False},
     {"id": "t3", "description": "valid float returns false", "args": [4.2], "expected": False}],
    ["`NaN === NaN` is always false.", "Use `Number.isNaN(val)`.", "Return `Number.isNaN(val)`."],
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

# Output progress
print(f"Loaded {len(catalog)} challenges through Level 2.")
