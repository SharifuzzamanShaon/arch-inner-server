import prisma from "../config/db.js";

export const allProjectCategoriesService = async () => {
  return await prisma.projectCategory.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createProjectCategoryService = async (data) => {
  return await prisma.projectCategory.create({
    data,
  });
};
export const getPublishedProjectCategoryService = async () => {
  return await prisma.projectCategory.findMany({
    where: {
      status: "PUBLISHED",
    },
  });
};
export const getProjectCategoryByIdService = async (id) => {
  return await prisma.ProjectCategory.findUnique({
    where: {
      id,
    },
  });
};

export const updateProjectCategoryService = async (id, updateData) => {
  return await prisma.projectCategory.update({
    where: { id },
    data: updateData,
  });
};

export const deleteProjectCategoryService = async (id) => {
  return await prisma.projectCategory.delete({
    where: { id },
  });
};
