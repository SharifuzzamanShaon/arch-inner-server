import jwt from "jsonwebtoken";
const sendToken = async (user, res, next) => {
  try {
    const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE);
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: `${accessTokenExpire}d`,
    });
    return res.status(200).json({
      success: true,
      user: {
        id: payload.id,
        name: payload.name,
        role: payload.role,
      },
      accessToken,
    });
  } catch (error) {
    return next(error);
  }
};
export default sendToken;
