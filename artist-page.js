const getArtist = async () => {
  let res = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/queen"
  );

  let artist = await res.json();
  console.log(artist);
  let photo = artist.picture_xl;
  console.log(photo);
  let name = artist.name;
  console.log(name);
  let listeners = artist.nb_fan;
  console.log(listeners);

  /* let firstSection = document.querySelector("#firstSection");
  console.log(firstSection);
  const div = document.createElement("div");
  div.classList.add("jumbotron", "padding-0", "jumbotron-fluid");
  div.innerHTML = `<div class="artistDescription container">
                      <img
                        src="https://img.icons8.com/color/480/instagram-verification-badge.png"
                        alt=""
                        style="height: 25px"
                       />
                      <span>Verified Artist</span>
                     <h1 class="display-10">${name}</h1>
                     <p class="lead">37,120,733 monthly listeners</p>
                  </div>`;
  firstSection.appendChild(div); */
  //---------------------SONGS-------------------

  /* let song = artist. */
  /* let listenersSong =  */

  //----------------------Artist Pick-----------------------
  /* et artistPick = artist.picture_medium;
  console.log(artistPick); */
};

window.onload = async () => {
  getArtist();

  /* const { name, album } = arttist; */
  console.log(name);
};
