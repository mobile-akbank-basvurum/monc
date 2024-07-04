import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Visit {
  id: number;
  ip: string;
  userAgent: string;
  country: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  device: string | null;
  createdAt: Date;
}

export async function getAllVisits(): Promise<Visit[]> {
  return prisma.visit.findMany();
}

export async function deleteVisit(id: number): Promise<void> {
  await prisma.visit.delete({
    where: {
      id,
    },
  });
}
