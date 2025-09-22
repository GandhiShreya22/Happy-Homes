import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };
// declare global {
//   // allow global `var` in TS
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }
const globalForPrisma = global as unknown as { prisma?: PrismaClient }

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export const prisma =
  globalForPrisma.prisma ??
  (globalForPrisma.prisma = new PrismaClient({
    log: ["query"],
  }));

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;