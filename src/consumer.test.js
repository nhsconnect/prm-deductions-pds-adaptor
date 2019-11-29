import { ConnectFailover } from 'stompit';
import consumeMessageFromQueue from './consumer';
import config from './config';

jest.mock('stompit');
jest.mock('./config/logging');

describe('consumeMessageFromQueue', () => {
  const readString = jest.fn();
  const subscribe = jest.fn();
  const connect = jest.fn();
  const disconnect = jest.fn();

  beforeEach(() => {
    config.queueUrl1 = 'stomp+ssl://some-url:some-port';
    config.queueUrl2 = 'tcp://other-url:other-port';
    config.queueUsername = 'some-username';
    config.queuePassword = 'some-password';

    readString.mockImplementation((encoding, callback) => callback(null, 'some-message-body'));
    subscribe.mockImplementation((config, callback) => callback(null, { readString }));
    connect.mockImplementation(callback => callback(null, { subscribe, disconnect }));
    ConnectFailover.mockImplementation(() => ({ connect, on: () => {} }));
  });

  it('should connect to the broker with the correct config', () => {
    return consumeMessageFromQueue().then(() => {
      expect(ConnectFailover).toHaveBeenCalledWith([
        {
          connectHeaders: {
            login: 'some-username',
            passcode: 'some-password'
          },
          host: 'some-url',
          port: 'some-port',
          ssl: true
        },
        {
          connectHeaders: {
            login: 'some-username',
            passcode: 'some-password'
          },
          host: 'other-url',
          port: 'other-port',
          ssl: false
        }
      ]);
    });
  });

  it('should throw if the queue urls are not configured correctly', () => {
    config.queueUrl1 = 'some-url-without-protocol:some-port';

    return expect(consumeMessageFromQueue()).rejects.toEqual(
      new Error('Queue url should have the format protocol://host:port')
    );
  });

  it('should reject the promise when there is an error connecting to the broker', () => {
    connect.mockImplementation(callback => callback('some-error-happened'));

    return expect(consumeMessageFromQueue()).rejects.toEqual('some-error-happened');
  });

  it('should subscribe to the queue with the correct config', () => {
    return consumeMessageFromQueue().then(() => {
      expect(subscribe).toHaveBeenCalledWith({ destination: config.queueName }, expect.anything());
    });
  });

  it('should reject the promise when there is an error subscribing to the queue', () => {
    subscribe.mockImplementation((config, callback) => callback('some-error-happened'));

    return expect(consumeMessageFromQueue()).rejects.toEqual('some-error-happened');
  });

  it('should read the message from the queue with the correct encoding', () => {
    return consumeMessageFromQueue().then(() => {
      expect(readString).toHaveBeenCalledWith('UTF-8', expect.anything());
    });
  });

  it('should reject the promise when there is an error reading the message', () => {
    readString.mockImplementation((encoding, callback) => callback('some-error-happened'));

    return expect(consumeMessageFromQueue()).rejects.toEqual('some-error-happened');
  });

  it('should pass the message to the provided callback function and disconnect', () => {
    return consumeMessageFromQueue().then(message => {
      expect(message).toEqual('some-message-body');
      expect(disconnect).toHaveBeenCalled();
    });
  });
});
