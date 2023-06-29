import express from 'express';
import {
  createReservation,
  deleteReservation,
  getAllReservation,
  getReservationById,
  updateReservation,
} from '../services/ReservationService';

let reservationRouter = express();

reservationRouter.post('/reservation', createReservation);

reservationRouter.get('/reservation', getAllReservation);

reservationRouter.get('/reservation/:id', getReservationById);

reservationRouter.put('/reservation/:id', updateReservation);

reservationRouter.delete('/reservation/:id', deleteReservation);

export default reservationRouter;
