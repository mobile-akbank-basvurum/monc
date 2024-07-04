// models/Visit.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllVisits() {
  return prisma.visit.findMany();
}

export async function deleteVisit(id: number) {
  return prisma.visit.delete({
    where: {
      id,
    },
  });
}
