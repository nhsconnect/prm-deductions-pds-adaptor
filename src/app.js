import express from 'express';
import {logger as requestLogger} from "express-winston";
import httpContext from "express-http-context";
import {getPatient} from "./services/patient";
import {checkIsAuthenticated} from "./middleware/auth";
import {options} from "./config/logging";
import {addCorrelationInfo} from "./middleware/correlation";

const app = express();

app.use(httpContext.middleware);
app.use(addCorrelationInfo);
app.use(requestLogger(options));

app.get('/patient', (req, res) => {
  res.sendStatus(501);
});

app.get('/patient/:nhsNumber', checkIsAuthenticated, (req, res) => {
  getPatient(req.params.nhsNumber)
    .then(patient => res.json({payload: patient}));
});

export default app;
