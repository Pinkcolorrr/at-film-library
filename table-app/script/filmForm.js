const addFilmForm = document.getElementById('filmForm');
const addFilmInputs = document.getElementsByClassName('addFilmInput');
const errorMsg = document.getElementById('errorMsg');
const filmID = getFilmId();
const DEFALUT_NAME = 'Unknown';
const inputState = {
  title: DEFALUT_NAME,
  release_date: DEFALUT_NAME,
  director: DEFALUT_NAME,
  producer: DEFALUT_NAME,
  opening_crawl: DEFALUT_NAME,
  episode_id: DEFALUT_NAME,
  created: DEFALUT_NAME,
  edited: new Date(),
};

/**
 Set page title and make some form required for adding films 
 @param {string} id of film in database
 */
function pageInit(id) {
  if (id) {
    document.title = 'Edit film';
    document.getElementById('filmTableCaption').innerHTML = document.title;
  } else {
    document.title = 'Add film';
    document.getElementById('filmTableCaption').innerHTML = document.title;

    document.getElementById('episode_id').required = true;
    document.getElementById('title').required = true;
  }
}

for (let input of addFilmInputs) {
  input.addEventListener('input', e => {
    inputState[e.target.id] = e.target.value || DEFALUT_NAME;
  });
}

addFilmForm.addEventListener('submit', e => {
  e.preventDefault();

  saveFilm(getRequest(filmID));
});

/**
 Save film data in database (add new film or edit existed)
 @param {object} request got request to send it in database
 */
async function saveFilm(request) {
  const { body, url, method } = request;
  try {
    await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    window.location.replace('../');
  } catch (err) {
    errorMsg.innerHTML = err.message;
    errorMsg.style.display = 'block';
  }
}

/**
 Get request to save film
 @param {string} id get id to define type of request
 @returns {object} return request obj
 */
function getRequest(id) {
  const request = {
    body: {},
  };
  if (id) {
    for (let key in inputState) {
      if (inputState[key] != DEFALUT_NAME) {
        request.body[key] = inputState[key];
      }
    }
    request.url = `https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films/${id}/fields.json`;
    request.method = 'PATCH';
  } else {
    inputState.created = new Date();
    request.body = {
      fields: inputState,
      model: 'resources.film',
      pk: generatePk(),
    };
    request.url = 'https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films.json';
    request.method = 'POST';
  }

  return request;
}

/**
 Generate personal key for database entities
 @returns {string} string value of key
 */
function generatePk() {
  // eslint-disable-next-line no-magic-numbers
  return Math.random().toString(36).substr(2, 9);
}

/**
 Get film id from url params
 @returns {string} id of film in database
 */
function getFilmId() {
  return new URL(window.location.href).searchParams.get('id');
}

pageInit(filmID);
