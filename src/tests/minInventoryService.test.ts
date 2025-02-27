import { MinInventoryService } from '../services/MinInvetoryServices';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      products: {
        findMany: jest.fn().mockResolvedValue([
          {
            ProductId: '301',
            ProductName: 'Monitor',
            StockQuantity: 5,
            MinStockLevel: 10,
            Category: { CategoryName: 'Electronics' },
          },
        ]),
        fields: {
          MinStockLevel: 10, 
        },
      },
    })),
  };
});

describe('Min Inventory Service', () => {
  test('should return products below minimum stock level', async () => {
    const minInventory = await MinInventoryService.getAll();
    expect(minInventory).toHaveLength(1);
    expect(minInventory[0]).toHaveProperty('ProductName', 'Monitor');
    expect(minInventory[0].Category).toHaveProperty('CategoryName', 'Electronics');
  });
});
