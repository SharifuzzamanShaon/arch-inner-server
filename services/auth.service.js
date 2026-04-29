import prisma from "../config/db.js";

export const createAdminService = async (adminDto) => {
  return await prisma.authAdmin.create({
    data: adminDto,
  });
};
export const adminLoginService = async (email) => {
  return await prisma.authAdmin.findFirst({
    where: { email },
  });
};
