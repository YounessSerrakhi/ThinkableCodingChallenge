// scripts/testConnection.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to MongoDB Atlas successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
