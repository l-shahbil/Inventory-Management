import { Incomings } from '../services/IncomingService';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      inventoryReceipts: {
        findMany: jest.fn().mockResolvedValue([
          {
            ReceiptId: '1',
            ReceiptDate: '2025-02-10',
            Employee: { Name: 'Ahmed' },
            Supplier: { SupplierName: 'Tech Supplier' },
            receiptItems: [
              {
                Product: {
                  ProductId: '101',
                  ProductName: 'Laptop',
                  SerialNumber: 'SN12345',
                  CategoryId: 'C1',
                },
              },
            ],
          },
        ]),
      },
    })),
  };
});

describe('Incoming Service', () => {
  test('should return all incoming inventory receipts', async () => {
    const incomings = await Incomings.getIncomings();
    expect(incomings).toHaveLength(1);
    expect(incomings[0]).toHaveProperty('ReceiptDate', '2025-02-10');
    expect(incomings[0].Employee).toHaveProperty('Name', 'Ahmed');
    expect(incomings[0].Supplier).toHaveProperty('SupplierName', 'Tech Supplier');
    expect(incomings[0].receiptItems[0].Product).toHaveProperty('ProductName', 'Laptop');
  });
});
