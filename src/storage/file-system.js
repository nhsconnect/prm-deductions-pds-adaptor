import { promises as fsPromises } from 'fs';
import moment from 'moment';

const save = (data, nhsNumber) => {
  const directory = `./local-datastore/${nhsNumber}`;
  const fileName = `${directory}/${moment().format()}`;
  return fsPromises
    .mkdir(directory, { recursive: true })
    .then(() => fsPromises.writeFile(fileName, data))
    .then(() => fileName);
};

export default save;
