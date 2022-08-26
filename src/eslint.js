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
    curly: ["error", "all"],
    "lines-around-comment": [
      "error",
      {
        afterBlockComment: true,
        afterLineComment: true,
        allowArrayEnd: true,
        allowArrayStart: true,
        allowBlockEnd: true,
        allowBlockStart: true,
        allowObjectEnd: true,
        allowObjectStart: true,
        beforeBlockComment: true,
        beforeLineComment: true,
      },
    ],
    "max-len": ["error", { code: 80, ignoreUrls: true }],
    "no-confusing-arrow": ["error", { allowParens: false }],
    "no-mixed-operators": "error",
    "no-restricted-syntax": ["error", "SequenceExpression"],
    "no-tabs": "error",
    "no-unexpected-multiline": "error",
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
    "sort-keys": ["error", "asc", { natural: true }],
    "sort-vars": "error",
  },
};
