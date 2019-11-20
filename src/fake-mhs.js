import stompit from 'stompit';
import moment from 'moment';
import uuid from 'uuid/v4';
import save from './storage/file-system';
import config from './config';
import { generatePatientRetrievalResponse } from './templates/pds-response-template';

const putResponseOnQueue = response =>
  stompit.connect({ host: config.queueHost, port: config.queuePort }, (err, client) => {
    const frame = client.send({ destination: config.queueName });
    frame.write(response);
    frame.end();
    client.disconnect();
  });

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
