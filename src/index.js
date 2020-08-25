//@ts-check
const path = require('path');
const iniparser = require('../lib/iniparser');

/**
 *
 * @param {string} configPath
 * @param {string[]} overrides
 */
function load_config(configPath, overrides) {
  if (typeof configPath !== 'string') {
    throw 'Incorrect path specified; path must be a string';
  }

  if (!Array.isArray(overrides)) {
    throw 'Incorrect overrides specified; overrides must be an array';
  }

  // normalize the path
  const normalizedPath = path.resolve(__dirname, configPath);

  // Load and return the config file
  return iniparser.parseSync(normalizedPath, overrides);
}

module.exports = {
  load_config,
};
