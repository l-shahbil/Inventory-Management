import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || 'smartGenx123LaithAsaadBinShahbil',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',  
  bcryptSaltRounds: 10,
};
