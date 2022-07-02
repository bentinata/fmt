module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "prettier",
  ],
  rules: {
    "sort-vars": "error",
    "sort-keys": ["error", "asc", { natural: true }],
  },
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
};
