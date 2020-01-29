import logger from '../config/logging';

export const checkIsAuthenticated = (req, res, next) => {
  const validAuthorizationKeys = process.env.AUTHORIZATION_KEYS
    ? process.env.AUTHORIZATION_KEYS.split(',')
    : [];

  const authorizationKey = req.get('Authorization');
  if (!authorizationKey) {
    logger.info('Authorization key is undefined');
    res.sendStatus(401);
    return;
  }

  if (!validAuthorizationKeys.includes(authorizationKey)) {
    logger.info('Authorization is provided but not valid');
    res.sendStatus(403);
    return;
  }

  next();
};
