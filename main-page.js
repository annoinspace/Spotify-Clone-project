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

const fillPageAlbums = function (listOfSearch) {
  topsidecards.innerHTML = "";
  for (i = 0; i < 10; i++) {
    topsidecards.innerHTML += `<a href="albums.html?q=${listOfSearch.data[i].album.id}><div class="col">
    <div class="background-card mb-3" style="max-width: 540px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="${listOfSearch.data[i].album.cover_medium}"
            class="img-fluid rounded-start"
            style="height: 100%; min-width: 100%"
            alt="..."
          />
        </div>
        <div class="col-md-8 d-flex align-items-center">
          <div class="card-body">
            <h5 class="card-title">${listOfSearch.data[i].album.title}</h5>
          </div>
        </div>
      </div>
    </div>
  </div></a>`;
  }
};

const fillPageSongs = function (listOfSongs) {
  firstRow.innerHTML = "";
  for (i = 0; i < 8; i++) {
    firstRow.innerHTML += `<a href="artists.html?q=${listOfSongs.data[i].artist.id}>"<div class="col">
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
  </div></a>`;
  }
};

/*const fillPageArtists = function (listOfArtists) {
  secondRow.innerHTML = "";
  for (i = 0; i < 8; i++) {
    secondRow.innerHTML += `<a href="albums.html=q?${listOfArtists.data[i].album.id}>"<div class="albumCard">
            <img
              class="col-11"
              src="${listOfArtists.data[i].artist.picture}"
              alt=""
            />
            <div class="albumText">
              <p>${listOfArtists.data[i].artist.name}</p>
              </div>
          </div></a>`;
  }
};*/

const fillPageArtists = function (listOfArtists) {
  secondRow.innerHTML = "";
  for (i = 0; i < 8; i++) {
    secondRow.innerHTML += `<a href="albums.html=q?${listOfArtists.data[i].album.id}>"
    <div class="col-xl-2">
      <div class="card" id="darker">
        <img
          src="${listOfArtists.data[i].artist.picture}"
          class="card-img-top p-2"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${listOfArtists.data[i].artist.name}</h5>
        </div>
      </div>
    </div>
    </a>`;
  }
};
