//
// Test cases than can be executed via
//  node test-cases.js
//
const { mapPath } = require('./pathmapper.js');

// [given, expected_output]
const testCases = [
    ["\\Some Directory\\GroundGranch\\Content\\GroundBranch\\Foo\\x.txt", "\\GroundBranch\\Content\\GroundBranch\\Foo\\x.txt"],
    ["\\Some Directory\\Content\\GroundBranch\\Foo\\x.txt", "\\GroundBranch\\Content\\GroundBranch\\Foo\\x.txt"],
    ["\\Some Directory\\Content\\GroundBranch\\Foo\\", null],
    ["Content\\GroundBranch\\Foo\\x.txt", "\\GroundBranch\\Content\\GroundBranch\\Foo\\x.txt"],
    ["\\patches\\Morale\\x.png", "\\GroundBranch\\Content\\GroundBranch\\Patches\\Morale\\x.png"],
    ["patches\\Morale\\x.png", "\\GroundBranch\\Content\\GroundBranch\\Patches\\Morale\\x.png"],
    ["\\SomeDirectory\\x.png", null]
];

let errors = [];

for (const testCase of testCases) {
    const given = testCase[0];
    const expted_output = testCase[1];

    console.log("Test: " + given + " -> " + expted_output);

    const actual = mapPath(given);

    if (actual !== expted_output) {
        const msg = "FAIL: Wanted '" + expted_output + "' but got '" + actual + "'";
        console.log(msg);
        errors.push(msg);
    }
}

if (errors.length > 0) {
    console.log("FAILED: ", errors)
} else {
    console.log("OK");
}
