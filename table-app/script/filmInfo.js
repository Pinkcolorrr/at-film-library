const table = document.getElementById('filmTable');
const tbody = table.querySelector('#tableBody');
const filmId = getFilmId();

let filmDataList = {};

/**
 Get data from database by film id.
 @param {string} id desired movie id
 */
async function getFilmData(id) {
  const response = await fetch(`https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films/${id}.json`);
  const filmData = await response.json();

  document.getElementById('btnEdit').href = `../html/filmForm.html?type=edit&id=${filmId}`;
  filmDataList = filmData.fields;
  fillFilmDataTable(filmDataList);
}

/**
 * Fill film list on the page
 @param {Array} filmFields start key of object to read data from database
 */
function fillFilmDataTable(filmFields) {
  clearTable();

  document.getElementById('filmTableCaption').innerHTML = filmFields.title;
  document.title = filmFields.title;

  tbody.appendChild(getHTMLStringChild('Title', filmFields.title));
  tbody.appendChild(getHTMLStringChild('Release date', filmFields.release_date));
  tbody.appendChild(getHTMLStringChild('Director', filmFields.director));
  tbody.appendChild(getHTMLStringChild('Producer', filmFields.producer));
  tbody.appendChild(getHTMLStringChild('Episode id', filmFields.episode_id));
  if (filmFields.characters) {
    tbody.appendChild(getHTMLObjChild('People', filmFields.characters, 'name'));
  }
  if (filmFields.characters) {
    tbody.appendChild(getHTMLObjChild('Planets', filmFields.planets, 'name'));
  }
  tbody.appendChild(getHTMLStringChild('Opening crawl', filmFields.opening_crawl));
}

/**
 * Add button for load realted data 
 @param {string} title title for button
 @param {object} dataArr arr with id of related data
 @param {string} outputField field, that will be load in the table
 */
function fillRelatedDataTable(title, dataArr, outputField) {
  clearTable();
  document.getElementById('filmTableCaption').innerHTML += ' / ' + title;
  dataArr.forEach((item, index) => {
    tbody.appendChild(getHTMLStringChild(index, item[outputField]));
  });
  let backBtn = document.createElement('button');
  backBtn.classList.add('btnBack', 'button');
  backBtn.innerHTML = `Back to "${filmDataList.title}"`;
  backBtn.addEventListener('click', () => {
    fillFilmDataTable(filmDataList);
    backBtn.remove();
  });
  document.getElementById('listBack').appendChild(backBtn);
}

/**
 *  Create HTML layout for table rows and table item.
 @param {string} key ket for film field
 @param {string} value value of film field
 @returns {HTMLElement} return row of the table
 */
function getHTMLStringChild(key, value) {
  const row = document.createElement('tr');
  row.classList.add('tableRow');
  row.innerHTML = `
    <td><div class="tableItem">${key}</div></td>
    <td><div class="tableItem">${value}</div></td>
  `;

  return row;
}

/**
 * Return DOM elem of object
 @param {string} title name for finding desired field in database
 @param {Array} inDataArr arr with id of related data
 @param {string} outputField field, that will be load in the table
 @returns {HTMLElement} return row of the table
 */
function getHTMLObjChild(title, inDataArr, outputField) {
  const row = document.createElement('tr');

  const td = document.createElement('td');
  const btn = document.createElement('button');
  btn.classList.add('tableItem', 'relatedDataButton');
  btn.innerHTML = `${title} list`;
  td.appendChild(btn);

  row.classList.add('tableRow');
  row.innerHTML = `
  <td><div class="tableItem">${title}</div></td>
  `;

  btn.addEventListener('click', () => {
    getRelatedData(title, inDataArr).then(response => {
      fillRelatedDataTable(title, response, outputField);
    });
  });

  row.appendChild(td);
  return row;
}

/**
  Remove old notes from table
 */
function clearTable() {
  while (tbody.lastChild) {
    tbody.removeChild(tbody.lastChild);
  }
}

/**
 * Find and load related data in database
 @param {string} title name for finding desired field in database
 @param {Array} inDataArr arr with id of related data
 @returns {Array} return array of object related data
 */
async function getRelatedData(title, inDataArr) {
  const outDataArr = [];
  const response = await fetch(`https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/${title.toLowerCase()}.json`);
  const data = await response.json();

  for (let i = 0; i < inDataArr.length; i++) {
    for (let j = i; j < data.length; j++) {
      if (inDataArr[i] === data[j].pk) {
        outDataArr.push(data[j].fields);
        break;
      }
    }
  }

  return outDataArr;
}

document.getElementById('btnRemove').addEventListener('click', () => {
  removeFilm();
});

/** 
  Remove film from database
 */
async function removeFilm() {
  try {
    await fetch(`https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films/${filmId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    window.location.replace('../');
  } catch (err) {
    console.log(err);
  }
}

/** 
  Get film id from URL
 */
function getFilmId() {
  return new URL(window.location.href).searchParams.get('id');
}

getFilmData(filmId);
