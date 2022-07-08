#!/usr/bin/env node

const match = process.version.match(/v(\d+)\.(\d+)/);
const major = Number(match[1]);

if (major < 16) {
  console.error("Node 16 is required");
  process.exit(0);
}

const { promises: fs } = require("node:fs");
const minimist = require("minimist");
const argv = minimist(process.argv.slice(2));
const patterns = argv._.length === 0 ? ["."] : argv._.map(String);
const expandPatterns = require("../src/expandPatterns");
const prettierProcess = require("../src/prettierProcess");
const eslintProcess = require("../src/eslintProcess");

(async function () {
  for await (const path of expandPatterns(patterns)) {
    const input = await fs.readFile(path, "utf-8");

    const prettierOut = await prettierProcess(input, path);
    const eslintOut = await eslintProcess(prettierOut.output, path);

    if (eslintOut.output !== input) {
      await fs.writeFile(path, eslintOut.output, "utf-8");
    }

    console.log(path, prettierOut.message, eslintOut.message);
  }
})();
