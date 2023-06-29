import { Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { Reservation } from '../entities/reservation.entity';
import { Show } from '../entities/show.entity';

const reservationRepository = AppDataSource.getRepository(Reservation);
const showRepository = AppDataSource.getRepository(Show);

const createReservation = async (req: Request, res: Response) => {
  const { showId, userId, seatCount } = req.body;
  const reservation = new Reservation();
  reservation.showId = showId;
  reservation.userId = userId;
  reservation.seatCount = seatCount;
  // update show seats
  const show = await showRepository.findOne({
    where: {
      id: showId,
    },
  });

  if (!show) return res.status(404).json({ error: 'Show not found' });
  if (seatCount > show.availableSeatCount)
    return res
      .status(400)
      .json({ error: 'Seat count exceeds available seat count' });
  show.availableSeatCount -= seatCount;
  try {
    await showRepository.save(show);
  } catch (error) {
    return res.status(400).json(error);
  }

  // save reservation
  try {
    await reservationRepository.save(reservation);
  } catch (error) {
    return res.status(400).json(error);
  }
  return res.status(201).json(reservation);
};

const getAllReservation = async (req: Request, res: Response) => {
  const reservations = await reservationRepository.find();
  return res.status(200).json(reservations);
};

const getReservationById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const reservation = await reservationRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const updateReservation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { showId, userId, seatCount } = req.body;

  const reservation = await reservationRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!reservation)
    return res.status(404).json({ error: 'Reservation not found' });

  // update show seats
  const show = await showRepository.findOne({
    where: {
      id: showId,
    },
  });
  if (!show) return res.status(404).json({ error: 'Show not found' });
  if (seatCount - reservation.seatCount > show.availableSeatCount)
    return res
      .status(400)
      .json({ error: 'Seat count exceeds available seat count' });
  if (seatCount > reservation.seatCount) {
    show.availableSeatCount -= seatCount - reservation.seatCount;
  } else if (seatCount < reservation.seatCount) {
    show.availableSeatCount += reservation.seatCount - seatCount;
  }
  try {
    await showRepository.save(show);
  } catch (error) {
    return res.status(400).json(error);
  }

  try {
    const result = await reservationRepository.save({
      ...reservation,
      showId,
      userId,
      seatCount,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteReservation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await reservationRepository.delete(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json(error);
  }
};

export {
  createReservation,
  getAllReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
};
