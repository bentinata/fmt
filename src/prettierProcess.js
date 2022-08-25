const prettier = require("prettier");
const prettierConfig = require("./prettier");
const createMessage = require("./createMessage");

const processPrettier = async (input, path) => {
  const start = Date.now();

  let output;
  let isError;
  try {
    output = prettier.format(input, {
      filepath: path,
      ...prettierConfig,
    });
  } catch (err) {
    isError = true;
  }

  const message = createMessage("prettier", Date.now() - start, {
    isDone: output !== input,
    isError,
  });

  return {
    message,
    output: output ?? input,
  };
};

module.exports = processPrettier;
