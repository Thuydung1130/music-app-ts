import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import paginationHelper from "../../helpers/pagination";
import FavoriteSong from "../../models/favorite-song.model";
export const index = async (req: Request, res: Response) => {
  console.log("ok")
  //sort
  let sort = {};
  sort["createdAt"] = "desc";
  //sort
  const songs = await Song.find({

    status: "active",
    deleted: false
  }).sort(sort).limit(9).select("title avatar id singerId slug ").lean()


  // const song = await Song.find({

  //   status: "active",
  //   deleted: false
  // }).select("-audio")
  // console.log(song);
  const singer = await Singer.find({
    status: "active",
    deleted: false
  }).select("fullName avatar").limit(6)

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId
    }).select("fullName slug")
    song["singer"] = infoSinger
    //console.log(song["singer"])

    const favoriteSong = await FavoriteSong.findOne({
      songId: song._id
    })
    song["isFavoriteSong"] = favoriteSong ? true : false;
  }
  console.log(songs)
  const topic = await Topic.find({

    deleted: false
  }).select("title")
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    songs: songs,
    singer: singer,
    topic: topic
  })
}