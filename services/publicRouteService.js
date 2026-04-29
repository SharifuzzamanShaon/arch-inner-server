import prisma from "../config/db.js";

const galleryImageService = async () => {
  const galleryImages = await prisma.Project.findMany({
    select: {
      galleryImages: true,
    },
  });
  return galleryImages;
};
const createAppointmentService = async (scheduleDto) => {
  await prisma.scheduleAppointment.create({
    data: scheduleDto,
  });
};
const findSubscriptionByEmail = async (email) => {
  return await prisma.mailSubscription.findFirst({
    where: { email },
  });
};
const createMailSubscriptionService = async (email) => {
  await prisma.mailSubscription.create({
    data: { email },
  });
};

const fetchSubscribedEmailsService = async () => {
  return await prisma.mailSubscription.findMany({
    select: {
      email: true,
    },
  });
};
export {
  findSubscriptionByEmail,
  galleryImageService,
  createAppointmentService,
  createMailSubscriptionService,
  fetchSubscribedEmailsService,
};
