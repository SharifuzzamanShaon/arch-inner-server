import { createServiceService, deleteServiceService, getServiceByIdService, getServiceService, updateServiceService } from "../../services/manageService.service.js";

const createService = async (req, res, next) => {
  try {
    const serviceDto = {
      ...req.body,
    };
    const service = await createServiceService(serviceDto);
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const getService = async (req, res, next) => {
  try {
    const services = await getServiceService();
    res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    next(error);
  }
};  

const getServiceById = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const service = await getServiceByIdService(serviceId);
    if (!service) {
      throw error("Service not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Service fetched successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const serviceDto = {
      ...req.body,
    };
    const service = await updateServiceService(serviceId, serviceDto);
    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    next(error);
        }
};

const deleteService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const service = await deleteServiceService(serviceId);
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export { createService, getService, getServiceById, updateService, deleteService };