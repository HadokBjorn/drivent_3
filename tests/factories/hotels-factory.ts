import { faker } from '@faker-js/faker';
import { prisma } from '@/config';

async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.city(),
      Rooms: {
        createMany: {
          data: [
            {
              name: faker.animal.insect(),
              capacity: faker.datatype.number({
                min: 1,
                max: 6,
              }),
            },
          ],
        },
      },
    },
    include: { Rooms: true },
  });
}

const hotelFactory = {
  createHotel,
};
export { hotelFactory };
