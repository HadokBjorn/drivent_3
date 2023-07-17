import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import hotelController from '@/controllers/hotels-controller';

const hotelRouter = Router();
hotelRouter.get('/', authenticateToken, hotelController.getHotels);
hotelRouter.get('/:id', authenticateToken, hotelController.getHotelById);
export { hotelRouter };
