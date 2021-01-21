// === Vars ===
const table = document.getElementById('film_table');
const paginationList = document.getElementById('pagination_list');
const btnTitleSort = document.getElementById('btn-title_sort');
const btnDateSort = document.getElementById('btn-date_sort');
const searchInput = document.getElementById('search_input');
let currentFilms = [];
let typeOfSort = 'title';
let activePage = 1;
// === / Vars ===

/**
 Entry point in the app   
 */
function INIT() {
  const notesOnPage = 3;

  btnTitleSort.firstChild.classList.add('btn-sort_arrow-active');
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

  loadFilmList();
}

/**
Load film list in the table
 */
function loadFilmList() {
  clearTable();

  let filteredFilms = filterFilms();
  sortFilms(filteredFilms);

  filteredFilms.forEach(item => {
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
      makePageBtnActive(this);

      let start = (activePage - 1) * notesOnPage;
      let end = notesOnPage + start;

      getFilmData(start, end);
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
    activeBtn.firstChild.classList.add('btn-sort_arrow-reverse');
  } else {
    activeBtn.firstChild.classList.remove('btn-sort_arrow-reverse');
  }

  activeBtn.firstChild.classList.add('btn-sort_arrow-active');

  passiveBtn.firstChild.classList.remove('btn-sort_arrow-reverse');
  passiveBtn.firstChild.classList.remove('btn-sort_arrow-active');
}

/**
  Sorting films array by title or date
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
  loadFilmList(currentFilms);
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

INIT();
