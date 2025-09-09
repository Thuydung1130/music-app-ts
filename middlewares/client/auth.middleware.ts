// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model"; // chỉnh lại đường dẫn cho đúng

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("hi")
    if (!req.cookies.tokenUser) {
        console.log("yse");
      res.redirect("/user/login");
      return;
    }

    const user = await User.findOne({ tokenUser: req.cookies.tokenUser }).select("-password");

    if (!user) {
      res.redirect("/user/login");
      return;
    }

    // Gắn user vào res.locals để dùng trong view
    res.locals.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.redirect("/user/login");
  }
};
