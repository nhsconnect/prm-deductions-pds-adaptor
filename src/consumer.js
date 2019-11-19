import {connect} from "stompit";
import config from './config';

const consumeMessageFromQueue = () => new Promise((resolve, reject) => {
  connect({host: config.queueHost, port: config.queuePort}, (err, client) => {
    if (err) return reject(err);

    client.subscribe({destination: config.queueName}, (err, msg) => {
      if (err) return reject(err);

      msg.readString('UTF-8', (err, body) => {
        if (err) return reject(err);

        resolve(body);
        client.disconnect();
      });
    });
  });
});

export default consumeMessageFromQueue;
