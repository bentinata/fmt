const eslint = require("./eslint");
const eslintConfig = require("./eslintConfig");
const prettier = require("./prettier");

module.exports = {
  prettier,
  eslint: eslintConfig,
};
