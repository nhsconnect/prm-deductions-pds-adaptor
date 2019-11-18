import {createLogger, format, transports} from "winston";
import {getCorrelationId} from "../middleware/correlation";

const addCorrelationInfo = format(info => {
  info.correlationId = getCorrelationId();
  return info;
});

export const options = {
  format: format.combine(
    addCorrelationInfo(),
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console()
  ]
};

const logger = createLogger(options);

export default logger;