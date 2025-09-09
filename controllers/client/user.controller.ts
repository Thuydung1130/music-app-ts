import { Request, Response } from "express";
import md5 from "md5"
import  User  from "../../models/user.model"; 
export const login = async (req: Request, res: Response) => {
    
    
    res.render("client/pages/users/login", {
        pageTitle: "Login",

    });
}
export const register = async (req: Request, res: Response) => {
    
    
    res.render("client/pages/users/login", {
        pageTitle: "Login",

    });
}
export const loginPost = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);

    const email: string = req.body.email;
    const password: string = req.body.password;
    const user = await User.findOne({
      email: email,
      delete: false
    });

    if (!user) {
      //req.flash("error", "Email không tồn tại");
      console.log("ko co user")
      res.redirect(req.get("Referer") || "/");
      return;
    }

    if (md5(password) !== user.password) {
      //req.flash("error", "Sai mật khẩu");
      console.log("sai mat khau")
      res.redirect(req.get("Referer") || "/");
      return;
    }

    if (user.status === "inactive") {
      //req.flash("error", "Tài khoản đang bị khóa");
      console.log("khoA")
      res.redirect(req.get("Referer") || "/");
      return;
    }

    res.cookie("tokenUser", user.tokenUser);

    // await Cart.updateOne(
    //   { _id: req.cookies.cartId },
    //   { user_id: user.id }
    // );

    // await User.updateOne(
    //   { tokenUser: user.tokenUser },
    //   { statusOnline: "online" }
    // );

    

    res.redirect("/");
  } catch (error) {
    console.error(error);
    //req.flash("error", "Đã có lỗi xảy ra");
    res.redirect(req.get("Referer") || "/");
  }
};

export const registerPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const existEmail = await User.findOne({ email: req.body.email });

    if (existEmail) {
      //req.flash("error", "Email đã tồn tại");
      res.redirect("/");
      return;
    }

    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    //req.flash("error", "Đã có lỗi xảy ra");
    res.redirect("back");
  }
};