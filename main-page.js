document.getElementById("greeting").innerHTML =
  new Date().getHours() >= 12 ? "Good Afternoon" : "Good Morning";

async function getAlbums() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzczYTZmMTNhN2ZjNDAwMTU5N2VjMzQiLCJpYXQiOjE2Njg1MjM3NjIsImV4cCI6MTY2OTczMzM2Mn0.hKzzFuHNrYleYqYAzaHfYBmGfdU02Ymm8H5qzgZKO88",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=nirvana`,
    options
  );

  const listOfSearch = await response.json();
  return listOfSearch;
}

async function getSongs() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzczYTZmMTNhN2ZjNDAwMTU5N2VjMzQiLCJpYXQiOjE2Njg1MjM3NjIsImV4cCI6MTY2OTczMzM2Mn0.hKzzFuHNrYleYqYAzaHfYBmGfdU02Ymm8H5qzgZKO88",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica`,
    options
  );

  const listOfSongs = await response.json();
  return listOfSongs;
}

async function getArtist() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzczYTZmMTNhN2ZjNDAwMTU5N2VjMzQiLCJpYXQiOjE2Njg1MjM3NjIsImV4cCI6MTY2OTczMzM2Mn0.hKzzFuHNrYleYqYAzaHfYBmGfdU02Ymm8H5qzgZKO88",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=black_sabbath`,
    options
  );

  const listOfArtists = await response.json();
  return listOfArtists;
}

window.onload = async () => {
  const listOfSearch = await getAlbums();
  const listOfSongs = await getSongs();
  const listOfArtists = await getArtist();
  console.log(listOfArtists);
  console.log(listOfSearch);
  console.log(listOfSongs);
  fillPageAlbums(listOfSearch);
  fillPageSongs(listOfSongs);
  fillPageArtists(listOfArtists);
};
let topsidecards = document.querySelector("#topsidecards");
let firstRow = document.querySelector("#recentlyPlayed");
let secondRow = document.querySelector("#showsToTry");

/*const fillPageAlbums = function (listOfSearchAlbums) {
  topsidecards.innerHTML = "";
  for (i = 0; i < 10; i++) {
    topsidecards.innerHTML += `<div class="col" id="top-buttons">
    <div class="background-card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-md-4">
            <img
                src="${listOfSearchAlbums.data[i].album.cover_medium}"
                class="img-fluid rounded-start aspect-ratio-one-to-one" style="width: 100%"
                alt="..."
              />
          </div>
          <div class="col-md-8 d-flex align-items-center">
          <div class="card-body d-flex align-items-center justify-content-between">
              <p class="card-title text-truncate">${listOfSearchAlbums.data[i].album.title}</p>
              <a href="album-page.html?songId=${listOfSearchAlbums.data[i].album.id}"><i class="fa-solid fa-circle-play fa-2xl"></i></a>
          </div>
        </div>
    </div>
  </div>
</div>`;
  }
};*/
const fillPageAlbums = function (listOfSearchAlbums) {
  topsidecards.innerHTML = "";
  for (i = 0; i < 10; i++) {
    topsidecards.innerHTML += `<a class=" background-card mb-3 " style="max-width: 540px" href="album-page.html?albumId=${listOfSearchAlbums.data[i].album.id}"<div class="sidecards col-2 row g-0">
<img
  class="col-4"
  src="${listOfSearchAlbums.data[i].album.cover_medium}" class="img-fluid rounded-start aspect-ratio-one-to-one" style="width: 100%"
  alt=""
/>
<p class="col-8 sidetext">${listOfSearchAlbums.data[i].album.title}</p>
</div></a>`;
  }
};
const fillPageSongs = function (listOfSongs) {
  firstRow.innerHTML = "";
  for (i = 0; i < 8; i++) {
    firstRow.innerHTML += `<a href="album-page.html?albumId=${listOfSongs.data[i].album.id}"<div class="col">
    <div class="card" id="darker">
      <img
        src="${listOfSongs.data[i].album.cover_medium}"
        class="img-fluid rounded-start p-2"
        style="height: 100%; min-width: 100%"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${listOfSongs.data[i].artist.name}</h5>
        <p class="card-text">${listOfSongs.data[i].title}</p>
      </div>
    </div>
  </div>`;
  }
};

const fillPageArtists = function (listOfArtists) {
  secondRow.innerHTML = "";
  for (i = 0; i < 8; i++) {
    secondRow.innerHTML += `<a href="artist-page.html?artistId=${listOfArtists.data[i].artist.id}"
    <div class="col-xl-2">
      <div class="card" id="darker">
        <img
          src="${listOfArtists.data[i].artist.picture}"
          class="img-fluid card-img-top p-2"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${listOfArtists.data[i].artist.name}</h5>
        </div>
      </div>
    </div>
    `;
  }
};

