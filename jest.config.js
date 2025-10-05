export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    projects: [
        {
            displayName: 'odata-transformer',
            testMatch: ['<rootDir>/packages/odata-transformer/tests/**/*.test.ts'],
            collectCoverageFrom: ['<rootDir>/packages/odata-transformer/src/**/*.ts'],
        },
        {
            displayName: 'sdk',
            testMatch: ['<rootDir>/packages/sdk/tests/**/*.test.ts'],
            collectCoverageFrom: ['<rootDir>/packages/sdk/src/**/*.ts'],
        },
        {
            displayName: 'sf-normalizer',
            testMatch: ['<rootDir>/packages/sf-normalizer/tests/**/*.test.ts'],
            collectCoverageFrom: ['<rootDir>/packages/sf-normalizer/src/**/*.ts'],
        }
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    moduleNameMapping: {
        '^@odata-transformer/(.*)$': '<rootDir>/packages/odata-transformer/src/$1',
        '^@sdk/(.*)$': '<rootDir>/packages/sdk/src/$1',
        '^@sf-normalizer/(.*)$': '<rootDir>/packages/sf-normalizer/src/$1',
    },
}
