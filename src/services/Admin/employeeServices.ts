import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

export const createEmployee = async (employeeData: any) => {
  const hashPassword = await bcrypt.hash(employeeData.Password,10);
  return await prisma.user.create({
    data:{
      ...employeeData,
      Password:hashPassword,
    }
  });
};

export const updateEmployee = async (employeeId: string, employeeData:any)=>{
  let updatedData = { ...employeeData };

  if (employeeData.Password) {
    updatedData.Password = await bcrypt.hash(employeeData.Password, 10);
  } else {
    delete updatedData.Password;
  }
  return  await prisma.user.update({
    where: { UserId: employeeId },
    data: {...employeeData}
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
