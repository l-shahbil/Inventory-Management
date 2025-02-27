import request from 'supertest';
import app from '../../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let createdProductId: number; 

beforeAll(async () => {
  const newProduct = await request(app).post('/api/products').send({
    ProductName: 'Test Product',
    CategoryId: 1,
    StockQuantity: 10,
    SerialNumber: 'SN12345',
    MinStockLevel: 5,
    ExpirationDate: new Date('2025-12-31'),
  });

  createdProductId = newProduct.body.ProductId; 
});

afterAll(async () => {
  await prisma.$disconnect(); 
});

describe('🔹 Product API Integration Tests', () => {

  test('GET /api/products - should return all products', async () => {
    const response = await request(app).get('/api/products');
    console.log(response.body); 

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('GET /api/products/:id - should return the created product', async () => {
    const response = await request(app).get(`/api/products/${createdProductId}`);
    console.log(response.body); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('ProductName', 'Test Product');
  });

  test('PUT /api/products/:id - should update the created product', async () => {
    const updatedProduct = { 
      ProductName: 'Updated Laptop', 
      CategoryId: 1,
      StockQuantity: 8,
      SerialNumber: 'SN67890',
      MinStockLevel: 3,
      ExpirationDate: new Date('2026-06-30')
    };

    const response = await request(app)
      .put(`/api/products/${createdProductId}`) 
      .send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('ProductName', 'Updated Laptop');
  }, 15000);

  test('DELETE /api/products/:id - should delete the created product', async () => {
    const response = await request(app).delete(`/api/products/${createdProductId}`); 
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Deleted successfully" });
  });

});