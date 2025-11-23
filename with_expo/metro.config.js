const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add alias resolver
config.resolver.alias = {
  '@': path.resolve(__dirname, '.'),
};

// Ensure proper resolution for metro-runtime
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;