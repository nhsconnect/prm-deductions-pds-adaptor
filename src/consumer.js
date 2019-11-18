import {connect} from "stompit";
import config from './config';

const consumeMessageFromQueue = () => new Promise(resolve => {
  connect({host: config.queueHost, port: config.queuePort}, (err, client) => {
    client.subscribe({destination: config.queueName}, (err, msg) => {
      msg.readString('UTF-8', (err, body) => {
        resolve(body);
        client.disconnect();
      });
    });
  });
});

export default consumeMessageFromQueue;
