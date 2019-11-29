import { ConnectFailover } from 'stompit';
import config from './config';
import logger from './config/logging';

const generateQueueConfig = url => {
  const urlParts = url.match(/(.*):\/\/(.*):(.*)/);
  if (!urlParts || urlParts.length < 4)
    throw new Error('Queue url should have the format protocol://host:port');

  return {
    host: urlParts[2],
    port: urlParts[3],
    ssl: urlParts[1].includes('ssl'),
    connectHeaders: {
      login: config.queueUsername,
      passcode: config.queuePassword
    }
  };
};

const consumeMessageFromQueue = () =>
  new Promise((resolve, reject) => {
    logger.debug('Waiting for patient details response');

    const queue = new ConnectFailover([
      generateQueueConfig(config.queueUrl1),
      generateQueueConfig(config.queueUrl2)
    ]);
    queue.on('error', error => reject(error));

    queue.connect((err, client) => {
      if (err) return reject(err);

      client.subscribe({ destination: config.queueName }, (err, msg) => {
        if (err) return reject(err);

        msg.readString('UTF-8', (err, body) => {
          if (err) return reject(err);

          logger.debug('Received patient details response');
          resolve(body);
          client.disconnect();
        });
      });
    });
  });

export default consumeMessageFromQueue;
