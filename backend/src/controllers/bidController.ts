import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

export const placeBid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobId = Number(req.params.id);
    const { bidAmount } = req.body;
    const prisma: PrismaClient = req.app.locals.prisma;
    const newBid = await prisma.bid.create({
      data: {
        jobId,
        bidderName: 'Anonymous',
        bidAmount
      },
    });
    res.status(200).json(newBid);
  } catch (error) {
    next(error);
  }
};