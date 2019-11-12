import request from 'supertest'
import app from './app'
import retrievePatientDetails from './pds-retrieval'

jest.mock('./pds-retrieval');

describe('app', () => {
  describe('GET /patient', () => {
    it('should return a 501 status code', done => {
      request(app)
        .get('/patient')
        .expect(501)
        .end(done);
    });
  });

  describe('GET /patient/{nhs-number}', () => {
    it('should return a successful status code', done => {
      request(app)
        .get('/patient/1234567890')
        .expect(200)
        .end(done);
    });

    it('should retrieve patient details using nhs number', done => {
      request(app)
        .get('/patient/1234567890')
        .expect(() => {
          expect(retrievePatientDetails).toHaveBeenCalledWith('1234567890')
        })
        .end(done);
    });
  });
});