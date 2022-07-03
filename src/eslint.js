module.exports = {
  env: {
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "sort-keys": ["error", "asc", { natural: true }],
    "sort-vars": "error",
  },
};
