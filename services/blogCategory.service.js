import prisma from "../config/db.js";

export const createNewCategory = async (categoryDto) => {
  return await prisma.blogCategory.create({
    data: categoryDto,
  });
};
export const categoryByIdProperty = async (id) => {
  return await prisma.blogCategory.findUnique({
    where: {
      id,
    },
  });
};
export const getAllCategories = async () => {
  return await prisma.blogCategory.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          blogs: true,
        },
      },
    },
  });
};
export const updateCategoryData = async (id, categoryDto) => {
  return await prisma.blogCategory.update({
    where: {
      id,
    },
    data: categoryDto,
  });
};
export const deleteCategoryData = async (id) => {
  return await prisma.blogCategory.delete({
    where: {
      id,
    },
  });
};
