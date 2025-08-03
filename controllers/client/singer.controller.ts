import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
export const singer = async (req: Request, res: Response) => {
    const slugSinger:string=req.params.slug;
    const singer=await Singer.findOne({
        slug:slugSinger,
        deleted: false,
        status: "active"
    }).select("id avatar fullName slug")
    const songs=await Song.find({
        singerId:singer.id,
        deleted: false,

    }).select("avatar title slug")
    console.log(songs)
    res.render("client/pages/singer/detail",{
        pageTitle: singer.fullName,
        isSingerPage:true,
        singer:singer,
        songs:songs
    })

}