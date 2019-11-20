import { connect } from 'stompit';
import consumeMessageFromQueue from './consumer';
import config from './config';

jest.mock('stompit');

describe('consumeMessageFromQueue', () => {
  const readString = jest.fn();
  const subscribe = jest.fn();
  const disconnect = jest.fn();

  beforeEach(() => {
    readString.mockImplementation((encoding, callback) => callback(null, 'some-message-body'));
    subscribe.mockImplementation((config, callback) => callback(null, { readString }));
    connect.mockImplementation((config, callback) => callback(null, { subscribe, disconnect }));
  });

  it('should connect to the broker with the correct config', () => {
    return consumeMessageFromQueue().then(() => {
      expect(connect).toHaveBeenCalledWith(
        { host: config.queueHost, port: config.queuePort },
        expect.anything()
      );
    });
  });

  it('should reject the promise when there is an error connecting to the broker', () => {
    connect.mockImplementation((config, callback) => callback('some-error-happened'));

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
