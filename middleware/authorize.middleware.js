import jwt from "jsonwebtoken";
const authorize = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }
    token = token.split(" ")[1];
    const isValid = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authorization failed",
    });
  }
};

export { authorize };
