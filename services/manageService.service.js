import prisma from "../config/db.js";

export const createServiceService = async (serviceData) => {
  return await prisma.service.create({ data: serviceData });
};

export const getServiceService = async () => {
  return await prisma.service.findMany();
};

export const getServiceByIdService = async (serviceId) => {
  return await prisma.service.findUnique({ where: { id: serviceId } });
};

export const updateServiceService = async (serviceId, serviceData) => {
  return await prisma.service.update({ where: { id: serviceId }, data: serviceData });
};

export const deleteServiceService = async (serviceId) => {
  return await prisma.service.delete({ where: { id: serviceId } });
};