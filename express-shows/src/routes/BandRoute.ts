import express, { Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { Band } from '../entities/band.entity';
import { getJSONfromFile, filenames } from '../database/utils/createData';

let bandRouter = express();
const bandRepository = AppDataSource.getRepository(Band);

bandRouter.post('/band', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const band = new Band();
  band.name = name;
  band.description = description;

  try {
    await bandRepository.save(band);
  } catch (error) {
    return res.status(400).json(error);
  }
  return res.status(201).json(band);
});

bandRouter.get('/band', async (req: Request, res: Response) => {
  const bands = await bandRepository.find();
  return res.status(200).json(bands);
});

bandRouter.get('/band/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const band = await bandRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return res.status(200).json(band);
  } catch (error) {
    return res.status(404).json(error);
  }
});

bandRouter.put('/band/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const band = await bandRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!band) return res.status(404).json({ error: 'Band not found' });

  const { name, description } = req.body;
  try {
    const result = await bandRepository.save({
      ...band,
      name,
      description,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

bandRouter.delete('/band/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await bandRepository.delete(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json(error);
  }
});

bandRouter.post('/band/reset', async (req: Request, res: Response) => {
  const data = await getJSONfromFile(filenames.bands, './src/json/test/');
  console.log(data);
  bandRepository.clear();
});

export default bandRouter;
