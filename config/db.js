import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient({
  log: ["error"],
  errorFormat: "minimal",
});

// check db is connected or not
try {
  await prisma.$connect();
  console.log("Database connected");
} catch (error) {
  // console.log("Database connection error", error);
  process.exit(1);
}

export default prisma;
