export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: {
                    target: "ES2020",
                    module: "ESNext",
                    moduleResolution: "node",
                    allowSyntheticDefaultImports: true,
                    esModuleInterop: true,
                    skipLibCheck: true,
                },
            },
        ],
    },
    projects: [
        {
            displayName: 'odata-transformer',
            preset: 'ts-jest/presets/default-esm',
            testEnvironment: 'node',
            extensionsToTreatAsEsm: ['.ts'],
            testMatch: ['<rootDir>/packages/odata-transformer/tests/**/*.test.ts'],
            collectCoverageFrom: ['<rootDir>/packages/odata-transformer/src/**/*.ts'],
            transform: {
                '^.+\\.ts$': [
                    'ts-jest',
                    {
                        useESM: true,
                        tsconfig: {
                            target: "ES2020",
                            module: "ESNext",
                            moduleResolution: "node",
                            allowSyntheticDefaultImports: true,
                            esModuleInterop: true,
                            skipLibCheck: true,
                        },
                    },
                ],
            },
        },
        {
            displayName: 'sdk',
            preset: 'ts-jest/presets/default-esm',
            testEnvironment: 'node',
            extensionsToTreatAsEsm: ['.ts'],
            testMatch: ['<rootDir>/packages/sdk/tests/**/*.test.ts'],
            collectCoverageFrom: ['<rootDir>/packages/sdk/src/**/*.ts'],
            transform: {
                '^.+\\.ts$': [
                    'ts-jest',
                    {
                        useESM: true,
                        tsconfig: {
                            target: "ES2020",
                            module: "ESNext",
                            moduleResolution: "node",
                            allowSyntheticDefaultImports: true,
                            esModuleInterop: true,
                            skipLibCheck: true,
                        },
                    },
                ],
            },
        },
        {
            displayName: 'sf-normalizer',
            preset: 'ts-jest/presets/default-esm',
            testEnvironment: 'node',
            extensionsToTreatAsEsm: ['.ts'],
            testMatch: ['<rootDir>/packages/sf-normalizer/tests/**/*.test.ts'],
            collectCoverageFrom: ['<rootDir>/packages/sf-normalizer/src/**/*.ts'],
            transform: {
                '^.+\\.ts$': [
                    'ts-jest',
                    {
                        useESM: true,
                        tsconfig: {
                            target: "ES2020",
                            module: "ESNext",
                            moduleResolution: "node",
                            allowSyntheticDefaultImports: true,
                            esModuleInterop: true,
                            skipLibCheck: true,
                        },
                    },
                ],
            },
        }
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    moduleNameMapper: {
        '^@odata-transformer/(.*)$': '<rootDir>/packages/odata-transformer/src/$1',
        '^@sdk/(.*)$': '<rootDir>/packages/sdk/src/$1',
        '^@sf-normalizer/(.*)$': '<rootDir>/packages/sf-normalizer/src/$1',
    },
}
