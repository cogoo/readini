//@ts-check

const { load_config } = require('../src/index');

describe('load_config', () => {
  let configPath;

  beforeEach(() => {
    configPath = '/tests/__mocks__/settings.conf';
  });

  describe('function parameters', () => {
    test('should error if incorrect parameters are passed', () => {
      expect(() => {
        // @ts-ignore
        load_config();
      }).toThrow('Incorrect path specified');

      expect(() => {
        // @ts-ignore
        load_config(configPath);
      }).toThrow('Incorrect overrides specified; overrides must be an array');
    });

    test('should NOT error if correct parameters are passed', () => {
      expect(() => {
        load_config(configPath, []);
      }).not.toThrow('Incorrect overrides specified; overrides must be an array');

      expect(() => {
        load_config(configPath, ['ubuntu', 'production']);
      }).not.toThrow('Incorrect overrides specified; overrides must be an array');
    });
  });

  describe('config response', () => {
    test('should load config file', () => {
      const CONFIG = load_config(configPath, ['ubuntu', 'production']);
      expect(CONFIG).toBeDefined();
      expect(CONFIG.common.paid_users_size_limit).toEqual(2147483648);
      expect(CONFIG.ftp.name).toEqual('hello there, ftp uploading');
      expect(CONFIG.http.params).toEqual(['array', 'of', 'values']);
      expect(CONFIG.ftp.lastname).toBeUndefined();
      expect(CONFIG.ftp.enabled).toEqual('no');
      expect(CONFIG.ftp['path']).toEqual('/etc/var/uploads');
      expect(CONFIG.ftp).toEqual({
        name: 'hello there, ftp uploading',
        path: '/etc/var/uploads',
        enabled: 'no',
      });
    });

    test('should return the correct config based on override parameters', () => {
      const CONFIG = load_config(configPath, ['staging', 'itscript']);
      expect(CONFIG.common.path).toEqual('/srv/tmp/');
      expect(CONFIG.ftp.path).toEqual('/srv/uploads/');
      expect(CONFIG.http.path).toEqual('/srv/uploads/');
    });

    test('should return the default config if no overrides supplied', () => {
      const CONFIG = load_config(configPath, []);
      expect(CONFIG.common.path).toEqual('/srv/var/tmp/');
      expect(CONFIG.ftp.path).toEqual('/tmp/');
      expect(CONFIG.http.path).toEqual('/tmp/');
    });

    test('should return the default config if random overrides supplied', () => {
      const CONFIG = load_config(configPath, ['does-not-exist']);
      expect(CONFIG.common.path).toEqual('/srv/var/tmp/');
      expect(CONFIG.ftp.path).toEqual('/tmp/');
      expect(CONFIG.http.path).toEqual('/tmp/');
    });

    test('should return numbers for numerical fields', () => {
      const CONFIG = load_config(configPath, ['does-not-exist']);
      expect(CONFIG.common.basic_size_limit).toEqual(26214400);
      expect(CONFIG.common.employee_size_limit).toEqual(52428800);
      expect(CONFIG.common.paid_users_size_limit).toEqual(2147483648);
    });
  });
});
