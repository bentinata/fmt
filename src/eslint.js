module.exports = {
  env: {
    node: true,
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
