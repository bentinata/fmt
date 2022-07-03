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
const expandPatterns = require("./expandPatterns");
const color = require("picocolors");

const prettier = require("prettier");
const prettierConfig = require("../src/prettier");

const eslintConfig = require("../src/eslint");
const { ESLint } = require("eslint");
const eslint = new ESLint({ fix: true, baseConfig: eslintConfig });

(async function () {
  for await (const path of expandPatterns(patterns)) {
    const input = await fs.readFile(path, "utf-8");
    const startTime = Date.now();

    const prettierOut = prettier.format(input, {
      filepath: path,
      ...prettierConfig,
    });
    const prettierTime = Date.now();
    const prettierStatus =
      (prettierOut === input
        ? color.gray("prettier:none")
        : color.green("prettier:done")) +
      color.gray(` ${prettierTime - startTime}ms`);

    const [eslintOut] = await eslint.lintText(prettierOut, { filePath: path });
    const eslintTime = Date.now();
    const eslintStatus =
      (eslintOut.errorCount > 0
        ? color.red("eslint:err")
        : eslintOut.warningCount > 0
        ? color.yellow("eslint:warn")
        : eslintOut.output
        ? color.green("eslint:done")
        : color.gray("eslint:none")) +
      color.gray(` ${eslintTime - prettierTime}ms`);

    const output = eslintOut.output ?? prettierOut;
    if (output !== input) {
      await fs.writeFile(path, prettierOut, "utf-8");
    }

    console.log(path, prettierStatus, eslintStatus);
  }
})();
