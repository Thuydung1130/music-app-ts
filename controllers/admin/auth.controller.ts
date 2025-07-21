import { Request, Response } from "express";
import { systemConfig } from "../../config/config";
import md5 from "md5"
import Account from "../../models/account.model";

export const login = async (req: Request, res: Response) => {
    if (req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    }
    else {
        res.render("admin/pages/auth/login", {
            pageTitle: "Login"
        });
    }
}

export const loginPost = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email: email,
        delete: false
    });
    if (!user) {

        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    if (md5(password) != user.password) {

        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

        return;
    }
    if (user.status == "inactive") {

        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

        return;
    }
    res.cookie("token", user.token);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`)
}

export const logout = async (req: Request, res: Response) =>{
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
}