export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/jest-setup.ts'],
};
