let artistSelected = "disturbed";

const getArtist = async () => {
  let res = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistSelected}`
  );

  let artist = await res.json();
  console.log(artist);
  let photo = artist.picture_xl;
  console.log(photo);
  let name = artist.name;
  console.log(name);
  let listeners = artist.nb_fan;
  console.log(listeners);

  let h1 = document.querySelector("h1");
  h1.innerText = name;

  document.querySelector(
    ".name"
  ).innerHTML = `<strong> ${name} best of </strong>`;

  document.querySelector(".name2").innerHTML = `Posted by ${name}`;

  document.querySelector(".rest img").src = photo;

  let views = document.querySelector(".lead");
  views.innerText = `${listeners} monthly listeners`;

  let jumbophoto = document.querySelector(".jumbotron-fluid");
  jumbophoto.style.backgroundImage = `url(${photo})`;

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
};
//---------------------SONGS-------------------
const getPopular = async () => {
  let res = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistSelected}`
  );

  let popular = await res.json();
  return popular;

  /*   let data = popular.data[0];
  console.log(data);

  let td = (document.querySelector(".td1").innerText = data.title);
  let img = document.querySelector(".img1 img");
  console.log(img); */
};

//----------------------Artist Pick-----------------------

const getPick = async () => {
  let res = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistSelected}`
  );

  let pick = await res.json();
  console.log(pick);
  let pick1 = pick.data[5].album;
  console.log(pick1);
  let pick2 = pick1.cover_medium;
  console.log(pick2);
  document.querySelector(".imagen img").src = pick2;
};

/* //--------------------
const listOfPopular = await getPopular(){
  console.log(listOfPopular);

  fillList(listOfPopular);
};

let popularBody = document.querySelector("#popularBody");
console.log(popularBody);

const fillList = function (listOfPopular) {
  popularBody.innerHTML = "";
  console.log(popularBody);
  for (i < 0; 1 < 5; i++) {
    popularBody.innerHTML += `<th class="text-center greyColor" scope="row">1</th>
                      <td>
                        <img
                          src="https://cdns-images.dzcdn.net/images/cover/9a20f8b2547cbb74635539c219de3a84/350x350.jpg"
                          alt="queens"
                          height="35vh"
                        />
                        ${listOfPopular.data[i].title}
                      </td>

                      <td class="greyColor">1,013,238,772</td>
                      <td><i class="bi bi-suit-heart heart"></i></td>

                      <td class="greyColor">3:34</td>
                      <td><i class="bi bi-three-dots dot"></i></td>
                    </tr>`;
  }
};
///------------- */

window.onload = async () => {
  await getArtist();
  const listPopular = await getPopular();

  console.log(listPopular);
  fillPopular(listPopular);
  console.log(fillPopular);
  await getPick();
};

const popularBody = document.querySelector(".popularBody");
console.log(popularBody);

let fillPopular = function ({ data }) {
  console.log(data);
  popularBody.innerHTML = "";
  for (i = 0; i < 5; i++) {
    popularBody.innerHTML += `<tr class="hovering">
                      <th class="text-center greyColor" scope="row">${
                        i + 1
                      }</th>
                      <td class="img1">
                        <img
                          src="${data[i].album.cover_medium}"
                          alt="queens"
                          height="35vh"
                          class="img1"
                        />
                      </td>
                      <td class="td1">${data[i].title}</td>

                      <td class="greyColor">${data[i].rank}</td>
                      <td><i class="bi bi-suit-heart heart"></i></td>

                      <td class="greyColor">${data[i].duration}</td>
                      <td><i class="bi bi-three-dots dot"></i></td>
                    </tr>`;
  }
};
