import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export const seedAdmin = async () => {
  try {
    const adminExists = await prisma.user.findFirst({
      where: { Role: 'ADMIN' },
    });

    if (adminExists) {
      console.log('Admin already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

    const admin = await prisma.user.create({
      data: {
        Name:"admin",
        Email: process.env.ADMIN_EMAIL!,
        Password: hashedPassword,
        Phone:55555,
        Role:"ADMIN",
        },
    });

    console.log('Admin user created successfully!', admin);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
};
