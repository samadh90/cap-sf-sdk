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
            displayName: 'core',
            preset: 'ts-jest/presets/default-esm',
            testEnvironment: 'node',
            extensionsToTreatAsEsm: ['.ts'],
            testMatch: ['<rootDir>/packages/core/tests/**/*.test.ts'],
            collectCoverageFrom: ['<rootDir>/packages/core/src/**/*.ts'],
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
        '^@core/(.*)$': '<rootDir>/packages/core/src/$1',
        '^@sf-normalizer/(.*)$': '<rootDir>/packages/sf-normalizer/src/$1',
    },
}
