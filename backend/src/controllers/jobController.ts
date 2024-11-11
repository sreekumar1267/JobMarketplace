import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

export const listJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma;
    const filter = req.query.filter as string;
    let sortFilterObj: any;
    if (filter === 'recent') {
      sortFilterObj = { createdAt: 'desc'};
    } else if (filter === 'active') {
      sortFilterObj = { bids: {
                          _count: 'desc', // Order by descending count of bids
                        }
                      }; 
    }
    const jobs: JobWithBids[] = await prisma.job.findMany({
      include: {
        bids: true,
      },
      // orderBy: {
      //   bids: {
      //     _count: 'desc', // Order by descending count of bids
      //   },
      // },
      orderBy: sortFilterObj,
      take: 5,
    });

    const jobsWithBidCount = jobs?.map((job) => ({
      ...job,
      bidsCount: job.bids.length,
    }));

    console.log('--- jobs controller -- listJobs:', jobsWithBidCount);
    res.status(200).json(jobsWithBidCount);
  } catch (error) {
    next(error);
  }
};

export const addJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma;
    const { title, description, requirements, posterName, contactInfo } = req.body;
    const expirationTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const newJob = await prisma.job.create({
      data: {
        title,
        description,
        requirements,
        posterName,
        contactInfo,
        expirationTime: new Date(expirationTime),
      },
    });
    res.status(201).json({ id: newJob });

  } catch (error) {
    next(error);
  }
};

export const getJobFromDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prisma: PrismaClient = req.app.locals.prisma;
      const jobId = req.params.id;
      const jobWithBids = await prisma.job.findUnique({
        where: {
          id: Number(jobId),
        },
        select: {
          id: true,
          title: true, 
          description: true,
          requirements: true,
          posterName: true,
          contactInfo: true,
          createdAt: true,
          expirationTime: true,
          _count: {
            select: {
              bids: true,
            },
          },
          bids: {
            select: {
              bidAmount: true,
            },
          },
        },
      });
      
      const bids = jobWithBids?.bids as Array<{ bidAmount: number }>;
      const lowestBid = Math.min(...bids?.map( bid => bid.bidAmount));
      const bidsCount = jobWithBids?._count?.bids;

      let finalJobWithBidsObj = jobWithBids ? {...jobWithBids, lowestBid, bidsCount} : {};
      res.status(200).json(finalJobWithBidsObj);
    } catch (error) {
      next(error);
    }
  };
