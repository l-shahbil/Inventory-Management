import request from 'supertest';
import app from '../../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let createdCategoryId: number; 

beforeAll(async () => {
  const newCategory = await request(app).post('/api/categories').send({
    CategoryName: 'Test Category',
  });

  createdCategoryId = newCategory.body.CategoryId; 
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('🔹 Category API Integration Tests', () => {

  test('GET /api/categories - should return all categories', async () => {
    const response = await request(app).get('/api/categories');
    console.log(response.body); 

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('GET /api/categories/:id - should return the created category', async () => {
    const response = await request(app).get(`/api/categories/${createdCategoryId}`);
    console.log(response.body); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('CategoryName', 'Test Category');
  });

  test('PUT /api/categories/:id - should update the created category', async () => {
    const updatedCategory = { CategoryName: 'Updated Category' };

    const response = await request(app)
      .put(`/api/categories/${createdCategoryId}`) 
      .send(updatedCategory);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('CategoryName', 'Updated Category');
  }, 15000);

  test('DELETE /api/categories/:id - should delete the created category', async () => {
    const response = await request(app).delete(`/api/categories/${createdCategoryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Deleted successfully" });
  });

});
