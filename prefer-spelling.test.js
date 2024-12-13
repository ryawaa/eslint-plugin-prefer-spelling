const { RuleTester } = require("eslint");
const preferSpellingRule = require("./prefer-spelling");

const ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2015 },
});

ruleTester.run("prefer-spelling", preferSpellingRule, {
    valid: [
        {
            code: "const text = 'colour';",
            options: [{ words: { color: "colour" } }],
        },
        {
            code: "const text = 'canceled';",
            options: [{ words: { cancelled: "canceled" } }],
        },
        {
            code: "const isCancelled = true;",
            options: [{ words: { canceled: "cancelled" } }],
        },
        {
            code: "function checkIfCancelled() {}",
            options: [{ words: { canceled: "cancelled" } }],
        },
        {
            code: "const checkIfCancelled = function() {}",
            options: [{ words: { canceled: "cancelled" } }],
        },
        {
            code: "const checkIfCancelled = () => {}",
            options: [{ words: { canceled: "cancelled" } }],
        },
    ],
    invalid: [
        {
            code: "const text = 'color';",
            output: "const text = 'colour';",
            options: [{ words: { color: "colour" } }],
            errors: [{ message: "Use 'colour' instead of 'color'" }],
        },
        {
            code: "const text = 'cancelled';",
            output: "const text = 'canceled';",
            options: [{ words: { cancelled: "canceled" } }],
            errors: [{ message: "Use 'canceled' instead of 'cancelled'" }],
        },
        {
            code: "const isCanceled = true;",
            output: "const isCancelled = true;",
            options: [{ words: { canceled: "cancelled" } }],
            errors: [{ message: "Use 'cancelled' instead of 'canceled'" }],
        },
        {
            code: "function checkIfCanceled() {}",
            output: "function checkIfCancelled() {}",
            options: [{ words: { canceled: "cancelled" } }],
            errors: [{ message: "Use 'cancelled' instead of 'canceled'" }],
        },
        {
            code: "const checkIfCanceled = function() {}",
            output: "const checkIfCancelled = function() {}",
            options: [{ words: { canceled: "cancelled" } }],
            errors: [{ message: "Use 'cancelled' instead of 'canceled'" }],
        },
        {
            code: "const checkIfCanceled = () => {}",
            output: "const checkIfCancelled = () => {}",
            options: [{ words: { canceled: "cancelled" } }],
            errors: [{ message: "Use 'cancelled' instead of 'canceled'" }],
        },
    ],
});

console.log("All tests passed!");
