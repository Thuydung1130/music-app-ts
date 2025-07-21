import { Request, Response } from "express";
import Account from "../../models/account.model";
import { systemConfig } from "../../config/config";
import md5 from "md5"
import Role from "../../models/role.model";
export const index = async (req: Request, res: Response) => {
    const admins = await Account.find({
        delete: false
    }).select("-password -token").lean();
    for(const admin of admins){
        const role=await Role.find({
            _id:admin.role_id,
            delete:false
        });
        admin["role"]=role[0]
        //console.log(role)
    }
    //console.log(admins);
    res.render("admin/pages/accounts/index", {
        pageTitle: "Accounts",
        admin: admins,
        
    })
}


export const create = async (req: Request, res: Response) => {
    const roles = await Role.find({
        delete: false
    })
    //console.log(roles)
    res.render("admin/pages/accounts/create", {
        pageTitle: "Create Admin",
        roles: roles
    })
}

export const createPost = async (req: Request, res: Response) => {
    const emailExits = await Account.findOne({
        email: req.body.email,
        delete: false
    })
    if (emailExits) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    }
    else {
        const adminData = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            role_id: req.body.role_id,
            status: req.body.status,
            avatar: req.body.avatar
        }
        const admin = new Account(adminData);
        admin.save();
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    }

}

export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    const account = await Account.findOne({
        _id: id

    }).select("-password -token")
    const roles = await Role.find({
        delete: false
    }).select("title id")
    //console.log(account)
    res.render("admin/pages/accounts/edit", {
        pageTitle: "Edit Admin",
        account: account,
        roles:roles
    })
}

export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;
    const emailExits = await Account.findOne({
        email: req.body.email,
        delete: false,

    })
    console.log(req.body)
    if (emailExits) {
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        } else {
            delete req.body.password;
        }
        await Account.updateOne({ _id: id }, req.body);
        //req.flash("success","cap nhat thanh cong");
        res.redirect(`/${systemConfig.prefixAdmin}/accounts/edit/${id}`);
    }
    else {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts/edit/${id}`);
    }
}