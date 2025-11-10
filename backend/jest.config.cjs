module.exports = {
  testEnvironment: 'node',
  // avoid transforms that may interfere with ESM in simple JS projects
  transform: {},
  forceExit: true,
};