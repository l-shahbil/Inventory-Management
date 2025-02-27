import { categoryService } from '../services/categoryServices';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      categories: {
        findMany: jest.fn().mockResolvedValue([
          { CategoryId: 1, CategoryName: 'Electronics' },
          { CategoryId: 2, CategoryName: 'Clothing' }
        ]),
        findUnique: jest.fn().mockResolvedValue({ CategoryId: 1, CategoryName: 'Electronics' }),
        create: jest.fn().mockImplementation(({ data }) => 
          Promise.resolve({ CategoryId: 3, CategoryName: data.CategoryName }) 
        ),
        update: jest.fn().mockImplementation(({ where, data }) => 
          Promise.resolve({ CategoryId: where.CategoryId, CategoryName: data.CategoryName }) 
        ),
        delete: jest.fn().mockResolvedValue({}),
      },
    }))
  };
});


  

describe('Category Service', () => {
    test('should return all categories', async () => {
      const categories = await categoryService.getAll();
      expect(categories).toHaveLength(2);
      expect(categories[0].CategoryName).toBe('Electronics');
    });
  
    test('should return a single category by ID', async () => {
      const category = await categoryService.getByid(1);
      expect(category).toHaveProperty('CategoryName', 'Electronics');
    });
  
    test('should create a new category', async () => {
      const newCategory = await categoryService.create({ CategoryName: 'Furniture' });
      expect(newCategory).toHaveProperty('CategoryName', 'Furniture');
    });
  
    test('should update a category', async () => {
      const updatedCategory = await categoryService.update(1, { CategoryName: 'Updated Name' });
      expect(updatedCategory).toHaveProperty('CategoryName', 'Updated Name');
    });
  
    test('should delete a category', async () => {
      await expect(categoryService.delete(1)).resolves.toEqual({});
    });
  });
  