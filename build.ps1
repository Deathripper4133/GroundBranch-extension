Remove-Item -Force "GROUND BRANCH Vortex Extension.zip"
node ./tests.js
if ($?) {
    Compress-Archive -Verbose -DestinationPath "GROUND BRANCH Vortex Extension.zip" -LiteralPath index.js,info.json,pathmapper.js,gameart.jpg
}
