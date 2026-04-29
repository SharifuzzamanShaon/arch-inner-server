import prisma from "../config/db.js";

export const createPorjectService = async (porjectData) => {
  return await prisma.porject.create({ data: porjectData });
};

export const getAllPorjectService = async ({ take, skip }) => {
  return await prisma.porject.findMany({
    where: { status: "PUBLISHED" },
    take,
    skip,
  });
};
export const countPorjectService = async () => {
  return await prisma.porject.count({
    where: { status: "PUBLISHED" },
  });
};
export const getAllProjectByCategoryService = async ({
  categoryId,
  skip,
  take,
}) => {
  return await prisma.porject.findMany({
    where: { categoryId },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });
};

export const getFeaturedPorjectService = async ({ categoryId }) => {
  return await prisma.porject.findMany({
    where: {
      categoryId,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      thumbnail: true,
      brandName: true,
      meatData: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 2,
  });
};

export const countPorjectByCategoryService = async (categoryId) => {
  return await prisma.porject.count({
    where: { categoryId },
  });
};

export const getProjectByIdService = async (id) => {
  return await prisma.porject.findUnique({ where: { id } });
};

export const updatePorjectService = async (projectId, data) => {
  return await prisma.porject.update({ where: { id: projectId }, data });
};

export const deletePorjectService = async (projectId) => {
  return await prisma.porject.delete({ where: { id: projectId } });
};
