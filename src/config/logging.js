import { createLogger, format, transports } from 'winston';
import traverse from 'traverse';
import { getCorrelationId } from '../middleware/correlation';

const OBFUSCATED_VALUE = '********';
const SECRET_KEYS = ['passcode'];

export const obfuscateSecrets = format(info =>
  traverse(info).map(function() {
    if (SECRET_KEYS.includes(this.key)) this.update(OBFUSCATED_VALUE);
  })
);

const addCorrelationInfo = format(info => {
  info.correlationId = getCorrelationId();
  return info;
});

export const options = {
  level: 'debug',
  format: format.combine(
    addCorrelationInfo(),
    format.timestamp(),
    format.json(),
    obfuscateSecrets()
  ),
  transports: [new transports.Console({ handleExceptions: true })]
};

const logger = createLogger(options);

logger.error = (message, error) => {
  logger.log('error', `${message}: ${error.message}`, { error, stack: error.stack });
};

export default logger;
