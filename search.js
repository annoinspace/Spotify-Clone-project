const params = new URLSearchParams(window.location.search)
const albumId = params.get("albumId")

let searchInput = document.querySelector("#searchInput")
async function getSongs() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b99cd1c975msh817b5853429cec5p1cde2fjsn123767233f56",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
    }
  }
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchInput.value}`,
    options
  )

  const listOfSearch = await response.json()
  return listOfSearch
}

window.onload = async () => {
  searchInput.value = "la vida"
  const listOfSearch = await getSongs()
  console.log(listOfSearch)
  loadPage(listOfSearch)
  document
    .querySelector("#searchInput")
    .addEventListener("keyup", getSongsAgain)
  document
    .querySelector("#searchInput")
    .addEventListener("click", function (event) {
      event.target.value = ""
    })
}

let searchLeft = document.querySelector("#leftSearch")
let searchRight = document.querySelector("#rightSearch")
let albumSearch = document.querySelector("#searchAlbums")
let artistSearch = document.querySelector("#searchArtists")

let deleteAll = function () {
  searchLeft.innerHTML = ""
  searchRight.innerHTML = ""
  albumSearch.innerHTML = ""
  artistSearch.innerHTML = ""
}

let loadPage = function (listOfSearch) {
  deleteAll()

  searchLeft.innerHTML = `<a href="album-page.html?albumId=${listOfSearch.data[0].album.id}" class="left"><div class=leftPart><img src=${listOfSearch.data[0].album.cover_medium} class="sideImg" alt="">
    <h5>${listOfSearch.data[0].album.title}</h5>
    <p>${listOfSearch.data[0].artist.name}</p></div></a>`
  searchRight.innerHTML = ""
  for (i = 0; i < 6; i++) {
    searchRight.innerHTML += `<li><a href="#" class="row col-12 songslist"><img src=${
      listOfSearch.data[i].album.cover_small
    } alt=""> 
    <div class="spanText col-10"><span>${
      listOfSearch.data[i].artist.name
    }</span>
    <span>${listOfSearch.data[i].title}</span></div>
    <span class="patient">${
      (listOfSearch.data[i].duration - (listOfSearch.data[i].duration %= 60)) /
        60 +
      (9 < listOfSearch.data[i].duration ? ":" : ":0") +
      listOfSearch.data[i].duration
    }</span></a></li>`
  }
  for (i = 0; i < 6; i++) {
    albumSearch.innerHTML += `
    <a class="col-2" href="album-page.html?albumId=${listOfSearch.data[i].album.id}"><div class="col-12"> <div class="searchCard"><img class="cardImage" src=${listOfSearch.data[i].album.cover_medium}>
<h5>${listOfSearch.data[i].album.title}</h5>
<p>${listOfSearch.data[i].artist.name}</p>
</div></div></a> `
  }

  //   for (i = 0; i < 6; i++) {
  //     albumSearch.innerHTML += `
  //     <a class="col-2"  onclick="redirectToAlbumPage()"><div class="col-12"> <div class="searchCard"><img class="cardImage" src=${listOfSearch.data[i].album.cover_medium}>
  // <h5>${listOfSearch.data[i].album.title}</h5>
  // <p>${listOfSearch.data[i].artist.name}</p>
  // </div></div></a> `

  for (i = 0; i < 6; i++) {
    artistSearch.innerHTML += `
    <a class="col-2" href="artist-page.html?artistId=${listOfSearch.data[i].artist.id}"><div class="col-12"> <div class="searchCard" id="findArtist"><img class="cardImage" src=${listOfSearch.data[i].artist.picture_medium}>
<h5>${listOfSearch.data[i].artist.name}</h5>
<p>Artist</p>
</div></div> </a>`
  }
}

const getSongsAgain = async (event) => {
  if (event.keyCode === 13) {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "b99cd1c975msh817b5853429cec5p1cde2fjsn123767233f56",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
        }
      }
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${event.target.value}`,
        options
      )
      if (response.ok) {
        const listOfSearch = await response.json()
        loadPage(listOfSearch)
      } else {
        console.log("Error while fetching")
      }
    } catch (error) {
      console.error(error)
    }
  }
}

let main = document.querySelector("#main")

const loadSearchSongs = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b99cd1c975msh817b5853429cec5p1cde2fjsn123767233f56",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
      }
    }
    const response = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchInput.value}`,
      options
    )
    if (response.ok) {
      const listOfSearch = await response.json()
      deleteAll()
      main.innerHTML = ""
      main.innerHTML = `
<div class="col-12"> 
<ul class="songlist" id="songlist">
<li>
</ul>
</div>
`
    } else {
      console.log("Error while fetching")
    }
  } catch (error) {
    console.error(error)
  }
}

function filterFunction() {
  let input, filter, ul, li, a, i
  input = document.getElementById("searchInput")
  filter = input.value.toUpperCase()
  div = document.getElementById("main")
  a = div.getElementsByTagName("li")
  b = document.querySelectorAll(".searchCard")
  c = document.querySelectorAll("#findArtist")
  for (i = 0; i < a, b, c.length; i++) {
    txtValue = a[i].textContent || a[i].innerText
    if (txtValue.toUpperCase().startsWith(filter)) {
      a[i].style.display = ""
      b[i].style.display = ""
      c[i].style.display = ""
    } else {
      a[i].style.display = "none"
      b[i].style.display = "none"
      c[i].style.display = "none"
    }
  }
}

function redirectToAlbumPage() {
  window.location.assign(`album-page.html?/album/${albumId}`)
}
