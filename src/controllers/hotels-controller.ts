import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelService } from '@/services';

async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelService.validateHotelRequest(userId);
    res.status(httpStatus.OK).send(hotels);
  } catch (err) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;
  try {
    const hotel = await hotelService.validateHotelRequest(userId, Number(id));
    res.status(httpStatus.OK).send(hotel);
  } catch (err) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

const hotelController = {
  getHotels,
  getHotelById,
};
export default hotelController;
