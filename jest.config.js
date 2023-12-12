/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/types/",
    "<rootDir>/lib/",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/types/",
    "<rootDir>/lib/",
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 90,
      lines: 85,
      statements: 85,
    },
  },
};
