import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();
// GET /api/subtypes
export const getAllSubtypes = () => {
  return prisma.deviceSubtype.findMany();
};
