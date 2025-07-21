import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

// [GET] /songs/
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });

  //console.log(songs);

  res.render("admin/pages/songs/index", {
    pageTitle: "Quản lý bài hát",
    songs: songs,
  });
};


// [GET] /songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    status: "active",
    deleted: false
  }).select("title");
  const singer = await Singer.find({
    status: "active",
    deleted: false
  }).select("fullName");
  res.render("admin/pages/songs/create", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singer: singer
  })
}

// [GET] /songs/createPost
export const createPost = async (req: Request, res: Response) => {
  //console.log("ok");
  //console.log(req.body)
  let avatar="";
  let audio="";
  if(req.body.avatar){
    avatar=req.body.avatar[0];
  }
  if(req.body.audio){
    audio=req.body.audio[0];
  }
  //console.log("TITLE VALUE:", req.body.title, typeof req.body.title);
  const dataSong = {

    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio:audio,
    lyrics:req.body.lyrics,
  }
  

  const song=new Song(dataSong);

  await song.save();
  console.log(song.slug);
  
// console.log("Đã gọi createPost");
// console.log("REQ.BODY:", JSON.stringify(req.body));
// console.log("Song:", JSON.stringify(song)); // xem đầy đủ


  res.redirect(`/${systemConfig.prefixAdmin}/songs`); 
}

// [GET] /songs/edit
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;

    const song = await Song.findOne({
        _id: id,
        deleted: false
    });

    const topics = await Topic.find({
        deleted: false
    }).select("title");

    const singers = await Singer.find({
        deleted: false
    }).select("fullName");

    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers
    });
}

//[PATCH] /songs/edit
export const editPatch = async (req: Request, res: Response) => {
  
  const id = req.params.id;
  
  console.log(id);
  //console.log("TITLE VALUE:", req.body.title, typeof req.body.title);
  const dataSong = {

    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    lyrics:req.body.lyrics,
  }
  if(req.body.avatar){
    dataSong["avatar"]=req.body.avatar[0];
  }
  if(req.body.audio){
    dataSong["audio"]=req.body.audio[0];
  }
  console.log(dataSong);
  await Song.updateOne({
    _id:id
  },dataSong)
  



  
  res.redirect(`/${systemConfig.prefixAdmin}/songs/edit/${id}`);

}

export const deleteSong = async (req: Request, res: Response) =>{
    const id = req.params.id;
    await Song.updateOne(
        { _id: id },
        {
            deleted: true,
            
        });
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}