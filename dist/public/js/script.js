document.addEventListener('DOMContentLoaded', () => {
    console.log("ok")
    attachSongClickEvents();
    attachLikeAndFavoriteEvents();


    // Hàm load và chèn thêm CSS từ tài liệu mới
    const loadStylesheets = (doc) => {
        const newLinks = doc.querySelectorAll('link[rel="stylesheet"]');
        newLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!document.querySelector(`link[href="${href}"]`)) {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = href;
                document.head.appendChild(newLink);
            }
        });
    };

    document.body.addEventListener('click', async (e) => {
        const link = e.target.closest('a');
        if (!link) return;


        if (!link || link.classList.contains('no-ajax')) return; // <-- bỏ qua
        // Chỉ xử lý nếu là link nội bộ
        if (link && link.href.startsWith(window.location.origin)) {
            // Nếu là file .mp3 hoặc .jpg thì không can thiệp
            if (link.href.endsWith('.mp3') || link.href.endsWith('.jpg')) return;

            e.preventDefault();

            try {
                const res = await fetch(link.href);
                const html = await res.text();

                // ⚡️ Nếu server trả về login page thì ép redirect
                if (res.url.includes("/user/login") || html.includes("form-login")) {
                    window.location.href = "/user/login";
                    return;
                }

                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                loadStylesheets(doc);//load css moi
                const newContent = doc.querySelector('.inner-main');
                if (newContent) {
                    document.querySelector('.inner-main').innerHTML = newContent.innerHTML;
                    history.pushState({}, '', link.href);
                    attachSongClickEvents();
                    attachLikeAndFavoriteEvents();
                }
            } catch (err) {
                console.error("Không thể tải trang:", err);
            }
        }
    });

    // Xử lý nút back/forward của trình duyệt
    window.addEventListener('popstate', async () => {
        const res = await fetch(location.href);
        const html = await res.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        loadStylesheets(doc);
        const newContent = doc.querySelector('.inner-main');

        if (newContent) {
            document.querySelector('.inner-main').innerHTML = newContent.innerHTML;
            attachSongClickEvents();
            console.log("ok")
            attachLikeAndFavoriteEvents();

        }
    });
});



// function initAPlayer() {
//     const aplayer = document.querySelector("#aplayer");
//     if (aplayer) {
//         let dataSong = aplayer.getAttribute("data-song");
//         dataSong = JSON.parse(dataSong);

//         let dataSinger = aplayer.getAttribute("data-singer");
//         dataSinger = JSON.parse(dataSinger);

//         const ap = new APlayer({
//             container: aplayer,
//             lrcType: 1,
//             audio: [{
//                 name: dataSong.title,
//                 artist: dataSinger.fullName,
//                 url: dataSong.audio,
//                 cover: dataSong.avatar,
//                 lrc: dataSong.lyrics
//             }],
//             autoplay: true
//         });

//         const avatar = document.querySelector(".singer-detail .inner-avatar");

//         ap.on('play', function () {
//             avatar.style.animationPlayState = "running";
//         });

//         ap.on('pause', function () {
//             avatar.style.animationPlayState = "paused";
//         });

//         ap.on('ended', function () {
//             const link = `/songs/listen/${dataSong._id}`;
//             const option = { method: "PATCH" };

//             fetch(link, option)
//                 .then(res => res.json())
//                 .then(data => {
//                     const elementListenSpan = document.querySelector(".singer-detail .inner-listen span");
//                     elementListenSpan.innerHTML = `${data.listen} lượt nghe`;
//                 });
//         });
//     }
// }




function attachLikeAndFavoriteEvents() {
    // Like button
    const buttonLike = document.querySelector("[button-like]");
    if (buttonLike) {
        console.log("ok")
        buttonLike.addEventListener("click", () => {
            const idSong = buttonLike.getAttribute("button-like");
            const isActive = buttonLike.classList.contains("active");
            const typeLike = isActive ? "no" : "yes";

            const link = `/songs/like/${typeLike}/${idSong}`;
            const option = { method: "PATCH" };

            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    const span = buttonLike.querySelector("span");
                    span.innerHTML = `${data.newLike} thich`;
                    buttonLike.classList.toggle("active");
                });
        });
    }

    // Favorite buttons
    const listButtonFavorite = document.querySelectorAll("[button-favorite]");
    listButtonFavorite.forEach((buttonFavorite) => {
        buttonFavorite.addEventListener("click", () => {
            const idSong = buttonFavorite.getAttribute("button-favorite");
            const isActive = buttonFavorite.classList.contains("active");
            const typeFavorite = isActive ? "no" : "yes";

            const link = `/songs/favorite/${typeFavorite}/${idSong}`;
            const option = { method: "PATCH" };

            fetch(link, option)
                .then(res => res.json())
                .then(() => {
                    buttonFavorite.classList.toggle("active");
                });
        });
    });
}


///sreach suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
    const input = boxSearch.querySelector("input[name='keyword']");
    const boxSuggest = boxSearch.querySelector(".inner-suggest")
    input.addEventListener("keyup", () => {
        const keyword = input.value;
        //onsole.log(keyword)
        const link = `/sreach/suggest?keyword=${keyword}`;

        fetch(link)
            .then(res => res.json())
            .then(data => {
                const songs = data.songs;
                console.log(songs)
                if (songs.length > 0) {
                    boxSuggest.classList.add("show");
                    const htmls = songs.map(song => {
                        return `
                            <a class="inner-item" href="/songs/detail/${song.slug}">
                              <div class="inner-image">
                                <img src="${song.avatar}"/>
                              </div>
                              <div class="inner-info">
                                <div class="inner-title">${song.title}</div>
                                <div class="inner-singer">
                                  <i class="fa-solid fa-microphone-lines"></i>${song.infoSinger.fullName}
                                </div>
                              </div>
                            </a>

                        `
                    })
                    const boxList = boxSuggest.querySelector(".inner-list");
                    boxList.innerHTML = htmls.join("");
                } else {
                    boxSuggest.classList.remove("show");
                }

            })
    })
}
///sreach suggest

function attachSongClickEvents() {
    const songImgs = document.querySelectorAll('.song-img');

    songImgs.forEach(img => {
        img.addEventListener('click', async () => {
            const title = img.parentElement.querySelector("h2");
            const author = img.parentElement.querySelector("p a");
            const Img = img.querySelector("img");
            const songId = Img.getAttribute("data-id");
            const imgsrc = Img.getAttribute("src");

            const audio = document.getElementById('audio-player');

            const thumbnail = document.getElementById('audio-thumbnail');
            const singTitle = document.querySelector(".sing .sing-title .main-title");
            const singAuthor = document.querySelector(".sing .sing-title .author a");

            thumbnail.src = imgsrc;
            singTitle.textContent = title.textContent;
            singAuthor.textContent = author.textContent;





            const link = `/songs/${songId}`;
            const option = { method: "PATCH" };

            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    if (audio) {
                        audio.src = data.audio;
                        audio.setAttribute('data-id', data.id);
                        audio.load();
                        audio.addEventListener('canplay', () => {
                            audio.play();

                            const playBtn = document.querySelector('.sing-play .play i');
                            playBtn.classList.remove('fa-play');
                            playBtn.classList.add('fa-pause');
                        }, { once: true });
                    }
                });
        });
    });
}



document.addEventListener("DOMContentLoaded", () => {
    // --- toàn bộ code bạn dán ở trên ---



    //play-radio
    const audio = document.getElementById('audio-player');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const processContainer = document.querySelector('.process');
    const processFilled = document.querySelector('.process-filled');

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // Khi metadata được load (biết thời lượng)
    audio.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audio.duration);
    });

    // Cập nhật khi đang phát
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            currentTimeSpan.textContent = formatTime(audio.currentTime);
            const percent = (audio.currentTime / audio.duration) * 100;
            processFilled.style.width = `${percent}%`;
        }
    });

    // Cho phép click vào thanh tiến trình để tua
    processContainer.addEventListener('click', (e) => {
        const rect = processContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    //play-radio



    const playBtn = document.querySelector('.sing-play .play i');

    // Xử lý khi bấm play/pause
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
        } else {
            audio.pause();
            playBtn.classList.remove('fa-pause');
            playBtn.classList.add('fa-play');
        }
    });


    // Khi bài hát kết thúc
    audio.addEventListener('ended', () => {
        const songId = audio.getAttribute('data-id'); // Giả sử bạn gán sẵn ID bài hát

        // Gửi API cập nhật lượt nghe
        fetch(`/songs/listen/${songId}`, {
            method: 'PATCH', // hoặc POST tùy backend bạn xử lý
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log("Cập nhật lượt nghe thành công:", data);
                const elementListenSpan = document.querySelector(".singer-detail .inner-listen span");
                elementListenSpan.innerHTML = `${data.listen} lượt nghe`;
            })
            .catch(err => {
                console.error("Lỗi khi cập nhật lượt nghe:", err);
            });
    });

});


