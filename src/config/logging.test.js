import { obfuscateSecrets } from './logging';

describe('logging', () => {
  describe('obfuscateSecrets', () => {
    it('should replace secret values with obfuscated value', () => {
      const formatter = obfuscateSecrets();

      const result = formatter.transform({
        message: `some-message`,
        error: {
          port: 61614,
          connectArgs: {
            ssl: true,
            connectHeaders: {
              login: 'abcdefg',
              passcode: '1234567'
            }
          }
        }
      });

      expect(result).toEqual({
        message: `some-message`,
        error: {
          port: 61614,
          connectArgs: {
            ssl: true,
            connectHeaders: {
              login: 'abcdefg',
              passcode: '********'
            }
          }
        }
      });
    });
  });
});
