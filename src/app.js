import express from 'express';
import {getPatient} from "./services/patient";

const app = express();

app.get('/patient', (req, res) => {
  res.sendStatus(501);
});

app.get('/patient/:nhsNumber', (req, res) => {
  getPatient(req.params.nhsNumber);
  res.sendStatus(200);
});

export default app;