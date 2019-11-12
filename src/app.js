import express from 'express';
import retrievePatientDetails from "./pds-retrieval";

const app = express();

app.get('/patient', (req, res) => {
  res.sendStatus(501);
});

app.get('/patient/:nhsNumber', (req, res) => {
  retrievePatientDetails(req.params.nhsNumber);
  res.sendStatus(200);
});

export default app;