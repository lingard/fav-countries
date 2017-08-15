var path = require('path')

module.exports = {
  parser: "babel-eslint",
  plugins: ["react", "flowtype"],
  extends: ["airbnb", "plugin:flowtype/recommended"],
  globals: {
    "fetch": true,
    "window": true,
    "document": true,
    "localStorage": true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, './src')],
      }
    }
  },
  "rules": {
    "default-case": 0, // Required default case is nonsense.
    "global-require": 0, // Used by webpack-isomorphic-tools and React Native.
    "new-cap": [2, {"capIsNew": false, "newIsCap": true}], // For Record() etc.
    "no-class-assign": 0, // Class assign is used for higher order components.
    "no-confusing-arrow": 0, // No, this is not confusing.
    "no-nested-ternary": 0, // It's nice for JSX.
    "no-param-reassign": 0, // We love param reassignment. Naming is hard.
    "no-shadow": 0, // Shadowing is a nice language feature. Naming is hard.
    "no-underscore-dangle": 0, // It's classic pattern to denote private props.
    "react/prefer-stateless-function": 0, // We are not there yet.
    "react/require-default-props": 0,
    "import/imports-first": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "react/jsx-filename-extension": 0, // No, JSX belongs to .js files
    "react/jsx-first-prop-new-line": 2,
    "react/sort-comp": 0,
    "jsx-quotes": [2, "prefer-single"],
    "jsx-a11y/html-has-lang": 0, // Can't recognize the Helmet.
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
    "semi": 0,
    "comma-dangle": 0,
    "ava/no-todo-test": 0,
    "generator-star-spacing": 0,
    "consistent-return": 0,
    "import/no-extraneous-dependencies": [0, {
      "devDependencies": true,
      "optionalDependencies": false,
    }],
    // flow
    "flowtype/boolean-style": [
      2,
      "boolean"
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/generic-spacing": [
      2,
      "never"
    ],
    "flowtype/no-primitive-constructor-types": 2,
    "flowtype/require-parameter-type": 2,
    "flowtype/require-return-type": [
      2,
      "always",
      {
        "annotateUndefined": "never"
      }
    ],
    "flowtype/require-valid-file-annotation": 2,
    "flowtype/semi": [
      2,
      "never"
    ],
    "flowtype/space-after-type-colon": [
      2,
      "always"
    ],
    "flowtype/space-before-generic-bracket": [
      2,
      "never"
    ],
    "flowtype/space-before-type-colon": [
      2,
      "never"
    ],
    "flowtype/use-flow-type": 1,
    "flowtype/valid-syntax": 1
  },
}
