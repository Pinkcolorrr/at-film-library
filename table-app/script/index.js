// === Vars ===
const table = document.getElementById('film_table');
const paginationList = document.getElementById('pagination_list');
const btnTitleSort = document.getElementById('btn-title_sort');
const btnDateSort = document.getElementById('btn-date_sort');
let currentFilms = [];
let typeOfSort = 'title';
let activePage = 1;
// === / Vars ===

/**
 Entry point in the app   
 */
function INIT() {
  const notesOnPage = 3;

  let start = (activePage - 1) * notesOnPage;
  let end = notesOnPage + start;

  getFilmData(start, end).then(() => {
    setPagination(notesOnPage);
  });
}

// === Film loading ===

/**
 Getting data from database by keys.   
 @param start start key of object to read data from database
 @param end end key of object to read data from database
 */
async function getFilmData(start, end) {
  const response = await fetch(`https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films.json?orderBy="$key"&startAt="${start}"&endAt="${end - 1}"&print=pretty`);
  const filmData = await response.json();

  currentFilms = [];
  for (let key in filmData) {
    currentFilms.push(filmData[key]);
  }

  loadFilmList(currentFilms);
}

/**
Load film list in the table
 @param films film array from database
 */
function loadFilmList(films) {
  clearTable();

  if (typeOfSort.indexOf('reverse') != -1) {
    films.sort((a, b) => (a.fields[typeOfSort.substr(0, typeOfSort.indexOf(' '))] < b.fields[typeOfSort.substr(0, typeOfSort.indexOf(' '))] ? 1 : -1));
  } else {
    films.sort((a, b) => (a.fields[typeOfSort] > b.fields[typeOfSort] ? 1 : -1));
  }

  films.forEach(item => {
    table.appendChild(createHTML(item.fields));
  });
}

/**
  Remove old notes from table
 */
function clearTable() {
  let length = table.getElementsByClassName('table_child').length;
  for (let i = 0; i < length; i++) {
    table.removeChild(table.lastChild);
  }
}

/**
 Create DOM elements for new table items
 @param obj accept obj item and getting some properties from it
 */
function createHTML(obj) {
  let HTML = `
    <td>${obj.title}</td>
    <td>${obj.release_date}</td>
    <td>${obj.director}</td>
  `;

  let row = document.createElement('tr');
  row.classList.add('table_child');
  row.innerHTML = HTML;
  return row;
}
// === / Film loading ===

// === Pagination ===
/**
  Create buttons for pagination film list and add listeners on them 
  @param notesOnPage number of film in the table
 */
async function setPagination(notesOnPage) {
  const response = await fetch('https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films.json?shallow=true');

  const numOfBtns = Math.ceil(Object.keys(await response.json()).length / notesOnPage);

  for (let i = 1; i <= numOfBtns; i++) {
    let li = document.createElement('li');
    li.innerHTML = `<button type="button" class="pagination_btn">${i}</button>`;
    li.firstChild.addEventListener('click', function () {
      makeBtnActive(this);

      let start = (activePage - 1) * notesOnPage;
      let end = notesOnPage + start;

      getFilmData(start, end);
    });

    if (+li.firstChild.innerHTML === activePage) {
      makeBtnActive(li.firstChild);
    }

    paginationList.appendChild(li);
  }
}

/**
  Make button, that was click active and other passive
  @param elem DOM element, that was click
 */
function makeBtnActive(elem) {
  activePage = elem.innerHTML;

  let activeBtn = paginationList.querySelector('.active');
  if (activeBtn) {
    activeBtn.classList.remove('active');
  }

  elem.classList.add('active');
}
// === / Pagination ===

// === Sort ===

btnTitleSort.addEventListener('click', () => {
  typeOfSort = typeOfSort === 'title' ? 'title reverse' : 'title';

  loadFilmList(currentFilms);
});
btnDateSort.addEventListener('click', () => {
  typeOfSort = typeOfSort === 'release_date' ? 'release_date reverse' : 'release_date';

  loadFilmList(currentFilms);
});

// === / Sort ===

INIT();
