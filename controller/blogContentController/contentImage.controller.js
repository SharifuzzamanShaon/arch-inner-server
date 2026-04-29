const uploadContentImg = async (req, res, next) => {
  try {
    const imgUrl = req.file?.filename
      ? `${process.env.HOST_URL}/assets/${req.file?.filename}`
      : "";
    res.status(200).json({
      success: true,
      message: "Content image uploaded",
      data: {
        url: imgUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

const galleryImgUploader = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files were uploaded",
      });
    }

    // Map uploaded files to their URLs
    const fileUrls = req.files.map((file) => ({
      url: `${process.env.HOST_URL}/assets/${file.filename}`,
    }));

    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      data: fileUrls,
    });
  } catch (error) {
    console.error("Error uploading gallery images:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading gallery images",
      error: error.message,
    });
  }
};

export { galleryImgUploader, uploadContentImg };
