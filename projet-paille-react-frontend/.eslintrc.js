/*global module*/
/*eslint no-undef: "error"*/

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/prop-types": [0],
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
    },
    "ignorePatterns": ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.JPEG", "**/*.PNG", "**/*.JPG", "**/*.css", "**/*.test.*"],
    "settings": {
        "react": { "version": "detect" }
    }
}

// pour lancer le linter, exécuter : npx eslint "src/**"
