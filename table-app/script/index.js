const table = document.getElementById("film_table");

function getFilmObj() {
  fetch(
    "https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films.json"
  ).then((response) => {
    response.json().then((promiseResponse) => {
      fillTable(promiseResponse);
    });
  });
}

function fillTable(films) {
  for (key in films) {
    table.appendChild(createHTML(films[key].fields));
  }
}

function createHTML(obj) {
  let HTML = `
    <td>${obj.title}</td>
    <td>${obj.created}</td>
    <td>${obj.director}</td>
    <td>${obj.producer}</td>
  `;

  let row = document.createElement("tr");
  row.innerHTML = HTML;
  return row;
}

getFilmObj();
