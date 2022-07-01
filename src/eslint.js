const baseConfig = {
  extends: [
    "eslint:recommended",
    "prettier",
  ],
  rules: {
  },
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
};

const _ = require("lodash");
const { FlatCompat } = require("@eslint/eslintrc");
const compat = new FlatCompat({ baseDirectory: __dirname });
const { extends: _extends, rules: _rules, ...configWithoutRulesAndExtend } = baseConfig;

// hack so main repo doesn't need to install eslint-config-*
const config = _.merge(configWithoutRulesAndExtend, ...compat.config(baseConfig).map(c => {
  if (typeof c === "string") {
    return { extends: c };
  }
  if (c.rules) {
    return { rules: c.rules };
  }
}));

module.exports = config;
