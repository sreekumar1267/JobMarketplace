export interface Job {
    id: number;
    title: string;
    description: string;
    requirements: string;
    posterName: string;
    contactInfo: string;
    bidsCount: number;
    lowestBid?: number;
    expirationTime: string;
    createdAt: string;
  }
  
  export interface Bid {
    id: number;
    jobId: number;
    bidderName: string;
    bidAmount: number;
    createdAt: string;
  }
  