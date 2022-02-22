/* Audio Player */

const audio = document.querySelector("audio")
const songsNames = [
  "10Age_ft.Ramil-Ay",
  "Gorillaz-Clint_Eastwood",
  "10Age-Pushka",
  "Noize_mc-V_temnote(Brodsky_Version)",
  "LSP-Disney",
  "ATL-Demons",
  "The_stooges-I_wanna_be_your_dog",
]
const playListContainer = document.querySelector(".playlist-list")
const playList = document.querySelectorAll(".list-item")

/* Buttons */

const playButton = document.querySelector(".play")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
const audioRepeat = document.querySelector(".audio-repeat")
const volumeChange = document.querySelector(".audio-volume")
const audioMixing = document.querySelector(".audio-mixing")
const playListBtn = document.querySelector(".main-switcher")

/* Changeable text elements */

let audioTitle = document.querySelector(".track-title")
let trackStart = document.querySelector(".start-time")
let trackDuration = document.querySelector(".end-time")
let progressTrack = document.querySelector(".progress")
let progressBar = progressTrack.firstElementChild
let volumeLogo = volumeChange.firstElementChild
let volumeLine = document.querySelector(".volume-line")

/* Changeable visual elements */

let audioBackground = document.querySelector(".middle_album > img")
let webBackground = document.querySelector(".container ")
let webFooterBackground = document.querySelector(".footer .container ")
let volumeSlider = document.querySelector(".volume-slider")
let volumeIcon = document.querySelector(".volume-icon use")
let playLogo = playButton.firstElementChild

/* Changeable variables */

let song = 0
audio.volume = 0.5
progressBar.style.width = 0
volumeLine.style.height = `${audio.volume * 198}px`

/* Song and graphics change function */

function loadSong(track) {
  audioTitle.textContent = track
  audio.src = `assets/audio/${track}.mp3`
  audioBackground.src = `assets/img/${track}320.jpg`
  webBackground.style.background = `url("./assets/img/${track}1920.jpg") no-repeat center`
  webFooterBackground.style.background = `url("./assets/img/${track}1920.jpg") no-repeat center -980px`
}

/* Lets Play */

loadSong(songsNames[song])

playButton.addEventListener("click", () => {
  if (audio.paused) {
    playList[song].classList.add("list-active")
    audioTitle.classList.add("marquee")
    playLogo.src = "./assets/logotype/pause.svg"
    audio.play()
  } else {
    audioTitle.classList.remove("marquee")
    playLogo.src = "./assets/logotype/play.svg"
    audio.pause()
  }
})

/* playlist */

playListBtn.addEventListener("click", () => {
  playListContainer.classList.toggle("default")
})

for (let i = 0; i < playList.length; i++) {
  playList[i].textContent = `${i + 1}. ${songsNames[i]}`
}

for (let i = 0; i < playList.length; i++) {
  playList[i].addEventListener("click", () => {
    if (audio.paused) {
      audioTitle.classList.add("marquee")
      playLogo.src = "./assets/logotype/pause.svg"
      audio.play()
    } else {
      audioTitle.classList.remove("marquee")
      playLogo.src = "./assets/logotype/play.svg"
      audio.pause()
    }
  })
}

for (let i = 0; i < playList.length; i++) {
  playList[i].addEventListener("dblclick", () => {
    getActive(event, "list-active", playList)
    audioTitle.classList.add("marquee")
    playLogo.src = "./assets/logotype/pause.svg"
    loadSong(songsNames[i])
    audio.play()
    song = i
  })
}

function switchPlaylist() {
  if (song > 0 && song <= playList.length - 1) {
    playList[song - 1].classList.remove("list-active")
    playList[song].classList.add("list-active")
  } else if (song == 0) {
    playList[playList.length - 1].classList.remove("list-active")
    playList[0].classList.add("list-active")
  }
}

/* Audio time */

function trueTime(time) {
  let seconds = Math.floor(time % 60)
  let minutes = Math.floor(time / 60)
  if (seconds < 10) {
    seconds = String(seconds).padStart(2, 0)
  }
  return (time = `${minutes} : ${seconds}`)
}

audio.addEventListener("loadedmetadata", () => {
  trackDuration.textContent = trueTime(audio.duration)
})

audio.addEventListener("timeupdate", progressLine)

audio.addEventListener("ended", () => {
  nextSong()
  switchPlaylist()
})

/* Prev & Next functions */

function prevSong() {
  playLogo.src = "./assets/logotype/pause.svg"
  song--
  if (song < 0) {
    song = songsNames.length - 1
  }
  loadSong(songsNames[song])
  audio.play()
}

function nextSong() {
  playLogo.src = "./assets/logotype/pause.svg"
  song++
  if (song > songsNames.length - 1) {
    song = 0
  }
  loadSong(songsNames[song])
  audio.play()
}

prev.addEventListener("click", () => {
  prevSong()

  if (song < playList.length - 1) {
    playList[song + 1].classList.remove("list-active")
    playList[song].classList.add("list-active")
  } else if (song == playList.length - 1) {
    playList[0].classList.remove("list-active")
    playList[playList.length - 1].classList.add("list-active")
  }
})

next.addEventListener("click", () => {
  nextSong()
  switchPlaylist()
})

/* Audio extensions */

audioRepeat.addEventListener("click", () => {
  audioRepeat.firstElementChild.classList.toggle("repeat_modify")
  if (!audio.loop) {
    audio.loop = true
  } else {
    audio.loop = false
  }
})

volumeChange.addEventListener("click", () => {
  volumeChange.firstElementChild.classList.toggle("repeat_modify")
  volumeSlider.classList.toggle("hidden-slider")
})

volumeChange.addEventListener("dblclick", () => {
  volumeIcon.href.animVal = "./assets/logotype/no_volume.svg#no_volume"
  volumeIcon.href.baseVal = "./assets/logotype/no_volume.svg#no_volume"
  audio.volume = 0
  volumeLine.style.height = "0px"
})

function randomSong(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let isMixing = false

audioMixing.addEventListener("click", () => {
  audioMixing.firstElementChild.classList.toggle("repeat_modify")
  if (!isMixing) {
    isMixing = true
    playList[song].classList.remove("list-active")
    loadSong(songsNames[randomSong(0, songsNames.length - 1)])
    audio.play()
  } else {
    isMixing = false
    song = 0
    audio(play)
    audio.addEventListener("ended", nextSong)
  }
})

/* Audio & Volume progress */

function progressLine(event) {
  let percent = (this.currentTime / this.duration) * 100
  progressBar.style.width = `${percent}%`
  trackStart.textContent = trueTime(audio.currentTime)
}

function trackProgress(event) {
  const width = this.clientWidth
  let click = event.offsetX
  audio.currentTime = (click / width) * audio.duration
}

function volumeProgress(event) {
  const height = volumeSlider.clientHeight
  let click = event.offsetY
  audio.volume = click / height
  let percent = (click / height) * 100
  volumeLine.style.height = `${percent}%`
}

progressTrack.addEventListener("click", trackProgress)
volumeSlider.addEventListener("click", () => {
  volumeIcon.href.animVal = "./assets/logotype/volume.svg#volume"
  volumeIcon.href.baseVal = "./assets/logotype/volume.svg#volume"
  volumeProgress(event)
})

/* Switch theme & Locale Storage  */

const theme = document.querySelector("body")
let localTheme = localStorage.getItem("theme")
const switchButtons = document.querySelectorAll(".colorize-btn")

function switchTheme(event) {
  for (let i = 0; i < switchButtons.length; i++) {
    if (theme.getAttribute("data-theme")) {
      theme.setAttribute("data-theme", event.target.dataset.theme)
      localStorage.setItem("theme", event.target.dataset.theme)
    }
  }
}

for (let i = 0; i < switchButtons.length; i++) {
  switchButtons[i].addEventListener("click", switchTheme)
}

if (localTheme) {
  theme.setAttribute("data-theme", localTheme)
} else {
  theme.setAttribute("data-theme", switchButtons[0].dataset.theme)
}

/* Active button & Locale Storage */

const activeTheme = document.querySelectorAll(".colorize-btn")
const localActive = localStorage.getItem("active")

function getActive(event, classMod, arr) {
  event.preventDefault()
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.remove(classMod)
  }
  event.target.classList.add(classMod)
}

for (let i = 0; i < activeTheme.length; i++) {
  activeTheme[i].addEventListener("click", () => {
    getActive(event, "colorize-active", activeTheme)
    localStorage.setItem("active", event.target.dataset.theme)
  })
}

for (let i = 0; i < activeTheme.length; i++) {
  if (localActive) {
    localActive === activeTheme[i].dataset.theme
      ? activeTheme[i].classList.add("colorize-active")
      : null
  } else {
    activeTheme[0].classList.add("colorize-active")
  }
}

/* Cache */

function caching() {
  for (let i = 0; i < songsNames.length; i++) {
    const img = new Image()
    img.src = `./assets/img/${songsNames[i]}1920.jpg`
  }
}

caching()
