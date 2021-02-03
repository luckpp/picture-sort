const fs = require('fs');
const path = require('path');

class BBGroup {

  constructor(fromPath, toPath, nameProcessor) {
    this.fromPath = fromPath;
    this.toPath = toPath;
    this.nameProcessor = nameProcessor;
  }

  async copyFiles() {
    this.init(this.toPath);

    const dir = await fs.promises.opendir(this.fromPath);

    for await (const item of dir) {
      if (item.isFile()) {
        const fileName = item.name;
        const parentDir = this.nameProcessor.computeParentDir(item.name);

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