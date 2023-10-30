import { Router } from 'express';
import { TrackingSinceController } from '../controllers/TrackingSinceController';

const trackingSinceRouter = Router();

trackingSinceRouter.post('/trackingsince', TrackingSinceController.handleTrackingSince);

export default trackingSinceRouter;
