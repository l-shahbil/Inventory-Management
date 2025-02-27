import { ProductService } from '../services/productServices';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      products: {
        findMany: jest.fn().mockResolvedValue([
          { ProductId: 1, ProductName: 'Laptop', Price: 1000, Stock: 10, Category: { CategoryName: 'Electronics' } },
          { ProductId: 2, ProductName: 'Phone', Price: 500, Stock: 20, Category: { CategoryName: 'Electronics' } }
        ]),

        findUnique: jest.fn().mockImplementation(({ where }) =>
          Promise.resolve(
            where.ProductId === 1
              ? { ProductId: 1, ProductName: 'Laptop', Price: 1000, Stock: 10, Category: { CategoryName: 'Electronics' } }
              : null
          )
        ),

        create: jest.fn().mockImplementation(({ data }) =>
          Promise.resolve({
            ProductId: 3,
            ProductName: data.ProductName,
            Price: data.Price,
            Stock: data.Stock,
            Category: { CategoryName: 'Computers' }
          })
        ),

        update: jest.fn().mockImplementation(({ where, data }) =>
          Promise.resolve({
            ProductId: where.ProductId,
            ProductName: data.ProductName,
            Price: data.Price,
            Stock: data.Stock,
            Category: { CategoryName: 'Electronics' }
          })
        ),

        delete: jest.fn().mockResolvedValue({}),
      },
    })),
  };
});

describe('Product Service', () => {
  test('should return all products', async () => {
    const products = await ProductService.getAll();
    expect(products).toHaveLength(2);
    expect(products[0]).toHaveProperty('ProductName', 'Laptop');
  });

  test('should return a product by ID', async () => {
    const product = await ProductService.getById(1);
    expect(product).toHaveProperty('ProductName', 'Laptop');
    expect(product?.Category).toHaveProperty('CategoryName', 'Electronics');
  });

  test('should create a new product', async () => {
    const newProduct = await ProductService.create({
      ProductName: 'Tablet',
      Price: 700,
      Stock: 15,
      CategoryId: 2,
    });
    expect(newProduct).toHaveProperty('ProductName', 'Tablet');
  });

  test('should update a product', async () => {
    const updatedProduct = await ProductService.update(1, { ProductName: 'Gaming Laptop', Price: 1200, Stock: 5 });
    expect(updatedProduct).toHaveProperty('ProductName', 'Gaming Laptop');
  });

  test('should delete a product', async () => {
    await expect(ProductService.delete(1)).resolves.toEqual({});
  });
});
