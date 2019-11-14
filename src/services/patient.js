import moment from "moment";
import uuid from 'uuid/v4'
import {generatePdsRetrievalQuery} from "../templates/pds-retrieval-template";
import config from "../config";
import sendMessage from "../fake-mhs";

export const getPatient = (nhsNumber) => {
  const id = uuid();
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const pdsRetrievalQuery = generatePdsRetrievalQuery(id, timestamp, config.pdsAsid, config.deductionsAsid, nhsNumber);
  return sendMessage(pdsRetrievalQuery, nhsNumber, id)
};
