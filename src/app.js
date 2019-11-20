import express from 'express';
import { errorLogger, logger as requestLogger } from 'express-winston';
import httpContext from 'express-http-context';
import { options } from './config/logging';
import { addCorrelationInfo } from './middleware/correlation';
import patient from './api/patient';

const app = express();

app.use(httpContext.middleware);
app.use(addCorrelationInfo);
app.use(requestLogger(options));

app.use('/patient', patient);

app.use(errorLogger(options));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

export default app;
