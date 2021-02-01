const GroupHandler = require('./group/group-handler');
const BBNameProcessor = require('./group/name-processors/blackberry-name-processor');
const NLNameProcessor = require('./group/name-processors/nokia-lumia-name-processor');
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
    'D:\\Pictures Nokia Lumia\\Camera Roll_SD\\',
    'D:\\Pictures Nokia Lumia\\Camera Roll_SD - processed',
    nlNameProcessor);

  await groupHandler.copyFiles();
}

async function start() {
  //await groupBlackberry();
  await groupNokiaLumia();
}

start();
