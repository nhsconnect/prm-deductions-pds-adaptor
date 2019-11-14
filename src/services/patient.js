import moment from "moment";
import {generatePdsRetrievalQuery} from "../templates/pds-retrieval-template";
import config from "../config";
import save from "../storage/file-system";

export const getPatient = (nhsNumber) => {
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const pdsRetrievalQuery = generatePdsRetrievalQuery(timestamp, config.pdsAsid, config.deductionsAsid, nhsNumber);
  return save(pdsRetrievalQuery, nhsNumber)
};
