import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { latitude, longitude, country, city, device, ip, userAgent } = req.body;

    try {
      const visit = await prisma.visit.create({
        data: {
          latitude,
          longitude,
          country,
          city,
          device,
          ip,
          userAgent,
        },
      });
      res.status(200).json(visit);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving the data.' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed.' });
  }
}
