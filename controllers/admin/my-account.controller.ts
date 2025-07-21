import { Request, Response } from "express";
export const index = async (req: Request, res: Response) =>{
    res.render("admin/pages/my-account/index"),{
        pageTitle:"Thông tin cá nhân"
    }
}


export const edit = async (req: Request, res: Response) =>{
    res.render("admin/pages/my-account/edit"),{
        pageTitle:"Chỉnh sửa thông tin cá nhân"
    }
}