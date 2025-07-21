import { NextFunction, Request,Response } from "express";
import Account from "../../models/account.model";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/config";

export const requireAuth=async(req:Request,res:Response ,next:NextFunction)=>{
    //console.log(req.cookies.token)
    if(!req.cookies.token){
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
    }else{
        const user=await Account.findOne({token: req.cookies.token}).select("-password");
        //console.log(user)
        if(!user){
            res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
        }
        else{
            const role= await Role.findOne({
                _id:user.role_id
            }).select("title permissions")
            res.locals.user=user;
            res.locals.role=role;
            console.log(role);
            next()
        }
        
    }
    
}