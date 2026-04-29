import { galleryImageService } from "../../services/publicRouteService.js";

const getGalleryImgs = async (req, res, next) => {
  try {
    const ProjectGalleryImg = await galleryImageService();
    let galleryImg = [];
    ProjectGalleryImg.forEach((Project) => {
      if (Project.galleryImages && Project.galleryImages.length > 0) {
        galleryImg = galleryImg.concat(Project.galleryImages[0]);
      }
    });
    galleryImg = galleryImg.slice(0, 10);
    res.status(200).json({ success: true, data: galleryImg });
  } catch (error) {
    next(error);
  }
};
export { getGalleryImgs };
