module.exports = {
  env: {
    "browser": true,
    "es6": true
  },
  ignorePatterns: [
    "/*",
    "!src/"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@next/next/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    'plugin:etc/recommended',
  ],
  // Specifying Parser
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: ".",
    project: [
      "./tsconfig.json"
    ]
  },
  // Configuring third-party plugins
  plugins: [
    "react",
    "@typescript-eslint",
    "filename-rules",
    "react-refresh",
    "etc",
  ],
  // Resolve imports
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json"
      }
    },
    react: {
      version: "18.x"
    }
  },
  rules: {
    "prettier/prettier": ["error", { useTabs: false, singleQuote: true, printWidth: 80,  endOfLine: "auto", tabWidth: 4, trailingComma: "es5", bracketSpacing: true, jsxBracketSameLine: false, arrowParens: "always", }],
    "react/prefer-stateless-function": "error",
    "react/button-has-type": "error",
    "react/no-unused-prop-types": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-no-script-url": "error",
    "react/no-children-prop": "error",
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    "react/jsx-fragments": "error",
    "react/destructuring-assignment": [
      "error",
      "always",
      { destructureInSignature: "always" },
    ],
    "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
    "react/jsx-max-depth": ["error", { max: 6 }],
    "react/function-component-definition": [
      "off"
    ],
    "react/jsx-key": [
      "error",
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    "react/jsx-no-useless-fragment": "warn",
    "react/jsx-curly-brace-presence": "warn",
    "react/no-typos": "warn",
    "react/display-name": "warn",
    "react/self-closing-comp": "warn",
    "react/jsx-sort-props": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off",
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "default",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "variable",
        // Specify PascalCase for React components
        format: ["PascalCase", "camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "property",
        format: null,
        leadingUnderscore: "allow",
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "enumMember",
        format: ["PascalCase", "UPPER_CASE"]
      }
    ],
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment":"off",
    "import/no-default-export": "off",
    'no-console': 'warn',
    "etc/no-t": "error",
    'etc/no-commented-out-code': 'warn',
    "jsx-a11y/media-has-caption": "off"
  }
}
