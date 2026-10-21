import { ALL_CHALLENGES } from '../server/challengesData.js';
import { executeChallengeInSandbox } from '../server/codeRunner.js';

console.log(`Starting rigorous verification of all ${ALL_CHALLENGES.length} challenges...`);

let passedCount = 0;
let failedCount = 0;
const failures: string[] = [];

for (const c of ALL_CHALLENGES) {
  // Test correctCode
  const result = executeChallengeInSandbox(c.correctCode, c);
  if (!result.passed) {
    failedCount++;
    failures.push(`[FAILED CORRECT]: ${c.id} (${c.title}): ${result.compileError || 'Tests failed'} - Passed ${result.passedTestsCount}/${result.totalTestsCount}`);
  } else {
    passedCount++;
  }
}

console.log(`\n========================================`);
console.log(`Verification Complete:`);
console.log(`Passed: ${passedCount}/${ALL_CHALLENGES.length}`);
console.log(`Failed: ${failedCount}/${ALL_CHALLENGES.length}`);
if (failures.length > 0) {
  console.log(`Failures:\n` + failures.join('\n'));
} else {
  console.log(`SUCCESS! ALL ${ALL_CHALLENGES.length} CHALLENGES PASS 100% OF THEIR TEST CASES!`);
}
