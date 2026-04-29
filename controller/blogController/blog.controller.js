import {
  countAllBlogsService,
  countBlogsByCategoryService,
  deleteBlogService,
  fetchAllBlogsService,
  fetchBlogByIdService,
  fetchBlogByUrlSlug,
  fetchBlogsByCategoryService,
  postNewBlogService,
  updateBlogDataService,
} from "../../services/blog.service.js";
import { categoryByIdProperty } from "../../services/blogCategory.service.js";
import error from "../../utils/error.js";
import { extractImgs } from "../../utils/extractImgs.js";
import { deleteBlogImg } from "../../utils/fileDeleteHelper.js";

const postBlog = async (req, res, next) => {
  try {
    const { title, content, metaTitle, excerpt, metaTags } = req.body;
    const { categoryId } = req.params;
    const category = await categoryByIdProperty(categoryId);
    if (!category) throw error("Category not found with this id", 404);
    const isExistBlog = await fetchBlogByUrlSlug(
      title
        .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
        .trim().replace(/^-+|-+$/g, "")
    );
    if (isExistBlog) throw error("Blog already exists with this title", 409);
    const blogDto = {
      ...req.body,
      categoryId,
      urlSlug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
        .trim().replace(/^-+|-+$/g, ""),
    };
    const newBlog = await postNewBlogService(blogDto);
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    next(error);
  }
};
const getAllBlogs = async (req, res, next) => {
  try {
    let { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit || 0;
    const take = parseInt(limit);
    const blogs = await fetchAllBlogsService({
      skip,
      take,
    });
    const totalCount = await countAllBlogsService();
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: {
        blogs,
        totalCount,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getBlogByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    let { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit || 0;
    const take = parseInt(limit);
    const blogs = await fetchBlogsByCategoryService({
      skip,
      take,
      categoryId,
    });
    const totalCount = await countBlogsByCategoryService(categoryId);
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: {
        blogs,
        totalCount,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getBlogById = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const isExistBlog = await fetchBlogByIdService(blogId);
    if (!isExistBlog) throw error("Blog not found", 404);
    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: isExistBlog,
    });
  } catch (error) {
    next(error);
  }
};
const getBlogByTitleSlug = async (req, res, next) => {
  try {
    const { urlSlug } = req.params;
    // const title = blogTitle.replace(/-/g, " ");

    const isExistBlog = await fetchBlogByUrlSlug(urlSlug);
    if (!isExistBlog) throw error("Blog not found", 404);
    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: isExistBlog,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { title, content, metaTitle, excerpt, metaTags, categoryId, status } =
      req.body;
    const isExist = await fetchBlogByIdService(blogId);
    if (!isExist) throw error("Blog not found with this id", 404);
    const urlSlug = title
      ? title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : isExist.urlSlug;
    const updatedBlogDto = {
      ...req.body,
      urlSlug,
    };
    const updatedBlog = await updateBlogDataService(blogId, updatedBlogDto);
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const isBlogExist = await fetchBlogByIdService(blogId);
    if (!isBlogExist) throw error("Blog not found", 404);
    const removeImgs = extractImgs(isBlogExist.content);
    // Delete all images
    removeImgs.push(isBlogExist.thumbnail);
    removeImgs.forEach((img) => img && deleteBlogImg(img));
    await deleteBlogService(blogId);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export {
  deleteBlog,
  getBlogByCategory,
  getBlogByTitleSlug,
  getBlogById,
  getAllBlogs,
  postBlog,
  updateBlog,
};
