import moment from "moment";
import save from "./storage/file-system";
import {generatePdsRetrievalQuery} from "./templates/pds-retrieval-template";

const retrievePatientDetails = (nhsNumber) => {
  const pdsRetrievalQuery = generatePdsRetrievalQuery(moment().format('YYYYMMDDHHmmss'), 'to_asid', 'asid', nhsNumber);
  return save(pdsRetrievalQuery, nhsNumber)
};

export default retrievePatientDetails;