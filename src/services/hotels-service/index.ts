import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function validateHotelRequest(userId: number, hotelId?: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const { status } = ticket;
  const { isRemote, includesHotel } = ticket.TicketType;

  if (status === 'RESERVED' || isRemote || !includesHotel) {
    throw paymentRequiredError();
  }

  if (hotelId) {
    const hotel = await hotelRepository.getHotelByIdDB(hotelId);
    if (!hotel) throw notFoundError();
    return hotel;
  }

  const hotels = await hotelRepository.getHotelsDB();

  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

const hotelService = {
  validateHotelRequest,
};

export { hotelService };
