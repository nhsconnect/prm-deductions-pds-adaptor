import { generatePdsRetrievalQuery } from '../templates/pds-retrieval-template';
import config from '../config';
import { getPatient } from './patient';
import * as mhsGatewayFake from './mhs-gateway-fake';
import * as mhsGateway from './mhs-gateway';

jest.mock('../config/logging');
jest.mock('./mhs-gateway-fake');
jest.mock('./mhs-gateway');
jest.mock('moment', () => () => ({ format: () => '20190228112548' }));
jest.mock('uuid/v4', () => () => 'some-uuid');

describe('getPatient', () => {
  const nhsNumber = '1234567890';

  it('should send generated HL7 message to real mhs when environment is not local', () => {
    config.isLocal = false;
    mhsGateway.sendMessage.mockResolvedValue();

    return getPatient(nhsNumber).then(() => {
      const pdsRetrievalQuery = generatePdsRetrievalQuery(
        'some-uuid',
        '20190228112548',
        config.pdsAsid,
        config.deductionsAsid,
        nhsNumber
      );
      expect(mhsGateway.sendMessage).toHaveBeenCalledWith(pdsRetrievalQuery);
    });
  });

  it('should send generated HL7 message to fake mhs when environment is local', () => {
    config.isLocal = true;
    mhsGatewayFake.sendMessage.mockResolvedValue();

    return getPatient(nhsNumber).then(() => {
      const pdsRetrievalQuery = generatePdsRetrievalQuery(
        'some-uuid',
        '20190228112548',
        config.pdsAsid,
        config.deductionsAsid,
        nhsNumber
      );
      expect(mhsGatewayFake.sendMessage).toHaveBeenCalledWith(
        pdsRetrievalQuery,
        nhsNumber,
        'some-uuid'
      );
    });
  });

  it('should return patient details', () => {
    config.isLocal = true;
    mhsGatewayFake.sendMessage.mockResolvedValue('some-patient-details');

    return getPatient(nhsNumber).then(patientDetails => {
      expect(patientDetails).toEqual('some-patient-details');
    });
  });
});
