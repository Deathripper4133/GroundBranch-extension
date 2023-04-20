const path = require('path');

//
// from: a (sub)-path in the source mod directory
// to: the destination in the GB game directory
//
// keep this list sorted: longer (deeper) `from` entries first.
//
const PATH_MAPPING = [
    {from: "/GroundBranch/Content/GroundBranch/", to: "GroundBranch/Content/GroundBranch/"},
    {from: "/GroundBranch/Content/GBCore/", to: "GroundBranch/Content/GBCore/"},
    {from: "/GroundBranch/Content/Localization/", to: "GroundBranch/Content/Localization/"},
    {from: "/Content/GroundBranch/", to: "GroundBranch/Content/GroundBranch/"},
    {from: "/Content/GBCore/", to: "GroundBranch/Content/GBCore/"},
    {from: "/Content/Localization/", to: "GroundBranch/Content/Localization/"},
    {from: "/GroundBranch/Config/", to: "GroundBranch/Config/"},
    {from: "/Config/", to: "GroundBranch/Config/"},
];

const PATCH_DIRECTORY = 'GroundBranch/Content/GroundBranch/Patches/Various/';
const PAK_DIRECTORY = 'GroundBranch/Content/Paks/';

//
// List of file extensions (lower case)
// that we will *not* not copy.
//
const DENIED_SUFFIXES = [
    // directory
    '/',
    // executables
    '.com',
    '.exe',
    // scripts
    '.bat',
    '.cmd',
    '.vbs',
    '.vbe',
    '.js',
    '.jse',
    '.wsf',
    '.wsh',
    '.msc',
    '.rb',
    '.rbw',
    '.ps1'
]

function mapPathPosix(fileName) {
    const baseName = path.basename(fileName);

    fileName = '/' + fileName
    const lowerFileName = fileName.toLowerCase();

    // filter out directories and unwanted files
    for (const suffix of DENIED_SUFFIXES) {
        if (lowerFileName.endsWith(suffix)) {
            return null;
        }
    }

    for (const mapping of PATH_MAPPING) {
        const subs = mapping.from.toLocaleLowerCase();
        const idx = lowerFileName.indexOf(subs);

        if (idx !== -1) {
            return mapping.to + fileName.substring(idx + subs.length);
        }
    }

    // Move `.pak` files into PAK_DIRECTORY
    if (lowerFileName.endsWith('.pak')) {
        // GROUND BRANCH currently does not use `.paks` directory
        // just keeping this code here for the future
        return PAK_DIRECTORY + baseName;
    }

    // Check if we have a `(author)name.png` patch file.
    const pngPatch = lowerFileName.endsWith('png')
        && baseName.startsWith("(")
        && baseName.indexOf(")") !== -1;
    if (pngPatch) {
        return PATCH_DIRECTORY + baseName;
    }

    return null; // no mapping
}

function mapPath(fileName) {
    // normalize 'a\\b/c' to 'a/b/c' in case path separators are mixed
    const result = mapPathPosix(fileName.replaceAll('\\', '/'));

    if (result == null)
        return null;

    return result.replaceAll('/', '\\');
}

module.exports = { mapPath, mapPathPosix };
