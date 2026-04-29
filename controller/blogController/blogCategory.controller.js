import {
  categoryByIdProperty,
  createNewCategory,
  deleteCategoryData,
  getAllCategories,
  updateCategoryData,
} from "../../services/blogCategory.service.js";
import error from "../../utils/error.js";
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createNewCategory({ name });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

const allCategories = async (req, res, next) => {
  try {
    let categories = await getAllCategories();
    categories = categories.map((item) => ({
      ...item,
      blogs: item._count.blogs,
      _count: undefined,
    }));
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const isCategoryExist = await categoryByIdProperty(id);
    if (!isCategoryExist) {
      throw error("Category not found", 404);
    }
    const updateCategoryDto = {
      name: name ?? isCategoryExist.name,
      status: status ?? isCategoryExist.status,
    };
    const updatedCategory = await updateCategoryData(id, updateCategoryDto);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isCategoryExist = await categoryByIdProperty(id);
    if (!isCategoryExist) {
      throw error("Category not found", 404);
    }
    const deletedCategory = await deleteCategoryData(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export { allCategories, createCategory, deleteCategory, updateCategory };
