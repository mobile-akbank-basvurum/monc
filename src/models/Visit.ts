import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllVisits(): Promise<Visit[]> {
  const visits = await prisma.visit.findMany();
  return visits.map((visit) => ({
    id: visit.id,
    ip: visit.ip,
    userAgent: visit.userAgent,
    country: visit.country,
    city: visit.city,
    latitude: visit.latitude,
    longitude: visit.longitude,
    device: visit.device,
    createdAt: visit.createdAt,
  }));
}

export async function deleteVisit(id: number) {
  return prisma.visit.delete({
    where: {
      id,
    },
  });
}
