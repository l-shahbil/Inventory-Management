import { createEmployee, updateEmployee, removeEmployee, getEmployees } from '../services/Admin/employeeServices';

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        user: {
          findMany: jest.fn().mockResolvedValue([
            { UserId: '1', Name: 'Ali', Email: 'ali@example.com', Phone: 773265412 },
            { UserId: '2', Name: 'Ahmed', Email: 'ahmed@example.com', Phone: 731962713 }
          ]),
          create: jest.fn().mockImplementation(({ data }) =>
            Promise.resolve({ UserId: '3', Name: data.Name, Email: data.Email, Phone: data.Phone }) 
          ),
          update: jest.fn().mockImplementation(({ where, data }) =>
            Promise.resolve({ UserId: where.UserId, Name: data.Name, Email: data.Email, Phone: data.Phone })    
          ),
          delete: jest.fn().mockResolvedValue({}),
        },
      }))
    };
  });
  

describe('Employee Service', () => {
  test('should return all employees', async () => {
    const employees = await getEmployees();
    expect(employees).toHaveLength(2);
    expect(employees[0]).toHaveProperty('Name', 'Ali');
    expect(employees[1]).toHaveProperty('Email', 'ahmed@example.com'); 
  });

  test('should create a new employee', async () => {
    const newEmployee = await createEmployee({
      Name: 'Abdulrhman',
      Email: 'aa99@example.com',
      Password: 'hashedpassword',
      Phone: 771823712  
    });

    expect(newEmployee).toHaveProperty('Name', 'Abdulrhman');
    expect(newEmployee).toHaveProperty('Phone', 771823712); 
  });

  test('should update an employee', async () => {
    const updatedEmployee = await updateEmployee('1', {
      Name: 'Updated Name',
      Email: 'updated@example.com',
      Password: 'hashedpassword',
      Phone: 774611794
    });

    expect(updatedEmployee).toHaveProperty('Name', 'Updated Name');
    expect(updatedEmployee).toHaveProperty('Phone', 774611794);
  });

  test('should delete an employee', async () => {
    await expect(removeEmployee('1')).resolves.toEqual({});
  });
});
