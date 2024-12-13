module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Enforce preferred spelling of words",
            category: "Stylistic Issues",
            recommended: false,
        },
        fixable: "code",
        schema: [
            {
                type: "object",
                properties: {
                    words: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    severity: {
                        enum: ["error", "warn", "info"],
                    },
                },
                additionalProperties: false,
            },
        ],
    },
    create(context) {
        const options = context.options[0] || {};
        const words = options.words || {};

        console.log("Options:", JSON.stringify(options));
        console.log("Words:", JSON.stringify(words));

        const reportedNodes = new Set();

        function checkNode(node, value) {
            if (reportedNodes.has(node)) {
                return;
            }

            console.log("Checking node:", node.type, "Value:", value);
            Object.entries(words).forEach(([incorrect, correct]) => {
                const regex = new RegExp(`\\b\\w*${incorrect}\\w*\\b`, "gi");
                console.log("Regex:", regex);
                const match = regex.exec(value);
                if (match) {
                    const matchedWord = match[0];
                    console.log("Match found for:", matchedWord);
                    context.report({
                        node,
                        message: `Use '{{correct}}' instead of '{{incorrect}}'`,
                        data: {
                            correct: correct,
                            incorrect: incorrect,
                        },
                        fix(fixer) {
                            const replacement = matchedWord.replace(
                                new RegExp(incorrect, "gi"),
                                (match) => {
                                    if (match === match.toLowerCase())
                                        return correct.toLowerCase();
                                    if (match === match.toUpperCase())
                                        return correct.toUpperCase();
                                    return (
                                        correct[0].toUpperCase() +
                                        correct.slice(1).toLowerCase()
                                    );
                                }
                            );
                            if (node.type === "Literal") {
                                const newText =
                                    value.slice(0, match.index) +
                                    replacement +
                                    value.slice(
                                        match.index + matchedWord.length
                                    );
                                return fixer.replaceText(node, `'${newText}'`);
                            } else {
                                return fixer.replaceText(node, replacement);
                            }
                        },
                    });
                    reportedNodes.add(node);
                }
            });
        }

        return {
            Literal(node) {
                if (typeof node.value === "string") {
                    checkNode(node, node.value);
                }
            },
            Identifier(node) {
                checkNode(node, node.name);
            },
            FunctionDeclaration(node) {
                if (node.id) {
                    checkNode(node.id, node.id.name);
                }
            },
            FunctionExpression(node) {
                if (node.id) {
                    checkNode(node.id, node.id.name);
                }
            },
            ArrowFunctionExpression(node) {
                if (
                    node.parent.type === "VariableDeclarator" &&
                    node.parent.id
                ) {
                    checkNode(node.parent.id, node.parent.id.name);
                }
            },
        };
    },
};
