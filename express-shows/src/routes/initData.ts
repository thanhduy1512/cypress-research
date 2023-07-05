import express from 'express';
import { initBand, initReservation, initShow } from '../services/init.service';

let initRouter = express();

initRouter.post('/init/band', initBand);

initRouter.post('/init/show', initShow);

initRouter.post('/init/reservation', initReservation);

export default initRouter;
