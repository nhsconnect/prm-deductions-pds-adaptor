import express from 'express';
import { checkIsAuthenticated } from '../middleware/auth';
import { getPatient } from '../services/patient';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(501);
});

router.get('/:nhsNumber', checkIsAuthenticated, (req, res, next) => {
  getPatient(req.params.nhsNumber)
    .then(patient => res.json({ payload: patient }))
    .catch(next);
});

export default router;
