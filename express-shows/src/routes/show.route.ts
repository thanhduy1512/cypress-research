import express from 'express';
import {
  createShow,
  deleteShow,
  getAllShow,
  getShowById,
  updateShow,
} from '../services/show.service';

let showRouter = express();

showRouter.post('/show', createShow);

showRouter.get('/show', getAllShow);

showRouter.get('/show/:id', getShowById);

showRouter.put('/show/:id', updateShow);

showRouter.delete('/show/:id', deleteShow);

export default showRouter;
