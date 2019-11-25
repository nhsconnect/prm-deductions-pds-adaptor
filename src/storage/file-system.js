import { promises as fsPromises } from 'fs';
import moment from 'moment';
import logger from '../config/logging';

const save = (data, nhsNumber) => {
  logger.debug(`Saving patient details request to file for nhs number ${nhsNumber}`);
  const directory = `./local-datastore/${nhsNumber}`;
  const fileName = `${directory}/${moment().format()}`;
  return fsPromises
    .mkdir(directory, { recursive: true })
    .then(() => fsPromises.writeFile(fileName, data))
    .then(() => {
      logger.debug(
        `Successfully saved patient details request to file for nhs number ${nhsNumber}`
      );
      return fileName;
    });
};

export default save;
