module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true,
    "shared-node-browser": true,
  },
  extends: ["eslint:recommended", "prettier/prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "sort-keys": ["error", "asc", { natural: true }],
    "sort-vars": "error",
  },
};
