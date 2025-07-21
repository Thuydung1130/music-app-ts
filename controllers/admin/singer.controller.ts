import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
export const index =async (req: Request, res: Response) =>{
    const singer=await Singer.find({
        deleted:false,
        //status:"active"
    })
    console.log(singer);
    res.render("admin/pages/singer/index",{
        pageTitle: "Trang bài hát",
        singers: singer
    })
}

export const create =async (req: Request, res: Response) =>{
    
    res.render("admin/pages/singer/create",{
        pageTitle: "Create singer"
    })
}

export const createPost =async (req: Request, res: Response) =>{
    //console.log(req.body)
    const dataSinger={
        fullName: req.body.fullName,
        avatar: req.body.avatar,
        status: req.body.status
    }
    const singer= new Singer(dataSinger);
    singer.save();
    res.redirect( `/${systemConfig.prefixAdmin}/singers`)
}