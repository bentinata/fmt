const { ESLint } = require("eslint");
const eslintConfig = require("./eslint");
const eslint = new ESLint({ baseConfig: eslintConfig, fix: true });
const createMessage = require("./createMessage");

const processEslint = async (input, path) => {
  const start = Date.now();
  const [eslintOut] = await eslint.lintText(input, {
    filePath: path,
  });

  const message = createMessage("eslint", Date.now() - start, {
    isDone: !!eslintOut?.output,
    isError: eslintOut?.errorCount > 0 || eslintOut?.warningCount > 0,
  });

  return {
    message,
    output: eslintOut?.output ?? input,
  };
};

module.exports = processEslint;
