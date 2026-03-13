const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const pak = require('../package.json');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');
const modules = Object.keys({ ...pak.peerDependencies });

const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];

config.resolver = {
  ...config.resolver,

  // Block peer deps from the monorepo root so only the example's versions are used.
  // Uses a regex that handles both Windows (\) and Unix (/) path separators.
  blockList: modules.map((m) => {
    const modulePath = path.join(monorepoRoot, 'node_modules', m);
    const escaped = modulePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escaped}[/\\\\].*$`);
  }),

  extraNodeModules: modules.reduce((acc, name) => {
    acc[name] = path.join(projectRoot, 'node_modules', name);
    return acc;
  }, {}),

  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
  ],
};

module.exports = config;
