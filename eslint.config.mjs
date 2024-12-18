import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                sourceType: "module",
            },
        },
    },
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^_",
                },
            ],
            "comma-dangle": [
                "error",
                {
                    arrays: "always-multiline",
                    objects: "always-multiline",
                    functions: "always-multiline",
                    imports: "always-multiline",
                    exports: "always-multiline",
                },
            ],
            "sort-imports": [
                "error",
                {
                    ignoreCase: false,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    allowSeparatedGroups: false,
                    memberSyntaxSortOrder: [
                        "none",
                        "all",
                        "multiple",
                        "single",
                    ],
                },
            ],
            quotes: [
                "error",
                "double",
                {
                    avoidEscape: true,
                },
            ],
            semi: [
                "error",
                "always",
            ],
        },
    },
];
