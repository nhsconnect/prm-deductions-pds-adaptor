import express from 'express';
import {getPatient} from "./services/patient";
import {checkIsAuthenticated} from "./middleware/auth";

const app = express();

app.get('/patient', (req, res) => {
  res.sendStatus(501);
});

app.get('/patient/:nhsNumber', checkIsAuthenticated, (req, res) => {
  getPatient(req.params.nhsNumber)
    .then(patient => res.json({payload: patient}));
});

export default app;
