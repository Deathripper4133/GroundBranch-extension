#!/bin/sh
set -e
ZIP='GROUND BRANCH Vortex Extension.zip'
rm -f "$ZIP"
node ./tests.js
zip "$ZIP" index.js info.json pathmapper.js gameart.jpg
