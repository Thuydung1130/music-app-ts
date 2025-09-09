// src/middlewares/user.middleware.ts
import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model"; // chỉnh đường dẫn cho đúng

export const infoUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.cookies.tokenUser) {
      const user = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        delete: false,
        status: "active"
      }).select("-password");

      if (user) {
        res.locals.user = user;
      }

      console.log(user);
    }

    next();
  } catch (error) {
    console.error("infoUser middleware error:", error);
    next(error); // cho Express bắt lỗi
  }
};
