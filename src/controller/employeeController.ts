import { Request, Response } from 'express';
import * as EmployeeService from '../services/employeeServices';
import { Messages } from '../constants/messages';
import { HTTP_STATUS_CODES} from "../constants/statusCode"
import { Prisma, PrismaClient } from '@prisma/client';
import { ok } from 'assert';

const prisma = new PrismaClient();


export async function addEmployee(req: Request, res: Response){
 
  try {
    const newEmployee = await EmployeeService.createEmployee(req.body);
    res.status(HTTP_STATUS_CODES.CREATED).json({
      message: Messages.SUCCESS.CREATE_SUCCESS,
      newEmployee,
    });
  } catch (error) {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: Messages.ERROR.INTERNAL_ERROR,
    });
  }
};

export async function getAllEmployees(req: Request, res: Response){
  try {
    const employees = await EmployeeService.getEmployees();
    res.status(HTTP_STATUS_CODES.OK).json(employees);
  } catch (error) {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: Messages.ERROR.INTERNAL_ERROR,
    });
  }
};

export async function updateEmployee(req: Request, res: Response) {
  try {
    const updatedEmployee = await EmployeeService.updateEmployee(req.params.id, req.body);
  res.status(HTTP_STATUS_CODES.OK).json({
    message: Messages.SUCCESS.UPDATE_SUCCESS,
    updatedEmployee,
  });

  } catch (error)
   {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: Messages.ERROR.INTERNAL_ERROR,
    });
  }
};

export async function deleteEmployee(req: Request, res: Response){
  try {
    const deletedEmployee = await EmployeeService.removeEmployee(req.params.id);
    if (!deletedEmployee) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        error: Messages.ERROR.NOT_FOUND,
      });
    }
    res.status(HTTP_STATUS_CODES.OK).json({
      message: Messages.SUCCESS.DELETE_SUCCESS,
      deletedEmployee,
    });
  } catch (error) {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: Messages.ERROR.INTERNAL_ERROR,
    });
  }
};
