import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const authenticateUser = async (email: string, password: string) => {
    if (!email || !password) {
        throw new Error('Email and password are required.');
    }

    const formattedEmail = email.trim().toLowerCase();

    try {
        const where: Prisma.UserWhereUniqueInput = { Email: formattedEmail };

        const user = await prisma.user.findUnique({ where });

        if (!user) {
            throw new Error('Invalid email or password.');
        }

        const isMatch = await bcrypt.compare(password, user.Password);

        if (!isMatch) {
            throw new Error('Invalid email or password.');
        }

        const token = jwt.sign(
            { userId: user.UserId, role: user.Role },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        return token;
    } catch (error) {
        throw new Error(`Authentication failed: ${(error as Error).message}`);
    } finally {
        await prisma.$disconnect();
    }
};
