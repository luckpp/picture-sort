class NokiaLumiaNameProcessor {

  computeParentDir(fileName) {
    const tokens = fileName.split('_');
    const date = tokens[1];
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);
    return `${year}_${month}_${day}`;
  }
}

module.exports = NokiaLumiaNameProcessor;