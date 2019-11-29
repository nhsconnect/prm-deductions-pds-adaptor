import { ConnectFailover } from 'stompit';
import moment from 'moment';
import uuid from 'uuid/v4';
import save from './storage/file-system';
import config from './config';
import { generatePatientRetrievalResponse } from './templates/pds-response-template';
import logger from './config/logging';

const logError = error => {
  logger.error('There was an error when connecting to the queue broker', error);
};

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

const putResponseOnQueue = response => {
  logger.debug('Putting patient details response on queue');

  const queue = new ConnectFailover([
    generateQueueConfig(config.queueUrl1),
    generateQueueConfig(config.queueUrl2)
  ]);
  queue.on('error', error => logError(error));

  queue.connect((err, client) => {
    if (err) return logError(err);

    const frame = client.send({ destination: config.queueName });
    frame.write(response);
    frame.end();
    client.disconnect();
    logger.debug('Successfully put patient details response on queue');
  });
};

const delay = fn => setTimeout(fn, 5000);

const sendMessage = (message, nhsNumber, queryId) =>
  save(message, nhsNumber).then(() => {
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const response = generatePatientRetrievalResponse(
      uuid(),
      queryId,
      timestamp,
      config.deductionsAsid,
      config.pdsAsid,
      nhsNumber,
      'AB123'
    );
    delay(() => putResponseOnQueue(response));
  });

export default sendMessage;
