// utils/prismaErrorHandler.js
export const handlePrismaError = (error) => {
  if (!error.code) return null; // Not a Prisma error
  switch (error.code) {
    case "P2002":
      return {
        status: 400,
        message: `Unique constraint failed on ${error.meta?.target}`,
      };

    case "P2003":
      return { status: 400, message: "Foreign key constraint failed" };

    case "P2025":
      return { status: 404, message: "Record not found" };

    default:
      return { status: 500, message: "Database connection error" };
  }
};

export default handlePrismaError;
