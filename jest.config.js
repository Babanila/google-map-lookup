module.exports = {
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js'
  },
  testPathIgnorePatterns: ['node_modules', '.cache'],
  unmockedModulePathPatterns: ['node_modules/react/', 'node_modules/enzyme/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    __PATH_PREFIX__: ''
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testURL: 'http://localhost',
  verbose: true
}
