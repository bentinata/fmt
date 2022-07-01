#!/usr/bin/env node

const match = process.version.match(/v(\d+)\.(\d+)/)
const major = Number(match[1]);

if (major < 16) {
  console.error("Node 16 is required");
  process.exit(0);
}

const { promises: fs } = require("node:fs");
const minimist = require("minimist");
const eslintConfig = require("../src/eslint");
const prettier = require("prettier");
const { ESLint } = require("eslint");
const eslint = new ESLint({ fix: true, baseConfig: eslintConfig });
const argv = minimist(process.argv.slice(2));
const patterns = argv._.length === 0 ? ["."] : argv._.map(String);
const expandPatterns = require("./expandPatterns");

(async function() {
  for await (path of expandPatterns(patterns)) {
    const input = await fs.readFile(path, "utf-8");
    const prettierOut = prettier.format(input, { filepath: path });
    await fs.writeFile(path, prettierOut, "utf-8");
  }
})();
