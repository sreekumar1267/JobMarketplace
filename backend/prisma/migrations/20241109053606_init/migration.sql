-- CreateTable
CREATE TABLE "JobWithBidCount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "posterName" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "expirationTime" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "bidCount" INTEGER NOT NULL
);
