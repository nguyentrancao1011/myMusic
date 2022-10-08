const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tempSong = new Set();

const playList = $(".playlist");
const author = $(".author");
const nameSong = $(".name-song");
const cdThumb = $(".cd-thumb");
const audio = $(".audio")
const btnToggle = $(".btn-toggle");
const btnPause = $(".fa-pause");
const control = $(".control");
const btnPlaylist = $(".btn-playlist");
const nextBtn = $(".fa-forward");
const prevBtn = $(".fa-backward");
const btnRandom = $(".btn-random");
const btnRepeat = $(".btn-repeat");
const progressBar = $(".progress");
const volumn = $(".volumn_value");
const volumeIcon = $(".volume-icon");
const volumeMute = $(".fa-volume-mute");
const volumeUp = $(".fa-volume-up");
const currentTime = $(".progress_time-current");
const timeSong = $(".progress_time-duration");


var apps = {
    currentIndex: 0,
    isPlaylist: false,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    newArray: [],
    songs: [
        {
            name: "Alone",
            singer: "Marshmello",
            path: "./assets/music/alone.mp3",
            image: "./assets/image/marshmello.jpg"
        },
        {
            name: "Chắc Anh Đang",
            singer: "Tiên Tiên",
            path: "./assets/music/chacanhdang.mp3",
            image: "./assets/image/tientien.jpg"
        },
        {
            name: "Chạy Khỏi Thế Giới Này",
            singer: "Phương Ly",
            path: "./assets/music/chaykhoithegioinay.mp3",
            image: "./assets/image/phuongly.jpg"
        },
        {
            name: "Crying Over You",
            singer: "Justatee",
            path: "./assets/music/cryingoveryou.mp3",
            image: "./assets/image/justatee.jpg"
        },
        {
            name: "Dont Know What To Do",
            singer: "BlackPink",
            path: "./assets/music/dkwtd.mp3",
            image: "./assets/image/blackpink.jpg"
        },
        {
            name: "Em Đừng Khóc",
            singer: "Chillies",
            path: "./assets/music/emdungkhoc.mp3",
            image: "./assets/image/chillies.jpg"
        },
        {
            name: "Hết Mực",
            singer: "Cá Hồi Hoang",
            path: "./assets/music/hetmuc.mp3",
            image: "./assets/image/cahoihoang.jpg"
        },
        {
            name: "Loser",
            singer: "BigBang",
            path: "./assets/music/loser.mp3",
            image: "./assets/image/bigbang.jpg"
        },
        {
            name: "Ngày Nào",
            singer: "Cá Hồi Hoang",
            path: "./assets/music/ngaynao.mp3",
            image: "./assets/image/cahoihoang.jpg"
        },
        {
            name: "Nói Với Em",
            singer: "BigDaddy",
            path: "./assets/music/noivoiem.mp3",
            image: "./assets/image/bigdaddy.jpg"
        },
        {
            name: "Psycho",
            singer: "RedVelvet",
            path: "./assets/music/psycho.mp3",
            image: "./assets/image/redvelvet.jpg"
        },
        {
            name: "SUNKISSED",
            singer: "Chillies",
            path: "./assets/music/sunkissed.mp3",
            image: "./assets/image/chillies.jpg"
        },
        {
            name: "Thu Cuối",
            singer: "MrT x Yanbi",
            path: "./assets/music/thucuoi.mp3",
            image: "./assets/image/mrt.jpg"
        },
        {
            name: "Vùng Ký Ức",
            singer: "Chillies",
            path: "./assets/music/vungkyuc.mp3",
            image: "./assets/image/chillies.jpg"
        },
        {
            name: "YEAH YEAH YEAH",
            singer: "BlackPink",
            path: "./assets/music/yeahx3.mp3",
            image: "./assets/image/blackpink.jpg"
        }
    ],
    render: function(){
        var arraySong = this.songs.map((song, index) =>{
            return `
                <div class="song ${index === this.currentIndex ? "active" : ""} cls-${index} " data-index="${index}">
                    <div class="thumb">
                        <img src="${song.image}" alt="${song.singer}">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        var htmls = arraySong.join("");
        playList.innerHTML = htmls;
    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function(){
        const _this = this;
        // xu ly show playlist
        btnPlaylist.onclick = function(){
            this.playList = !this.playList;
            playList.classList.remove("non-active")
            playList.classList.toggle("active", this.playList);
        }
        btnToggle.onclick = function(){
            if(!_this.isPlaying){
                control.classList.add("playing");
                _this.isPlaying = true;
                audio.play();
            }
            else{
                control.classList.remove("playing");
                _this.isPlaying = false;
                audio.pause();
            }
        }
        audio.onplay = function(){
            control.classList.add('playing');
            _this.isPlaying = true;
            cdThumbRotate.play();
        }
        audio.onpause = function(){
            control.classList.remove("playing");
            _this.isPlaying = false;
            cdThumbRotate.pause();
        }
        //xu ly bam vao next song
        nextBtn.onclick = function(){
            if(!_this.isRandom){
                _this.nextSong();
                audio.play();
            }
            else{
                _this.randomSong();
                audio.play();
            }
        }
        prevBtn.onclick = function(){
            if(!_this.isRandom){
                _this.prevSong();
                audio.play();
            }
            else{
                _this.randomSong();
                audio.play();
            }
        }
        // xu ly dia cd rotate
        var cdThumbRotate = cdThumb.animate([{
            transform: "rotate(360deg)"
        }],{
            duration: 10000,
            iterations: Infinity
        });
        cdThumbRotate.pause();

        
        btnRandom.onclick = function(){
            _this.isRandom = !_this.isRandom;
            this.classList.toggle("active", _this.isRandom);
        }
        btnRepeat.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            this.classList.toggle("active", _this.isRepeat);
        }
        // xu ly bai hat khi dang chay tren thanh progressBar
        audio.ontimeupdate = function(){
            if(this.duration){
                var progressPercent = (this.currentTime / this.duration) * 100;
                progressBar.value = progressPercent;
                let minute_currentTime = Math.floor(this.currentTime / 60);
                let second_currentTime = Math.floor(this.currentTime % 60);
                let minute_durationTime = Math.floor(this.duration / 60);
                let second_durationTime = Math.floor(this.duration % 60);
                if(minute_currentTime < 10){
                    minute_currentTime = `0${minute_currentTime}`;
                }
                if(second_currentTime < 10){
                    second_currentTime = `0${second_currentTime}`;
                }
                if(minute_durationTime < 10){
                    minute_durationTime = `0${minute_durationTime}`;
                }
                if(second_durationTime < 10){
                    second_durationTime = `0${second_durationTime}`;
                }
                currentTime.innerHTML = `${minute_currentTime}:${second_currentTime}`;
                timeSong.innerHTML = `${minute_durationTime}:${second_durationTime}`;
            }
        }
        // xu ly tua bai hat
        progressBar.oninput = function(){
            var seekTime = (this.value/100)*audio.duration;
            audio.currentTime = seekTime;
        }
        // xu ly khi ket thuc bai hat
        audio.onended = function(){
            if(!_this.isRepeat){
                nextBtn.onclick();
            }
            else{
                audio.play();
            }
        }
        // xu ly thoi gian khi chay bai hat
        // xu ly tang/giam am thanh
        volumn.oninput = function(){
            audio.volume = this.value / 100;
            if(audio.volume == 0){
                volumeUp.classList.add("active");
                volumeMute.classList.add("active");
            }
            if(audio.volume != 0){
                volumeUp.classList.remove("active");
                volumeMute.classList.remove("active");
            }
        }
        volumeIcon.onclick = function(){
            if(!_this.isMute){
                volumeUp.classList.add("active");
                volumeMute.classList.add("active");
                _this.isMute = !_this.isMute;
                audio.volume = 0;
                volumn.value = 0;
            }
            else{
                volumeUp.classList.remove("active");
                volumeMute.classList.remove("active");
                _this.isMute = !_this.isMute;
                audio.volume = 1;
                volumn.value = 100;
            }
        }
        // xu ly khi click vao song va active
        playList.onclick = function(e){
            let nodeSong = e.target.closest(".song:not(.active)");
            let nodeOption = e.target.closest(".option");
            if(!nodeSong){
                if(nodeOption){
                    // do nothing
                }
            }
            else{
                if(!nodeOption){
                    _this.currentIndex = Number(nodeSong.dataset.index);
                    _this.activeSong();
                    _this.loadCurrentSong();
                    audio.play();
                }
                else{
                    // do nothing
                }
            }
        }
    },
    // nextsong
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.activeSong();
        this.loadCurrentSong();
    },
    // prevsong
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.activeSong();
        this.loadCurrentSong();
    },
    // xu ly random song
    randomSong: function(){
        let oldIndex = this.currentIndex;
        tempSong.add(oldIndex);
        let randomIndex;
        do{
            randomIndex = Math.floor(Math.random() * this.songs.length)
        }while(tempSong.has(randomIndex));
        this.currentIndex = randomIndex;
        if(tempSong.size === this.songs.length){
            tempSong.clear();
        }
        this.activeSong();
        this.loadCurrentSong();
    },
    loadCurrentSong: function(){
        author.innerText = this.currentSong.singer;
        nameSong.innerText = this.currentSong.name;
        cdThumb.src = this.currentSong.image;
        audio.src = this.currentSong.path;
    },
    // active song
    activeSong: function(){
        let activeIndex = this.currentIndex;
        let oldSong = $(".song.active");
        let newActive = $(".cls-"+activeIndex);
        newActive.classList.add("active");
        oldSong.classList.remove("active");
        setTimeout(function(){
            newActive.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });
        },500)
    },
    start: function(){
        this.defineProperties();
        this.loadCurrentSong();
        this.handleEvents();
        this.render();
    }
}

apps.start();