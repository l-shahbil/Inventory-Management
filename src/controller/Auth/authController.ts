import { Request, Response } from 'express';
import { authenticateUser } from '../../services/Auth/authService';

class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authenticateUser(email, password);

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error: any) {
    if (error.name === 'InvalidCredentialsError') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};