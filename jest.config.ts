import type { Config } from "jest";

export default async (): Promise<Config> => {
    return {
        verbose: true,
        collectCoverageFrom: [
            "src/**/*.ts",
        ],
        coverageReporters: [
            "json",
            "text-summary",
        ],
    };
};
