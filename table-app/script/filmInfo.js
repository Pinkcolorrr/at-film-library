/**
 Get data from database by film id.
 @param id desired movie id
 */
async function getFilmData(id) {
  const response = await fetch(`https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films/${id}.json`);
  const filmData = await response.json();

  const filmFields = filmData.fields;

  loadFilmList(filmFields);
}

/**
 * Load film list on the page
 @param filmFields start key of object to read data from database
 */
function loadFilmList(filmFields) {
  removeUselessProps(filmFields);

  document.getElementById('filmTableCaption').innerHTML = filmFields.title;
  document.title = filmFields.title;

  createHTML(filmFields);
}

/**
 *  Create HTML layout for table rows and table item. Append them into table
 @param filmFields object
 */
function createHTML(filmFields) {
  const table = document.getElementById('filmTable');

  for (let key in filmFields) {
    let keyWithSpace = key.split('_').join(' ');

    let HTML = `
        <td><div class="tableItem">${keyWithSpace}</div></td>
        <td><div class="tableItem">${filmFields[key]}</div></td>
    `;

    const row = document.createElement('tr');
    row.classList.add('tableChild');
    row.classList.add('tableRow');
    row.innerHTML = HTML;

    table.appendChild(row);
  }
}

/** 
  Remove technical and oject props
  @param filmFields film object
 */
function removeUselessProps(filmFields) {
  for (let key in filmFields) {
    if (typeof filmFields[key] === 'object') {
      delete filmFields[key];
    }
  }

  delete filmFields.created;
  delete filmFields.edited;
}

/** 
  Get film id from URL
 */
function getFilmId() {
  return new URL(window.location.href).searchParams.get('id');
}

getFilmData(getFilmId());
