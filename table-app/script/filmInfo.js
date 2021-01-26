const table = document.getElementById('filmTable');
const filmId = getFilmId();
let filmDataList = {};

/**
 Get data from database by film id.
 @param id desired movie id
 */
async function getFilmData(id) {
  const response = await fetch(`https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films/${id}.json`);
  const filmData = await response.json();

  filmDataList = filmData.fields;

  loadFilmDataList(filmDataList);
}

/**
 * Load film list on the page
 @param filmFields start key of object to read data from database
 */
function loadFilmDataList(filmFields) {
  clearTable();

  document.getElementById('filmTableCaption').innerHTML = filmFields.title;
  document.title = filmFields.title;

  table.appendChild(getHTMLStringChild('title', filmFields.title));
  table.appendChild(getHTMLStringChild('release date', filmFields.release_date));
  table.appendChild(getHTMLStringChild('director', filmFields.director));
  table.appendChild(getHTMLStringChild('producer', filmFields.producer));
  table.appendChild(getHTMLStringChild('episode id', filmFields.episode_id));
  if (filmFields.characters) {
    table.appendChild(getHTMLObjChild('people', filmFields.characters, 'name'));
  }
  if (filmFields.characters) {
    table.appendChild(getHTMLObjChild('planets', filmFields.planets, 'name'));
  }
  table.appendChild(getHTMLStringChild('opening crawl', filmFields.opening_crawl));
}

/**
 * Add button for load realted data 
 @param title title for button
 @param dataArr arr with id of related data
 @param outputFitld field, that will be load in the table
 */
function loadRelatedDataList(title, dataArr, outputFitld) {
  clearTable();
  document.getElementById('filmTableCaption').innerHTML += ' / ' + title;
  dataArr.forEach((item, index) => {
    table.appendChild(getHTMLStringChild(index, item[outputFitld]));
  });
  let backBtn = document.createElement('button');
  backBtn.classList.add('btnBack');
  backBtn.innerHTML = `Back to "${filmDataList.title}"`;
  backBtn.addEventListener('click', () => {
    loadFilmDataList(filmDataList);
    backBtn.remove();
  });
  document.getElementById('listBack').appendChild(backBtn);
}

/**
 *  Create HTML layout for table rows and table item.
 @param key ket for film field
 @param value value of film field
 */
function getHTMLStringChild(key, value) {
  const domObj = document.createElement('tr');
  domObj.classList.add('tableChild', 'tableRow');
  domObj.innerHTML = `
    <td><div class="tableItem">${key}</div></td>
    <td><div class="tableItem">${value}</div></td>
  `;

  return domObj;
}

/**
 * Return DOM elem of object
 @param title name for finding desired field in database
 @param inDataArr arr with id of related data
 @param outputFitld field, that will be load in the table
 */
function getHTMLObjChild(title, inDataArr, outputFitld) {
  const domObj = document.createElement('tr');

  const td = document.createElement('td');
  const btn = document.createElement('button');
  btn.classList.add('tableItem', 'relatedDataButton');
  btn.innerHTML = `${title} list`;
  td.appendChild(btn);

  domObj.classList.add('tableChild', 'tableRow');
  domObj.innerHTML = `
  <td><div class="tableItem">${title}</div></td>
  `;

  btn.addEventListener('click', () => {
    getRelatedData(title, inDataArr).then(response => {
      loadRelatedDataList(title, response, outputFitld);
    });
  });

  domObj.appendChild(td);
  return domObj;
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
 * Find related data in database
 @param title name for finding desired field in database
 @param inDataArr arr with id of related data
 */
async function getRelatedData(title, inDataArr) {
  const outDataArr = [];
  const response = await fetch(`https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/${title}.json`);
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
