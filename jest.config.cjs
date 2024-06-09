module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['**/src/**/*.test.ts'],
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1'
    }
};
