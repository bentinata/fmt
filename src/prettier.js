const path = require("path");

module.exports = {
  pluginSearchDirs: [
    path.normalize(`${__dirname}/../node_modules`),
  ],
  importOrder: ["^[/.]"],
}
