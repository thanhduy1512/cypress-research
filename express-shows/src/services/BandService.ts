import { Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { Band } from '../entities/band.entity';

const bandRepository = AppDataSource.getRepository(Band);

const createBand = async (req: Request, res: Response) => {
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
};

const getAllBands = async (req: Request, res: Response) => {
  const bands = await bandRepository.find();
  return res.status(200).json(bands);
};

const getBandById = async (req: Request, res: Response) => {
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
};

const updateBand = async (req: Request, res: Response) => {
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
};

const deleteBand = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await bandRepository.delete(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json(error);
  }
};

export { createBand, getAllBands, getBandById, updateBand, deleteBand };
