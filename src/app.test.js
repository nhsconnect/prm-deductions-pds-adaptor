import request from 'supertest'
import app from './app'
import {getPatient} from "./services/patient";

jest.mock('./services/patient');

describe('app', () => {
  describe('GET /patient', () => {
    it('should return a 501 status code', done => {
      request(app)
        .get('/patient')
        .expect(501)
        .end(done);
    });
  });

  describe('GET /patient/:nhsNumber', () => {
    it('should retrieve patient details using nhs number', done => {
      request(app)
        .get('/patient/1234567890')
        .expect(res => {
          expect(getPatient).toHaveBeenCalledWith('1234567890')
        })
        .end(done);
    });

    it('should return patient details as json payload', done => {
      getPatient.mockResolvedValue('some-patient');

      request(app)
        .get('/patient/1234567890')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).toEqual({payload: 'some-patient'})
        })
        .end(done);
    });
  });
});