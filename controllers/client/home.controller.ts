import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import paginationHelper from "../../helpers/pagination";
import FavoriteSong from "../../models/favorite-song.model";
export const index = async (req: Request, res: Response) => {
  //console.log("ok")
  //sort
  let sort = {};
  sort["createdAt"] = "desc";
  //sort

  //sort topsong
  let sortTopSong = {};
  sortTopSong["listen"] = "desc";
  //sort topsong


  const songs = await Song.find({

    status: "active",
    deleted: false
  }).sort(sort).limit(9).select("title avatar id singerId slug ").lean()


  
  const singer = await Singer.find({
    status: "active",
    deleted: false
  }).select("fullName avatar slug").limit(6)

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
  //console.log(songs)
  const topic = await Topic.find({

    deleted: false
  }).select("title")


  //top-song
  const topSongs = await Song.find({

    status: "active",
    deleted: false,

  }).sort(sortTopSong).limit(3).select("title listen avatar id singerId slug ").lean();
  //top-song

  for (const topSong of topSongs) {
    const infoSinger = await Singer.findOne({
      _id: topSong.singerId
    }).select("fullName slug")
    topSong["singer"] = infoSinger
    //console.log(song["singer"])

   
  }

  //console.log(topSongs);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",

    topSongs:topSongs,
    songs: songs,
    singer: singer,
    topic: topic
  })
}