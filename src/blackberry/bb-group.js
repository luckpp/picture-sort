const fs = require('fs');
const path = require('path');

class BBGroup {

  constructor(fromPath, toPath) {
    this.fromPath = fromPath;
    this.toPath = toPath;
  }

  async copyFiles() {
    this.init(this.toPath);

    const dir = await fs.promises.opendir(this.fromPath);
    for await (const file of dir) {
      if (file.isFile()) {
        const fileName = file.name;
        const parentDir = this.computeParentDir(file.name);

        const fromFilePath = path.join(this.fromPath, fileName);
        const toFilePath = path.join(this.toPath, parentDir, fileName);

        this.copy(fromFilePath, toFilePath);
      }
    }
  }

  init(path) {
    if (fs.existsSync(path)) {
      fs.rmdirSync(path, { recursive: true });
    }
    fs.mkdirSync(path);
  }

  computeParentDir(fileName) {
    const tokens = fileName.split('-');
    const date = tokens[1];
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);
    return `${year}_${month}_${day}`;
  }

  copy(fromFilePath, toFilePath) {
    console.log(`${fromFilePath} -> ${toFilePath}`);

    const toDir = path.dirname(toFilePath);
    if (!fs.existsSync(toDir)) {
      fs.mkdirSync(toDir);
    }

    fs.copyFileSync(fromFilePath, toFilePath);
  }
}

module.exports = BBGroup;