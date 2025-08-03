import { Request,Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

//[GET] /songs/:slugTopic
export const list= async (req: Request, res: Response) => {
  //console.log(req.params.slugTopic);
  const topic=await Topic.findOne({
    slug: req.params.slugTopic,
    status: "active",
    deleted:false
  })
  const songs=await Song.find({
    topicId:topic.id,
    status:"active",
    deleted:false

  }).select("avatar title slug singerId like")
  //console.log(songs);

  for (const song of songs) {
    const infoSinger=await Singer.findOne({
        _id:song.singerId,
        status:"active",
        deleted:false
    })
    //console.log(infoSinger);
    song["infoSinger"]=infoSinger
  }
  console.log(songs)
  res.render("client/pages/songs/list",{
    pageTitle: topic.title,
    songs:songs
  })
}

//[GET] /songs/detail/:slugSong
export const detail= async (req: Request, res: Response) =>{
    const slugSong:string=req.params.slugSong;
    const song =await Song.findOne({
      slug:slugSong,
      status: "active",
      deleted:false
    }).select("-audio")
   // console.log(song);
    const singer=await Singer.findOne({
      _id: song.singerId,
      deleted:false
    }).select("fullName")
    const topic=await Topic.findOne({
      _id: song.topicId,
      deleted:false
    }).select("title")
    
    const favoriteSong=await FavoriteSong.findOne({
      songId:song.id
    })
    song["isFavoriteSong"]=favoriteSong?true:false;
    //console.log(favoriteSong);
    //console.log(singer);
    //console.log(topic);
    res.render("client/pages/songs/detail",{
        pageTitle:"chi tiet bai hat",
        song:song,
        singer:singer,
        topic:topic
    })
}

//[GET] /songs/like/yes/:issong
export const like= async (req: Request, res: Response) =>{
  const idSong:string =req.params.idSong;
  const typeLike:string =req.params.typeLike;
  const song=await Song.findOne({
    _id:idSong,
    status:"active",
    deleted:false
  })
  const newLike=typeLike==="yes"?song.like+1:song.like-1
  //const newLike=song.like+1
  await Song.updateOne({
    _id:idSong
  },{
    like:newLike
  })
  res.json({
    code:200,
    newLike:newLike
  })
}

//[GET] /songs/favorite/yes/:issong
export const favorite= async (req: Request, res: Response) =>{
  const idSong:string =req.params.idSong;
  const typeFavorite:string =req.params.typeFavorite;
  //console.log(typeFavorite);
  switch (typeFavorite) {
    case "yes":
      const existFavoriteSong=await FavoriteSong.findOne({
        songId:idSong
      });
      if(!existFavoriteSong){
        const record=new FavoriteSong({
          //userId:
          songId:idSong
        })
        await record.save();
      }
      break;
    case "no":
      await FavoriteSong.deleteOne({
        songId:idSong
      })
      break;
    default:
      break;
  }
  res.json({
    code:200,

  })
}


// [PATCH] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;

  const song = await Song.findOne({
    _id: idSong
  });

  const listen: number = song.listen + 1;

  await Song.updateOne(
    { _id: idSong },
    { listen: listen }
  );

  const songNew = await Song.findOne({
    _id: idSong
  });

  res.json({
    code: 200,
    message: "Thành công!",
    listen: songNew.listen
  });
};

// [PATCH] /songs/play/:idSong
export const audio = async (req: Request, res: Response) =>{
  //console.log("ok")
  const idSong: string = req.params.idSong;

  const song = await Song.findOne({
    _id: idSong
  });
  //console.log("ok");
  res.json({
    audio:song.audio,
    id:song.id
  });
  // console.log("chay")
  // const song = await Song.findById(req.params.idSong); // từ MongoDB chẳng hạn
  
  // if (!song)  res.json({ message: 'Không tìm thấy bài hát' });
  
  // res.json({
  //   audio: song.audio,   // ví dụ: /media/song123.mp3
    
  // });
}
