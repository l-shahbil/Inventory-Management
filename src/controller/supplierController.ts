import { Request, Response } from 'express';
import * as supplierServices from '../services/supplierServices';
import { Messages } from '../constants/messages';
import { HTTP_STATUS_CODES} from "../constants/statusCode"
import { PrismaClient } from '@prisma/client';
import { createSupplier } from '../services/supplierServices';
const prisma = new PrismaClient();


export async function addsupplier(req: Request, res: Response){
 
  try {
    const newsupplier = await supplierServices.createSupplier(req.body);
    res.status(HTTP_STATUS_CODES.CREATED).json({
      message: Messages.SUCCESS.CREATE_SUCCESS,
      newsupplier,
    });
  } catch (error) {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: Messages.ERROR.INTERNAL_ERROR,
    });
  }
};

export async function getAllsuppliers(req: Request, res: Response){
  try {
    const suppliers = await supplierServices.getsuppliers();
    res.status(HTTP_STATUS_CODES.OK).json(suppliers);
  } catch (error) {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: Messages.ERROR.INTERNAL_ERROR,
    });
  }
};

export async function updatesupplier(req: Request, res: Response){
  try {
    const updatedsupplier = await supplierServices.updateSuplier(req.params.id, req.body);
    res.status(HTTP_STATUS_CODES.OK).json({
      message: Messages.SUCCESS.UPDATE_SUCCESS,
      updatedsupplier,
    });
  }
   catch (error) {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: error,
    });
  }
};

export async function deletesupplier(req: Request, res: Response){
  try {
    const deletedsupplier = await supplierServices.removesupplier(req.params.id);
    if (!deletedsupplier) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        error: Messages.ERROR.NOT_FOUND,
      });
    }
    res.status(HTTP_STATUS_CODES.OK).json({
      message: Messages.SUCCESS.DELETE_SUCCESS,
      deletedsupplier,
    });
  } catch (error) {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: Messages.ERROR.INTERNAL_ERROR,
    });
  }
};
