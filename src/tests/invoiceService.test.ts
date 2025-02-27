import { InvoiceService } from '../services/InvoiceServises';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      invoices: {
        findMany: jest.fn().mockResolvedValue([
          {
            InvoiceId: '1',
            InvoiceDate: '2025-02-15',
            Employee: { Name: 'Ahmed' },
            items: [
              {
                Product: {
                  ProductId: '201',
                  ProductName: 'Smartphone',
                  SerialNumber: 'SN98765',
                  CategoryId: 'C2',
                },
              },
            ],
          },
        ]),
      },
    })),
  };
});

describe('Sales Service', () => {
  test('should return all sales invoices', async () => {
    const sales = await InvoiceService.getAllSales();
    expect(sales).toHaveLength(1);
    expect(sales[0]).toHaveProperty('InvoiceDate', '2025-02-15');
    expect(sales[0].Employee).toHaveProperty('Name', 'Ahmed');
    expect(sales[0].items[0].Product).toHaveProperty('ProductName', 'Smartphone');
  });
});
