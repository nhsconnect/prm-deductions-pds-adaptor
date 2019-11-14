import stompit from "stompit";
import moment from "moment";
import uuid from 'uuid/v4'
import save from "./storage/file-system";
import config from './config';
import {generatePatientRetrievalResponse} from "./templates/pds-response-template";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const sendMessage = (message, nhsNumber, queryId) => {
  const timestamp = moment().format('YYYYMMDDHHmmss');

  return save(message, nhsNumber)
    .then(() => sleep(5000))
    .then(() => {
      stompit.connect({host: config.queueHost, port: config.queuePort}, (err, client) => {
        const frame = client.send({destination: config.queueName});
        frame.write(generatePatientRetrievalResponse(uuid(), queryId, timestamp, config.deductionsAsid, config.pdsAsid, nhsNumber, 'AB123'));
        frame.end();
        client.disconnect();
      });
    });
};

export default sendMessage;