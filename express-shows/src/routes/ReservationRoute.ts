import express from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { Band } from '../entities/band.entity';
import { Reservation } from '../entities/reservation.entity';

let reservationRouter = express();
const bandRepository = AppDataSource.getRepository(Band);

reservationRouter.post('/reservation', async (req, res) => {
  const reservation = new Reservation();
  reservation.showId = 1;
  reservation.userId = 1;

  await AppDataSource.manager.save(reservation);
  return res.status(201).json(reservation);
});

export default reservationRouter;
