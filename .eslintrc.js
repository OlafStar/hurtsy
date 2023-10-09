module.exports = {
  extends: "next",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: [".eslintrc.js", ".prettierrc.js"],
  rules: {
    "@next/next/no-img-element": "off",
    camelcase: "error",
    "react/jsx-no-literals": "error",
    "no-eval": "error",
    "import/first": "error",
    // '@typescript-eslint/explicit-function-return-type': 'off',
    "react-hooks/exhaustive-deps": "off",
    "jsx-a11y/alt-text": [0],
    "react/prop-types": "off",
    "no-console": [
      PROD ? "error" : "off",
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          ["internal", "unknown"],
          "parent",
          ["sibling", "index"],
        ],
        "newlines-between": "always",
      },
    ],
  },
};
