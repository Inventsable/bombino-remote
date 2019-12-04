const fs = require("fs");
const path = require("path");

// This is for internal use only!

async function constructManifest() {
  let parent = await readDirForDirs("./");
  console.log(parent);
  let result = {};
  for (let child of parent) result[child] = await readDir(`./${child}`);
  fs.writeFileSync("./manifest.json", JSON.stringify(result));
}

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
      !/\.git/.test(child)
    );
  });
}

constructManifest();
