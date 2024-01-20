const fs = require("fs"); // File System - To access files (Built into Node.JS)

module.exports = class FileSystem {
  static read(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  static write(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${path}`, content.toString(), (error) => {
        if (error) return reject(error);
        else {
          resolve(content);
        }
      });
    });
  }
};
