const fs = require('fs');
const path = require('path');

class NameHandler {

  constructor(dirPath) {
    this.dirPath = dirPath;

    if (!fs.existsSync(this.dirPath)) {
      throw new Error(`Dir ${this.dirPath} does not exist!`);
    }
  }

  async changeSubDirNames(searchValue, replaceValue) {
    const dir = await fs.promises.opendir(this.dirPath);
    for await (const file of dir) {
      if (file.isDirectory()) {
        const oldName = file.name;
        const newName = oldName.split(searchValue).join(replaceValue);
        console.log(`${oldName} *** ${newName}`);
        if (oldName != newName) {
          const oldPath = path.join(this.dirPath, oldName);
          const newPath = path.join(this.dirPath, newName);
          await fs.promises.rename(oldPath, newPath);
        }
      }
    }
  }
}

module.exports = NameHandler;