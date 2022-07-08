const color = require("picocolors");

const createMessage = (
  name = "",
  timeDifference = 0,
  { isDone = false, isError = false } = {}
) => {
  const timeReport = color.gray(`${timeDifference}ms`);

  if (isError) {
    return color.red(`${name}:err `) + timeReport;
  }

  if (isDone) {
    return color.green(`${name}:done `) + timeReport;
  }

  return color.gray(`${name}:none `) + timeReport;
};

module.exports = createMessage;
