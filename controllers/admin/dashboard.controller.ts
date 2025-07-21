import { Request,Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Account from "../../models/account.model";

export const index= async (req: Request, res: Response) => {
    const statstic={
        Topics:{
            total:0,
            active:0,
            inactive:0,
        },
        Songs:{
            total: 0,
            active:0,
            inactive:0
        },
        Singers:{
            total: 0,
            active:0,
            inactive:0
        },
        Accounts:{
            total: 0,
            active:0,
            inactive:0
        },
        Users:{
            total: 0,
            active:0,
            inactive:0,
        }
    }
    statstic.Topics.total= await Topic.countDocuments({
        deleted:false
    })
    statstic.Topics.active= await Topic.countDocuments({
        deleted:false,
        status:"active"
    })
    statstic.Topics.inactive= await Topic.countDocuments({
        deleted:false,
        status:"inactive"
    })
    statstic.Songs.total= await Song.countDocuments({
        deleted:false
    })
    statstic.Songs.active= await Song.countDocuments({
        deleted:false,
        status:"active"
    })
    statstic.Songs.inactive= await Song.countDocuments({
        deleted:false,
        status:"inactive"
    })
    statstic.Singers.total= await Singer.countDocuments({
        deleted:false
    })
    statstic.Singers.active= await Singer.countDocuments({
        deleted:false,
        status:"active"
    })
    statstic.Singers.inactive= await Singer.countDocuments({
        deleted:false,
        status:"inactive"
    })
    statstic.Accounts.total= await Account.countDocuments({
        delete:false
    })
    statstic.Accounts.active= await Account.countDocuments({
        delete:false,
        status:"active"
    })
    statstic.Accounts.inactive= await Account.countDocuments({
        delete:false,
        status:"inactive"
    })
    console.log(statstic)
    res.render("admin/pages/dashboard/index",{
        pageTitle:"Tổng quan",
        statstic:statstic
    })
}