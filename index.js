
const GAME_ID = 'groundbranch';

const STEAMAPP_ID = '16900';

const MOD_FILE_EXT = ".pak";

const LUA_MOD_FILE_EXT = ".lua";

const MIS_MOD_FILE_EXT = ".mis";

const CSV_MOD_FILE_EXT = ".csv";

const KIT_MOD_FILE_EXT = ".kit";

const RES_MOD_FILE_EXT = '.res';

const PNG_MOD_FILE_EXT= '.png';

const ALL_FILE_EXTs = [
  MOD_FILE_EXT,
  LUA_MOD_FILE_EXT,
  MIS_MOD_FILE_EXT,
  CSV_MOD_FILE_EXT,
  KIT_MOD_FILE_EXT,
  RES_MOD_FILE_EXT,
  PNG_MOD_FILE_EXT,
];

let DisoveryPath;
let testFiles = [];

//Import some assets from Vortex we'll need.
const path = require('path');
const FSystem = require('fs');
const { fs, log, util } = require('vortex-api');

const AdditionalFolders = [
  'GroundBranch',
  path.join('Localization','GroundBranch')
];


function findGame() {
  return util.GameStoreHelper.findByAppId([STEAMAPP_ID])
      .then(game => game.gamePath);
}

function prepareForModding(discovery) {
  DisoveryPath = discovery.path;
  //log('error', DisoveryPath.toString());
  return (fs.ensureDirWritableAsync(path.join(discovery.path, 'GroundBranch', 'Content')));
}

function filesPassThrough(files,gameId){
  testFiles = files;
  let supported = false
  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}

function dummyInstall(){

};

function getAllDirFoldersfrom(directory){
  //let directory = path.join(DisoveryPath, 'GroundBranch', 'Content');
  let dirList = [];
  FSystem.readdir(directory, (err, files) => { files.forEach(file => {
      // get the details of the file 
      let fileDetails = FSystem.lstatSync(path.resolve(directory, file));
      // check if the file is directory 
      if (fileDetails.isDirectory()) {
        log('error','Directory: ' + file);
        dirList.push(file);
      } else {
        log('error','File: ' + file);
      }
    });
  });

  return dirList;
}

function rootInstallFolder(rootPath){
  const splitRootPath =  rootPath.split(path.sep);
  const rootPathidx = splitRootPath.lastIndexOf('Content');
  const installFolder =  splitRootPath.slice(rootPathidx);
  return installFolder;
  // let rootPathidx;
  
  
  // let dirList = getAllDirFoldersfrom(location);
  // const fileFolder = splitRootPath[splitRootPath.length];
  // log('error', fileFolder.toString());
  // let installFolder = [];


  // // check file folder to see if it matches a folder in dirList


  // for (j = 0 ; j < splitRootPath.length ; j++){
  //   for(i = 0; i < AdditionalFolders.length; i++){

  //      //if found; set inx to fileFolder idx then return install folder
  //     if (dirList.includes(splitRootPath[j])){

  //       rootPathidx = splitRootPath.indexOf(splitRootPath[j-1]);
  //       if(i >= 1) {

  //         installFolder.push(...location,AdditionalFolders[i],...splitRootPath.slice(rootPathidx))
  //         return installFolder;
          
  //       }else{
         
  //         return path.join(splitRootPath.slice(rootPathidx));
  //       };
  //     } else{
  //       //else; go up on folder and check again
  //       dirList = getAllDirFoldersfrom(path.join(location, AdditionalFolders[i]))
  //     };

  //   };

  //   dirList = getAllDirFoldersfrom(location);
  // };



    
    
  //if found; thats index + directory^^^^^^^^

}

//Support Testers
function testSupportedContent(files, gameId) {
 let supported = false
 
  // Make sure we're able to support this mod.
  for (const Extension of ALL_FILE_EXTs){
    if((gameId === GAME_ID) &&
    (files.find(file => path.extname(file).toLowerCase() === Extension)!== undefined)){
      supported = true;
      break;
    };
  };
  return Promise.resolve({
    supported,
    requiredFiles: [],
  });
}



//------------------------------END OF TESTERS---------------------------------------------------------------------------

//Installers

function installSupportedContent(files) {
  // The .lua file is expected to always be positioned in the mods directory we're going to disregard anything placed outside the root.
  const modFile = files.find(file => path.extname(file).toLowerCase() === LUA_MOD_FILE_EXT);
  const idx = modFile.indexOf(path.basename(modFile));
  const rootPath = path.dirname(modFile);

  // Find the correct install folder
  const installFolder = rootInstallFolder(rootPath);
  log('error', installFolder);

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

  for (i = 0; i < testFiles.length;i++){
    context.registerInstaller('groundbranch-mods', 25, testSupportedContent, installSupportedContent);
    log('error','test');
    context.registerModType('gb-default-modtype', 15, (gameId) => (gameId === GAME_ID), () => getDiscoveryPath(context.api) , (instructions) => instructionsHaveFile(instructions, MOD_FILE_EXT));
  };
 


  



  
  return true;
}

module.exports = {
    default: main,
};























