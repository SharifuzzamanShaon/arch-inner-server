import {
  allProjectCategoriesService,
  createProjectCategoryService,
  deleteProjectCategoryService,
  getProjectCategoryByIdService,
  updateProjectCategoryService,
} from "../../services/projectCategory.service.js";
import error from "../../utils/error.js";

const createProjectCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createProjectCategoryService({
      name,
    });
    res.status(201).json({
      success: true,
      message: "Case-study category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating case-study category:", error);
    next(error);
  }
};

const getAllProjectCategories = async (_, res, next) => {
  try {
    let categories = await allProjectCategoriesService();
    // categories = categories.map((item) => ({
    //   ...item,
    //   project: item._count.projects,
    //   _count: undefined,
    // }));
    res.json({
      success: true,
      message: "Projcet category fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const updateProjectCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, status } = req.body;
    const isCategoryExist = await getProjectCategoryByIdService(categoryId);

    if (!isCategoryExist) {
      throw error("Case-study category not found", 404);
    }
    const updatedData = {
      name: name ?? isCategoryExist.name,
      status: status ?? isCategoryExist.status,
    };
    const updatedCategory = await updateProjectCategoryService(
      categoryId,
      updatedData
    );

    res.json({
      success: true,
      message: "Case-study category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProjectCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const isCategoryExist = await getProjectCategoryByIdService(categoryId);

    if (!isCategoryExist) {
      throw error("Case-study category not found", 404);
    }
    await deleteProjectCategoryService(categoryId);
    res.json({
      success: true,
      message: "Case-study category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export {
  createProjectCategory,
  deleteProjectCategory,
  getAllProjectCategories,
  updateProjectCategory,
};
