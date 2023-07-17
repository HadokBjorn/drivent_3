import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelService } from '@/services';

async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotels = await hotelService.validateHotelRequest(userId);
  res.status(httpStatus.OK).send(hotels);
}

async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;
  const hotel = await hotelService.validateHotelRequest(userId, Number(id));
  res.status(httpStatus.OK).send(hotel);
}

const hotelController = {
  getHotels,
  getHotelById,
};
export default hotelController;
