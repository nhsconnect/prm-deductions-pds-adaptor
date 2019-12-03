import axios from 'axios';
import logger from '../config/logging';
import config from '../config';

export const sendMessage = message =>
  axios
    .post(
      config.mhsUrl,
      { payload: message },
      {
        headers: {
          'Interaction-Id': 'QUPA_IN040000UK32',
          'sync-async': false,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(patientDetails => {
      logger.info(`Received details of patient from MHS`);
      return patientDetails;
    })
    .catch(error => {
      logger.error('There was an error when sending a request to MHS', error);
      throw error;
    });
