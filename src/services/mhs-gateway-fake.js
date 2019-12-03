import moment from 'moment';
import uuid from 'uuid/v4';
import save from '../storage/file-system';
import config from '../config';
import { generatePatientRetrievalResponse } from '../templates/pds-response-template';

export const sendMessage = (message, nhsNumber, queryId) =>
  save(message, nhsNumber).then(() => {
    const timestamp = moment().format('YYYYMMDDHHmmss');
    return generatePatientRetrievalResponse(
      uuid(),
      queryId,
      timestamp,
      config.deductionsAsid,
      config.pdsAsid,
      nhsNumber,
      'AB123'
    );
  });
