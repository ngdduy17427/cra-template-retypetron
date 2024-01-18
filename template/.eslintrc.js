module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-unescaped-entities": "off",
    "react/jsx-fragments": "off",
    "prettier/prettier": "off",
    "@typescript-eslint/member-delimiter-style": "error",
    "react/self-closing-comp": "error",
    "react/button-has-type": "error",
    "react/no-array-index-key": "error",
    "react-hooks/rules-of-hooks": "error",
  }
};
