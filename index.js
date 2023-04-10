// Support for GROUND BRANCH
const GAME_ID = 'groundbranch';
const STEAMAPP_ID = '16900';

//Import some assets from Vortex we'll need.
const path = require('path');
const { fs, log, util } = require('vortex-api');
const { mapPath } = require('./pathmapper.js');

function findGame() {
  return util.GameStoreHelper.findByAppId([STEAMAPP_ID])
      .then(game => game.gamePath);
}

function prepareForModding(discovery) {
  return (fs.ensureDirWritableAsync(path.join(discovery.path, 'GroundBranch', 'Content')));
}

function buildInstructions(files) {
  const instructions = [];

  files.forEach( file => {
    let dest = mapPath(file);
    log('debug', "Mapping", file + " to " + dest);
    if (dest !== null) {
      instructions.push({type:'copy', source: file, destination: dest});
    }
  });

  return instructions;
}

function testSupported(files, gameId) {
  const instructions = buildInstructions(files);
  log('debug', "Installation WOULD be", instructions);
  const supported = (gameId === GAME_ID) && instructions.length > 0;

  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}

function customInstall(files, gameId){
  const instructions = buildInstructions(files);
  log('info', "Installating GROUND BRANCH mod", instructions);
  return Promise.resolve({ instructions });
}

function main(context) {
	context.registerGame({
		id: GAME_ID,
		name: 'GROUND BRANCH',
		mergeMods: true,
		queryPath: findGame,
		supportedTools: [],
		queryModPath: () => '',
		logo: 'gameart.jpg',
		executable: () => 'GroundBranch.exe',
		requiredFiles: [
		  'GroundBranch.exe'
		],
		setup: prepareForModding,
    compatible: {
      symlinks: false,
    },
		environment: {
		  SteamAPPId: STEAMAPP_ID
		},
		details: {
		  steamAppId: STEAMAPP_ID
		},
	});

  context.registerInstaller('groundbranch-installer', 25, testSupported, customInstall);

  return true;
}

module.exports = {
    default: main,
};
