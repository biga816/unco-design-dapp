const fs = require("fs-extra");
const targets = ["package.json"];
targets.forEach(path => {
  fs.copySync(path, `dist/${path}`);
});