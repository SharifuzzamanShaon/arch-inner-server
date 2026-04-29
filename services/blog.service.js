import prisma from "../config/db.js";

export const postNewBlogService = async (blogDto) => {
  return await prisma.blog.create({
    data: blogDto,
  });
};
export const fetchAllBlogsService = async ({ skip, take }) => {
  return await prisma.blog.findMany({
    skip,
    take,
    select: {
      thumbnail: true,
      title: true,
      id: true,
      urlSlug: true,
      excerpt: true,
      status: true,
      createdAt: true,
      blogCategory: true,
    },
    // category details
  });
};

export const countAllBlogsService = async () => {
  return await prisma.blog.count();
};
export const fetchBlogsByCategoryService = async ({
  skip,
  take,
  categoryId,
}) => {
  return await prisma.blog.findMany({
    skip,
    take,
    where: {
      categoryId,
    },
    select: {
      thumbnail: true,
      title: true,
      id: true,
      content: true,
      urlSlug: true,
      createdAt: true,
      status: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const countBlogsByCategoryService = async (categoryId) => {
  return await prisma.blog.count({
    where: { categoryId },
  });
};

export const fetchBlogByIdService = async (id) => {
  return await prisma.blog.findFirst({
    where: {
      id,
    },
  });
};
export const fetchBlogByUrlSlug = async (urlSlug) => {
  return await prisma.blog.findFirst({
    where: {
      urlSlug,
    },
  });
};
export const updateBlogDataService = async (id, blogDto) => {
  return await prisma.blog.update({
    where: {
      id,
    },
    data: blogDto,
  });
};

export const deleteBlogService = async (id) => {
  return await prisma.blog.delete({
    where: {
      id,
    },
  });
};
