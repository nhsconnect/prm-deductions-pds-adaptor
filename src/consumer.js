import { ConnectFailover } from 'stompit';
import config from './config';
import logger from './config/logging';

const consumeMessageFromQueue = () =>
  new Promise((resolve, reject) => {
    logger.debug('Waiting for patient details response');
    const queue = new ConnectFailover(config.queueUrl);

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
