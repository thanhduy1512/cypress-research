import express from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { Band } from '../entities/band.entity';

let bandRouter = express();
const bandRepository = AppDataSource.getRepository(Band);

bandRouter.post('/band', async (req, res) => {
  const band = new Band();
  band.name = 'firstBand';
  band.description = 'sing';

  await AppDataSource.manager.save(band);
  return res.status(201).json(band);
});

export default bandRouter;
