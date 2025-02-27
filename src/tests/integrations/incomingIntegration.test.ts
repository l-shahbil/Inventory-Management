import request from 'supertest';
import app from '../../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let createdIncomingId: number;

beforeAll(async () => {
  const newIncoming = await request(app).post('/api/incoming').send({
    SupplierId: '123e4567-e89b-12d3-a456-426614174000',
    UserId: '123e4567-e89b-12d3-a456-426614174111',
    ReceiptDate: new Date().toISOString(),
    receiptItems: [{ ProductId: 1, QuantityReceived: 5 }]
  });

  createdIncomingId = newIncoming.body.ReceiptId;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('🔹 Incoming API Integration Tests', () => {
  test('POST /api/incoming - should create a new incoming record', async () => {
    const newIncoming = {
      SupplierId: '123e4567-e89b-12d3-a456-426614174000',
      UserId: '123e4567-e89b-12d3-a456-426614174111',
      ReceiptDate: new Date().toISOString(),
      receiptItems: [{ ProductId: 1, QuantityReceived: 5 }]
    };

    const response = await request(app)
      .post('/api/incoming')
      .send(newIncoming);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('ReceiptId');
    createdIncomingId = response.body.ReceiptId;
  });

  test('GET /api/incoming - should return all incoming inventory records', async () => {
    const response = await request(app).get('/api/incoming');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/incoming/:id - should return a single incoming record', async () => {
    const response = await request(app).get(`/api/incoming/${createdIncomingId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('ReceiptId', createdIncomingId);
  });

  test('DELETE /api/incoming/:id - should delete an incoming record', async () => {
    const response = await request(app).delete(`/api/incoming/${createdIncomingId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Deleted successfully" });
  });
});
