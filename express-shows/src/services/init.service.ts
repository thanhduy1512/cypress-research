import { Request, Response, response } from 'express';
import { getJSONfromFile, filenames } from '../database/utils/createData';
import { AppDataSource } from '../database/AppDataSource';
import { Show } from '../entities/show.entity';
import { Band } from '../entities/band.entity';
import { Reservation } from '../entities/reservation.entity';

const showRepository = AppDataSource.getRepository(Show);
const bandRepository = AppDataSource.getRepository(Band);
const reservationRepository = AppDataSource.getRepository(Reservation);

const initShow = async (req: Request, res: Response) => {
  const data = await getJSONfromFile(filenames.shows, './src/json/test/');
  await showRepository.query('TRUNCATE show RESTART IDENTITY CASCADE');

  for (const show of data) {
    await showRepository.save({ ...show, id: null });
  }
  const shows = await showRepository.find();
  return res.status(200).json(shows);
};

const initBand = async (req: Request, res: Response) => {
  bandRepository.query('TRUNCATE TABLE band RESTART IDENTITY CASCADE');
  const data = await getJSONfromFile(filenames.bands, './src/json/test/');

  for (const band of data) {
    await bandRepository.save({ ...band, id: null });
  }
  const bands = await bandRepository.find();
  return res.status(200).json(bands);
};

const initReservation = async (req: Request, res: Response) => {
  reservationRepository.query('TRUNCATE reservation RESTART IDENTITY CASCADE');
  const data = await getJSONfromFile(
    filenames.reservations,
    './src/json/test/'
  );

  for (const reservation of data) {
    await reservationRepository.save({ ...reservation, id: null });
  }
  const reservations = await reservationRepository.find();
  return res.status(200).json(reservations);
};

export { initShow, initBand, initReservation };
