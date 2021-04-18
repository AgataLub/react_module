window.addEventListener("load", init);

function init() {
  get();
  prepareTickmarks();
}

function prepareTickmarks() {
  let i;
  for (i = 1; i <= 100; i++) {
    let element = document.createElement("option");
    element.setAttribute("value", i);
    document.querySelector("#tickmarks").appendChild(element);
  }
}

function get() {
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

  copy.querySelector("h2").textContent = game.title;
  copy.querySelector(".metascore").textContent = game.metascore;
  copy.querySelector(".age_limit").textContent = game.age_limit;

  document.querySelector(".appendhere").appendChild(copy);
}

function post() {
  console.log("post");

  const data = {
    title: "Fortnite1",
    age_limit: 12,
    release_date: "2000-01-01T00:00:00.000Z",
    price: 100,
    genre: "FPS",
    developer: "Llamas",
    desc: "Shooter",
    multiplayer: true,
    metascore: 90,
    platforms: ["Nintendo Switch", "MacOS", "Windows"],
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
