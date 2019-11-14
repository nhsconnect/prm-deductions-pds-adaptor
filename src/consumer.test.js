import {connect} from "stompit";
import consumeMessageFromQueue from "./consumer";
import config from "./config";

jest.mock('stompit');

describe('consumeMessageFromQueue', () => {
  it('should connect to the broker with the correct config', () => {
    consumeMessageFromQueue();
    expect(connect).toHaveBeenCalledWith({host: config.queueHost, port: config.queuePort}, expect.anything())
  });

  it('should subscribe to the queue with the correct config', () => {
    const subscribe = jest.fn();
    connect.mockImplementation((config, callback) => callback(null, {subscribe}));

    consumeMessageFromQueue();

    expect(subscribe).toHaveBeenCalledWith({destination: config.queueName}, expect.anything());
  });

  it('should read the message from the queue with the correct encoding', () => {
    const readString = jest.fn();
    const subscribe = (config, callback) => callback(null, {readString});
    connect.mockImplementation((config, callback) => callback(null, {subscribe}));

    consumeMessageFromQueue();

    expect(readString).toHaveBeenCalledWith('UTF-8', expect.anything());
  });

  it('should pass the message to the provided callback function and disconnect', () => {
    const readString = (encoding, callback) => callback(null, 'some-message-body');
    const subscribe = (config, callback) => callback(null, {readString});
    const disconnect = jest.fn();
    connect.mockImplementation((config, callback) => callback(null, {subscribe, disconnect}));

    consumeMessageFromQueue(message => {
      expect(message).toEqual('some-message-body');
    });

    expect(disconnect).toHaveBeenCalled();
  });
});