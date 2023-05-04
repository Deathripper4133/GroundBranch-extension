//
// Test cases than can be executed via
//  node test-cases.js
//
const { mapPathPosix } = require('./pathmapper.js');

// [given, expected_output]
const testCases = [
    ["/Some Directory/GroundBranch/Content/GroundBranch/Foo/x.txt", "GroundBranch/Content/GroundBranch/Foo/x.txt"],
    ["/Some Directory/Content/GroundBranch/Foo/x.txt", "GroundBranch/Content/GroundBranch/Foo/x.txt"],
    ["/Some Directory/Content/GroundBranch/Foo/", null],
    ["Content/GroundBranch/Foo/x.txt", "GroundBranch/Content/GroundBranch/Foo/x.txt"],
    ["Content/GroundBranch/Foo/x.EXE", null],
    ["/x/y/z.png", null],
    ["Content/GroundBranch/Patches/Foo/(author)name.png", "GroundBranch/Content/GroundBranch/Patches/Foo/(author)name.png"],
    ["/SomeDirectory/x.png", null],
    ["/SomeDirectory/(author)name.png", "GroundBranch/Content/GroundBranch/Patches/Various/(author)name.png"],
    ["/SomeDirectory/my.pak", "GroundBranch/Content/Paks/my.pak"],
    ["/SomeDirectory/Config/AISettings.ini", "GroundBranch/Config/AISettings.ini"],
    ["/Config/AISettings.ini", "GroundBranch/Config/AISettings.ini"]
];

let errors = [];

for (const testCase of testCases) {
    const given = testCase[0];
    const expected_output = testCase[1];

    console.log("Test: " + given + " -> " + expected_output);

    const actual = mapPathPosix(given);

    if (actual !== expected_output) {
        const msg = "FAIL: Wanted '" + expected_output + "' but got '" + actual + "'";
        console.log(msg);
        errors.push(msg);
    }
}

if (errors.length > 0) {
    console.log("FAILED: ", errors);
    process.exit(1);
} else {
    console.log("OK");
}
