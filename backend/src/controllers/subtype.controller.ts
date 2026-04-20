import { Request, Response } from 'express';
import { getAllSubtypes } from '../models/subtype.model';

//GET api/subtypes
export const getAllSubtypesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const subtypes = await getAllSubtypes();
    res.status(200).json(subtypes);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};