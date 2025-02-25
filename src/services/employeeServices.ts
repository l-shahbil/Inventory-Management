import { PrismaClient } from '@prisma/client';
import { Employee } from '../types/employeeTypes';
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

export const createEmployee = async (employeeData: Employee) => {
  const hashPassword = await bcrypt.hash(employeeData.Password,10);
  return await prisma.user.create({
    data:{
      ...employeeData,
      Password:hashPassword,
    }
  });
};

export const updateEmployee = async (employeeId: string, employeeData:Employee)=>{
  const hashPassword = await bcrypt.hash(employeeData.Password,10);
  return  await prisma.user.update({
    where: { UserId: employeeId },
    data: {...employeeData,
      Password:hashPassword
    }
  });
};
export const removeEmployee = async (employeeId: string) => {
  return await prisma.user.delete({
    where: { UserId: employeeId }
  });
};

export const getEmployees = async () => {
  return await prisma.user.findMany();
};
