import supertest from 'supertest';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import {
  createEnrollmentWithAddress,
  createPayment,
  createTicket,
  createTicketType,
  createUser,
  hotelFactory,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';

const api = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe('GET /hotels/:id', () => {
  it('should return a hotel GET hotels/:id', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType(false, true);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

    const { id } = ticket;
    const { price } = ticketType;

    await createPayment(id, price);

    const hotelWithRooms = await hotelFactory.createHotel();

    const { status, body } = await api.get(`/hotels/${hotelWithRooms.id}`).set('Authorization', `Bearer ${token}`);
    expect(status).toBe(httpStatus.OK);
    expect(body).toEqual({
      id: hotelWithRooms.id,
      name: hotelWithRooms.name,
      image: hotelWithRooms.image,
      createdAt: hotelWithRooms.createdAt.toISOString(),
      updatedAt: hotelWithRooms.updatedAt.toISOString(),
      Rooms: [
        {
          id: hotelWithRooms.Rooms[0].id,
          name: hotelWithRooms.Rooms[0].name,
          capacity: hotelWithRooms.Rooms[0].capacity,
          hotelId: hotelWithRooms.Rooms[0].hotelId,
          createdAt: hotelWithRooms.Rooms[0].createdAt.toISOString(),
          updatedAt: hotelWithRooms.Rooms[0].updatedAt.toISOString(),
        },
      ],
    });
  });
});
