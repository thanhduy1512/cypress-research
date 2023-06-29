import express from 'express';
import {
  getAllBands,
  createBand,
  getBandById,
  updateBand,
  deleteBand,
} from '../services/band.service';

let bandRouter = express();

bandRouter.post('/band', createBand);

bandRouter.get('/band', getAllBands);

bandRouter.get('/band/:id', getBandById);

bandRouter.put('/band/:id', updateBand);

bandRouter.delete('/band/:id', deleteBand);

// bandRouter.post('/band/reset', async (req: Request, res: Response) => {
//   const data = await getJSONfromFile(filenames.bands, './src/json/test/');
//   console.log(data);
//   bandRepository.clear();
// });

export default bandRouter;
