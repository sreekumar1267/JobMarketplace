interface Job {
    id: number;
    title: string;
    description: string;
    requirements: string;
    posterName: string;
    contactInfo: string;
    expirationTime: Date;
    createdAt: Date;
  }
  
  interface Bid {
    id: number;
    jobId: number;
    bidderName: string;
    bidAmount: number;
    createdAt: Date;
  }

  interface JobWithBids {
    id: number;
    title: string;
    description: string;
    requirements: string;
    posterName: string;
    contactInfo: string;
    expirationTime: Date;
    createdAt: Date;
    bids: Bid[]; 
  }