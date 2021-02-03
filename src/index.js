const GroupHandler = require('./group/group-handler');
const BBNameProcessor = require('./group/name-processors/blackberry-name-processor');
const NLNameProcessor = require('./group/name-processors/nokia-lumia-name-processor');
const CameraFolders = require('./rename/camera-folders');
const NameHandler = require('./utils/name-handler');

async function rename() {
  const nameHandler = new NameHandler('d:\\Poze - Lucru\\Poze - Visma\\');
  try {
    await nameHandler.changeSubDirNames('-', '_');
  } catch (error) {
    console.log(error);
  }
}

async function groupBlackberry() {
  const bbNameProcessor = new BBNameProcessor();
  const groupHandler = new GroupHandler(
    'C:\\Temp\\pictures\\bb',
    'C:\\Temp\\pictures\\bb\\temp',
    bbNameProcessor);

  await groupHandler.copyFiles();
}

async function groupNokiaLumia() {
  const nlNameProcessor = new NLNameProcessor();
  const groupHandler = new GroupHandler(
    'D:\\Poze\\Poze - WP Pro - Camera Roll\\',
    'D:\\Poze\\Poze - WP Pro - Camera Roll\\processed',
    nlNameProcessor);

  await groupHandler.copyFiles();
}

async function renameCameraSubFolders() {
  const cameraFolders = new CameraFolders('D:\\Poze\\Poze - Camera Sony\\');
  await cameraFolders.renameSubFolders();
}

async function start() {
  // await groupBlackberry();
  // await groupNokiaLumia();
  renameCameraSubFolders();
}

start();
