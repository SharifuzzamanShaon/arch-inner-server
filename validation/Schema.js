import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const blogCategorySchema = Joi.object({
  name: Joi.string().required(),
});
export const blogCategoryUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  status: Joi.string().valid("PUBLISHED", "DRAFT").optional(),
});
export const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  excerpt: Joi.string().required(),
  content: Joi.string().required(),
  metaTitle: Joi.string().required(),
  metaTags: Joi.string().required(),
  // thumbnail: Joi.string().required(),
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  metaTitle: Joi.string().optional(),
  metaTags: Joi.string().optional(),
  excerpt: Joi.string().optional(),
  // thumbnail: Joi.string().optional(),
  // enum "PUBLISHED" or "DRAFT"
  status: Joi.string().valid("PUBLISHED", "DRAFT").optional(),
});

export const addMemberSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  designation: Joi.string().required().messages({
    "string.empty": "Designation is required",
    "any.required": "Designation is required",
  }),
  speach: Joi.string().allow("").optional(),
  socialLinks: Joi.string().allow("").optional(),
});
export const ProjectSchema = Joi.object({
  thumbnail: Joi.string().uri().required().messages({
    "string.empty": "Thumbnail URL is required",
    "string.uri": "Thumbnail must be a valid URL",
    "any.required": "Thumbnail URL is required",
  }),
  metaTitle: Joi.string().allow("").optional(),
  metaTags: Joi.array().items(Joi.string()).optional(),
  metaDescription: Joi.string().allow("").optional(),
  status: Joi.string().valid("PUBLISHED", "DRAFT").default("PUBLISHED"),
  heroImage: Joi.string().uri().allow("").optional(),
  brandName: Joi.string().allow(""),
  brandLogo: Joi.string().allow("").optional(),
  brandDetail: Joi.string().allow("").optional(),
  meatData: Joi.object({
    services: Joi.array().items(Joi.string()),
  })
    .unknown(true) // Allow any other fields
    .optional(),
  findings: Joi.array().optional(),
  galleryImages: Joi.array().items(Joi.string().uri()).optional(),
  compareResult: Joi.array().optional(),
  cardDetail: Joi.string().allow("").optional(),
  cardData: Joi.array().optional(),
  testimonial: Joi.object({
    image: Joi.string().uri().required(),
    authorName: Joi.string().required(),
    position: Joi.string().required(),
    content: Joi.string().required(),
  }).optional(),
}).options({ abortEarly: false });
export const updateMemberSchema = Joi.object({
  name: Joi.string().optional(),
  image: Joi.string().allow("").optional(),
  designation: Joi.string().optional(),
  speach: Joi.string().allow("").optional(),
  socialLinks: Joi.string().allow("").optional(),
});

export const scheduleAppointmentSchema = Joi.object({
  name: Joi.string().required(),
  companyName: Joi.string().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().required().max(255),
  schdeuleDate: Joi.object().optional(),
});
export const mailSubscriptionSchema = Joi.object({
  email: Joi.string().email().required(),
});
