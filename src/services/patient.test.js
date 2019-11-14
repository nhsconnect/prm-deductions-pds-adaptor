import moment from "moment";
import {generatePdsRetrievalQuery} from "../templates/pds-retrieval-template";
import config from "../config";
import {getPatient} from "./patient";
import sendMessage from "../fake-mhs";

jest.mock('../fake-mhs');
jest.mock('moment');
jest.mock('uuid/v4', () => jest.fn().mockReturnValue('some-uuid'));

describe('getPatient', () => {
  it('should save generated HL7 message to file', () => {
    const nhsNumber = '1234567890';
    sendMessage.mockResolvedValue();
    moment.mockReturnValue({
      format: () => '20190228112548'
    });

    return getPatient(nhsNumber)
      .then(() => {
        const pdsRetrievalQuery = generatePdsRetrievalQuery('some-uuid', '20190228112548', config.pdsAsid, config.deductionsAsid, nhsNumber);
        expect(sendMessage).toHaveBeenCalledWith(pdsRetrievalQuery, nhsNumber, 'some-uuid');
      });
  });
});