import express from 'express';
import { checkIsAuthenticated } from '../middleware/auth';
import { getPatient } from '../services/patient';
import logger from '../config/logging';
const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(501);
});

router.get('/:nhsNumber', checkIsAuthenticated, (req, res, next) => {
  getPatient(req.params.nhsNumber)
    .then(patient => {
      logger.info({ patient: patient });
      return res.json({ payload: patient });
    })
    .catch(err => {
      logger.info({ error: err });
      next();
    });
});

export default router;
