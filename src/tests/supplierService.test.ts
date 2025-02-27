import { createSupplier, updateSuplier, removesupplier, getsuppliers } from '../services/Admin/supplierServices';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      suppliers: {
        findMany: jest.fn().mockResolvedValue([
          { SupplierId: '1', SupplierName: 'Ali', Email: 'ali@example.com', Phone: 773265412 },
          { SupplierId: '2', SupplierName: 'Khaled', Email: 'khaled@example.com', Phone: 731962713 }
        ]),
        create: jest.fn().mockImplementation(({ data }) =>
          Promise.resolve({
            SupplierId: '3',
            SupplierName: data.SupplierName,
            Email: data.Email,
            Phone: data.Phone
          })
        ),
        update: jest.fn().mockImplementation(({ where, data }) =>
          Promise.resolve({
            SupplierId: where.SupplierId,
            SupplierName: data.SupplierName,
            Email: data.Email,
            Phone: data.Phone
          })
        ),
        delete: jest.fn().mockResolvedValue({}),
      },
    }))
  };
});

describe('Supplier Service', () => {
  test('should return all suppliers', async () => {
    const suppliers = await getsuppliers();
    expect(suppliers).toHaveLength(2);
  });

  test('should create a new supplier', async () => {
    const newSupplier = await createSupplier({ SupplierName: 'Abdulrhman', Email: 'abdul@example.com', Phone: 778888777 });
    expect(newSupplier).toHaveProperty('SupplierName', 'Abdulrhman');
  });

  test('should update a supplier', async () => {
    const updatedSupplier = await updateSuplier('1', { SupplierName: 'Ali', Email: 'updated@example.com', Phone: 731234567 });
    expect(updatedSupplier).toHaveProperty('SupplierName', 'Ali');
  });

  test('should delete a supplier', async () => {
    await expect(removesupplier('1')).resolves.toEqual({});
  });
});
