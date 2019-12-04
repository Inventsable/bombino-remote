const fs = require("fs");
const path = require("path");

//
// Crawl through this repo and automatically update the root manifest.json for changes:
module.exports = async function() {
  let parent = await readDirForDirs("./"),
    result = {};
  for (let child of parent) result[child] = await readDir(`./${child}`);
  fs.writeFileSync("./manifest.json", JSON.stringify(result));
};

async function readDir(thispath) {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve(thispath), { encoding: "utf-8" }, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

async function readDirForDirs(thispath) {
  let parent = await readDir(thispath);
  return parent.filter(child => {
    return (
      fs.lstatSync(`${thispath.replace(/\/&/, "")}/${child}`).isDirectory() &&
      !/(\.git|bin|lib)/.test(child)
    );
  });
}
