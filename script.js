window.addEventListener("load", init);

function init() {
  get();
  prepareTickmarks();

  document.querySelector("#metascore").addEventListener("input", displayPercentage);

  document.querySelector("#submit").addEventListener("click", post);
}

function prepareTickmarks() {
  let i;
  for (i = 1; i <= 100; i++) {
    let element = document.createElement("option");
    element.setAttribute("value", i);
    document.querySelector("#tickmarks").appendChild(element);
  }
}

function displayPercentage() {
  let percentage = document.querySelector("#metascore").value;
  console.log("displayPercentage " + percentage);
  document.querySelector("#percentage").innerHTML = "<h2>" + percentage + "</h2>";
}

function get() {
  document.querySelector(".appendhere").innerHTML = "";

  fetch("https://videogames-3a39.restdb.io/rest/videogames", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "607408f2f592f7113340efca",
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then((data) => data.forEach(showGame));
}

function showGame(game) {
  console.log(game);
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);

  var platforms = game.platforms;
  platforms = platforms.join(`, `);

  var genre = game.genre;
  genre = genre.join(`, `);

  copy.querySelector("h2").textContent = game.title;
  copy.querySelector(".age_limit").textContent = game.age_limit;
  copy.querySelector(".release_date").textContent = game.release_date;
  copy.querySelector(".price").textContent = game.price + " EUR";
  copy.querySelector(".genre").textContent = game.genre;
  copy.querySelector(".developer").textContent = game.developer;
  copy.querySelector(".desc").textContent = game.desc;
  copy.querySelector(".platforms").textContent = platforms;
  copy.querySelector(".metascore").textContent = game.metascore;

  if (game.multiplayer) {
    copy.querySelector(".multiplayer").textContent = "Multiplayer";
  } else {
    copy.querySelector(".multiplayer").textContent = "Singleplayer";
  }

  document.querySelector(".appendhere").appendChild(copy);
}

function post() {
  console.log("post");

  let title = document.querySelector("#title").value;
  let age_limit = document.querySelector("#age_limit").value;
  let release_date = document.querySelector("#release_date").value;
  let price = document.querySelector("#price").value;

  let genre_array = [];
  let genre = document.querySelectorAll(`input[name="genre"]:checked`);

  for (var x = 0; x < genre.length; x++) {
    genre_array.push(genre[x].value);
  }

  let developer = document.querySelector("#developer").value;
  let desc = document.querySelector("#desc").value;
  let multiplayer;

  if (document.querySelector("#single").value) {
    multiplayer = false;
  } else {
    multiplayer = true;
  }

  let metascore = document.querySelector("#metascore").value;

  let platforms_array = [];
  let platforms = document.querySelectorAll(`input[name="platforms"]:checked`);

  for (var x = 0; x < platforms.length; x++) {
    platforms_array.push(platforms[x].value);
  }

  const data = {
    title: title,
    age_limit: age_limit,
    release_date: release_date,
    price: price,
    genre: genre_array,
    developer: developer,
    desc: desc,
    multiplayer: multiplayer,
    metascore: metascore,
    platforms: platforms_array,
  };

  const postData = JSON.stringify(data);

  fetch("https://videogames-3a39.restdb.io/rest/videogames", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "607408f2f592f7113340efca",
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function deleteItem(id) {
  fetch("https://videogames-3a39.restdb.io/rest/videogames" + "/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "607408f2f592f7113340efca",
      "cache-control": "no-cache",
    },
  })
    .then(() => {
      console.log("removed");
    })
    .catch((err) => {
      console.error(err);
    });
}
