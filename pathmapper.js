
//
// from: a (sub)-path in the source mod directory
// to: the destination in the GB game directory
//
// keep this list sorted (longer `from` entries first)
//
const PATH_MAPPING = [
    {from: "\\GroundBranch\\Content\\GroundBranch\\", to: "\\GroundBranch\\Content\\GroundBranch\\"},
    {from: "\\GroundBranch\\Content\\Localization\\", to: "\\GroundBranch\\Content\\Localization\\"},
    {from: "\\Content\\GroundBranch\\", to: "\\GroundBranch\\Content\\GroundBranch\\"},
    {from: "\\Content\\Localization\\", to: "\\GroundBranch\\Content\\Localization\\"},
    {from: "\\Patches\\", to: "\\GroundBranch\\Content\\GroundBranch\\Patches\\"}
];


function mapPath(fileName) {
    fileName = '\\' + fileName
    const lowerFileName = fileName.toLowerCase();

    // ignore directories
    if (lowerFileName.endsWith("\\"))
        return null;

    for (const mapping of PATH_MAPPING) {
        const subs = mapping.from.toLocaleLowerCase();
        const idx = lowerFileName.indexOf(subs);

        if (idx !== -1) {
            const newName = mapping.to + fileName.substring(idx + subs.length);
            return newName;
        }
    }

    // TODO: special mapping for `.pak` files

    // TODO: special mapping for `.png` files that are patches but not inside \Patches\ folder

    return null;
}

module.exports = { mapPath };
