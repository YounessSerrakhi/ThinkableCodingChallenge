import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  const posts = Array.from({ length: 50 }).map(() => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    subheading: faker.lorem.sentence(),
    createdAt: new Date(),
  }));

  try {
    for (const post of posts) {
      await prisma.post.create({
        data: post,
      });
    }
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
