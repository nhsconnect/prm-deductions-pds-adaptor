import moment from 'moment';
import uuid from 'uuid/v4';
import { generatePdsRetrievalQuery } from '../templates/pds-retrieval-template';
import * as mhsGatewayFake from './mhs-gateway-fake';
import * as mhsGateway from './mhs-gateway';
import config from '../config';
import logger from '../config/logging';

export const getPatient = nhsNumber => {
  logger.info(`Requesting details of patient with NHS number ${nhsNumber}`);

  const id = uuid();
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const pdsRetrievalQuery = generatePdsRetrievalQuery(
    id,
    timestamp,
    config.pdsAsid,
    config.deductionsAsid,
    nhsNumber
  );

  logger.info({ sendRetrievalQuery: pdsRetrievalQuery });

  if (config.isLocal) {
    return mhsGatewayFake.sendMessage(pdsRetrievalQuery, nhsNumber, id);
  }

  return mhsGateway.sendMessage(pdsRetrievalQuery);
};
