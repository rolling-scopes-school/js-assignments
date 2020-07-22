module.exports = {
    "env": {
        "es2020": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "require-yield": "off",
        "no-unused-vars": "off",
        "no-prototype-builtins": "off",
        "no-var": "error",
        "no-lonely-if": "error",
        "no-proto": "error",
        "no-else-return": "error",
        "eqeqeq": "error",
        "no-lone-blocks": "error",
        "no-cond-assign": "error",
        "no-debugger": "error"
    }
};
