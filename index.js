module.exports = {
  rules: {
    "prefer-spelling": {
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
        const severity = options.severity || "warn";

        return {
          Literal(node) {
            if (typeof node.value !== "string") return;

            const text = node.value;
            Object.entries(words).forEach(([incorrect, correct]) => {
              const regex = new RegExp(`\\b${incorrect}\\b`, "gi");
              if (regex.test(text)) {
                context.report({
                  node,
                  message: `Use '${correct}' instead of '${incorrect}'.`,
                  fix(fixer) {
                    return fixer.replaceText(
                      node,
                      `'${text.replace(regex, correct)}'`
                    );
                  },
                  severity,
                });
              }
            });
          },
        };
      },
    },
  },
};
