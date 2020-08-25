# Friction Log

This is used as a chronological log of what I tried and some thoughts.

## Log

1) Setup simple node scaffold
2) Understand the format of the example `settings.conf` file
   - Initially thought it was `.toml` file, till I saw the file extension in the example
   - Try find a Node library that parses an `.ini` file
3) Write initial test cases
4) Try [ini](https://www.npmjs.com/package/ini) library
   - Parsed the file but didn't error or ignore the custom syntax 👀
   - Would have to do some post processing on the object or modify the existing parser
5) Try [node-iniparser](https://github.com/shockie/node-iniparser) library
   - Parsed the file and stripped out the custom syntax
   - Will need to modify the parser to correctly handle the custom syntax
6) Copied `node-iniparser` library code to local lib folder
   - Found regex 😪 in source code of the lib
   - modified lib to check for override and return the correct config
7) Tests still fail due to in proper type
   - Fix return value type
   - Test cases now pass 🙌🏽
8) Tried to run directly in Node REPL
   - Had some issues with module not being found and undefined `__dirname`
   - TIL that `__dirname` is not defined in node REPL
9) Update script with a REPL friendly path
   - Re-ran test to make sure it still works in normal circumstances
10) Update project readme
    - Remove `node_modules` and follow readme to confirm docs are up-to-date
