// testing the api

// const testing = () => {
//   fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/75621062`, {
//     method: "GET"
//   })
//     .then((response) => response.json())
//     .then((album) => {
//       console.log(album)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// testing()

// fetch the album id

const loadAlbum = (albumId) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((album) => {
      displayAlbum(album);
      console.log(album);
    })
    .catch((err) => {
      console.log(err);
    });
};

// display the album name and image

let artistName = "";

const displayAlbum = (album) => {
  console.log(album);
  // album name
  let albumNameElement = document.getElementById("album-name");
  albumNameElement.innerText = album.title;
  // album image
  let albumImageElement = document.getElementById("album-img");
  albumImageElement.src = album.cover_big;
  // artist name
  let albumArtistElement = document.getElementById("album-artist");
  albumArtistElement.innerText = album.artist.name;
  artistName = album.artist.name;
  // small icon with artist image
  let artistIcon = document.getElementById("artist-small-image");
  artistIcon.src = album.artist.picture_small;
  // album year
  let albumYear = document.getElementById("album-year");
  let fullDate = album.release_date;
  let year = fullDate.substring(0, 4);
  albumYear.innerText = year;
  // number of songs
  let numberOfTracks = document.getElementById("number-of-tracks");
  numberOfTracks.innerText = `${album.nb_tracks} songs,`;
  //  total album duration
  let albumDuration = document.getElementById("album-duration");
  const totalSeconds = album.duration;
  // checking if it it a number
  console.log(typeof totalSeconds);
  let hours = Math.floor(totalSeconds / 3600);
  console.log(hours);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  console.log(minutes);
  albumDuration.innerText = " " + ` ${hours} hr ${minutes} min`;
  // finally load the tracks
  loadTracks(album.title);
};

// get all the tracks in the album

const loadTracks = (albumName) => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${albumName}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      displayTracks(response.data);
    })

    .catch((err) => {
      console.error(err);
    });
};

// then display all the tracks

const displayTracks = (tracks) => {
  console.log(tracks);
  let albumContentElement = document.getElementById("track-table-content");
  tracks.forEach((track, index) => {
    // make the time in the correct format
    const trackDuration = track.duration;

    let trackMinutes = Math.floor(trackDuration / 60);
    let remainingSeconds = trackDuration % 60;

    if (remainingSeconds < 10) {
      return String(remainingSeconds).padStart("0");
    }

    // create the new track
    let trackElement = document.createElement("div");
    trackElement.classList.add("table-row");
    trackElement.innerHTML = `
    <div class="track number">${index + 1}</div>
    <div class="track track-name">
        <div class="cursor track-title-text" onclick="changeTrack(event)">${
          track.title
        }</div>
        <div>${artistName}</div>
    </div>
    <div class="track-duration track">${trackMinutes}:${remainingSeconds}</div>
    `;
    albumContentElement.appendChild(trackElement);
  });
};

let interval;
let width = 0;

let audioElement = document.getElementById("audio");
audioElement.src = "";
let audioDurationSeconds = "";

// let previousHighlightedRow =
//   track.parentNode.parentNode.previousSibling
// previousHighlightedRow.classList.remove("current-track")

function changeTrack(event) {
  clearInterval(interval);
  width = 0;
  elem.style.width = width + "%";
  removeClasses();
  let track = event.target;

  let currentTrack = track.innerText;
  let highlightedRow = track.parentNode.parentNode;
  highlightedRow.classList.add("current-track");

  console.log(currentTrack);
  // get the lower song bar container
  let currentTrackElement = document.getElementById("current-track");
  currentTrackElement.innerHTML = currentTrack;
  // change the artist based on the event target
  let artist = track.nextElementSibling;
  console.log(artist.innerText);
  let chosenArtist = artist.innerText;
  let artistElement = currentTrackElement.nextElementSibling;
  artistElement.innerText = chosenArtist;

  // change the track duration
  let totalTrackDurationElement = document.getElementById("total-time");
  let timeText = track.parentNode.nextElementSibling.innerHTML;
  console.log(timeText);
  totalTrackDurationElement.innerText = timeText;
  // change the image and load the new track
  let img = document.getElementById("currently-playing-img");

  const getImageandTrack = () => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${chosenArtist}/${currentTrack}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data[0].album.cover_xl);
        img.src = response.data[0].album.cover;
        audioElement.src = response.data[0].preview;
        console.log(audioElement.src);
        audioDurationSeconds = response.data[0].duration;
        console.log(audioDurationSeconds);
      })

      .catch((err) => {
        console.error(err);
      });
  };

  getImageandTrack();
}

// let timeElapsedElement = document.getElementById("time-elapsed")
// let n = 0

// var let = 1
var timeElapsedElement = document.getElementById("time-elapsed");
function start() {
  setInterval(increase, 1000);
}

function increase() {
  if (i < 100) {
    i++;
    timeElapsedElement.innerText = i;
  }
}

function pause() {}

const removeClasses = () => {
  const tracksWithClass = document.querySelectorAll(".current-track");
  console.log(tracksWithClass);
  tracksWithClass.forEach((track) => {
    track.classList.remove("current-track");
  });
};

// play button toggle
const musicContainer = document.getElementById("currently-playing");
const playpause = document.querySelector(".playpause");
const progressContainer = document.getElementById("trackProgress");
const timeElapsed = document.getElementById("time-elapsed");

playpause.addEventListener("click", () => {
  playpause.classList.toggle("playing");
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

let elem = document.getElementById("trackProgressElapsed");
function playSong() {
  musicContainer.classList.add("play");
  setTimeout(start, 1000);
  function play() {
    clearInterval(interval);
    interval = setInterval(frame, audioDurationSeconds);

    function frame() {
      if (width >= 100) {
        width = 1;
        clearInterval(interval);
      } else {
        let increment = 100 / audioDurationSeconds;
        width += increment;

        elem.style.width = width + "%";
      }
    }
  }
  audio.play();
  play();
}
function pauseSong() {
  musicContainer.classList.remove("play");

  audio.pause();
  function pause() {
    clearInterval(interval);
  }
  pause();
}

// function changeA(albumId) {
//   parseInt(albumId)
// }

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let albumId = urlParams.get("albumId");
  console.log(albumId);
  loadAlbum(albumId);
  return albumId;
};

// playpause.addEventListener("click", () => {
//   playpause.classList.toggle("playing")

//   let isPlaying = playpause.classList.contains("playing")

//   if (isPlaying) {
//     pause()
//   } else {
//     play()
//   }

//   // playpause.classList.contains("playing") ? play() : pause()

//   let interval
//   let width = 1
//   function play() {
//     let elem = document.getElementById("trackProgressElapsed")

//     clearInterval(interval)
//     interval = setInterval(frame, 100)

//     function frame() {
//       if (width >= 100) {
//         width = 1
//         clearInterval(interval)
//       } else {
//         width++
//         elem.style.width = width + "%"
//       }
//     }
//   }

//   function pause() {
//     clearInterval(interval)
//   }
// })

// to get the background colour to change with each image

// const backgroundColor = () => {
//   const colorThief = new ColorThief()
//   const img = document.querySelector("#album-img")

//   // Make sure image is finished loading
//   if (img.complete) {
//     let myColor = colorThief.getColor(img)
//     console.log(myColor)
//   } else {
//     image.addEventListener("load", function () {
//       colorThief.getColor(img)
//     })
//   }
// }
