import moment from "moment";
import save from "./storage/file-system";
import {generatePdsRetrievalQuery} from "./templates/pds-retrieval-template";
import config from "./config";

const retrievePatientDetails = (nhsNumber) => {
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const pdsRetrievalQuery = generatePdsRetrievalQuery(timestamp, config.pdsAsid, config.deductionsAsid, nhsNumber);
  return save(pdsRetrievalQuery, nhsNumber)
};

export default retrievePatientDetails;