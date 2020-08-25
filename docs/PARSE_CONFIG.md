# Parse Config

## Summary

### Issue

We need to load a config file that follows a custom `.ini` file format.

We need to ensure that the config file can be loaded as fast as possible and is optimized to be queried frequently.

### Decision

Create a parser that loads the config file in its entirety. Loop through each line and construct the config that will  be returned. All processing will be done when the file is loaded.

## Details

### Assumptions

* Any python specific syntax can be ignored since we are using NodeJS. e.g. returning `undefined` instead of  `None`
* The config file is _NOT_ a huge file (in the hundreds of MegaBytes). Otherwise should consider loading the file line by line.
* The script will be ran in a REPL

## Notes

General notes can be found in the [Friction Log](FRICTION_LOG.md)
