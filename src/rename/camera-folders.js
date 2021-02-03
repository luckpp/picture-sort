const fs = require('fs');
const path = require('path');

class CameraFolders {

  constructor(parentFolderPath) {
    this.parentFolderPath = parentFolderPath;
  }

  async renameSubFolders() {
    const dir = await fs.promises.opendir(this.parentFolderPath);

    for await (const subDir of dir) {
      if (subDir.isDirectory()) {
        const dirName = subDir.name;
        const [month, day, year] = dirName.split('-');
        const newDirName = `${year}_${this.addLeadingZero(month)}_${this.addLeadingZero(day)}`;

        const dirPath = path.join(this.parentFolderPath, dirName);
        const newDirPath = path.join(this.parentFolderPath, newDirName);

        console.log(`Rename: ${dirPath} -> ${newDirPath}`);
        fs.renameSync(dirPath, newDirPath);
      }
    }
  }

  addLeadingZero(item) {
    if (item.length == 1) {
      return `0${item}`;
    }
    return item;
  }
}

module.exports = CameraFolders;