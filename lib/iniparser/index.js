/**
 * Modification of the [iniparser](https://github.com/shockie/node-iniparser)
 * to handle the custom syntax for overrides
 */

/*
 * get the file handler
 */
var fs = require('fs');

/*
 * define the possible values:
 * section: [section]
 * param: key=value
 * comment: ;this is a comment
 */
var regex = {
  section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
  param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
  paramOverride: /^\s*([\w\.\-\_]+)\<([\w\.\-\_]+)\>\s*=\s*(.*?)\s*$/,
  comment: /^\s*;.*$/,
};

/*
 * parses a .ini file
 * @param: {String} file, the location of the .ini file
 * @param: {Function} callback, the function that will be called when parsing is done
 * @return: none
 */
module.exports.parse = function (file, callback) {
  if (!callback) {
    return;
  }
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, parse(data));
    }
  });
};

module.exports.parseSync = function (file, overrides) {
  return parse(fs.readFileSync(file, 'utf8'), overrides);
};

/**
 *
 * @param {*} data
 * @param {string[]} overrides
 */
function parse(data, overrides) {
  var hasOverrides = !!overrides.length;
  var value = {};
  var lines = data.split(/\r\n|\r|\n/);
  var section = null;
  lines.forEach(function (line) {
    if (regex.comment.test(line)) {
      return;
    } else if (regex.param.test(line)) {
      var match = line.match(regex.param);
      if (section) {
        value[section][match[1]] = parseValue(match[2]);
      } else {
        value[match[1]] = parseValue(match[2]);
      }
    } else if (hasOverrides && regex.paramOverride.test(line)) {
      var match = line.match(regex.paramOverride);

      const paramOverride = match[2];

      // check if the given override is present
      if (!overrides.includes(paramOverride)) return;

      if (section) {
        value[section][match[1]] = parseValue(match[3]);
      } else {
        value[match[1]] = parseValue(match[3]);
      }
    } else if (regex.section.test(line)) {
      var match = line.match(regex.section);
      value[match[1]] = {};
      section = match[1];
    } else if (line.length == 0 && section) {
      section = null;
    }
  });
  return value;
}

module.exports.parseString = parse;

function parseValue(value) {
  const regexQuote = /\"/g;

  if (value.includes('"')) {
    return value.replace(regexQuote, '');
  }

  if (value.includes(',')) {
    return value.split(',');
  }

  if (Number.isInteger(+value)) {
    return Number(value);
  }

  return value;
}
