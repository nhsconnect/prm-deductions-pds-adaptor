import moment from "moment";
import {generatePdsRetrievalQuery} from "../templates/pds-retrieval-template";
import config from "../config";
import {getPatient} from "./patient";
import sendMessage from "../fake-mhs";

jest.mock('../fake-mhs');
jest.mock('../config/logging');
jest.mock('../consumer', () => jest.fn().mockResolvedValue('some-patient-details'));
jest.mock('moment');
jest.mock('uuid/v4', () => jest.fn().mockReturnValue('some-uuid'));

describe('getPatient', () => {
  const nhsNumber = '1234567890';

  it('should send generated HL7 message to mhs', () => {
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

  it('should return first message from queue', () => {
    return getPatient(nhsNumber)
      .then(patientDetails => {
        expect(patientDetails).toEqual('some-patient-details')
      })
  });
});