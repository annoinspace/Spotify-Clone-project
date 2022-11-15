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

const displayAlbum = (album) => {
  console.log(album)
  let albumNameElement = document.getElementById("album-name")
  albumNameElement.innerText = ""
  albumNameElement.innerText = album.title
  let albumImageElement = document.getElementById("album-img")
  albumImageElement.src = album.cover_big
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
  let albumContentElement = document.getElementById("table-title")
  tracks.forEach((track, index) => {
    let trackElement = document.createElement("div")
    trackElement.classList.add("table-row")
    trackElement.innerHTML = `
    <div class="track number">${index + 1}</div>
    <div class="track track-name">
        <div>${track.title}</div>
        <div>Queen</div>
    </div>
    <div class="${track.duration}">2:59</div>
    `
    albumContentElement.appendChild(trackElement)
  })
}

window.onload = () => {
  //   const urlParams = new URLSearchParams(window.location.search)
  const albumId = 75621062
  loadAlbum(albumId)

  //   const urlParams = new URLSearchParams(window.location.search)
  //   const albumId = urlParams.get("id")
  //   loadAlbum(albumId)
}
