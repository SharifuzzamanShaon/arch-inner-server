import {
  countPorjectByCategoryService,
  createPorjectService,
  deletePorjectService,
  getAllProjectByCategoryService,
  getProjectByIdService,
  updatePorjectService,
  
} from "../../services/project.service.js";
import error from "../../utils/error.js";
import { deleteBlogImg } from "../../utils/fileDeleteHelper.js";

const createProject = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const data = req.body;
    const isProjectExists = await getProjectByIdService(categoryId);
    if (isProjectExists) throw error("Case-study already exists", 400);

    const Project = await createPorjectService({
      ...data,
      categoryId,
    });
    res.status(201).json({
      success: true,
      message: "Case-study created successfully",
      data: Project,
    });
  } catch (error) {
    next(error);
  }
};
const getAllProjects = async (req, res, next) => {
  try {
    let { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit || 0;
    const take = parseInt(limit);
    let caseStudies = await getAllProjects({ take, skip });
    res.status(200).json({
      success: true,
      message: "Case-studies fetched successfully",
      data: {
        caseStudies,
        
      },
    });
  } catch (error) {
    next(error);
  }
};
const getAllProjectsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    let { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit || 0;
    const take = parseInt(limit);
    let projects = await getAllProjectByCategoryService({
      skip,
      take,
      categoryId,
    });
    const totalCount = await countPorjectByCategoryService(categoryId);
    res.status(200).json({
      success: true,
      message: "Case-studies fetched successfully",
      data: {
        projects,
        totalCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { ProjectId } = req.params;
    const Project = await getProjectByIdService(ProjectId);
    if (!Project) {
      throw error("Case-study not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Case-study fetched successfully",
      data: Project,
    });
  } catch (error) {
    next(error);
  }
};
const updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const existingProject = await getProjectByIdService(projectId);
    if (!existingProject) throw error("Case study not found", 404);

    // Helper to handle different input formats
    const parseInput = (value, isArray = false) => {
      if (!value && value !== "") return isArray ? [] : null;
      if (Array.isArray(value)) return value;

      // update compareResult
      if (value?.compareResult) {
        return value.compareResult;
      }
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          return isArray ? (Array.isArray(parsed) ? parsed : [parsed]) : parsed;
        } catch {
          return isArray ? value.split(",").map((item) => item.trim()) : value;
        }
      }
      return isArray ? [value] : value;
    };

    // Prepare update data with proper parsing
    const updateData = {
      
      ...req.body,
    };

    const updatedProject = await updatePorjectService(
      projectId,
      updateData
    );

    res.status(200).json({
      success: true,
      message: "Case study updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const Project = await getProjectByIdService(projectId);
    if (!Project) throw error("Case study not found", 404);

    // Extract all image URLs from the case study
    const imageFields = [
      Project.thumbnail,
      Project.heroImage,
      ...(Project.compareResult?.flatMap((item) => [
        item.imageBefore,
        item.imageAfter,
      ]) || []),
      Project.testimonial?.image,
      ...(Project.galleryImages || []),
    ].filter(Boolean);

    // Delete all images
    await Promise.all(
      imageFields.map((img) =>
        img ? deleteBlogImg(img.split("/").pop()) : Promise.resolve()
      )
    );

    await deletePorjectService(projectId);

    res.status(200).json({
      success: true,
      message: "Case study deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const featuredProject = async (req, res, next) => {
  try {
    const categories = await getPublishedProjcetCategoryService();

    let result = await Promise.all(
      categories.map(async (category) => {
        const caseStudies = await getFeaturedProjcetService({
          categoryId: category.id,
        });
        return caseStudies;
      })
    );
    result = result.flat();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createProject,
  getAllProjects,
  getAllProjectsByCategory,
  getProjectById,
  updateProject,
  deleteProject,
  featuredProject,
};
