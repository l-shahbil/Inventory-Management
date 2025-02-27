import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

const prisma = new PrismaClient();

export const authenticateUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: { Email: email },
    });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.Password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user.UserId, role: user.Role },
    config.jwtSecret,
    { expiresIn: '1h' }
  );

  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
