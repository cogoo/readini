# ReadIni (/reeːˈdiːni/;)

> Read custom format `.ini` or `.conf` configuration files

## Prerequisites

Get the correct Node version with [NVM]:

[nvm]: https://github.com/nvm-sh/nvm

```bash
nvm use
```

## Getting Started

These instructions will get the project running on your local machine

### Installing / Set-up

Install the dependencies:

```bash
npm install
```

Start the NodeJS REPL:

```bash
node
```

Load the script in the Node REPL

```bash
> .load src/index.js
> CONFIG = load_config('./tests/__mocks__/settings.conf', []);
```

You can now query the config file

```bash
> CONFIG.ftp.name
# returns "hello there, ftp uploading"
```

## Running the tests

This project uses [Jest] as the test runner

[jest]: https://jestjs.io/

### Unit tests with Jest

```bash
npm run test
```

## Links

- [Architectural Design Record](./docs/PARSE_CONFIG.md) - Record of important decisions made along with its context and consequences.
- [Friction Log](./docs/FRICTION_LOG.md) - Chronological log of what I tried and some thoughts.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
