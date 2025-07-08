import presets from 'ts-jest/presets/index.js';
const { defaultsESM: tsJestPreset } = presets;

/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  transform: {
    ...tsJestPreset.transform,
    '^.+\\.jsx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: './tsconfig.json',
    },
  },
  transformIgnorePatterns: ['node_modules/(?!(axios|firebase)/)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
