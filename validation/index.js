export const runValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      errors: { wrap: { label: "" } },
    });

    if (error) {
      const errorList = error.details.map((itme) => itme.message);
      return res.status(400).json({
        success: false,
        error: "Invalid input",
        message: errorList[0],
      });
    }
    next();
  };
};
