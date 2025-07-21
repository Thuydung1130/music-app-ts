import { Request, Response } from "express";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/config";

// [GET] /roles/
export const index = async (req: Request, res: Response) =>{
    const roles= await Role.find({
        delete:false
    }).select("title description")
    res.render("admin/pages/roles/index",{
        pageTitle: "Trang nhóm quyền",
        records: roles
    })
}

// [GET] /roles/create
export const create = async (req: Request, res: Response) =>{
    res.render("admin/pages/roles/create",{
        pageTitle: "Create Roles",
        
    })
}

// [POST] /roles/createPost
export const createPost = async (req: Request, res: Response) =>{
    const roleData={
        title: req.body.title,
        description:req.body.description
    }
    if(roleData){
        const role= await new Role(roleData);
        role.save();
    }else{
        res.redirect(`/${systemConfig.prefixAdmin}/roles`)
    }
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}

// [POST] /roles/edit
export const edit = async (req: Request, res: Response) =>{
    const id=req.params.id;
    //console.log(id);
    const role=await Role.findOne({
        _id:id
    }).select("title description")
    console.log(role)
    res.render("admin/pages/roles/edit",{
        pageTitle: "Edit Roles",
        data:role
    })
}

// [PATCH] /roles/editpatch
export const editPatch = async (req: Request, res: Response) =>{
    const id=req.params.id;
     const roleData={
        title: req.body.title,
        description:req.body.description
    }
    if(roleData){
        await Role.updateOne({
            _id:id
        },roleData)
    }else{
        res.redirect(`/${systemConfig.prefixAdmin}/roles/edit/${id}`)
    }
    res.redirect(`/${systemConfig.prefixAdmin}/roles/edit/${id}`)
}


// [GET] /roles/permission
export const permissions = async (req: Request, res: Response) =>{
    let find={
        delete: false
    };
    const records= await Role.find(find);
    res.render("admin/pages/roles/permissions",{
        pageTitle: "Phân quyền",
        records:records
    })
}

// [PATCH] /roles/permissionPatch
export const permissionsPatch = async (req: Request, res: Response) =>{
    console.log(req.body);
        const permissions=JSON.parse(req.body.permissions);
        console.log(permissions);
        for (const item of permissions) {
            const id=item.id;
            const permissions=item.permission;
            await Role.updateOne({_id:id},{permissions: permissions});
        }
    res.redirect(`/${systemConfig.prefixAdmin}/roles/permissions`)
}