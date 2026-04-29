import bcrypt from "bcrypt";
import prisma from "../../config/db.js";
import {
  adminLoginService,
  createAdminService,
} from "../../services/auth.service.js";
import sendToken from "../../utils/sendToken.js";
const SALT_ROUNDS = 10;

const adminSingIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isAdminExist = await adminLoginService(email);
    if (!isAdminExist) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const bcryptPassword = await bcrypt.compare(
      password,
      isAdminExist.password
    );
    if (!bcryptPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    sendToken(isAdminExist, res, next);
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isAdminExist = await prisma.authAdmin.count();
    if (isAdminExist) {
      return res.status(400).json({
        success: false,
        message: "An admin already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newAdminDto = {
      name,
      email,
      password: hashedPassword,
    };
    const newAdmin = await createAdminService(newAdminDto);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: newAdmin,
    });
  } catch (error) {
    next(error);
  }
};

export { adminSingIn, createAdmin };
