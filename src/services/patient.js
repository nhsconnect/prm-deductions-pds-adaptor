import moment from 'moment';
import uuid from 'uuid/v4';
import { generatePdsRetrievalQuery } from '../templates/pds-retrieval-template';
import config from '../config';
import sendMessage from '../fake-mhs';
import consumeMessageFromQueue from '../consumer';
import logger from '../config/logging';

export const getPatient = nhsNumber => {
  logger.info(`Requesting details of patient with nhs number ${nhsNumber}`);

  const id = uuid();
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const pdsRetrievalQuery = generatePdsRetrievalQuery(
    id,
    timestamp,
    config.pdsAsid,
    config.deductionsAsid,
    nhsNumber
  );
  return sendMessage(pdsRetrievalQuery, nhsNumber, id)
    .then(consumeMessageFromQueue)
    .then(patientDetails => {
      logger.info(`Received details of patient with nhs number ${nhsNumber}`);
      return patientDetails;
    });
};
