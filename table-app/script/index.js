// === Vars ===
const table = document.getElementById('filmTable');
const paginationList = document.getElementById('paginationList');
const btnTitleSort = document.getElementById('btnSortTitle');
const btnDateSort = document.getElementById('btnSortDate');
const searchInput = document.getElementById('searchInput');
const notesOnPage = 4;
let currentFilms = [];
let typeOfSort = 'title';
let activePage = 1;
// === / Vars ===

/**
 Entry point in the app   
 */
function init() {
  btnTitleSort.firstChild.classList.add('btnSortArrow-active');

  getFilmData().then(() => {
    setPagination(notesOnPage);
  });
}

// === Film loading ===

/**
 Gett data from database by keys.   
 @param start start key of object to read data from database
 @param end end key of object to read data from database
 */
async function getFilmData(start, end) {
  const response = await fetch('https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films.json');
  const filmData = await response.json();

  currentFilms = [];
  for (let key in filmData) {
    currentFilms.push(filmData[key]);
    filmData[key].id = key;
  }

  loadFilmList(start, end);
}

/**
Load film list in the table
 */
function loadFilmList() {
  clearTable();

  let start = (activePage - 1) * notesOnPage;
  let end = notesOnPage + start;

  let filteredFilms = filterFilms();
  sortFilms(filteredFilms);

  for (let i = start; i < end; i++) {
    if (!filteredFilms[i]) break;
    table.appendChild(createHtmlFilmList(filteredFilms[i]));
  }
}

/**
  Remove old notes from table
 */
function clearTable() {
  let length = table.getElementsByClassName('tableChild').length;
  for (let i = 0; i < length; i++) {
    table.removeChild(table.lastChild);
  }
}

/**
 Create DOM elements for new table items
 @param item accept obj item and getting some properties from it
 */
function createHtmlFilmList(item) {
  const { fields } = item;

  const myURL = new URL(`./html/filmInfo.html?id=${item.id}`, `${window.location.href}`);
  const HTML = `
    <td><a href="${myURL}" class="tableItem tableLink">${fields.title}</a></td>
    <td><div class="tableItem">${fields.release_date}</div></td> 
    <td><div class="tableItem">${fields.director}</div></td>
  `;

  const row = document.createElement('tr');
  row.classList.add('tableChild');
  row.classList.add('tableRow');
  row.innerHTML = HTML;
  return row;
}
// === / Film loading ===

// === Pagination ===
/**
  Create buttons for pagination film list and add listeners on them 
  @param notesOnPage number of film in the table
 */
function setPagination() {
  const numOfBtns = Math.ceil(currentFilms.length / notesOnPage);

  for (let i = 1; i <= numOfBtns; i++) {
    let li = document.createElement('li');
    li.innerHTML = `<button type="button" class="paginationBtn">${i}</button>`;
    li.firstChild.addEventListener('click', function () {
      makePageBtnActive(this);

      let start = (activePage - 1) * notesOnPage;
      let end = notesOnPage + start;

      loadFilmList(start, end);
    });

    if (+li.firstChild.innerHTML === activePage) {
      makePageBtnActive(li.firstChild);
    }

    paginationList.appendChild(li);
  }
}

/**
  Make button, that was click active and other passive
  @param elem DOM element, that was click
 */
function makePageBtnActive(elem) {
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

  toggleSortBtns(btnTitleSort, btnDateSort, 'title reverse');

  loadFilmList(currentFilms);
});
btnDateSort.addEventListener('click', () => {
  typeOfSort = typeOfSort === 'release_date' ? 'release_date reverse' : 'release_date';

  toggleSortBtns(btnDateSort, btnTitleSort, 'release_date reverse');

  loadFilmList(currentFilms);
});

/**
  Toggle state of sort buttons.
  @param activeBtn button, that was click. Toggle state on active
  @param passiveBtn another button. Toggle state on passive
  @param checkTypeSortStr string for chcking state of reverse sort.
 */
function toggleSortBtns(activeBtn, passiveBtn, checkTypeSortStr) {
  if (typeOfSort === checkTypeSortStr) {
    activeBtn.firstChild.classList.add('btnSortArrow-reverse');
  } else {
    activeBtn.firstChild.classList.remove('btnSortArrow-reverse');
  }

  activeBtn.firstChild.classList.add('btnSortArrow-active');

  passiveBtn.firstChild.classList.remove('btnSortArrow-reverse');
  passiveBtn.firstChild.classList.remove('btnSortArrow-active');
}

/**
  Sort films array by title or date
  @param filteredFilms films array after filtration in loadFilmList() func
 */
function sortFilms(filteredFilms) {
  if (typeOfSort.indexOf('reverse') != -1) {
    filteredFilms.sort((a, b) => (a.fields[typeOfSort.substr(0, typeOfSort.indexOf(' '))] < b.fields[typeOfSort.substr(0, typeOfSort.indexOf(' '))] ? 1 : -1));
  } else {
    filteredFilms.sort((a, b) => (a.fields[typeOfSort] > b.fields[typeOfSort] ? 1 : -1));
  }
}

// === / Sort ===

// === Search ===

searchInput.addEventListener('input', () => {
  loadFilmList();
});

/**
  Find input value substring in films titles and filtering array
 */
function filterFilms() {
  return currentFilms.filter(item => {
    if (item.fields.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1) return true;
  });
}
// === / Search ===

init();
