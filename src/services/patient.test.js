import moment from "moment";
import save from "../storage/file-system";
import {generatePdsRetrievalQuery} from "../templates/pds-retrieval-template";
import config from "../config";
import {getPatient} from "./patient";

jest.mock('../storage/file-system');
jest.mock('moment');
jest.mock('uuid/v4', () => jest.fn().mockReturnValue('some-uuid'));

describe('getPatient', () => {
  it('should save generated HL7 message to file', () => {
    const nhsNumber = '1234567890';
    save.mockResolvedValue('some-file-path');
    moment.mockReturnValue({
      format: () => '20190228112548'
    });

    return getPatient(nhsNumber)
      .then(() => {
        const pdsRetrievalQuery = generatePdsRetrievalQuery('20190228112548', config.pdsAsid, config.deductionsAsid, nhsNumber);
        expect(save).toHaveBeenCalledWith(pdsRetrievalQuery, nhsNumber);
      });
  });
});