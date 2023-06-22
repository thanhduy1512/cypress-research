import express from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { Show } from '../entities/show.entity';
import { Band } from '../entities/band.entity';

let showRouter = express();
const bandRepository = AppDataSource.getRepository(Band);

showRouter.post('/show', async (req, res) => {
  const show = new Show();
  show.scheduledAt = new Date();
  show.availableSeatCount = 100;
  const bandFound = await bandRepository.findOneBy({ id: 2 });
  if (bandFound) show.band = bandFound;
  else return res.status(404).json({ message: 'Band not found' });
  await AppDataSource.manager.save(show);
  return res.status(201).json(show);
});

export default showRouter;
