// testing the api

const testing = () => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/75621062`, {
    method: "GET"
  })
    .then((response) => response.json())
    .then((album) => {
      console.log(album)
    })
    .catch((err) => {
      console.log(err)
    })
}

testing()

// fetch the album id

const loadAlbum = (albumId) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, {
    method: "GET"
  })
    .then((response) => response.json())
    .then((album) => {
      displayAlbum(album)
      console.log(album)
    })
    .catch((err) => {
      console.log(err)
    })
}

// display the album name and image

let artistName = ""

const displayAlbum = (album) => {
  console.log(album)
  // album name
  let albumNameElement = document.getElementById("album-name")
  albumNameElement.innerText = album.title
  // album image
  let albumImageElement = document.getElementById("album-img")
  albumImageElement.src = album.cover_big
  // artist name
  let albumArtistElement = document.getElementById("album-artist")
  albumArtistElement.innerText = album.artist.name
  // small icon with artist image
  let artistIcon = document.getElementById("artist-small-image")
  artistIcon.src = album.artist.picture_small
  // album year
  let albumYear = document.getElementById("album-year")
  let fullDate = album.release_date
  let year = fullDate.substring(0, 4)
  albumYear.innerText = year
  // number of songs
  let numberOfTracks = document.getElementById("number-of-tracks")
  numberOfTracks.innerText = `${album.nb_tracks} songs,`
  //  total album duration
  let albumDuration = document.getElementById("album-duration")
  const totalSeconds = album.duration
  // checking if it it a number
  console.log(typeof totalSeconds)
  let hours = Math.floor(totalSeconds / 3600)
  console.log(hours)
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60)
  console.log(minutes)
  albumDuration.innerText = " " + ` ${hours} hr ${minutes} min`
  loadTracks(album.title)
}

// get all the tracks in the album

const loadTracks = (albumName) => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${albumName}`,
    {
      method: "GET"
    }
  )
    .then((response) => response.json())
    .then((response) => {
      displayTracks(response.data)
    })

    .catch((err) => {
      console.error(err)
    })
}

// then display all the tracks

const displayTracks = (tracks) => {
  let albumContentElement = document.getElementById("track-table-content")
  tracks.forEach((track, index) => {
    let trackElement = document.createElement("div")
    trackElement.classList.add("table-row")
    trackElement.innerHTML = `
    <div class="track number">${index + 1}</div>
    <div class="track track-name">
        <div>${track.title}</div>
        <div>${artistName}</div>
    </div>
    <div class="track duration">${track.duration}</div>
    `
    albumContentElement.appendChild(trackElement)
  })
}

window.onload = () => {
  //   testing with the bohemian rhapsody album
  const albumId = 75621062
  loadAlbum(albumId)
  // backgroundColor()

  //   const urlParams = new URLSearchParams(window.location.search)
  //   const albumId = urlParams.get("id")
  //   loadAlbum(albumId)
}

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
