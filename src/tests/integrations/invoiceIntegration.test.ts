import request from 'supertest';
import app from '../../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let createdInvoiceId: string;

beforeAll(async () => {
  const newInvoice = await request(app).post('/api/invoices').send({
    UserId: '123e4567-e89b-12d3-a456-426614174000',
    InvoiceDate: new Date().toISOString(),
    items: [{ ProductId: 1, Quantity: 2 }]
  });

  createdInvoiceId = newInvoice.body.InvoiceId;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('🔹 Sales API Integration Tests', () => {
  test('POST /api/invoices - should create a new invoice', async () => {
    const newInvoice = {
      UserId: '123e4567-e89b-12d3-a456-426614174000',
      InvoiceDate: new Date().toISOString(),
      items: [{ ProductId: 1, Quantity: 2 }]
    };

    const response = await request(app)
      .post('/api/invoices')
      .send(newInvoice);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('InvoiceId');
    createdInvoiceId = response.body.InvoiceId;
  });

  test('GET /api/invoices - should return all invoices', async () => {
    const response = await request(app).get('/api/invoices');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/invoice/:id - should return a single invoice', async () => {
    const response = await request(app).get(`/api/invoice/${createdInvoiceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('InvoiceId', createdInvoiceId);
  });

  test('DELETE /api/invoice/:id - should delete an invoice', async () => {
    const response = await request(app).delete(`/api/invoice/${createdInvoiceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Deleted successfully" });
  });
});
