# IniParser

Modification of the [iniparser lib](https://github.com/shockie/node-iniparser) to handle the custom syntax for overrides

## Changes

```diff
# line 17 in index.js
# Regex for param with override
var regex = {
  section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
  param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
+ paramOverride: /^\s*([\w\.\-\_]+)\<([\w\.\-\_]+)\>\s*=\s*(.*?)\s*$/,
  comment: /^\s*;.*$/,
};

---
# line 43 in index.js
# update function to accept override parameter
- module.exports.parseSync = function (file) {
+ module.exports.parseSync = function (file, overrides) {
- return parse(fs.readFileSync(file, 'utf8'));
+ return parse(fs.readFileSync(file, 'utf8'), overrides);
};

---

# line 52 in index.js
# update function to accept override parameter
+ /**
+ *
+ * @param {*} data
+ * @param {string[]} overrides
+ */
- function parse(data) {
+ function parse(data, overrides) {
+  var hasOverrides = !!overrides.length;

---

# line 67 in index.js
# update function to check for override parameter
+ else if (hasOverrides && regex.paramOverride.test(line)) {
+   var match = line.match(regex.paramOverride);
+
+   const paramOverride = match[2];
+
+   // check if the given override is present
+   if (!overrides.includes(paramOverride)) return;
+
+   if (section) {
+     value[section][match[1]] = parseValue(match[3]);
+   } else {
+     value[match[1]] = parseValue(match[3]);
+   }
+ }

---

# line 93 in index.js
# function to return the modified value
+ function parseValue(value) {
+   const regex = /\"/g;
+
+   if (value.includes('"')) {
+     return value.replace(regex, '');
+   }
+
+   if (value.includes(',')) {
+     return value.split(',');
+   }
+
+   if (Number.isInteger(+value)) {
+     return Number(value);
+   }
+
+   return value;
+ }
```
