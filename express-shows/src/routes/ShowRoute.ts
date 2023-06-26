import express, { Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { Show } from '../entities/show.entity';

let showRouter = express();
const showRepository = AppDataSource.getRepository(Show);

showRouter.post('/show', async (req: Request, res: Response) => {
  const { scheduledAt, availableSeatCount, bandId } = req.body;
  const show = new Show();
  show.scheduledAt = scheduledAt;
  show.availableSeatCount = availableSeatCount;
  show.bandId = bandId;

  try {
    await showRepository.save(show);
  } catch (error) {
    return res.status(400).json(error);
  }
  return res.status(201).json(show);
});

showRouter.get('/show', async (req: Request, res: Response) => {
  const reservations = await showRepository.find();
  return res.status(200).json(reservations);
});

showRouter.get('/show/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const show = await showRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return res.status(200).json(show);
  } catch (error) {
    return res.status(404).json(error);
  }
});

showRouter.put('/show/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { scheduledAt, availableSeatCount, bandId } = req.body;

  const show = await showRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!show) return res.status(404).json({ error: 'Show not found' });

  try {
    const result = await showRepository.save({
      ...show,
      scheduledAt,
      availableSeatCount,
      bandId,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

showRouter.delete('/show/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await showRepository.delete(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json(error);
  }
});

export default showRouter;
