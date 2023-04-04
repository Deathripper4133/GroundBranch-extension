
const GAME_ID = 'groundbranch';

const STEAMAPP_ID = '16900';

const MOD_FILE_EXT = ".pak";

const LUA_MOD_FILE_EXT = ".lua";

const MIS_MOD_FILE_EXT = ".mis";

const CSV_MOD_FILE_EXT = ".csv";

const KIT_MOD_FILE_EXT = ".kit";

const RES_MOD_FILE_EXT = '.res';

const PNG_MOD_FILE_EXT= '.png';

let testFiles = [];

//Import some assets from Vortex we'll need.
const path = require('path');
const FSystem = require('fs');
const { actions, fs, log, util } = require('vortex-api');



function findGame() {
  return util.GameStoreHelper.findByAppId([STEAMAPP_ID])
      .then(game => game.gamePath);
}

function prepareForModding(discovery) {
  return (fs.ensureDirWritableAsync(path.join(discovery.path, 'GroundBranch', 'Content')));
 // return (fs.ensureDirWritableAsync(path.join(discovery.path, 'GroundBranch', 'Content')));
}

function filesPassThrough(files,gameId){
  testFiles = files;
  let supported = false
  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}

function dummyInstall(){}


function rootInstallFolder(rootPath){
  const splitRootPath =  rootPath.split(path.sep);
  const rootPathidx = splitRootPath.lastIndexOf('Content');
  const installFolder =  splitRootPath.slice(rootPathidx);
  return installFolder;

}

//Support Testers
function testSupportForPak(files, gameId) {
  // Make sure we're able to support this mod.
  let supported = (gameId === GAME_ID) &&
    (files.find(file => path.extname(file).toLowerCase() === MOD_FILE_EXT)!== undefined);

  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}


function testSupportForLua(files, gameId) {
  // Make sure we're able to support this mod.
  let supported = (gameId === GAME_ID) &&
    (files.find(file => path.extname(file).toLowerCase() === LUA_MOD_FILE_EXT)!== undefined);

  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}

function testSupportForMis(files, gameId) {
  // Make sure we're able to support this mod.
  let supported = (gameId === GAME_ID) &&
    (files.find(file => path.extname(file).toLowerCase() === MIS_MOD_FILE_EXT)!== undefined);

  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}

function testSupportForKit(files, gameId) {
  // Make sure we're able to support this mod.
  let supported = (gameId === GAME_ID) &&
    (files.find(file => path.extname(file).toLowerCase() === KIT_MOD_FILE_EXT)!== undefined);

  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}

function testSupportForCSV(files, gameId) {
  // Make sure we're able to support this mod.
  let supported = (gameId === GAME_ID) &&
    (files.find(file => path.extname(file).toLowerCase() === CSV_MOD_FILE_EXT)!== undefined);

  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}

function testSupportForRES(files, gameId) {
  // Make sure we're able to support this mod.
  let supported = (gameId === GAME_ID) &&
    (files.find(file => path.extname(file).toLowerCase() === RES_MOD_FILE_EXT)!== undefined);

  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}

function testSupportForPNG(files, gameId) {
  // Make sure we're able to support this mod.
  let supported = (gameId === GAME_ID) &&
    (files.find(file => path.extname(file).toLowerCase() === PNG_MOD_FILE_EXT)!== undefined);

  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}

//------------------------------END OF TESTERS---------------------------------------------------------------------------

//Installers
function installPakContent(files) {
  // The .pak file is expected to always be positioned in the mods directory we're going to disregard anything placed outside the root.
  const modFile = files.find(file => path.extname(file).toLowerCase() === MOD_FILE_EXT);
  const idx = modFile.indexOf(path.basename(modFile));
  const rootPath = path.dirname(modFile);

  // Remove directories and anything that isn't in the rootPath.
  const filtered = files.filter(file =>
    ((file.indexOf(rootPath) !== -1)
    && (!file.endsWith(path.sep))));


  const instructions = filtered.map(file => {
    return {
      type: 'copy',
      source: file,
      destination: path.join(file.substr(idx)),
    };
  });

  return Promise.resolve({ instructions });
}



function installLuaContent(files) {
  // The .lua file is expected to always be positioned in the mods directory we're going to disregard anything placed outside the root.
  const modFile = files.find(file => path.extname(file).toLowerCase() === LUA_MOD_FILE_EXT);
  const idx = modFile.indexOf(path.basename(modFile));
  const rootPath = path.dirname(modFile);

  // Find the correct install folder
  const installFolder = rootInstallFolder(rootPath);

  // Remove directories and anything that isn't in the rootPath.
  const filtered = files.filter(file =>
    ((file.indexOf(rootPath) !== -1)
    && (!file.endsWith(path.sep))));


  const instructions = filtered.map(file => {
    return {
      type: 'copy',
      source: file,
      destination: path.join( installFolder.join('/'), file.substr(idx)),
    };
  });

  return Promise.resolve({ instructions });
}



function installMisContent(files) {
  // The .mis file is expected to always be positioned in the mods directory we're going to disregard anything placed outside the root.
  const modFile = files.find(file => path.extname(file).toLowerCase() === MIS_MOD_FILE_EXT);
  const idx = modFile.indexOf(path.basename(modFile));
  const rootPath = path.dirname(modFile);
 
  const installFolder = rootInstallFolder(rootPath);

  // Remove directories and anything that isn't in the rootPath.
  const filtered = files.filter(file =>
    ((file.indexOf(rootPath) !== -1)
    && (!file.endsWith(path.sep))));


  const instructions = filtered.map(file => {
    return {
      type: 'copy',
      source: file,
      destination: path.join(installFolder.join('/'), file.substr(idx)),
    };
  });

  return Promise.resolve({ instructions });
}



function installKitContent(files) {
  // The .kit file is expected to always be positioned in the mods directory we're going to disregard anything placed outside the root.
  const modFile = files.find(file => path.extname(file).toLowerCase() === KIT_MOD_FILE_EXT);
  const idx = modFile.indexOf(path.basename(modFile));
  const rootPath = path.dirname(modFile);
  
  // Find the correct install folder
  const installFolder = rootInstallFolder(rootPath);
  
  // Remove directories and anything that isn't in the rootPath.
  const filtered = files.filter(file =>
    ((file.indexOf(rootPath) !== -1)
    && (!file.endsWith(path.sep))));


  const instructions = filtered.map(file => {
    return {
      type: 'copy',
      source: file,
      destination: path.join( installFolder.join('/') , file.substr(idx)),
    };
  });

  return Promise.resolve({ instructions });
}

function installCSVContent(files) {
  // The .csv file is expected to always be positioned in the mods directory we're going to disregard anything placed outside the root.
  const modFile = files.find(file => path.extname(file).toLowerCase() === CSV_MOD_FILE_EXT);
  const idx = modFile.indexOf(path.basename(modFile));
  const rootPath = path.dirname(modFile);

  const installFolder = rootInstallFolder(rootPath);

  // Remove directories and anything that isn't in the rootPath.
  const filtered = files.filter(file => ((file.indexOf(rootPath) !== -1) && (!file.endsWith(path.sep))));


  const instructions = filtered.map(file => {
    return {
      type: 'copy',
      source: file,
      destination: path.join(installFolder.join('/')  ,file.substr(idx)),
    };
  });

  return Promise.resolve({ instructions });
}


function installRESContent(files) {
  // The .res file is expected to always be positioned in the mods directory we're going to disregard anything placed outside the root.
  const modFile = files.find(file => path.extname(file).toLowerCase() === RES_MOD_FILE_EXT);
  const idx = modFile.indexOf(path.basename(modFile));
  const rootPath = path.dirname(modFile);

  const installFolder = rootInstallFolder(rootPath);

  // Remove directories and anything that isn't in the rootPath.
  const filtered = files.filter(file => ((file.indexOf(rootPath) !== -1) && (!file.endsWith(path.sep))));


  const instructions = filtered.map(file => {
    return {
      type: 'copy',
      source: file,
      destination: path.join(installFolder.join('/'),file.substr(idx)),
    };
  });

  return Promise.resolve({ instructions });
}

function installPNGContent(files) {
  // The .kit file is expected to always be positioned in the mods directory we're going to disregard anything placed outside the root.
  const modFile = files.find(file => path.extname(file).toLowerCase() === PNG_MOD_FILE_EXT);
  const idx = modFile.indexOf(path.basename(modFile));
  const rootPath = path.dirname(modFile);
  
  // Find the correct install folder
  const installFolder = rootInstallFolder(rootPath);
  
  // Remove directories and anything that isn't in the rootPath.
  const filtered = files.filter(file =>
    ((file.indexOf(rootPath) !== -1)
    && (!file.endsWith(path.sep))));


  const instructions = filtered.map(file => {
    return {
      type: 'copy',
      source: file,
      destination: path.join( installFolder.join('/') , file.substr(idx)),
    };
  });

  return Promise.resolve({ instructions });
}
//--------------------------------------END OF INSTALLERS------------------------------------------


// I dont know why this works but it does.
const getDiscoveryPath = (api) => {
  const store = api.store;
  const state = store.getState();
  const discovery = util.getSafe(state, [ 'settings','gameMode', 'discovered', GAME_ID], undefined);
  if ((discovery === undefined) || (discovery.path === undefined)) {
    // should never happen and if it does it will cause errors elsewhere as well
    log('error', 'ground branch was not discovered');
    return '.';
  }
 log('error' , discovery.path)
  return discovery.path;
}

function instructionsHaveFile(instructions, fileName) {
  const copies = instructions.filter(instruction => instruction.type === 'copy');
  return new Promise((resolve, reject) => {
    const fileExists = copies.find(inst => path.basename(inst.destination).toLowerCase() === fileName) !== undefined;
    return resolve(fileExists);
  })
}

function main(context) {
  //This is the main function Vortex will run when detecting the game extension.

	context.registerGame({
		id: GAME_ID,
		name: 'Ground Branch',
		mergeMods: true,
		queryPath: findGame,
		supportedTools: [],
		queryModPath: () => getDiscoveryPath(context.api),
		logo: 'gameart.jpg',
		executable: () => 'GroundBranch.exe',
		requiredFiles: [
		  'GroundBranch.exe'
		],
		setup: prepareForModding,
		environment: {
		  SteamAPPId: STEAMAPP_ID,
		},
		details: {
		  steamAppId: STEAMAPP_ID,
		},
	});
	
  context.registerInstaller('dummy installer',25,filesPassThrough, dummyInstall)

  for (i = 0; i< testFiles.length;i++){
    context.registerInstaller('groundbranch-mod-pak', 25, testSupportForPak, installPakContent);
    context.registerModType('gb-Pak-modtype', 15, (gameId) => (gameId === GAME_ID), () => getDiscoveryPath(context.api) , (instructions) => instructionsHaveFile(instructions, MOD_FILE_EXT));


    context.registerInstaller('groundbranch-mod-lua', 25, testSupportForLua, installLuaContent);
    context.registerModType('gb-Lua-modtype', 15, (gameId) => (gameId === GAME_ID), () => getDiscoveryPath(context.api) , (instructions) => instructionsHaveFile(instructions, LUA_MOD_FILE_EXT));


    context.registerInstaller('groundbranch-mod-mis', 25, testSupportForMis, installMisContent);
    context.registerModType('gb-Mis-modtype', 15, (gameId) => (gameId === GAME_ID), () => getDiscoveryPath(context.api) , (instructions) => instructionsHaveFile(instructions, MIS_MOD_FILE_EXT));


    context.registerInstaller('groundbranch-mod-kit', 25, testSupportForKit, installKitContent);
    context.registerModType('gb-Kit-modtype', 15, (gameId) => (gameId === GAME_ID), () => getDiscoveryPath(context.api) , (instructions) => instructionsHaveFile(instructions, KIT_MOD_FILE_EXT));


    context.registerInstaller('groundbranch-mod-res', 25, testSupportForRES, installRESContent); 
    context.registerModType('gb-Res-modtype', 15, (gameId) => (gameId === GAME_ID), () => getDiscoveryPath(context.api) , (instructions) => instructionsHaveFile(instructions, RES_MOD_FILE_EXT));


    context.registerInstaller('groundbranch-mod-csv', 25, testSupportForCSV, installCSVContent); 
    context.registerModType('gb-CSV-modtype', 15, (gameId) => (gameId === GAME_ID), () => getDiscoveryPath(context.api) , (instructions) => instructionsHaveFile(instructions, CSV_MOD_FILE_EXT));

    context.registerInstaller('groundbranch-mod-png', 25, testSupportForPNG, installPNGContent); 
    context.registerModType('gb-png-modtype', 15, (gameId) => (gameId === GAME_ID), () => getDiscoveryPath(context.api) , (instructions) => instructionsHaveFile(instructions, PNG_MOD_FILE_EXT));

  };
 


  



  
  return true;
}

module.exports = {
    default: main,
};























