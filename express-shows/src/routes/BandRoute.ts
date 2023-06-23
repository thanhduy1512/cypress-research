import express from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { Band } from '../entities/band.entity';
import { getJSONfromFile, filenames } from '../database/utils/createData';

let bandRouter = express();
const bandRepository = AppDataSource.getRepository(Band);

bandRouter.post('/band', async (req, res) => {
  const band = new Band();
  band.name = 'firstBand';
  band.description = 'sing';

  // await AppDataSource.manager.save(band);
  return res.status(201).json(band);
});

bandRouter.post('/bandReset', async (req, res) => {
  const data = await getJSONfromFile(filenames.bands, './src/json/test/');
  console.log(data);
  bandRepository.clear();
});

export default bandRouter;
