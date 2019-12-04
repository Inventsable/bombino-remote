#!/usr/bin/env node

const cmds = {
  update: require("../lib/updateManifest")
};

async function init() {
  Object.keys(cmds).forEach(action => {
    if (new RegExp(`${action}`).test(process.argv)) cmds[action]();
  });
}

init();
